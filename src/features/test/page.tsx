"use client";

import { Column, Row } from "@shared/index";
import React from "react";
import useReg from "./useReg";

export default function Test() {
  const list: th[] = ["youtube", "facebook", "telegram", "twitter"];
  const [Reg, setStep] = useReg();

  return (
    <Column as="article" className="w-[300px]">
      {list.map((data: th, idx: number) => {
        return (
          <Row key={data} as="section" onClick={() => setStep(data)}>
            {data}
            <Reg>
              <Reg.Step name={data}></Reg.Step>
            </Reg>
          </Row>
        );
      })}
    </Column>
  );
}
