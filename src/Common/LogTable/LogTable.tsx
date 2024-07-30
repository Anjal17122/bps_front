import React from "react";
import { PTlog } from "../../Services/ProjectService";
import "../../Assets/scss/LogTable.scss";

interface Props {
  data: PTlog[];
}

const LogTable = ({ data }: Props) => {
  return (
    <div>
      <table className="LogTable">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            {/* <th>Applicant</th> */}
            {/* <th>Project Type</th> */}
            <th>Date</th>
            <th>Transfer From</th>
            <th>Transfer To</th>
            <th>Transfer By</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x?.id}>
              {/* <td>{x?.id}</td>
              <td>{x?.project?.applicant?.nameEng}</td>
              <td>{x?.project?.type}</td> */}
              <td>{x?.transferDate?.substr(0, 10)}</td>
              <td>{x?.from}</td>
              <td>{x?.to}</td>
              <td>{x?.transferBy?.nameEng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
