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
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Tooltip, Button, Divider, Pagination, message } from "antd";
import { MUCHULKA_PDF, MUCHULKA_DW } from "../../../../../Services/Api";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";
import { AcP } from "../../../../../Store/StorePagination/types";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import More from "../More/More";

type Props = {
  onViewProject: (id: number) => void;
};

const MuchulkaTableFinal = ({ onViewProject }: Props) => {
  const { MuchulkaPage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { MuchulkaUrl } = useStoreUrl();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: muchulkas } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueries.Muchulka, MuchulkaUrl, MuchulkaPage],
    queryFn: () =>
      GETonDeskAll(
        MuchulkaUrl + `${MuchulkaPage}&size=${size}`,
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
            <th style={{ width: 110 }}>Id - Darta No.</th>
            {/* <th>Rasid No</th> */}
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Date</th>
            <th style={{ width: "130px" }}>
              <span>Project</span>
            </th>
            <th style={{ width: 80 }}>Notice</th>
            <th>Muchulka </th>
            <th style={{ width: 80 }}>Notice/Muchulka</th>
            {/* <th>Approve</th> */}
            <th style={{ width: "100px" }}>More</th>
            <th style={{ width: "100px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {muchulkas?.data.map((project) => (
            <tr key={project.id}>
              <td style={{ width: 110 }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>

              {/* <td>{x.rasidNo}</td> */}
              <td>{project.applicantName}</td>
              <td className="ProjectInfo">{project.type}</td>
              <td>
                {project.creationDate
                  ? project.creationDate.substr(0, 10)
                  : "null"}
              </td>
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
                      dispatch({
                        type: Ac.setIsMuchulka,
                        payload:
                          project.projectStatus1 === "UPLOADMUCHULKA"
                            ? true
                            : false,
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
                <>
                  <Tooltip title="View Notice">
                    <Button
                      onClick={() => {
                        dispatch({
                          type: Ac.setCurrentPid,
                          payload: project.id,
                        });
                        dispatchModal({
                          type: AcModal.setMuchulkaViewNotice,
                          payload: true,
                        });
                        // GETnoticePublish(project.id)
                        //   .then((res) => {
                        //     setcurrentID(project.id);
                        //     setNoticePublish(res.data);
                        //   })
                        //   .catch(() => setModalOpen(false));
                      }}
                      icon={<EyeOutlined style={{ color: "#fba834" }} />}
                      style={{
                        backgroundColor: "hsla(35, 96%, 59%, 0.171)",
                        border: "1px solid #fba834",
                      }}
                      size="small"
                    ></Button>
                  </Tooltip>
                </>

                <Divider type="vertical"></Divider>
                <Tooltip title="View Muchulka">
                  <a
                    href={
                      checkIfPDF(project?.muchulka || "")
                        ? MUCHULKA_PDF + project?.muchulka
                        : MUCHULKA_DW + project?.muchulka
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button
                      type="primary"
                      ghost
                      icon={
                        <EyeOutlined style={{ color: "rgb(105, 105, 105)" }} />
                      }
                      size="small"
                    >
                      M
                    </Button>
                  </a>
                </Tooltip>
              </td>
              {/* <td>
                <Tooltip title="Approve Technical">
                  <button
                    disabled={submit}
                    className="NoStyleBtnSm"
                    onClick={() => onApproveTechnical(x.id)}
                  >
                    Approve
                  </button>
                </Tooltip>
              </td> */}
              <td>
                <More type="Notice" project={project} />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={MuchulkaPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setMuchulkaPage, payload: page - 1 })
        }
        total={muchulkas?.total ?? 100}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default MuchulkaTableFinal;
