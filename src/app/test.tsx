"use client";
import Test from "@features/test/page";
import Link from "next/link";
import useGCS from "@shared/useGCS";

export default function GcsTest() {
    // const { lgcs } = useGCS();

    // lgcs("a", [1, 2, 3, 4, 5, 6, 7, console, console.log]);
    // lgcs("b", [1, 2, 3, 4, 5, 6, 7, console.warn, console.log]);
    // lgcs("c", ["DDD"]);
    // setTimeout(() => {
    //     console.time('setTimeout');
    //     Array.from({ length: 1350 }).map((v) => {
    //         lgcs("a", [1, 2, 3, 4, 5, 6, 7, console, console.log]);
    //         lgcs("b", [1, 2, 3, 4, 5, 6, 7, console.warn, console.log]);
    //         lgcs("c", ["DDD"]);
    //     });
    //     console.timeEnd('setTimeout');
    // }, 3000);

    const iter = Array.from({ length: 20 }).fill(1);

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={"/hhh"}>LINK</Link>
            {iter.map((i, idx) => (
                <Test key={`${i}-${idx}`} />
            ))}
        </section>
    );
}
