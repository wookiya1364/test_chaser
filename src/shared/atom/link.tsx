import { cn } from "@shared/cn";
import React from "react";

export interface TextLinkProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TLabel;
}

const TextLink = React.forwardRef<HTMLDivElement, TextLinkProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as ?? "p";
    return (
      <Component className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
TextLink.displayName = "TextLink";

export { TextLink };