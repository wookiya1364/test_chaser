import { Facebook, Telegram, Twitter, Youtube } from "@shared/index";
import React, { ReactElement, useState } from "react";

export default function useReg() {
  const [step, setStep] = useState<th | undefined>();

  const Step: React.FC<TNameChildren> = ({ children, name }) => {
    const Icons = {
      youtube: <Youtube />,
      facebook: <Facebook />,
      telegram: <Telegram />,
      twitter: <Twitter />,
    }[name!];

    return <>{children || Icons}</>;
  };

  const Reg: React.FC<TNameChildren> & { Step: React.FC<TNameChildren> } = ({
    children,
  }) => {
    let targetStep: ReactElement | undefined;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.name === step) {
        targetStep = child;
      }
    });
    return <>{targetStep}</>;
  };

  Reg.Step = Step;
  return [Reg, setStep] as const;
}
