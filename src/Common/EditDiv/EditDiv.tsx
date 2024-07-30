import React from "react";
import { Link } from "react-router-dom";

interface Props {
  url: string;
  onClick: () => void;
}

const EditDiv = ({ url, onClick }: Props) => {
  return (
    <div className="EditDiv">
      <Link to={url} onClick={onClick}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default EditDiv;
