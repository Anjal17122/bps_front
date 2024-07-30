import {
  EditOutlined,
  EyeOutlined,
  SwapOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Divider, Pagination, Popover, Tooltip, message } from "antd";
import { ResOnDesk } from "../../../../../Services/ProjectService";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { ApproveStatus } from "./ApproveStatus";
import { useQuery } from "@tanstack/react-query";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../../Store/StorePagination/types";
import ApproveRow from "./ApproveRow";
import SendProjectRow from "./SendProjectRow";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import More from "../More/More";
import { GETonDeskAll } from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { useStoreUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import { size } from "../../../../../constants/constants";
import { Link } from "react-router-dom";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import { calculateDays } from "../helper/helperAdminViewP";
import NoticeIcon from "../../../../../Assets/Images/noticeIcon.png";
import { AcModal } from "../../../../../Store/StoreModal/types";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { isNagarjun } from "../../../../../constants/CommonFunctions";
import MyInfoBtn from "../../../../../Common/InfoIcon/MyInfoBtn";

type Props = {
  onViewProject: (id: number) => void;
};

const OnDeskTableFinal = ({ onViewProject }: Props) => {
  const { OnDeskPage } = useStorePage();
  const { OnDeskUrl } = useStoreUrl();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: onDesk } = useQuery<ResOnDesk, { message: string }>({
    queryKey: [MyQueries.OnDesk, OnDeskUrl, OnDeskPage],
    queryFn: () =>
      GETonDeskAll(OnDeskUrl + `${OnDeskPage}&size=${size}`, messageApi).then(
        (res) => res
      ),

    retry: 2,
  });

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Id - Darta No.</th>
            <th>Applicant Name </th>
            <th>Project Type / Sub. Date</th>
            <th style={{ width: 120 }}>Drawings Sign</th>
            <th>Project Status</th>
            <th style={{ width: 80, textAlign: "center" }}>Approve</th>
            <th style={{ width: "20px" }}>Project</th>
            {localStorage.getItem("role") === "ROLE_Napi" ? (
              <th>Napi File</th>
            ) : null}
            {localStorage.getItem("role") === "ROLE_Ward_Technical" ? (
              <th>Ward File</th>
            ) : null}
            {localStorage.getItem("role") === "ROLE_Technical_Department" ? (
              <th>Certificate</th>
            ) : null}
            {localStorage.getItem("role") === "ROLE_Revenue" ? (
              <th>राजस्व</th>
            ) : null}
            {/* <th style={{ width: "20px" }}>
              {localStorage.getItem("role") === "ROLE_Ward" ? "Notice" : "File"}
            </th> */}
            <th style={{ width: "20px" }}>Send</th>
            <th style={{ width: "20px" }}>Approved By</th>
            {isNagarjun() && (
              <th style={{ width: 110 }}>
                Certificate &nbsp;
                <MyInfoBtn info="OnDesk View Plinth and Super Structure Report" />
              </th>
            )}
            <th style={{ width: "20px" }}>more</th>
          </tr>
        </thead>
        <tbody>
          {onDesk?.data.map((project, index) => (
            <tr key={project.id}>
              {/* Id - Darta No */}
              <td style={{ width: "20px" }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>
              <td>{project.applicantName}</td>
              <td>
                {project.type} <br />
                <span style={{ fontSize: 11 }}>
                  {project.creationDate ? (
                    <span>
                      {project.creationDate?.substring(0, 10)}{" "}
                      <span style={{ color: "rgba(15, 69, 88, 0.481)" }}>
                        (
                        {project.creationDate
                          ? calculateDays(project.creationDate)
                          : null}
                        )
                      </span>
                    </span>
                  ) : null}
                </span>
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
              <td style={{ fontSize: 12 }}>
                {project.projectStatus1 === "UPLOADMUCHULKA"
                  ? "MUCHULKA UPLOADED"
                  : "PENDING"}
              </td>
              {/* Approve */}
              <td>
                <ApproveRow project={project} />
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="View Project">
                    <Button
                      size="small"
                      type="link"
                      disabled={disabled}
                      onClick={() => onViewProject(project.id)}
                    >
                      View
                    </Button>
                  </Tooltip>

                  <Divider type="vertical"></Divider>
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
              {localStorage.getItem("role") === "ROLE_Napi" ? (
                <td>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setNapiOrTech,
                        payload: {
                          currentPid: project.id,
                          napiModal: true,
                          napiOrTech: "napi",
                        },
                      });
                    }}
                  ></Button>
                </td>
              ) : null}
              {localStorage.getItem("role") === "ROLE_Ward" ? (
                <td>
                  <Button
                    type="link"
                    // icon={<UploadOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setNoticePubModal,
                        payload: {
                          currentPid: project.id,
                          noticePubModal: true,
                          projCreationDate: project.creationDate,
                        },
                      });
                    }}
                  >
                    <img src={NoticeIcon} width={20} height={"auto"} alt="" />
                  </Button>
                </td>
              ) : null}
              {localStorage.getItem("role") === "ROLE_Ward_Technical" ? (
                <td>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setNapiOrTech,
                        payload: {
                          currentPid: project.id,
                          napiModal: true,
                          napiOrTech: "ward",
                        },
                      });
                    }}
                  ></Button>
                </td>
              ) : null}
              {/* {localStorage.getItem("role") === "ROLE_Ward" ? (
                <td>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setNapiOrTech,
                        payload: {
                          currentPid: project.id,
                          napiModal: true,
                          napiOrTech: "ward",
                        },
                      });
                    }}
                  ></Button>
                </td>
              ) : null} */}
              {localStorage.getItem("role") === "ROLE_Technical_Department" ? (
                <td>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setNapiOrTech,
                        payload: {
                          currentPid: project.id,
                          napiModal: true,
                          napiOrTech: "tech",
                        },
                      });
                    }}
                  ></Button>
                </td>
              ) : null}
              {localStorage.getItem("role") === "ROLE_Revenue" ? (
                <td>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => {
                      dispatch({
                        type: Ac.setRevenueModal,
                        payload: {
                          currentPid: project.id,
                          revenueModal: true,
                        },
                      });
                    }}
                  ></Button>
                </td>
              ) : null}
              <td>
                <SendProjectRow index={index} projectId={project.id} />
              </td>
              <td style={{ width: 100 }}>
                <Popover
                  trigger={["click"]}
                  placement="top"
                  content={<ApproveStatus x={project} />}
                >
                  <Button size="small" type="link">
                    View
                  </Button>
                </Popover>
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
                <More project={project} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={OnDeskPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setOnDeskPage, payload: page - 1 })
        }
        total={onDesk?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default OnDeskTableFinal;
