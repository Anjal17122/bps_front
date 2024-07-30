import React, { ReactNode } from "react";

import "../../Assets/scss/TableButton.scss";

interface Props {
  bgColor: "blue" | "green" | "black" | "red" | "yellow" | "grey";
  children: ReactNode;
  width?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const TableButton = ({
  bgColor,
  children,
  width,
  onClick,
  type,
  disabled,
}: Props) => {
  const colors = () => {
    if (bgColor === "blue") {
      return "#13afdf";
    } else if (bgColor === "green") {
      return "#77b300";
    } else if (bgColor === "black") {
      return "#333333";
    } else if (bgColor === "red") {
      return "#e51668";
    } else if (bgColor === "yellow") {
      return "#e69900";
    } else if (bgColor === "grey") {
      return "#9D9D9D";
    }
  };

  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className="tablebutton"
        style={{ backgroundColor: colors(), width }}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default TableButton;
