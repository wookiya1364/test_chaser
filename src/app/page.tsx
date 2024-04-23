"use client";
import Test from "@features/test/page";
import { Select } from "@shared/atom/select";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import GcsTest from "./test";
import useGCS from "@shared/useGCS";
import { Button } from "@shared/index";

export default function Home() {
    const { w, register } = useGCS();
    const options: TOption[] = useMemo(
        () => [
            { label: "1", value: 2 },
            { label: "3", value: 4 },
        ],
        []
    );
    const handleSelect = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            console.log(`You selected ${event.target.value}`);
            w.current?.postMessage([Math.random() * 10000]);
        },
        [w]
    );

    useEffect(() => {
        if (w.current) {
            // for (let idx = 0; idx < 1_350; idx++) {
            for (let idx = 0; idx < 1; idx++) {
                register([1, 2, 3, 4, 5, 6, 7, console, console.log, handleSelect]);
                register(["DDD"]);
            }
        }

        return () => {};
    }, [handleSelect, register, w]);

    const iter = Array.from({ length: 20 }).fill(1);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={"/hhh"}>LINK</Link>
            {iter.map((i, idx) => (
                <Test key={`${i}-${idx}`} />
            ))}
            <GcsTest />
            <Select label="label입니다." options={options} value="dd" onChange={handleSelect} />
            <Button
                onClick={() => {
                    w.current?.postMessage({
                        type: "keys",
                    });
                    w.current?.postMessage({
                        type: "entries",
                    });
                }}
            >
                CLICK
            </Button>
        </main>
    );
}
