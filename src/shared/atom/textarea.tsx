import { cn } from "@shared/cn";
import React, { HTMLProps } from "react";

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  type?: string;

}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, type, ...props }, ref) => {
    if(type === "title") {
      className = `h-[70px] bg-transparent block text-[2.75rem] w-full resize-none leading-[2.75rem] outline-none border-none ${className}`
    }
    else {
      className = `h-[50px] bg-transparent block text-[2rem] w-full resize-none leading-[2rem] outline-none border-none ${className}`
    }

    return (
      <textarea className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </textarea>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };