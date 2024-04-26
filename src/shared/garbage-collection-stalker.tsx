"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { checkEmptyOrNull, inspectObjectType } from "../../gcs-logic";
type TStalk = {
    (value: object): void;
    (key: string, value: object): void;
};

type TOrientation = "top-left" | "top-right" | "bottom-left" | "bottom-right";

// GarbageCollectionStalkerContext 컨텍스트 생성
// const GarbageCollectionStalkerContext = createContext<TStalk>((() => {
//     console.error("Stalk function called without a provider");
// }) as TStalk);
// const GarbageCollectionStalkerContext = createContext<TStalk>(
//     () => ((key: string, value: object) => {}) as TStalk
// );

// GarbageCollectionStalker 훅
// const useGarbageCollectionStalker = () => {
//     const context = useContext(GarbageCollectionStalkerContext);
//     if (!context) {
//         throw new Error("useChaser must be used within a ChaserProvider");
//     }
//     return context;
// };

function useGCS() {
    const w = useRef<Worker>();
    const [stalk, setStalk] = useState<any>(() => ((key: string, value: object) => {}) as TStalk);
    const arrest = () =>
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
            const response = `[${inspectObjectType(event.data)}]`;
            console.log(`WebWorker Response => ${response}`);
            return event.data;
        };
        setStalk(() => (key: string, ...value: any) => {
            w.current?.postMessage({
                type: inspectObjectType(key ?? value),
                payload: inspectObjectType(checkEmptyOrNull(value) ?? key),
            });
        });
        return () => {
            w.current?.terminate();
        };
    }, [w]);

    return { stalk, arrest, murder };
}

const GarbageMonitor = ({ orientation }: { orientation: TOrientation }) => {
    const orientationStyle = {
        "bottom-left": "fixed bottom-0 left-0 bg-[#121212]",
        "bottom-right": "fixed bottom-0 right-0 bg-[#121212]",
        "top-left": "fixed top-0 left-0 bg-[#121212]",
        "top-right": "fixed top-0 right-0 bg-[#121212]",
    }[orientation];
    return <div className={orientationStyle}></div>;
};

export default function GarbageCollectionStalkerProvider({
    children,
    orientation = "bottom-right",
}: Readonly<{
    children: ReactNode;
    orientation?: TOrientation;
}>) {

    return (
        // <GarbageCollectionStalkerContext.Provider value={stalk}>
        <>
            {children}
            <GarbageMonitor orientation={orientation} />
        </>
        // </GarbageCollectionStalkerContext.Provider>
    );
}

export { useGCS };
