import { cn } from "@shared/cn";
import React from "react";

export interface ColumnProps
  extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainer;
  label?: string;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, as, label, ...props }, ref) => {
    const Component = as ?? "div";
    return (
      <Component
        className={cn("flex flex-col", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Column.displayName = "Column";

export { Column };