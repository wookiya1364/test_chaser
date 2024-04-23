type HeldValue = () => void;
const registry = new FinalizationRegistry<HeldValue>(
  (callback) => callback(),
);

class DeferredGarbageCollectedError extends Error {
  readonly name: "DeferredGarbageCollectedError" =
    "DeferredGarbageCollectedError";

  constructor() {
    super(
      "Deferred object was garbage-collected without " +
        "resolving or rejecting the promise",
    );
  }
}

class Deferred<T> {
  readonly #promise: Promise<T>;
  readonly #resolve: (value: T) => void;
  readonly #reject: (reason?: unknown) => void;

  constructor() {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;

    this.#promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.#resolve = resolve;
    this.#reject = reject;

    // We register this Deferred instance and provide the callback
    // to reject the promise
    registry.register(
      this, // the value we are tracking for GC
      () => {
        console.log("GC 시작", this);
        reject(new DeferredGarbageCollectedError());
        
      },
        // the "held value" references locally scoped `reject`
        // rather than `this.#reject` so it has no dependency on
        // `this` and won't prevent GC
    );
  }

  get promise(): Promise<T> {
    return this.#promise;
  }

  resolve(value: T): void {
    this.#resolve(value);

    // When resolve or reject are called, we no longer care
    // about garbage collection
    registry.unregister(this);
  }

  reject(reason?: unknown): void {
    this.#reject(reason);

    // When resolve or reject are called, we no longer care
    // about garbage collection
    registry.unregister(this);
  }
}

export { Deferred, DeferredGarbageCollectedError, registry }