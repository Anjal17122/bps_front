import React from "react";
import { Tooltip } from "antd";
import { OnDeskProjects } from "../../Services/ProjectService";

interface Props {
  style?: any;
  projects: OnDeskProjects[];
  onViewProject: (id: number) => void;
  submit: boolean;
}

const ApprovedTableAdminOld = ({
  style,
  projects,
  onViewProject,
  submit,
}: Props) => {
  // const [loading, setLoading] = useState(false);
  // const props = {
  //   name: "file",
  //   action: IMAGE_URL,
  //   headers: {
  //     authorization: getToken(),
  //   },
  // };

  // const onUpload = (info: UploadChangeParam<UploadFile<any>>, pid: number) => {
  //   console.log(info);

  //   setLoading(true);
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     const body = {
  //       imageName: info.file.response.message,

  //       projectId: pid,
  //     };
  //     postPlinth(body, setLoading);

  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  return (
    <div className="MyTableOuter" style={style}>
      <table className="MyTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Darta No.</th>
            <th>Rasid No.</th>
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Date</th>
            <th style={{ width: "130px" }}>
              <span>Project</span>
            </th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.registrationNo}</td>
              <td>{x.rasidNo}</td>
              <td>{x.applicantName}</td>
              <td className="ProjectInfo">{x.type}</td>
              <td>
                {x.applicationDate ? x.applicationDate.substr(0, 10) : "null"}
              </td>
              <td style={{ maxWidth: "130px" }}>
                <Tooltip title="View Project">
                  <button
                    disabled={submit}
                    className="NoStyleBtnSm"
                    onClick={() => {
                      localStorage.setItem("isPerma", "true");
                      localStorage.setItem("isNotice", "true");
                      localStorage.setItem("showBothBtns", "true");
                      localStorage.setItem("onlyTechnical", "");
                      onViewProject(x.id);
                    }}
                  >
                    View
                  </button>
                </Tooltip>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedTableAdminOld;
