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
import { ApproveStatus } from "../OnDeskFinal/ApproveStatus";
import { useQuery } from "@tanstack/react-query";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../../Store/StorePagination/types";
import ApproveRow from "../OnDeskFinal/ApproveRow";
import SendProjectRow from "../OnDeskFinal/SendProjectRow";
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

const AllTableFinal = ({ onViewProject }: Props) => {
  const { AllPage } = useStorePage();
  const { AllUrl } = useStoreUrl();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: onDesk } = useQuery<ResOnDesk, { message: string }>({
    queryKey: [MyQueries.AllPage, AllUrl, AllPage],
    queryFn: () =>
      GETonDeskAll(AllUrl + `${AllPage}&size=${size}`, messageApi).then(
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
            <th>Current Desk</th>
            <th>Project Status</th>
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
              <td>{project.projectStatus2}</td>
              <td style={{ fontSize: 12 }}>
                {project.projectStatus1 === "UPLOADMUCHULKA"
                  ? "MUCHULKA UPLOADED"
                  : "PENDING"}
              </td>
              {/* Approve */}

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
                </div>
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
        current={AllPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setAllPage, payload: page - 1 })
        }
        total={onDesk?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default AllTableFinal;
