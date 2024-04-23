"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useFinalizationRegistry from "./useFinalizationRegistry";

// 타입 정의
type TChaserInspectReturn = {
  target: WeakRef<object>;
  byte: number;
  identifier: string;
  key?: string;
  marker: string;
};

type TOrientation = "top-left" | "top-right" | "bottom-left" | "bottom-right";

// Chaser 컨텍스트 생성
const ChaserContext = createContext<{
  register: (obj: object, key?: string) => void;
  unRegister: (obj: object) => void;
} | null>(null);

// Chaser 훅
const useChaser = () => {
  const context = useContext(ChaserContext);
  if (!context) {
    throw new Error("useChaser must be used within a ChaserProvider");
  }
  return context;
};

const Circle = ({ marker, name, byte }: { marker: string; name: string; byte: number; }) => {
  const circleColor = marker === "function" ? "#e74c3c" : "#3498db";
  const circleInText = marker === "function" ? "F" : "O";
  const circleInTextX = marker === "function" ? "11" : "9.5";
  return (
    <>
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="15"
          cy="15"
          r="13"
          stroke="black"
          strokeWidth="3"
          fill={circleColor}
        />
        <text
          x={circleInTextX}
          y="20"
          fontFamily="Arial"
          fontSize="14"
          fill="white"
          fontWeight={600}
        >
          {circleInText}
        </text>
      </svg>
      <p className="w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">{name}</p>
      <p className="max-w-[100px] text-[12px] overflow-hidden whitespace-nowrap text-ellipsis">{`${byte} byte`}</p>
    </>
  );
};

// 가비지 모니터 컴포넌트
const GarbageMonitor = ({
  orientation,
  garbage,
}: {
  orientation: TOrientation;
  garbage: TChaserInspectReturn[];
}) => {
  const orientationStyle = {
    "bottom-left": "fixed bottom-0 left-0 bg-[#121212]",
    "bottom-right": "fixed bottom-0 right-0 bg-[#121212]",
    "top-left": "fixed top-0 left-0 bg-[#121212]",
    "top-right": "fixed top-0 right-0 bg-[#121212]",
  }[orientation];

  return (
    <div className={orientationStyle}>
      {garbage.map((info, index) => {
        const object = info.target.deref(); // WeakRef에서 실제 객체를 얻음
        const marker = info.marker;
        const key = info.key ?? info.identifier;
        if (object) {
          return (
            <div key={`${key}-${index}`} className="flex items-center border-[1px] border-solid">
              <Circle marker={marker} name={key} byte={info.byte}/>
            </div>
          );
        }
        return (
          <div key={`${info.identifier}-${index}`}>
            Collected: {info.identifier}
          </div>
        ); // 객체가 이미 G.C에 의해 수집된 경우
      })}
    </div>
  );
};

// ChaserInspect 컴포넌트
const ChaserInspect = ({
  children,
  orientation = "bottom-right",
}: {
  children: ReactNode;
  orientation?: TOrientation;
}) => {
  const {
    register,
    unRegister,
    garbageInfo: garbage,
  } = useFinalizationRegistry();

  return (
    <ChaserContext.Provider value={{ register, unRegister }}>
      {children}
      <GarbageMonitor orientation={orientation} garbage={garbage} />
    </ChaserContext.Provider>
  );
};

export default ChaserInspect;
export { useChaser };
