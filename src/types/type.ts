type KeyValue = {
    [key: string]: string | number | boolean | null | undefined;
};

type TOption = {
    label: string;
    value: string | number;
};

type TDefaultProps = {
    className?: string;
    name?: string;
    children?: React.ReactNode;
};

type TContainer = "div" | "section" | "main" | "article" | "header" | "footer" | "aside" | "nav";
type TLabel = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
type TButton = "button" | "span";

type TLink = { text: string; href: string };
type TKeyValue = {
    [key: string]: string | number;
};
type TDynamicRoute = {
    params: TID;
};
type TID = {
    id: string;
};

type th = "youtube" | "facebook" | "telegram" | "twitter";

type TNameChildren = Omit<TDefaultProps, "className">;

interface IObjectEntry {
    [key: string]: any;
}

type InspectType = string | number | boolean | null | undefined | Function | IObjectEntry[];
