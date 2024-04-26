import { useEffect, useRef, useState } from "react";
import { inspectObjectType, checkEmptyOrNull } from "../../gcs-logic";

type TStalk = {
    (value: object): void;
    (key: string, value: object): void;
};

export default function useGCS() {
    const w = useRef<Worker>();
    const [stalk, setStalk] = useState<TStalk>(
        () => ((key: string, value?: object) => {}) as TStalk
    );
    const arrest = (): void =>
        w.current?.postMessage({
            type: "arrest",
        });
    const murder = () =>
        w.current?.postMessage({
            type: "murder",
        });
    useEffect(() => {
        w.current = new Worker(new URL("/worker.ts", import.meta.url));
        w.current.onmessage = (event) => {
            console.log(`WebWorker Response => ${inspectObjectType(event.data)}`);
            return event.data;
        };
        setStalk(() => (key: string, value: object) => {
            w.current?.postMessage({
                type: inspectObjectType(key || value),
                payload: inspectObjectType(checkEmptyOrNull(value) ?? key),
            });
        });
        return () => {
            w.current?.terminate();
        };
    }, [w]);

    return { stalk, arrest, murder };
}
