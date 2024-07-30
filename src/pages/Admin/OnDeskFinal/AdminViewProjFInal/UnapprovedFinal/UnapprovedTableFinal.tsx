import { useQuery } from "@tanstack/react-query";
import { Tooltip, Pagination, message, Popover, Button } from "antd";
import { ResOnDesk } from "../../../../../Services/ProjectService";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import {
  dispatch,
  useStoreViewProj,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { GETonDeskAll } from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import { useStoreUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import { size } from "../../../../../constants/constants";
import { calculateDays } from "../helper/helperAdminViewP";
import { EditOutlined, SwapOutlined } from "@ant-design/icons";
import { ProjectType } from "../../../../Consultant/ProjectCreate/SelectProjectType";
import { AcP } from "../../../../../Store/StorePagination/types";
import More from "../More/More";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import SendProjectRow from "../OnDeskFinal/SendProjectRow";
import { ApproveStatus } from "../OnDeskFinal/ApproveStatus";
import { Link } from "react-router-dom";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { isNagarjun } from "../../../../../constants/CommonFunctions";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";

type Props = {
  onViewProject: (id: number) => void;
};

const UnapprovedTableFinal = ({ onViewProject }: Props) => {
  const { UnapprovedPage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { UnapprovedUrl } = useStoreUrl();

  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, data: unapproved } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueries.Unapproved, UnapprovedUrl, UnapprovedPage],
    queryFn: () =>
      GETonDeskAll(
        UnapprovedUrl + `${UnapprovedPage}&size=${size}`,
        messageApi
      ).then((res) => res),

    retry: 2,
  });
  function onViewLog() {
    alert("onViewLog");
  }

  const adminOrEng =
    localStorage.getItem("role") === "ROLE_Admin" ||
    localStorage.getItem("role") === "ROLE_BuildingR_LandM" ||
    localStorage.getItem("role") === "ROLE_Engineer";
  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Id - Darta No.</th>
            <th>Applicant Name</th>
            <th>Current Desk</th>
            <th>Submitted Date</th>
            {localStorage.getItem("role") === "ROLE_Revenue" ||
            localStorage.getItem("role") === "ROLE_Registration" ? null : (
              <th style={{ width: "100px" }}>Action</th>
            )}
            {/* <th style={{ width: "20px" }}>Project</th> */}
            <th style={{ width: "20px" }}>Approved By</th>
            <th style={{ width: "20px" }}>more</th>
          </tr>
        </thead>
        <tbody>
          {unapproved?.data.map((project, index) => (
            <tr key={project.id}>
              <td style={{ width: "20px" }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>
              <td style={{ lineHeight: "16px" }}>
                {project.applicantName} <br />
                <span
                  style={{ fontSize: 12, color: "rgba(15, 69, 88, 0.731)" }}
                >
                  ( {project.type} )
                </span>
              </td>
              {/* current desk */}
              <td>
                {project.projectStatus2} &nbsp;{" "}
                <span style={{ color: "red" }}>
                  {project.editingStatus === "ENABLED" ? "(returned)" : null}
                </span>
                {adminOrEng ? (
                  <Popover
                    content={
                      <SendProjectRow index={index} projectId={project.id} />
                    }
                    title="Send Project"
                    trigger="click"
                  >
                    <Button type="link">
                      <EditOutlined />
                    </Button>
                  </Popover>
                ) : null}
              </td>
              <td style={{ fontSize: 13, lineHeight: "16px" }}>
                {project.creationDate?.substring(0, 10)} <br />
                <span
                  style={{ fontSize: 12, color: "rgba(15, 69, 88, 0.731)" }}
                >
                  (
                  {project.creationDate
                    ? calculateDays(project.creationDate) + " days"
                    : null}
                  )
                </span>
              </td>

              {/* {localStorage.getItem("role") === "ROLE_Revenue" ||
                  "ROLE_Registration" ? null : (
                    <td>
                      <MyPopconfirm
                        disabled={disabled}
                        onConfirm={() =>
                          approveByOne(project.id, index, setdisabled)
                        }
                        button="Approve"
                      />
                    </td>
                  )} */}
              <td>
                <div style={{ display: "flex" }}>
                  <Tooltip title="View Project">
                    <button
                      disabled={disabled}
                      className="NoStyleBtnSm"
                      onClick={() => {
                        // localStorage.setItem("isPerma", "true");
                        // localStorage.setItem("isNotice", "true");
                        // localStorage.setItem("showBothBtns", "true");
                        // localStorage.setItem("onlyTechnical", "false");
                        if (project.type === ProjectType.e) {
                          localStorage.setItem("ProjectType", ProjectType.e);
                        }
                        onViewProject(project.id);
                      }}
                    >
                      View
                    </button>
                  </Tooltip>
                  <Tooltip title="Project Transfer Log">
                    <Button
                      type="link"
                      disabled={disabled}
                      onClick={() =>
                        dispatch({
                          type: Ac.setprojTransferModal,
                          payload: {
                            projTransferModal: true,
                            currentPid: project.id,
                          },
                        })
                      }
                    >
                      <SwapOutlined />
                    </Button>
                  </Tooltip>
                </div>
              </td>

              <td style={{ width: 150 }}>
                <Popover
                  trigger={["click"]}
                  placement="top"
                  content={<ApproveStatus x={project} />}
                >
                  <Button size="small" type="link">
                    View
                  </Button>
                </Popover>
                {/* {project.projectStatus1 === "APPROVED" ? (
                  <div>
                    All Approved{" "}
                    <CheckCircleFilled style={{ color: "#52c41a" }} />
                  </div>
                ) : (
                  <div className="AppDepart">
                    <Tooltip title="Registration">
                      <div className="insideDiv">
                        <span>Reg </span>
                        {project.registration ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Engineer">
                      <div className="insideDiv">
                        <span>Eng </span>
                        {project.engineer ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Technical Committee">
                      <div className="insideDiv">
                        <span>Tech </span>
                        {project.technical ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Executive">
                      <div className="insideDiv">
                        <span>Exec </span>
                        {project.executive ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Ward">
                      <div className="insideDiv">
                        <span>Ward </span>
                        {project.ward ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Revenue">
                      <div className="insideDiv">
                        <span>Rev</span>
                        {project.revenue ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip title="Napi">
                      <div className="insideDiv">
                        <span>Napi</span>
                        {project.napi ? (
                          <CheckCircleFilled style={{ color: "#52c41a" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "grey" }} />
                        )}
                      </div>
                    </Tooltip>
                  </div>
                )} */}
              </td>
              <td style={{ fontSize: 13 }}>
                <Link
                  to={"/view/drawings/sign/" + project.id}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Button
                    style={{
                      color: "#F4801A",
                      backgroundColor: "#fef1e7",
                      paddingLeft: 10,
                    }}
                  >
                    <EditOutlined style={{ color: "#F4801A" }} /> Sign
                  </Button>
                </Link>
              </td>
              {isNagarjun() ? (
                <td>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatchModal({
                        type: AcModal.setApprovedPlinthModal,
                        payload: true,
                      });
                      dispatch({
                        type: Ac.setPlinthData,
                        payload: {
                          currentPid: project.id,
                          plinthData: {
                            buildingPurpose: project.buildingPurpose.name,
                            projectType: project.type,
                          },
                          applicantName: project.applicantName ?? "na",
                        },
                      });
                    }}
                  >
                    प्रमाण-पत्र
                  </button>
                </td>
              ) : null}

              <td>
                <More project={project} type="Unapproved" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={UnapprovedPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setUnapprovedPage, payload: page - 1 })
        }
        total={unapproved?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default UnapprovedTableFinal;
