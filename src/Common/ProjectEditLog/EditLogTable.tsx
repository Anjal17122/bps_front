import React from "react";
import { CommentType } from "../../Services/CommentService";
import "../../Assets/scss/LogTable.scss";

interface Props {
  data: CommentType[];
}

const EditLogTable = ({ data }: Props) => {
  return (
    <div>
      <table className="LogTable" style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>On Section</th>
            <th>Comment</th>
            <th>Comment by</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x, i) => (
            <tr key={x?.id}>
              <td>{i + 1}</td>
              <td>{x.commentDate.substr(0, 10)}</td>
              <td>{x.type}</td>
              <td>{x.comment}</td>
              <td>{x.commentBY.nameEng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditLogTable;
