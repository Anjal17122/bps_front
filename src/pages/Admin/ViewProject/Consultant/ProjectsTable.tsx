import { Link } from "react-router-dom";
import { ProjectType } from "../../../../Services/CreateProjectService";

interface Props {
  style?: object;
  projects: ProjectType[];
  onViewProject: (id: number) => void;
  // disabled: boolean;
}

const ProjectsTable = ({ style, projects, onViewProject }: Props) => {
  return (
    <div className="MyTableOuter" style={style}>
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th>Application Name</th>
            <th>Project Type</th>
            <th>Date</th>
            <th style={{ width: "20px" }}>View</th>
            <th style={{ width: "20px" }}>Edit</th>
            <th style={{ width: "20px" }}>Delete</th>
            <th style={{ width: "20px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td style={{ width: "20px" }}>{proj.id}</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>{proj.applicationDate.substr(0, 10)}</td>
              <td style={{ width: "20px" }}>
                <button
                  className="NoStyleBtnSm"
                  onClick={() => onViewProject(proj.id)}
                >
                  View Project
                </button>
              </td>
              <td>
                <Link to={`/project/view/project/${proj.id?.toString()}`}>
                  <button className="NoStyleBtnSm">Edit</button>
                </Link>
              </td>
              <td>Test Content</td>
              <td>Test Content</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
