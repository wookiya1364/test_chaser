const keybyObject = (object: any) => ({ target: object });
const checkEmptyOrNull = (value: any) => {
    if (value === null || value === undefined || value == "") {
        return null; // null 또는 undefined인 경우
    }
    if (Array.isArray(value) && value.length === 0) {
        return null; // 빈 배열인 경우
    }
    return value; // 그 외의 경우
};
const inspectObjectType = (value: any): string => {
    if (value === null || (typeof value !== "object" && typeof value !== "function")) {
        return JSON.stringify(value);
    }

    if (typeof value === "function") {
        return JSON.stringify(`Function: ${value.name || "anonymous"}`);
    }

    if (Array.isArray(value)) {
        const elements = value.map(inspectObjectType);
        return elements.join(', '); // 배열을 JSON 배열 형식으로 반환
    }

    const entries = Object.entries(value);
    const props = entries.map(([key, val]) => `"${key}": ${inspectObjectType(val)}`);
    return `{ ${props.join(", ")} }`; // 객체를 JSON 객체 형식으로 반환
};

const gcsLabel = () => {
    const finalRegistry = new FinalizationRegistry((object) => {
        const message = `${JSON.stringify(object)?.replaceAll(
            "\\",
            ""
        )} has been collected by the G.C`;
        console.info(message);
        return message;
    });

    return (key: string, value: any) => {
        const identifier = inspectObjectType(value);
        // finalRegistry에 객체를 등록. 여기서 객체가 수집될 때 콜백으로 전달할 이름을 지정합니다.
        finalRegistry.register(keybyObject(identifier), key);
    };
};
const gcs = () => {
    const finalRegistry = new FinalizationRegistry((object) => {
        const message = `${JSON.stringify(object).replaceAll(
            "\\",
            ""
        )} has been collected by the G.C`;
        console.info(message);
        return message;
    });

    return (value: any) => {
        const identifier = inspectObjectType(value);
        // finalRegistry에 객체를 등록. 여기서 객체가 수집될 때 콜백으로 전달할 이름을 지정합니다.
        finalRegistry.register(keybyObject(identifier), keybyObject(identifier));
    };
};

export { gcsLabel, gcs, keybyObject, inspectObjectType, checkEmptyOrNull };
