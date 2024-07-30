import {
  Button,
  Divider,
  message,
  Pagination,
  Popconfirm,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import useStoreViewProj from "../../../../Store/StoreViewProject/StoreViewProj";
import { useStoreUrl } from "../../../../Store/StoreUrls/StoreUrls";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import { useQuery } from "@tanstack/react-query";
import { getOwnProjects } from "../../../../Services/ConViewProjService/ConViewProjService";
import { OwnProjectGET } from "../../../../Services/CreateProjectService";
import { size } from "../../../../constants/constants";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import { calculateDays } from "../../../Admin/OnDeskFinal/AdminViewProjFInal/helper/helperAdminViewP";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import { AcP } from "../../../../Store/StorePagination/types";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";

interface Props {
  onForwardProject: (id: number) => void;
}

const NotSubmittedTable = ({ onForwardProject }: Props) => {
  const info = "Submit Project to Municipality";

  const { NotSubmittedPage } = useStorePage();
  const { NotSubmittedUrl } = useStoreUrl();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: projects } = useQuery<
    OwnProjectGET,
    { message: string }
  >({
    queryKey: [MyQueriesCon.NotSubmitted, NotSubmittedUrl, NotSubmittedPage],
    queryFn: () =>
      getOwnProjects(
        NotSubmittedUrl + `${NotSubmittedPage}&size=${size}`,
        messageApi
      ).then((res) => res),

    retry: 2,
  });

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Date</th>
            <th style={{ width: "60px" }}>Action</th>
            <th style={{ width: 90 }}>
              Forward <MyInfoBtn info={info} />
            </th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects?.data.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.applicant?.nameEng}</td>
              <td>{project.type}</td>
              <td>
                {project.creationDate ? (
                  <div>
                    {project.creationDate?.substr(0, 10)}{" "}
                    <span
                      style={{ fontSize: 12, color: "rgba(15, 68, 88, 0.712)" }}
                    >
                      (
                      {project.creationDate
                        ? calculateDays(project.creationDate)
                        : null}
                      )
                    </span>
                  </div>
                ) : null}
              </td>
              <td>
                <div style={{ display: "flex" }}>
                  <Link
                    to={
                      project.type === "Storey Addition"
                        ? "/project/create/storey/designfloor/" + project.id
                        : `/project/view/project/${project.id?.toString()}`
                    }
                  >
                    <Tooltip title="Edit Project">
                      <button
                        className="NoStyleBtnSm"
                        onClick={() => {
                          localStorage.setItem("isPerma", "false");
                          localStorage.setItem("ProjectType", project.type);

                          localStorage.setItem("showBothBtns", "true");
                          // localStorage.setItem("isPerma", "false");
                          localStorage.setItem("isNotice", "false");
                          localStorage.setItem("onlyTechnical", "");
                        }}
                      >
                        Edit
                      </button>
                    </Tooltip>
                  </Link>
                  <Divider type="vertical" />
                  {/* <Popconfirm
                    title="Are you sure ?"
                    onConfirm={() => {}}
                    onCancel={() => message.error("Cancelled!")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      disabled={disabled}
                      className="antdNormalBtn"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm> */}
                </div>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure ?"
                  onConfirm={() => onForwardProject(project.id)}
                  onCancel={() => messageApi.error("Cancelled!")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button disabled={disabled} className="antdNormalBtn">
                    Forward
                  </Button>
                </Popconfirm>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={NotSubmittedPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setNotSubmittedPage, payload: page - 1 })
        }
        total={projects?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default NotSubmittedTable;
