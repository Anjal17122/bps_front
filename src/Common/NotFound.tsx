import React from "react";
import { Link } from "react-router-dom";
import TableButton from "./TableButton/TableButton";

interface Props {
  text: string;
  link?: string;
}

const NotFound = ({ text, link }: Props) => {
  return (
    <div className="NotFound flexCenter">
      {text}{" "}
      {link ? (
        <Link to={link}>
          <TableButton bgColor="green">Add Floor</TableButton>
        </Link>
      ) : null}
    </div>
  );
};

export default NotFound;
