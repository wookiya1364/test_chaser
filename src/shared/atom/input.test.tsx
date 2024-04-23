import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { Input, InputProps } from "./input";

function TestInput(props: InputProps) {
  const [value, setValue] = useState(0);
  return (
    <Input
      onClick={() => setValue((prev) => prev + 1)}
      defaultValue={value}
      {...props}
    ></Input>
  );
}

const setup = (props?: InputProps) => {
  const inputLabel = "input-label";
  const utils = render(<TestInput {...props} />);
  const element: HTMLInputElement = screen.getByLabelText(inputLabel);
  return {
    element,
    ...utils,
  };
};

describe("Input Event", () => {
  const handleClick = (e: { currentTarget: { value: string } }) => {
    e.currentTarget.value = `${parseInt(e.currentTarget.value) + 1}`;
  };

  it("Change", () => {
    const { element } = setup({
      onChange: (e) => {
        element.value = e.currentTarget.value;
      },
    });
    fireEvent.change(element, { target: { value: "change~" } });
    expect(element.value).toBe("change~");
  });

  it("Click", () => {
    const { element } = setup({
      onClick: handleClick,
    });
    const clickCount = 10;
    for(let idx=0; idx<clickCount; idx++) {
      fireEvent.click(element);
    }
    expect(element.value).toBe(`${clickCount}`);
  });
});