import { fireEvent, render, screen } from "@testing-library/react";
import React, { MouseEvent } from "react";
import { Column, ColumnProps } from "./column";

function TestColumn(props: ColumnProps) {
  return <Column {...props}>{props.children}</Column>;
}

const setup = (props?: ColumnProps) => {
  const ariaLabel = props?.label ?? "column-label";
  const as = props?.as ?? "div";
  const utils = render(
    <TestColumn as={as} aria-label={ariaLabel} {...props}>
      {props?.children}
    </TestColumn>
  );
  const element: HTMLDivElement = screen.getByLabelText(ariaLabel);
  return {
    element,
    ...utils,
  };
};

describe("Column Rendering", () => {
  it("Column as DIV", () => {
    const { element } = setup();
    expect(element.nodeName).toBe("DIV");
  });

  it("Column as SECTION", () => {
    const { element } = setup({
      as: "section",
    });
    expect(element.nodeName).toBe("SECTION");
  });

  it("Column as ARTICLE", () => {
    const { element } = setup({
      as: "article",
    });
    expect(element.nodeName).toBe("ARTICLE");
  });

  it("Column as ASIDE", () => {
    const { element } = setup({
      as: "aside",
    });
    expect(element.nodeName).toBe("ASIDE");
  });

  it("Column as FOOTER", () => {
    const { element } = setup({
      as: "footer",
    });
    expect(element.nodeName).toBe("FOOTER");
  });

  it("Column as HEADER", () => {
    const { element } = setup({
      as: "header",
    });
    expect(element.nodeName).toBe("HEADER");
  });

  it("Column as MAIN", () => {
    const { element } = setup({
      as: "main",
    });
    expect(element.nodeName).toBe("MAIN");
  });

  it("Column as NAV", () => {
    const { element } = setup({
      as: "nav",
    });
    expect(element.nodeName).toBe("NAV");
  });
});

describe("Column Event", () => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("Click Color Change", () => {
    const { element } = setup({
      onClick: handleClick
    });
    fireEvent.click(element);
    expect(element.classList.value).toContain("bg-red");
  });
});