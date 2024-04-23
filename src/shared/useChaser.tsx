// 'use client';

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

const keyByObject = (object: any): IObjectEntry => ({ target: object });

const useChaser = () => {
    const finalizer = new WeakRef(
        new FinalizationRegistry((object: IObjectEntry | null | string | InspectType) => {
            const message = `${JSON.stringify(object).replaceAll(
                "\\",
                ""
            )} has been collected by the G.C.`;
            console.log(message);

            // 참조 끊기
            object = null;

            // return message;
        })
    );

    const register = (object: any) => {
        const identifier = inspectObjectType(object);
        // const keyByIdentifier = keyByObject(identifier);
        // console.log(keyByIdentifier);
        // console.log(identifier);
        // console.log(object);
        finalizer.deref()?.register(object, identifier);
    };

    return { register };
};

export default useChaser;
