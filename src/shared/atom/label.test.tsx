import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Label, LabelProps } from "./label";

const defaultTitle = "라벨타이틀";

function TestLabel(props: LabelProps) {
  return <Label {...props}>{props.children}</Label>;
}

const setup = (props?: LabelProps) => {
  const ariaLabel = props?.label ?? "label-label";
  const utils = render(<TestLabel {...props}>{props?.children}</TestLabel>);
  const element: HTMLParagraphElement = screen.getByLabelText(ariaLabel);

  return {
    element,
    ...utils,
  };
};

describe("Label Rendering", () => {
  it("as p", () => {
    const { element } = setup({
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("P");
  });

  it("as h1", () => {
    const { element } = setup({
      as: `h1`,
      children: defaultTitle,
    });
    expect(element.nodeName).toBe(`H1`);
  });

  it("as h2", () => {
    const { element } = setup({
      as: "h2",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("H2");
  });

  it("as h3", () => {
    const { element } = setup({
      as: "h3",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("H3");
  });
  it("as h4", () => {
    const { element } = setup({
      as: "h4",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("H4");
  });
  it("as h5", () => {
    const { element } = setup({
      as: "h5",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("H5");
  });
  it("as h6", () => {
    const { element } = setup({
      as: "h6",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("H6");
  });

  it("as span", () => {
    const { element } = setup({
      as: "span",
      children: defaultTitle,
    });
    expect(element.nodeName).toBe("SPAN");
  });
});

describe("Label Event", () => {
  it("Change ", () => {
    const { element } = setup({
      onChange: (e) => {
        element.textContent = e.currentTarget.textContent;
      },
    });
    fireEvent.change(element, { target: { textContent: "change~" } });
    expect(element.textContent).toBe("change~");
  });

  it("Click ", () => {
    const { element } = setup({
      onClick: (e) => {
        element.textContent = e.currentTarget.textContent;
      },
    });
    fireEvent.click(element, { target: { textContent: "click!" } });
    expect(element.textContent).toBe("click!");
  });
});