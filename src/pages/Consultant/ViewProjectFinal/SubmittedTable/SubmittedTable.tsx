import { Badge, Pagination, Tooltip, message } from "antd";
import {
  MessageOutlined,
  SwapOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { calculateDays } from "../../../Admin/OnDeskFinal/AdminViewProjFInal/helper/helperAdminViewP";
import { useQuery } from "@tanstack/react-query";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import {
  GETsubmittedProjs,
  ResOnDesk,
} from "../../../../Services/ProjectService";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../Store/StorePagination/types";
import MoreConsultant from "../MoreConsultant/MoreConsultant";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";

interface Props {
  onViewProject: (id: number) => void;
}

const SubmittedTable = ({ onViewProject }: Props) => {
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { SubmittedPage } = useStorePage();

  const { isLoading, data: submittedProjs } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.Submitted, SubmittedPage],
    queryFn: () =>
      GETsubmittedProjs(SubmittedPage, messageApi).then((res) => res),

    retry: 2,
  });

  // function onViewProject(id: number): void {
  //   getProject(id.toString(), setSubmit)
  //     .then((res) => {
  //       dispatch({
  //         type: ActionType.getProject,
  //         payload: res.data,
  //       });
  //       setSubmit(false);
  //       localStorage.setItem("adminViewProject", JSON.stringify(res.data));
  //       history("/user/view/project/projectdetails/" + id.toString());
  //     })
  //     .catch(() => setSubmit(false));
  // }

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th style={{ width: 80 }}>Darta No</th>
            {/* <th>Rasid No</th> */}
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Submit Date (days)</th>
            <th style={{ width: "auto" }}>Current Desk</th>
            <th style={{ width: 80 }}>Action</th>
            <th style={{ width: "70px" }}>Project</th>
            <th style={{ width: 70 }}>More</th>
            <th style={{ width: 60 }}>File</th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {submittedProjs?.data.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.registrationNo}</td>
              {/* <td>{x.rasidNo}</td> */}
              <td>{project.applicantName}</td>
              <td>{project.type}</td>
              <td>
                {project.creationDate ? (
                  <div>
                    {project.creationDate?.substr(0, 10)}{" "}
                    <span className="DaySpan">
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
                <span style={{ fontSize: 12 }}>{project.projectStatus2}</span>
              </td>

              <td>
                <div className="ActionRow" style={{ display: "flex" }}>
                  <div>
                    <Badge count={project.count}>
                      <Tooltip title="Show comments from Municipality">
                        <button
                          disabled={disabled}
                          className="commentbutton"
                          onClick={() => {
                            dispatch({
                              type: Ac.setCurrentPid,
                              payload: project.id,
                            });

                            dispatchModalCon({
                              type: AcMCon.setViewComments,
                              payload: true,
                            });
                          }}
                        >
                          <MessageOutlined />
                        </button>
                      </Tooltip>
                    </Badge>
                  </div>
                  <div>
                    <Tooltip title="Project Transfer Log">
                      <button
                        disabled={disabled}
                        className="NoStyleBtnSm"
                        onClick={() => {
                          dispatch({
                            type: Ac.setprojTransferModal,
                            payload: {
                              projTransferModal: true,
                              currentPid: project.id,
                            },
                          });
                        }}
                      >
                        <SwapOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="NoStyleBtnSm"
                  onClick={() => {
                    localStorage.setItem("isPerma", "false");
                    localStorage.setItem("ProjectType", project.type);
                    // localStorage.setItem("isPerma", "false");
                    localStorage.setItem("isNotice", "false");
                    localStorage.setItem("onlyTechnical", "");
                    localStorage.setItem("isPerma", "true");
                    localStorage.setItem("isNotice", "true");
                    localStorage.setItem("showBothBtns", "true");
                    localStorage.setItem("onlyTechnical", "");
                    onViewProject(project.id);
                  }}
                  disabled={disabled}
                >
                  View
                </button>
              </td>
              <td>
                <MoreConsultant project={project} />
              </td>
              <td>
                <button
                  className="NoStyleBtnSm"
                  onClick={() => {
                    dispatchModalCon({
                      type: AcMCon.setuploadAutoCad,
                      payload: true,
                    });
                    dispatch({
                      type: Ac.setCurrentPid,
                      payload: project.id,
                    });
                  }}
                >
                  <UploadOutlined />
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={SubmittedPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setSubmittedPage, payload: page - 1 })
        }
        total={submittedProjs?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default SubmittedTable;
