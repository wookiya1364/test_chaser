import React from "react";

interface ISelect extends React.HTMLAttributes<HTMLSelectElement> {
  trigger?: React.ReactNode;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: TOption[];
}

// Dropdown 관련 컴포넌트들 정의
const Trigger = ({ as }: { as: React.ReactNode }) => as;

const Menu = ({ children }: { children: React.ReactNode }) => children;
const Item = ({
  children,
  value,
}: {
  children: string;
  value: string | number;
}) => <option value={value}>{children}</option>;

const Select = ({
  children,
  trigger,
  label,
  value,
  onChange,
  options,
}: ISelect) => {
  return (
    <select onChange={onChange}>
      <Select.Trigger as={trigger}></Select.Trigger>
      <Select.Menu>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Menu>
    </select>
  );
};

Select.Trigger = Trigger;
Select.Menu = Menu;
Select.Item = Item;

export { Select };
