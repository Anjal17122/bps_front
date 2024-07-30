import { Button, Divider, message, Tag, Tooltip } from "antd";
import { useState } from "react";
import { EyeTwoTone } from "@ant-design/icons";
import MoreConsultant from "../../ProjectActionsCon/MoreDropdown/MoreConsultant";
// import "../../Assets/scss/PlinthModal.scss";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { MUCHULKA_PDF, MUCHULKA_DW } from "../../../../Services/Api";
import { GETPlinthDatas } from "../../../../Services/PlinthService";
import { OnDeskProjects, Plinth } from "../../../../Services/ProjectService";
import ConPlinthModal from "../../ApprovedTab/PlinthForm/ConPlinthModal";
import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";

interface Props {
  style?: any;
  projects: OnDeskProjects[];
  onViewProject: (id: number) => void;
}

const ConsultantApprovedTable = ({ style, projects, onViewProject }: Props) => {
  const [pid, setPid] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [plinthdata, setPlinthdata] = useState<Plinth>();
  const [superstData, setSuperstData] = useState<Plinth>();
  const [submitting, setSubmitting] = useState(false);
  // const [currentPlinth, setCurrentPlinth] = useState<Plinth | null>();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onViewReport = (
    pid: number,
    plinth: Plinth | undefined,
    superst: Plinth | undefined
  ) => {
    setOpenModal(true);
    setPid(pid);
    setPlinthdata(plinth);
    setSuperstData(superst);
    localStorage.setItem("plinth", JSON.stringify(plinth));
    localStorage.setItem("superst", JSON.stringify(superst));
  };

  // eslint-disable-next-line
  const getStatus = (checked: boolean, text: "P" | "S") => (
    <Tag
      icon={checked ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
      color={checked ? "success" : "error"}
    >
      {text}
    </Tag>
  );

  return (
    <>
      <ConPlinthModal
        superstData={superstData}
        plinthData={plinthdata}
        onClose={onCloseModal}
        isVisible={openModal}
        pid={pid}
      />
      <div className="MyTableOuter" style={style}>
        <table className="MyTable">
          <thead>
            <tr>
              <th style={{ width: "20px" }}>ID</th>
              <th>Darta No</th>
              {/* <th>Rasid No</th> */}
              <th>Applicant Name</th>
              <th>Project Type</th>
              <th>Notice/Muchulka</th>
              <th>Date</th>
              {/* <th style={{ width: "150px" }}>Report Status</th> */}
              <th>Project</th>

              <th style={{ width: "150px" }}>Report</th>
              <th>more</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.registrationNo}</td>
                {/* <td>{x.rasidNo}</td> */}
                <td>{project.applicantName}</td>
                <td className="ProjectInfo">{project.type}</td>
                <td>
                  {project.chalaniNo && project.patraSankhya ? (
                    <>
                      {/* <Link
                        to={`/noticepdf/${project.id}/${project.chalaniNo}/${
                          project.patraSankhya
                        }/${new Date().toJSON().slice(0, 10)}/${
                          project.creationDate
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button icon={<DownloadOutlined />}></Button>
                      </Link> */}
                    </>
                  ) : (
                    <span>No Notice</span>
                  )}
                  <Divider type="vertical"></Divider>
                  <a
                    href={
                      project.muchulka && checkIfPDF(project.muchulka)
                        ? MUCHULKA_PDF
                        : MUCHULKA_DW + project.muchulka
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button
                      type="primary"
                      ghost
                      icon={
                        <EyeTwoTone style={{ color: "rgb(105, 105, 105)" }} />
                      }
                      size="small"
                    >
                      M
                    </Button>
                  </a>
                </td>
                <td>
                  {project.creationDate
                    ? project.creationDate.substr(0, 10)
                    : "null"}
                </td>
                {/* <td>
                  {x.plinth?.status === "VERIFIED"
                    ? getStatus(true, "P")
                    : getStatus(false, "P")}{" "}
                  {x.superStructure?.status === "VERIFIED"
                    ? getStatus(true, "S")
                    : getStatus(false, "S")}
                </td> */}
                <td>
                  <Tooltip title="View Project">
                    <button
                      disabled={submitting}
                      className="NoStyleBtnSm"
                      onClick={() => {
                        localStorage.setItem("ProjectType", project.type);
                        onViewProject(project.id);
                      }}
                    >
                      View
                    </button>
                  </Tooltip>
                </td>
                <td>
                  <Button
                    size="small"
                    loading={submitting}
                    onClick={() => {
                      GETPlinthDatas(project.id, setSubmitting).then((res) => {
                        onViewReport(
                          project.id,
                          res.data.plinth ? res.data.plinth : undefined,
                          res.data.superStructure
                            ? res.data.superStructure
                            : undefined
                        );
                      });
                    }}
                  >
                    Report
                  </Button>
                </td>
                <td>
                  <MoreConsultant project={project} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const inDevelopment = () => {
  message.warn("Feature:  In Development");
};

export default ConsultantApprovedTable;
