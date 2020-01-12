import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

export enum ButtonSize {
  Small = "smallSize",
  Default = "defaultSize",
}

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  type?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled,
  type = ButtonSize.Default,
}) => {
  const containerStyles = cx(
    styles.container,
    styles.neutral,
    styles[type],
    { disabled },
  );
  return (
    <button
      className={containerStyles}
      onClick={onClick}
      data-role="button"
    >
      {label}
    </button>
  );
}
