"use client";

import { useCallback, useState } from "react";

type TChaserInspectReturn = {
  target: WeakRef<object>;
  byte: number;
  identifier: string;
  key?: string;
  marker: string;  
};

const KEY_START_INDEX: number = 0;
const KEY_END_INDEX: number = 10;

/**
 * charCode >> 11은 charCode를 11비트 오른쪽으로 시프트합니다. 결과가 0이 아니라면 (즉, charCode가 2048 이상이라면), 현재 문자는 최소 3바이트를 필요
 * charCode >> 7이 0이 아니라면 (charCode가 128 이상이라면), 현재 문자는 2바이트를 필요
 * 그 외의 경우는 현재 문자가 ASCII 문자로 간주되어 1바이트만 필요
 * @param object
 * @returns
 */
const getByteLength = (object: any): number => {
  let length: number = 0;
  let targetString = String(object);
  for (let idx = 0; idx < targetString.length; idx++) {
    const charCode: number = targetString.charCodeAt(idx);
    length += charCode >> 11 ? 3 : charCode >> 7 ? 2 : 1;
  }
  return length;
};

const inspectObjectType = (value: any): string => {
  // 원시 타입 처리
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return value;
  }

  // 함수 처리
  if (typeof value === "function") {
    return `Function: ${value.name || "anonymous"}`;
  }

  // 배열 처리
  if (Array.isArray(value)) {
    const elements = value
      .slice(KEY_START_INDEX, KEY_END_INDEX)
      .map(inspectObjectType); // 성능을 위해 처음 10개 요소만 처리
    return JSON.stringify(elements);
  }

  // 객체 처리
  const entries = Object.entries(value).slice(KEY_START_INDEX, KEY_END_INDEX); // 성능을 위해 처음 10개 키-값 쌍만 처리
  const props = entries.map(
    ([target, val]) => `${target}: ${inspectObjectType(val)}`
  );
  return `{${props.join(", ")}}`;
};
function useFinalizationRegistry() {
  const [garbageInfo, setGarbageInfo] = useState<TChaserInspectReturn[]>([]);

  const register = useCallback((object: any, key?: string) => {
    const identifier = inspectObjectType(object);
    const byte = getByteLength(object);
    const objectRef = new WeakRef(object); // 객체에 대한 WeakRef 생성
    const marker = identifier.includes('Function:') ? "function" : "object";

    const finalReg = new FinalizationRegistry((heldValue: string) => {
      console.info(`${heldValue} has been collected by the G.C`);
      // G.C가 수집한 후 상태 업데이트 로직은 여기서 직접 수행할 수 없음
    });

    const entry = { target: objectRef, byte, identifier, key, marker };
    debugger;
    setGarbageInfo((prev) => [...prev, entry]); // 객체 정보를 상태에 추가
    // console.log(object, identifier);
    finalReg.register(object, identifier); // 실제 객체를 FinalizationRegistry에 등록
  }, []);

  const unRegister = useCallback((object: any) => {}, []);

  return { register, unRegister, garbageInfo };
}

export default useFinalizationRegistry;
