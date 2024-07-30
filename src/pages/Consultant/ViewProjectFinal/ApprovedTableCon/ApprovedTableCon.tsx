import { Button, Divider, message, Pagination, Tooltip } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
// import "../../Assets/scss/PlinthModal.scss";
import { MUCHULKA_PDF, MUCHULKA_DW } from "../../../../Services/Api";
import {
  GETapprovedConFinal,
  ResOnDesk,
} from "../../../../Services/ProjectService";
import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";
import { useQuery } from "@tanstack/react-query";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import MoreConsultant from "../MoreConsultant/MoreConsultant";
import { AcP } from "../../../../Store/StorePagination/types";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";

interface Props {
  onViewProject: (id: number) => void;
}

const ApprovedTableCon = ({ onViewProject }: Props) => {
  const { ApprovedPageCon } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: projects } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.ApprovedCon, ApprovedPageCon],
    queryFn: () =>
      GETapprovedConFinal(ApprovedPageCon, messageApi).then((res) => res),

    retry: 2,
  });

  const onViewPlinthModal = (pid: number) => {
    dispatchModalCon({ type: AcMCon.setplinthModalCon, payload: true });
    dispatch({
      type: Ac.setCurrentPid,
      payload: pid,
    });
  };

  return (
    <>
      <div className="MyTableOuter">
        {contextHolder}
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
            {projects?.data.map((project, index) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.registrationNo}</td>
                {/* <td>{x.rasidNo}</td> */}
                <td>{project.applicantName}</td>
                <td className="ProjectInfo">{project.type}</td>
                <td>
                  {project.chalaniNo && project.patraSankhya ? (
                    <>
                      {/*<Link*/}
                      {/*  to={`/noticepdf/${project.id}/${project.chalaniNo}/${*/}
                      {/*    project.patraSankhya*/}
                      {/*  }/${new Date().toJSON().slice(0, 10)}/${*/}
                      {/*    project.creationDate*/}
                      {/*  }`}*/}
                      {/*  target="_blank"*/}
                      {/*  rel="noopener noreferrer"*/}
                      {/*>*/}
                      {/*  <Button icon={<DownloadOutlined />}></Button>*/}
                      {/*</Link>*/}
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
                      disabled={disabled}
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
                    loading={disabled}
                    onClick={() => {
                      onViewPlinthModal(project.id);
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
        {isLoading ? <MySkeleton /> : null}
        <Pagination
          current={ApprovedPageCon + 1}
          disabled={disabled}
          onChange={(page) =>
            dispatchPage({ type: AcP.setApprovedPageCon, payload: page - 1 })
          }
          total={projects?.total}
          showSizeChanger={false}
          style={{ background: "white", padding: 10 }}
        />
      </div>
    </>
  );
};

export default ApprovedTableCon;
