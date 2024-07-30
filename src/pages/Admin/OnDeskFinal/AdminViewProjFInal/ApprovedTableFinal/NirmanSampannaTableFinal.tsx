import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GETonDeskAll,
  changeApprovedStatus,
} from "../../../../../Services/AdminViewProjService/AdminViewProjService";
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
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip, Button, Divider, Pagination, message, Cascader } from "antd";
import { MUCHULKA_PDF, MUCHULKA_DW } from "../../../../../Services/Api";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { AcP } from "../../../../../Store/StorePagination/types";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import { Link } from "react-router-dom";
import More from "../More/More";

type Props = {
  onViewProject: (id: number) => void;
};

const NirmanSampannaTableFinal = ({ onViewProject }: Props) => {
  const { NirmanSampannaPage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { NirmanSampannaUrl } = useStoreUrl();
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();

  const { isLoading, data: approved } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueries.NirmanSampanna, NirmanSampannaUrl, NirmanSampannaPage],
    queryFn: () =>
      GETonDeskAll(
        NirmanSampannaUrl + `${NirmanSampannaPage}&size=${size}`,
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
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th style={{ width: 120 }}>Drawings Sign</th>
            <th>Date</th>
            <th style={{ width: 110 }}>
              Certificate &nbsp;
              <MyInfoBtn info="View Plinth and Super Structure Report" />
            </th>
            <th>Project</th>
            <th style={{ width: 140 }}>Notice/Muchulka</th>
            <th style={{ width: 120 }}>Change Status</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {approved?.data.map((project) => (
            <tr key={project?.id}>
              <td style={{ width: "20px" }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>
              {/* <td>{x.rasidNo}</td> */}
              <td>{project?.applicantName}</td>
              <td className="ProjectInfo">{project?.type}</td>
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
              <td>
                {project?.creationDate
                  ? project?.creationDate.substring(0, 10)
                  : "null"}
              </td>
              {/* <td>
                  {x.plinth ? submittedP : notsubmittedP}
                  {x.superStructure ? submittedS : notSubmittedS}
                </td> */}
              <td style={{ width: "50px" }} className="PaddingTableRow">
                {project.type === "" ? (
                  <div>Already Build Building</div>
                ) : (
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
                )}
              </td>
              <td>
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
                <Divider type="vertical"></Divider>
                {project.muchulka ? (
                  <a
                    href={
                      checkIfPDF(project?.muchulka || "")
                        ? MUCHULKA_PDF + project.muchulka
                        : MUCHULKA_DW + project.muchulka
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
                ) : null}
              </td>
              <td>
                <Cascader
                  size="small"
                  placeholder="Status"
                  style={{ width: 90 }}
                  onChange={(e) =>
                    changeApprovedStatus(project.id, e[0], messageApi).then(
                      () =>
                        queryClient.invalidateQueries({
                          queryKey: ["Approved"],
                        })
                    )
                  }
                  options={[
                    { value: "PLINTH", label: "PLINTH" },
                    { value: "SUPERSTRUCTURE", label: "SUPERSTRUCTURE" },
                    { value: "NIRMANSAMPANNA", label: "NIRMANSAMPANNA" },
                    { value: "APPROVED", label: "APPROVED" },
                  ]}
                />
              </td>
              <td>
                <More project={project} type="NirmanSampanna" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={NirmanSampannaPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setNirmanSampannaPage, payload: page - 1 })
        }
        total={approved?.total ?? 100}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default NirmanSampannaTableFinal;
