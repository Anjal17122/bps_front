import React from "react";
import { Link } from "react-router-dom";
import TableButton from "../TableButton/TableButton";

interface Props {
  myurl: string;
}

const NextDiv = ({ myurl }: Props) => {
  return (
    <div className="flexEnd nextDiv">
      <Link to={myurl}>
        <TableButton bgColor="blue">Next {">>"} </TableButton>
      </Link>
    </div>
  );
};

export default NextDiv;
// {`/project/create/charkilla/${match.params.pid}`}
