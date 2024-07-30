import { Button, Pagination, message } from "antd";
import { Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
// import "./DigitalSignatureTable.scss";
import { sN } from "../../../../../Services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import {
  GETdigiSignTab,
  ResDigiSignTab,
} from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import { useStoreUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import useStoreViewProj from "../../../../../Store/StoreViewProject/StoreViewProj";
import { size } from "../../../../../constants/constants";
import { AcP } from "../../../../../Store/StorePagination/types";

export type DigitalSignCertType =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "NOTICE15"
  | "NOTICE7"
  | "ABHILEKHIKARAN"
  | "DRAWING";

type Props = {
  onViewProject: (id: number) => void;
};

const DigitalSignatureTableFinal = ({ onViewProject }: Props) => {
  const { DigiSignPage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { DigitalSignUrl } = useStoreUrl();

  const [messageApi, contextHolder] = message.useMessage();

  const myUrl = DigitalSignUrl + `${DigiSignPage}&size=${size}`;
  const {
    isLoading,
    error,
    data: projects,
    refetch,
  } = useQuery<ResDigiSignTab, { message: string }>({
    queryKey: [MyQueries.DigitalSignature, DigitalSignUrl, DigiSignPage],
    queryFn: () => GETdigiSignTab(myUrl, messageApi).then((res) => res),
  });

  const onPlinthClick = (id: sN, type: DigitalSignCertType, name: string) => {
    messageApi.info("Use Approved tab to sign");
    // const signUrl = `/signpdf/${id}/${name}/${type.toLowerCase()}`;
    // window.open(signUrl, "_blank");
  };

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <div>
        <Button
          disabled={disabled}
          icon={<SyncOutlined />}
          type="primary"
          // ghost
          onClick={() => {
            refetch();
          }}
          // className="RefreshButton"
        ></Button>
      </div>
      {/* <div style={{ padding: "0px 0 10px 0" }}>
        <Link to="/signpdf/14/Sundevi%20Shrestha/abhilekhikaran">
          <Button type="primary">Sign Abhilekhikaran Sundevi</Button>
        </Link>
      </div> */}
      {isLoading ? <div>Loading...</div> : null}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th>Name</th>
            <th>Project Type</th>
            <th>Creation Date</th>
            <th style={{ textAlign: "center" }}>Project</th>
            <th style={{ textAlign: "center" }}>Certificate</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projects?.data.map((project) => (
            <tr key={project.id}>
              <td style={{ width: "20px" }}>{project.id}</td>
              <td>{project.applicantName}</td>
              <td>{project.type}</td>
              <td>{project.creationDate?.substring(0, 10)}</td>
              <td style={{ width: "20px" }}>
                <Button type="link" onClick={() => onViewProject(project.id)}>
                  View
                </Button>
              </td>
              <td style={{ textAlign: "center" }} className="CertificateCol">
                {project.type === "Already Build Building" ? (
                  <Tag
                    onClick={() =>
                      onPlinthClick(
                        project.id,
                        "ABHILEKHIKARAN",
                        project.applicantName
                      )
                    }
                    icon={<CheckCircleOutlined />}
                    color="success"
                    style={{ padding: 5 }}
                  >
                    अभिलेखीकरण
                  </Tag>
                ) : null}

                {!project.signedPlinth ? (
                  <Tag
                    onClick={() =>
                      onPlinthClick(project.id, "PLINTH", project.applicantName)
                    }
                    icon={<CheckCircleOutlined />}
                    color="success"
                    style={{ padding: 5 }}
                  >
                    प्लिन्थ लेभल
                  </Tag>
                ) : null}
                {!project.signedSuperStructure ? (
                  <Tag
                    onClick={() =>
                      onPlinthClick(
                        project.id,
                        "SUPERSTRUCTURE",
                        project.applicantName
                      )
                    }
                    icon={<CheckCircleOutlined />}
                    style={{ padding: 5 }}
                    color="success"
                  >
                    सुपर-स्ट्रक्चर
                  </Tag>
                ) : null}
                {!project.signedNirmanSampanna ? (
                  <Tag
                    onClick={() =>
                      onPlinthClick(
                        project.id,
                        "NIRMAN_SAMPANNA",
                        project.applicantName
                      )
                    }
                    icon={<CheckCircleOutlined />}
                    style={{ padding: 5 }}
                    color="success"
                  >
                    निर्माण सम्पन्न
                  </Tag>
                ) : null}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={DigiSignPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setDigiSignPage, payload: page - 1 })
        }
        total={projects?.total ?? 100}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default DigitalSignatureTableFinal;
