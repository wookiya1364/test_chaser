import { cn } from "@shared/cn";
import React from "react";

export interface InputProps extends React.ObjectHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <input
        className={cn("font-medium", className)}
        ref={ref}
        {...props}
      >
        {children}
      </input>
    );
  }
);

Input.displayName = "Input";

export { Input };