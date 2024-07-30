import { Button, Pagination, Tooltip, message } from "antd";
import {
  OnDeskProjects,
  ResOnDesk,
  sN,
} from "../../../../Services/ProjectService";
import { EyeFilled } from "@ant-design/icons";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";

import "../../../../Assets/scss/MoreMenu.scss";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { useQuery } from "@tanstack/react-query";
import { AcP } from "../../../../Store/StorePagination/types";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import { GETnoticeApprovedCo } from "../../../../Services/ConsultantProjectService";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import MoreConsultant from "../MoreConsultant/MoreConsultant";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";
import { calculateDays } from "../../../Admin/OnDeskFinal/AdminViewProjFInal/helper/helperAdminViewP";

interface Props2 {
  onViewProject: (id: number) => void;
}

const NoticeTableConFinal = ({ onViewProject }: Props2) => {
  const { NoticePageCon } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: projects } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.Notice, NoticePageCon],
    queryFn: () =>
      GETnoticeApprovedCo(NoticePageCon, messageApi).then((res) => res),

    retry: 2,
  });

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th style={{ width: 78 }}>Darta No</th>
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>
              Notice Date <MyInfoBtn info="Notice Published Date" />
            </th>
            <th style={{ width: 78 }}>Notice</th>
            <th style={{ width: "130px" }}>
              <span>Project</span>
            </th>
            <th style={{ width: "100px" }}>Remarks</th>
            <th>more</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects?.data.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.registrationNo}</td>
              <td>{project.applicantName}</td>
              <td>{project.type}</td>
              <td>
                {project.noticePublishedAt ? (
                  <span>
                    {project.noticePublishedAt?.substr(0, 10)} (
                    {project.noticePublishedAt
                      ? calculateDays(project.noticePublishedAt)
                      : null}
                    )
                  </span>
                ) : null}
              </td>
              <td>
                <Tooltip title="Print Notice">
                  {/*{project.chalaniNo && project.patraSankhya ? (*/}
                  {/*  <>*/}
                  {/*    <Link*/}
                  {/*      to={`/noticepdf/${project.id}/${project.chalaniNo}/${*/}
                  {/*        project.patraSankhya*/}
                  {/*      }/${new Date().toJSON().slice(0, 10)}/${*/}
                  {/*        project.creationDate*/}
                  {/*      }`}*/}
                  {/*      target="_blank"*/}
                  {/*      rel="noopener noreferrer"*/}
                  {/*    >*/}
                  {/*      <Button*/}
                  {/*        // size="small"*/}
                  {/*        icon={<DownloadOutlined />}*/}
                  {/*      ></Button>*/}
                  {/*    </Link>*/}
                  {/*  </>*/}
                  {/*) : null}*/}
                </Tooltip>
              </td>
              <td style={{ maxWidth: "130px" }}>
                <Tooltip title="View Project">
                  <button
                    disabled={disabled}
                    className="NoStyleBtnSm"
                    onClick={() => {
                      localStorage.setItem("ProjectType", project.type);
                      localStorage.setItem("isPerma", "");
                      localStorage.setItem("isNotice", "");
                      localStorage.setItem("showBothBtns", "true");
                      localStorage.setItem("onlyTechnical", "");
                      onViewProject(project.id);
                    }}
                  >
                    View
                  </button>
                </Tooltip>
                {/* <Link to={`/project/edit/designfloor/${x.id}/${x.tempId}`}>
                  <Tooltip title="Edit Project">
                    <button
                      className="NoStyleBtnSm"
                      onClick={() => {
                        localStorage.setItem("isPerma", "false");
                        localStorage.setItem("isNotice", "true");
                        localStorage.setItem("showBothBtns", "");
                        localStorage.setItem("onlyTechnical", "true");
                      }}
                    >
                      Edit
                    </button>
                  </Tooltip>
                </Link> */}
              </td>
              {/* <td>
                <Tooltip title="Forward Technical Details to Municipality">
                  <MyPopconfirm
                    disabled={submit}
                    button="Forward"
                    onConfirm={() => forwardTechnicalFn(x.tempId, x.id)}
                  />
                </Tooltip>
              </td> */}
              <td>
                <Tooltip title="View Muchulka Remarks">
                  <Button
                    onClick={() => {
                      dispatchModalCon({
                        type: AcMCon.setviewNoticeRemarks,
                        payload: true,
                      });
                      dispatch({
                        type: Ac.setCurrentPid,
                        payload: project.id,
                      });
                    }}
                    icon={<EyeFilled style={{ color: "rgb(105, 105, 105)" }} />}
                    size="small"
                  ></Button>
                </Tooltip>
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
        current={NoticePageCon + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setNoticePageCon, payload: page - 1 })
        }
        total={projects?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default NoticeTableConFinal;
