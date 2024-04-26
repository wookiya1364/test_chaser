"use client";
import Test from "@features/test/page";
import { Select } from "@shared/atom/select";
import { ChangeEvent, useCallback, useMemo } from "react";
import Link from "next/link";
import GcsTest from "./test";
import { Button } from "@shared/index";
import { useGCS } from "@shared/garbage-collection-stalker";

export default function Home() {
    const { stalk, arrest, murder } = useGCS();
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
            stalk([Math.random() * 10000]);
        },
        [stalk]
    );

    const iter = Array.from({ length: 20 }).fill(1);

    for (let idx = 0; idx < 1; idx++) {
        // stalk("여러가지", [1, 2, 3, 4, 5, 6, 7, console, console.log, handleSelect]);
        stalk("options", options);
        stalk("handleSelect", handleSelect);
        
    }
    // stalk("이터입니다", iter);

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
                    arrest();
                }}
            >
                CLICK
            </Button>
            <Button
                onClick={() => {
                    murder();
                }}
            >
                MURDER
            </Button>
        </main>
    );
}
