import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonProps } from "./button";
import React, { MouseEvent, useState } from "react";

function TestButton(props: ButtonProps) {
  const [value, setValue] = useState(0);
  const Component = props?.as ?? "button";
  return (
    <Component
      onClick={() => {
        setValue((prev) => prev + 1);
      }}
      {...props}
    >
      {value}
    </Component>
  );
}

const setup = (props?: ButtonProps) => {
  const ariaLabel = props?.label ?? "buttonLabel";
  const utils = render(<TestButton aria-label={ariaLabel} {...props} />);
  const element: HTMLButtonElement = screen.getByLabelText(ariaLabel);
  return {
    element,
    ...utils,
  };
};

describe("Button rendering", () => {
  const buttonText = "테스트";

  it("textContent", () => {
    const { element } = setup();
    element.textContent = buttonText;
    expect(element.textContent).toBe(buttonText);
  });

  it("as BUTTON", () => {
    const { element } = setup();
    expect(element.nodeName).toBe("BUTTON");
  });

  it("as SPAN", () => {
    const { element } = setup({
      as: "span",
    });
    expect(element.nodeName).toBe("SPAN");
  });
});

describe("Button Event", () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("Click to 100", () => {
    const { element } = setup();
    [...Array(100).keys()].map((i) => fireEvent.click(element));
    expect(element.textContent).toBe("100");
  });

  it("Click Color Change from black to red", () => {
    const { element } = setup({
      className: "bg-black",
      onClick: handleClick,
    });
    fireEvent.click(element);
    expect(element.classList.value).toBe("bg-red");
  });
});