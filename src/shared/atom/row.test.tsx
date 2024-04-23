import { fireEvent, render, screen } from "@testing-library/react";
import React, { MouseEvent } from "react";
import { Row, RowProps } from "./row";

function TestRow(props: RowProps) {
  return <Row {...props}>{props.children}</Row>;
}

const setup = (props?: RowProps) => {
  const ariaLabel = props?.label ?? "row-label";
  const as = props?.as ?? "div";
  const utils = render(
    <TestRow as={as} aria-label={ariaLabel} {...props}>
      {props?.children}
    </TestRow>
  );
  const element: HTMLDivElement = screen.getByLabelText(ariaLabel);
  return {
    element,
    ...utils,
  };
};

describe("Row Rendering", () => {
  it("as DIV", () => {
    const { element } = setup();
    expect(element.nodeName).toBe("DIV");
  });

  it("as SECTION", () => {
    const { element } = setup({
      as: "section",
    });
    expect(element.nodeName).toBe("SECTION");
  });

  it("as ARTICLE", () => {
    const { element } = setup({
      as: "article",
    });
    expect(element.nodeName).toBe("ARTICLE");
  });

  it("as ASIDE", () => {
    const { element } = setup({
      as: "aside",
    });
    expect(element.nodeName).toBe("ASIDE");
  });

  it("as FOOTER", () => {
    const { element } = setup({
      as: "footer",
    });
    expect(element.nodeName).toBe("FOOTER");
  });

  it("as HEADER", () => {
    const { element } = setup({
      as: "header",
    });
    expect(element.nodeName).toBe("HEADER");
  });

  it("as MAIN", () => {
    const { element } = setup({
      as: "main",
    });
    expect(element.nodeName).toBe("MAIN");
  });

  it("as NAV", () => {
    const { element } = setup({
      as: "nav",
    });
    expect(element.nodeName).toBe("NAV");
  });
});

describe("Row Event", () => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("Click Color Change", () => {
    const { element } = setup({
      className: "bg-black",
      onClick: handleClick,
    });
    fireEvent.click(element);
    expect(element.classList.value).toContain("bg-red");
  });
});