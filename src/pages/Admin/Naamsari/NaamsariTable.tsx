import { useState } from "react";
import { ProjectTypeFinal } from "../../../Services/ProjectService";
import "../../../Assets/scss/NaamsariTable.scss";

interface Props {
  projects: ProjectTypeFinal[];
  onViewProject: (id: number) => void;
}

const NaamsariTable = ({ projects, onViewProject }: Props) => {
  const [expand, setExpand] = useState("content");
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);
  // const onStartNaamSari = (id: number, lands: Land[]) => {
  //   dispatch({ payload: id.toString(), type: ActionType.setNaamSariPid });
  //   dispatch({ payload: lands, type: ActionType.setNaamsariLands });
  //   dispatch({ payload: true, type: ActionType.setNaamSariModal });
  // };

  const onExpand = (i: number) => {
    setCurrentIndex(i);
    if (expand === "content") {
      setExpand("active");
    } else {
      setExpand("content");
    }
  };

  return (
    <div className="MyTableOuter">
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: "20px" }}>Project</th>

            <th style={{ width: 90 }}>Naam Sari</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, i) => (
            <tr
              key={proj.id}
              className="collapsible"
              onClick={() => onExpand(i)}
            >
              <td>{proj.id}</td>
              <td>{proj.applicant.nameEng}</td>
              <td>{proj.applicant.email}</td>
              <td>
                <button
                  className="NoStyleBtnSm"
                  onClick={() => onViewProject(proj.id)}
                >
                  View
                </button>
              </td>

              <td>
                <button className="NoStyleBtnSm">Start</button>
              </td>
              <td></td>
              {currentIndex === i ?? (
                <div className={"active"}>
                  <td colSpan={7}></td>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NaamsariTable;
