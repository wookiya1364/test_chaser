import React, { Fragment } from "react";

export interface MultilineLabelProps
  extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TLabel;
  description?: string;
}

const MultilineLabel = React.forwardRef<HTMLDivElement, MultilineLabelProps>(
  ({ className, children, as, description, ...props }, ref) => {
    const Component = as ?? "p";
    const isMultiline = description!.split("\n").length > 1;
    return isMultiline ? (
      <Fragment>
        {description?.split("\n").map((str, idx) => {
          return (
            <Component className="multi-line max-sm:overflow-visible max-sm:break-keep" key={`${str}-${idx}`}>
              {str}
            </Component>
          );
        })}
      </Fragment>
    ) : (
      <Fragment>{description}</Fragment>
    );
  }
);
MultilineLabel.displayName = "MultilineLabel";

export { MultilineLabel };
