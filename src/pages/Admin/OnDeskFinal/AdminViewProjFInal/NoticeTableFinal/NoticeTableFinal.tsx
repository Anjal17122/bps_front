import { useQuery } from "@tanstack/react-query";
import { GETonDeskAll } from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import { ResOnDesk } from "../../../../../Services/ProjectService";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import { useStoreUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { size } from "../../../../../constants/constants";
import MyInfoBtn from "../../../../../Common/InfoIcon/MyInfoBtn";
import { Button, Divider, Pagination, Tooltip, message } from "antd";
import { calculateDays } from "../helper/helperAdminViewP";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import More from "../More/More";
import { AcP } from "../../../../../Store/StorePagination/types";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import { Link } from "react-router-dom";

type Props = {
  onViewProject: (id: number) => void;
};

const NoticeTableFinal = ({ onViewProject }: Props) => {
  const { NoticePage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { NoticeUrl } = useStoreUrl();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: notices } = useQuery<ResOnDesk, { message: string }>(
    {
      queryKey: [MyQueries.Notice, NoticeUrl, NoticePage],
      queryFn: () =>
        GETonDeskAll(NoticeUrl + `${NoticePage}&size=${size}`, messageApi).then(
          (res) => res
        ),

      retry: 2,
    }
  );
  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Id - Darta No.</th>
            <th>Applicant Name</th>
            {/* <th style={{ width: 120 }}>Sign Muchulka</th> */}
            <th style={{ width: 100 }}>
              <span>Project</span>
            </th>
            <th style={{ width: 130 }}>Notice</th>
            {/* change this */}
            <th style={{ width: 140 }}>
              Notice Date <MyInfoBtn info="Notice Published Date (in Days)" />
            </th>
            <th>Muchulka</th>
            <th>more</th>
          </tr>
        </thead>
        <tbody>
          {notices?.data.map((project) => (
            <tr key={project.id}>
              <td style={{ width: "20px" }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>
              <td>
                {project.applicantName}
                <br />
                {project.type}
              </td>
              {/* <td>
                <Tooltip title="मुचुल्का सईन गर्नुहोस">
                  <Link
                    to={"/admin/sign/muchulka/" + project.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      icon={<EditOutlined style={{ color: "#d946ef" }} />}
                      style={{
                        backgroundColor: "#f5d0fe",
                        border: "1px solid #e879f9",
                      }}
                      size="small"
                    >
                      M
                    </Button>
                  </Link>
                </Tooltip>
                <Divider type="vertical" />

                <Tooltip title="सर्जिमिन मुचुल्का सईन गर्नुहोस">
                  <Link
                    to={"/admin/sign/sarjamin/" + project.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      icon={<EditOutlined style={{ color: "#22c55e" }} />}
                      style={{
                        backgroundColor: "#bbf7d0",
                        border: "1px solid #22c55e",
                      }}
                      size="small"
                    >
                      S
                    </Button>
                  </Link>
                </Tooltip>
              </td> */}
              <td style={{ maxWidth: "130px" }}>
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
              </td>

              <td>
                <Tooltip title="Upload Notice">
                  <Button
                    onClick={() => {
                      dispatchModal({
                        type: AcModal.setMuchulkaNoticeModal,
                        payload: true,
                      });
                      dispatch({
                        type: Ac.setCurrentPid,
                        payload: project.id,
                      });
                    }}
                    disabled={disabled}
                    icon={<UploadOutlined style={{ color: "#fba834" }} />}
                    style={{
                      backgroundColor: "hsla(35, 96%, 59%, 0.171)",
                      border: "1px solid #fba834",
                    }}
                    size="small"
                  ></Button>
                </Tooltip>
                <Divider type="vertical" />
              </td>
              <td style={{ fontSize: 13 }}>
                {project.noticePublishedAt ? (
                  <span style={{ fontSize: 13 }}>
                    {project.noticePublishedAt?.substr(0, 10)}{" "}
                    <span
                      style={{ fontSize: 11, color: "rgba(15, 68, 88, 0.512)" }}
                    >
                      (
                      {project.noticePublishedAt
                        ? calculateDays(project.noticePublishedAt)
                        : null}
                      )
                    </span>
                  </span>
                ) : null}
              </td>

              <td>
                <Tooltip title="Add Muchulka">
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      dispatch({
                        type: Ac.setCurrentPid,
                        payload: project.id,
                      });
                      dispatchModal({
                        type: AcModal.setNoticeMuchulkaRemarks,
                        payload: true,
                      });
                    }}
                  >
                    मुचुल्का
                  </Button>
                </Tooltip>
              </td>
              <td>
                <More type="Notice" project={project} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={NoticePage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setNoticePage, payload: page - 1 })
        }
        total={notices?.total ?? 100}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default NoticeTableFinal;
