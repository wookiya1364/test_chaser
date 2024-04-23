const keybyObject = (object: any) => ({ target: object });
const inspectObjectType = (value: any): InspectType => {
    if (value === null || (typeof value !== "object" && typeof value !== "function")) {
        return value;
    }

    if (typeof value === "function") {
        return `Function: ${value.name || "anonymous"}`;
    }

    if (Array.isArray(value)) {
        const elements = value.slice(0, 10).map(inspectObjectType);
        return JSON.stringify(elements);
    }

    const entries = Object.entries(value).slice(0, 10);
    const props = entries.map(([key, val]) => `${key}: ${inspectObjectType(val)}`);
    return `{${props.join(", ")}}`;
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

export { gcsLabel, gcs };
