import { gcsLabel } from "./gcs-logic";

interface WorkerMessage {
    type: string;
    payload: object;
}

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

    delete(type: object) {
        const entry = this.#weakMap.get(type);
        if (!entry) {
            return false;
        }
        this.#weakMap.delete(type);
        this.#refSet.delete(entry.ref);
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

let gcCache = new GCCache();

addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
    const { type } = event.data;
    let result = [];
    switch (type) {
        case "get":
            postMessage(gcCache.get(event.data));
            break;
        case "values":
            for (const value of gcCache.values()) {
                result.push(value);
            }
            postMessage(result);
            break;
        case "keys":
            for (const key of gcCache.keys()) {
                result.push(key);
            }
            postMessage(result);
            break;
        case "entries":
            for (const [key, value] of gcCache.entries()) {
                result.push({ key, value });
            }
            postMessage(result);
            break;
        default:
            gcCache.set(event.data);
    }
});
