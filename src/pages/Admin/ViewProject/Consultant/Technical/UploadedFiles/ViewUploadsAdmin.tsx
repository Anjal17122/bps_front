import { useContext, useState } from "react";
import { ActionType, MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import { DownloadOutlined } from "@ant-design/icons";
import {
  imgFolders,
  IMG_GET_URL,
  PDF_URL,
} from "../../../../../../Services/Api";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { useParams } from "react-router-dom";
import AdUploadFooter from "../../../../../../Components/Admin/Footers/AdUploadFooter";
import { Divider, message } from "antd";
import ViewAutoCad from "../../../../../../Common/UploadAutoCad/ViewAutoCad";
import {
  GetRevisionByProjectId,
  GetRevisionByProjectIdBody,
} from "../../../../../../Services/RevisionService";
import RevisionDetailsFromDrawings from "./RevisionDetailsFromDrawings";
import MyInfoBtn from "../../../../../../Common/InfoIcon/MyInfoBtn";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { replaceDrawing } from "../../../../../../Services/AdminViewProjService/AdminViewProjService";
import { copyImageFinal } from "../../../../OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import useStoreViewProj, {
  dispatch as dispatchNew,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import SignedDrawingsModal from "./SignedDrawingsModal";

interface Props {
  admin?: boolean;
}

type typeTech =
  | "architectural"
  | "structural"
  | "electrical"
  | "sanitation"
  | "analysisfile"
  | "analysisreport"
  | "soilTestReport";

const ViewUploadsAdmin = ({ admin = false }: Props) => {
  const { state, dispatch } = useContext(MyStore);

  const [messageApi, contextHolder] = message.useMessage();

  const [imageName, setImageName] = useState<string>("");
  const [fileTitle, setFileTitle] = useState("");

  function beforeUpload(file: any) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "application/pdf";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG/webp/pdf file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("File must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      return;
    } else if (info.file.status === "error") {
      return;
    } else if (info.file.status === "done") {
      const resName = info.file.response.message;
      setImageName(resName);

      setFileTitle(info.file.name);
    }
  };

  const onSubmit = (id: number, type: typeTech) => {
    copyImageFinal(
      [
        {
          dir: getTypefinal(type),
          fileName: imageName,
        },
      ],
      messageApi
    ).then(() => {
      replaceDrawing(id, imageName, fileTitle, messageApi).then(() => {
        const initUploads = state.project.uploadedDocuments;
        const changedName = initUploads.map((initt) => {
          if (initt.id === id) {
            return { ...initt, fileName: imageName, title: fileTitle };
          } else {
            return initt;
          }
        });
        const updatedArr = {
          ...state.project,
          uploadedDocuments: changedName,
        };
        localStorage.setItem("adminViewProject", JSON.stringify(updatedArr));

        dispatch({
          type: ActionType.getProject,
          payload: updatedArr,
        });
      });
    });
  };

  const mapData = (type: typeTech) => {
    return state.project.uploadedDocuments.map((x, index) => {
      if (x.fileType === type) {
        return (
          <div
            key={x.id}
            className="viewUploadCard"
            style={{
              background:
                (index + 1) % 2 === 0 ? "white" : "rgba(211, 211, 211, 0.2)",
            }}
          >
            {x.title || "Sample"}{" "}
            <a
              rel="noopener noreferrer"
              href={
                checkIfPDF(x?.fileName || "")
                  ? PDF_URL + `/${imgFolders.drawings}/` + x.fileName
                  : IMG_GET_URL + `/${imgFolders.drawings}/` + x.fileName
              }
              target="_blank"
            >
              <button className="NoStyleBtnSm">
                <DownloadOutlined />
              </button>
            </a>
          </div>
        );
      }
      return null;
    });
  };

  const params = useParams();
  const pid: string = params.pid ?? "";

  const [autocadModalisOpen, setAutocadModalisOpen] = useState(false);
  const [revisionsOnDrawings, setRevisionsOnDrawings] =
    useState<GetRevisionByProjectIdBody[]>();
  const [revisionDetailsIsOpen, setRevisionDetailsIsOpen] = useState(false);

  const ViewRevisionDetails = () => {
    GetRevisionByProjectId(parseInt(pid), messageApi).then((res) => {
      setRevisionsOnDrawings(res.data);
      setRevisionDetailsIsOpen(true);
    });
  };
  const { signedDrawingsModal } = useStoreViewProj();

  return (
    <div>
      {contextHolder}
      {ifCon() ? null : <AdUploadFooter pid={pid} />}
      {signedDrawingsModal ? <SignedDrawingsModal /> : null}
      <ViewAutoCad
        onClose={() => setAutocadModalisOpen(false)}
        isVisible={autocadModalisOpen}
        projectId={pid}
      />

      <RevisionDetailsFromDrawings
        revisionsOnDrawings={revisionsOnDrawings}
        isVisible={revisionDetailsIsOpen}
        onClose={() => setRevisionDetailsIsOpen(false)}
      />

      <ViewProjectHeader
        id={pid}
        step="Step 12: "
        title="Upload Documents"
        prev={
          admin
            ? `/admin/viewproject/sanitation/${pid}`
            : `/user/viewproject/sanitation/${pid}`
        }
        next={""}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "60%",
          background: "#eeeeee",
          padding: "5px 20% 10px 20%",
          alignItems: "center",
        }}
      >
        <button
          className="YellowBtn"
          onClick={() => {
            dispatchNew({
              type: Ac.setSignedDrawingsModal,
              payload: { currentPid: parseInt(pid), signedDrawingsModal: true },
            });
          }}
        >
          Old Drawings
        </button>
        <Divider type="vertical" />
        <button
          className="GreenBtn"
          onClick={() => {
            setAutocadModalisOpen(true);
          }}
        >
          Autocad Docs
        </button>
        <Divider type="vertical" />
        <button onClick={() => ViewRevisionDetails()} className="SuperStBtn">
          Revision Docs
        </button>
      </div>
      {state.project.uploadedDocuments ? (
        <>
          <div className="uploadFWrapper">
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Soil Test Report</p>
              </div>
              {mapData("soilTestReport")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Architectural Drawing</p>
              </div>
              {mapData("architectural")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Structural Drawing</p>
              </div>
              {mapData("structural")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Electrical Drawing</p>
              </div>
              {mapData("electrical")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Sanitation</p>
              </div>
              {mapData("sanitation")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Analysis File</p>
              </div>
              {mapData("analysisfile")}
            </div>
            <div className="UploadDiv">
              <div className="uploadFiles">
                <p>Analysis Report</p>
              </div>
              {mapData("analysisreport")}
            </div>
          </div>
        </>
      ) : (
        <GoBackToProjects />
      )}
    </div>
  );
};

export default ViewUploadsAdmin;

export function getTypefinal(type: typeTech): string {
  return type === "analysisfile"
    ? "analysisfile"
    : type === "analysisreport"
    ? "analysisreport"
    : type;
}
