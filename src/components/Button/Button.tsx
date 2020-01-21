import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(({ onClick, label, disabled }) => {
  return (
    <button
      className={cx(styles.container, styles.neutral, { disabled })}
      onClick={onClick}
      data-role="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
});
