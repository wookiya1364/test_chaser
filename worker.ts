import { gcsLabel } from "./gcs-logic";

type WorkerMessage = {
    type: string;
    payload: object;
};

class GCCache {
    #weakMap = new WeakMap();
    #refSet: any = new Set();
    #gcsLabel = gcsLabel();

    set(payload: WorkerMessage) {
        const ref = new WeakRef(payload);
        this.#gcsLabel(payload.type, payload);
        this.#weakMap.set(payload, { payload, ref });
        this.#refSet.add(ref);
    }

    get(type: object) {
        const entry = this.#weakMap.get(type);
        return entry?.payload;
    }

    delete(type: any) {
        let entry = this.#weakMap.get(type);
        if (!entry) {
            return false;
        }
        this.#weakMap.delete(type);
        this.#refSet.delete(entry.ref);
        type = null;
        entry = null;
        return true;
    }

    *[Symbol.iterator]() {
        for (const ref of this.#refSet) {
            const type = ref.deref();
            if (!type) continue;
            const { payload } = this.#weakMap.get(type);
            yield [type, payload];
        }
    }

    entries() {
        return this[Symbol.iterator]();
    }

    *keys() {
        for (const [type, _] of this) {
            yield type;
        }
    }

    *values() {
        for (const [_, payload] of this) {
            yield payload;
        }
    }
}

const gcCache = new GCCache();

addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
    const { type } = event.data;
    const result = [];
    switch (type) {
        case "arrest":
            for (const value of gcCache.values()) {
                result.push(value);
            }
            postMessage(result);
            break;
        case "murder":
            for (const value of gcCache.values()) {
                gcCache.delete(value);
            }
            postMessage("murder");
            break;
        default:
            gcCache.set(event.data);
    }
});
