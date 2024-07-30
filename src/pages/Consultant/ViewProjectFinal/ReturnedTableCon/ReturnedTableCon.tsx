import { Badge, Button, Pagination, Tooltip, message } from "antd";
import { Link } from "react-router-dom";
import { MessageOutlined, SwapOutlined } from "@ant-design/icons";
import MoreConsultant from "../MoreConsultant/MoreConsultant";
import MyPopconfirm from "../../../../Common/Popconfirm/MyPopconfirm";
import { useQuery } from "@tanstack/react-query";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import {
  ResOnDesk,
  getReturnedsCon,
} from "../../../../Services/ProjectService";
import {
  useStorePage,
  dispatchPage,
} from "../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../Store/StorePagination/types";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";
import { calculateDays } from "../../../Admin/OnDeskFinal/AdminViewProjFInal/helper/helperAdminViewP";

interface Props {
  onForwardProject: (id: number) => void;
}

const ReturnedTableCon = ({ onForwardProject }: Props) => {
  const { ReturnedPageCon } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: projects } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.ReturnedCon, ReturnedPageCon],
    queryFn: () =>
      getReturnedsCon(ReturnedPageCon, messageApi).then((res) => res),

    retry: 2,
  });

  const info = "Submit Project to Municipality";

  return (
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
            <th>Date</th>
            <th style={{ width: 100 }}>Current Desk</th>
            <th style={{ width: "60px" }}>Action</th>
            <th style={{ width: 90 }}>
              Forward <MyInfoBtn info={info} />
            </th>
            <th>more</th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects?.data.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.registrationNo}</td>
              {/* <td>{x.rasidNo}</td> */}
              <td>{project.applicantName}</td>
              <td>{project.type}</td>
              <td>
                {project.creationDate ? (
                  <div>
                    {project.creationDate?.substr(0, 10)} &nbsp;&nbsp;(
                    {project.creationDate
                      ? calculateDays(project.creationDate) + " days"
                      : null}
                    )
                  </div>
                ) : null}
              </td>
              <td>
                <span style={{ fontSize: 12 }}>{project.projectStatus2}</span>
              </td>
              <td>
                <div className="ActionRow">
                  {/* <div>
                    <button className="NoStyleBtnSm" onClick={inDevelopment}>
                      View
                    </button>
                  </div> */}
                  <div>
                    <Link
                      to={`/project/view/project/${project.id?.toString()}`}
                    >
                      <Tooltip title="Edit Project">
                        <button
                          className="NoStyleBtnSm"
                          onClick={() => {
                            localStorage.setItem("ProjectType", project.type);
                            localStorage.setItem("isPerma", "true");
                            localStorage.setItem("isNotice", "true");
                            localStorage.setItem("showBothBtns", "true");
                            localStorage.setItem("onlyTechnical", "false");
                          }}
                        >
                          Edit
                        </button>
                      </Tooltip>
                    </Link>
                  </div>
                  <div>
                    <Tooltip title="Add/ View comments">
                      <Badge
                        style={{ backgroundColor: "#52c41a" }}
                        count={project.count ? 1 : null}
                      >
                        <Button
                          disabled={disabled}
                          onClick={() => {
                            dispatchModalCon({
                              type: AcMCon.setViewComments,
                              payload: true,
                            });
                            dispatch({
                              type: Ac.setCurrentPid,
                              payload: project.id,
                            });
                          }}
                        >
                          <MessageOutlined />
                        </Button>
                      </Badge>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Project Transfer Log">
                      <button
                        disabled={disabled}
                        className="NoStyleBtnSm"
                        onClick={() =>
                          dispatch({
                            type: Ac.setprojTransferModal,
                            payload: {
                              currentPid: project.id,
                              projTransferModal: true,
                            },
                          })
                        }
                      >
                        <SwapOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </td>
              <td>
                <MyPopconfirm
                  disabled={disabled}
                  onConfirm={() => onForwardProject(project.id)}
                  button="Forward"
                />
              </td>
              <td>
                <MoreConsultant project={project} />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={ReturnedPageCon + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setReturnedPageCon, payload: page - 1 })
        }
        total={projects?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default ReturnedTableCon;
