import { useEffect, useState } from "react";
import {
  getLandsWithOwner,
  GETLandWithOwner,
  getManjurinama,
} from "../../../../../Services/CreateProjectService";
import LandOwnerCard from "./LandOwnerCard";
import "../../../../../Assets/scss/Project.scss";
import { switchUrl } from "../Create/ViewCreate";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  message,
  Popover,
  Result,
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import PDFlandowner from "../../../../../Common/ProjectPDFs/PDFlandowner";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { sN } from "../../../../../Services/ProjectService";
import { uploadManjurinama } from "../../../../../Services/LandService";
import { imgFolders, IMG_GET_URL, PDF_URL } from "../../../../../Services/Api";
import FileUploader from "../../Technical/UploadFiles/FileUploader";
import { checkIfPDF } from "../LandInfo/LandCard";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { copyImageFinal } from "../../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import ManjurinamaUploader from "./ManjurinamaUploader";

const LandOwnersDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();
  const [owners, setOwners] = useState<GETLandWithOwner[]>();

  const { disabled } = useStoreGlobal();

  // const [switchStatus, setSwitchStatus] = useState(false);

  const [manjurinama, setManjurinama] = useState<{
    manjurinama: string | null;
  }>();

  const [messageApi, contextHolder] = message.useMessage();

  // const [homeOwner, setHomeOwner] = useState<GETLandWithOwner[]>();

  useEffect(() => {
    getLandsWithOwner(
      switchUrl("/land/owner?id=", "/land/perma/owner?id="),
      params.pid ?? ""
    ).then((res) => {
      setOwners(res.data);
    });
    getManjurinama(
      params.pid ?? "",
      localStorage.getItem("isPerma") === "true"
        ? "/project/perma/manjurinama/only/"
        : undefined
    ).then((res) => {
      setManjurinama(res.data);
    });
    // getHouseOwners(
    //   switchUrl("/project/house/owners?id=", "/project/perma/house/owners?id="),
    //   params.pid?? ""
    // ).then((res) => setHomeOwner(res.data));
    return () => setOwners(undefined);
  }, []);
  const onManjurinamaDel = () => {
    alert("onManjurinamaDel");
  };

  function onManjurinamaUpload(info: UploadChangeParam<UploadFile>, id: sN) {
    if (info.file.status === "done") {
      messageApi.success(`${info.file.name} file uploaded successfully`);
      copyImageFinal(
        [{ fileName: info.file.response.message, dir: imgFolders.manjurinama }],
        messageApi
      ).then(() => {
        uploadManjurinama(id, info.file.response.message, messageApi).then(
          () => {
            setManjurinama({ manjurinama: info.file.response.message });
          }
        );
      });
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  }

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `Land Owners`,
      children: (
        <div>
          {owners?.map((landWitOwner) => (
            <LandOwnerCard
              data={landWitOwner}
              key={landWitOwner.id}
              type="landOwner"
            />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: `House Owners`,
      children: (
        <div>
          {!owners?.length ? (
            <Result
              title="Only submit data if House Owners and Land Owners are different"
              extra={
                <Link
                  to={`/project/create/addhomeowner/${
                    owners?.length ? params.pid : ""
                  }/${owners?.length ? params.pid : ""}`}
                >
                  <Button type="primary">Add Home Owner</Button>
                </Link>
              }
            />
          ) : (
            owners.map((landWithOwner) => (
              <LandOwnerCard
                key={landWithOwner.id}
                data={landWithOwner}
                type="houseOwner"
              />
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="CenterForm10 LandOwnersDiv">
      {contextHolder}
      <div style={{ position: "relative" }}>
        <div
          style={{
            right: 0,
            top: 5,
            zIndex: 20,
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          {owners && (
            <div className="DownloadBtn">
              <Tooltip title="Download PDF">
                <PDFlandowner
                  landOwners={owners}
                  projectId={params.pid ?? ""}
                />
              </Tooltip>
            </div>
          )}
          <Divider type="vertical"></Divider>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <span> Manjurinama: &nbsp;</span>
              <Popover
                content={
                  <div
                    className="flexCenter"
                    style={{ width: 200, minHeight: 100 }}
                  >
                    <ManjurinamaUploader
                      maxCount={1}
                      onUpload={(info) =>
                        onManjurinamaUpload(info, params.pid ?? "")
                      }
                      onDel={onManjurinamaDel}
                      disabled={disabled}
                    />
                  </div>
                }
              >
                <button>Upload</button>
              </Popover>
            </div>
            <Divider type="vertical"></Divider>
            {manjurinama ? (
              <a
                href={
                  (checkIfPDF(manjurinama?.manjurinama ?? "")
                    ? PDF_URL
                    : IMG_GET_URL) +
                  `/${imgFolders.manjurinama}/` +
                  manjurinama?.manjurinama
                }
                target={"_blank"}
                rel="noreferrer noopener"
              >
                <Button type="primary" size="small">
                  view
                </Button>
              </a>
            ) : null}
          </div>
        </div>
        <Tabs defaultActiveKey="1" items={items()}></Tabs>
      </div>
    </div>
  );
};

export default LandOwnersDiv;
