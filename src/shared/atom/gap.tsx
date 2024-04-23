import { cn } from "@shared/cn";
import { Column } from "..";

export const Gap = ({height}: {height?: string;}) => <Column className={cn("h-[20vh] md:h-[30vh] lg:h-[20vh]", height)} />;