import React from "react";
import { ProjectEditLogs } from "../../Services/LogsService/LogsService";
import "../../Assets/scss/EditLogs.scss";

interface Props {
  data: ProjectEditLogs[];
  onView: (data: any) => void;
  myclass?: string;
}

const EditLogs = ({ data, onView, myclass = "LogTable" }: Props) => {
  return (
    <table className={myclass} style={{ fontSize: 12, minWidth: 300 }}>
      <thead>
        <tr>
          <th>SN</th>
          <th>Updated Date</th>
          <th>Updated By</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) => (
          <tr key={x.id}>
            <td>{i + 1}</td>
            <td>{x.updatedDate.substr(0, 10)}</td>
            <td>{x.updatedBy.nameEng}</td>
            <td>
              <button className="NoStyleBtnSm" onClick={() => onView(x)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditLogs;
