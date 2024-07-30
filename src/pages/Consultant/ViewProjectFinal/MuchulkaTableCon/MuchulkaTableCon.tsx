import { Button, Divider, Pagination, Tooltip, message } from "antd";
import { ResOnDesk } from "../../../../Services/ProjectService";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import { MUCHULKA_DW, MUCHULKA_PDF } from "../../../../Services/Api";
import { EyeTwoTone } from "@ant-design/icons";
import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";
import MoreConsultant from "../MoreConsultant/MoreConsultant";
import { useQuery } from "@tanstack/react-query";
import { GETMuchulkaCo } from "../../../../Services/ConsultantProjectService";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import useStoreViewProj from "../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import { AcP } from "../../../../Store/StorePagination/types";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";
import { calculateDays } from "../../../Admin/OnDeskFinal/AdminViewProjFInal/helper/helperAdminViewP";
// import { calculateDays } from "../../../Admin/OnDeskTable";
// import MoreConsultant from "../../../../Common/SearchTable/MoreConsultant";
// import { checkIfPDF } from "../../Project/LandInfo/LandCard";

interface Props {
  onViewProject: (id: number) => void;
}

const MuchulkaTableCon = ({ onViewProject }: Props) => {
  const { MuchulkaPageCon } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: projects } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.MuchulkaCon, MuchulkaPageCon],
    queryFn: () =>
      GETMuchulkaCo(MuchulkaPageCon, messageApi).then((res) => res),

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
            <th style={{ width: 120 }}>
              Notice Date <MyInfoBtn info="Notice Published Date" />
            </th>
            <th style={{ width: "130px" }}>
              <span>Project</span>
            </th>
            <th>Notice/Muchulka</th>
            <th>more</th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects?.data?.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.registrationNo}</td>
              <td>{project.applicantName}</td>
              <td>{project.type}</td>
              <td>
                {project.noticePublishedAt ? (
                  <span>
                    {project.noticePublishedAt?.substr(0, 10)} <br /> (
                    {project.noticePublishedAt
                      ? calculateDays(project.noticePublishedAt) + " days"
                      : null}
                    ){" "}
                    {calculateDays(project.noticePublishedAt) > 15 ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                  </span>
                ) : null}
              </td>
              {/* <td>{x.creationDate ? x.creationDate.substr(0, 10) : "null"}</td> */}
              <td style={{ maxWidth: "130px" }}>
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
                {/*      <Button icon={<DownloadOutlined />}></Button>*/}
                {/*    </Link>*/}
                {/*    <Divider type="vertical"></Divider>*/}
                {/*  </>*/}
                {/*) : (*/}
                {/*  <span>No Notice</span>*/}
                {/*)}*/}
                <Divider type="vertical"></Divider>
                <a
                  href={
                    (checkIfPDF(project?.muchulka || "")
                      ? MUCHULKA_PDF
                      : MUCHULKA_DW) + project.muchulka
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
                <MoreConsultant project={project} />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={MuchulkaPageCon + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setMuchulkaPageCon, payload: page - 1 })
        }
        total={projects?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default MuchulkaTableCon;
