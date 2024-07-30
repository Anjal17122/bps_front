import { Button, Input, Modal, Popover, UploadFile, message } from "antd";
import LeftBorderBtn from "../../../Common/TableButton/LeftBorderBtn";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../Store/StoreModalCon/types";
import useStoreViewProj, {
  dispatch,
} from "../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../Store/StoreViewProject/types";
import MyInfoBtn from "../../../Common/InfoIcon/MyInfoBtn";
import { getToken } from "../../../Services/UserService";
import Upload, { UploadChangeParam } from "antd/es/upload";
import { useAgreementFile } from "./useAgreement";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { imgFolders, BASE_URL, PDF_URL } from "../../../Services/Api";
import { RcFile } from "antd/lib/upload";
import { addFile } from "../../../Services/TechnicalService";

const AgreementModal = ({ admin = false }: { admin?: boolean }) => {
  const { agreementModalCon } = useStoreModalCon();

  const [dateAgreement, setDateAgreement] = useState("");

  // const pId = parseInt(localStorage.getItem("personId") ?? "0");

  const onClose = () => {
    dispatchModalCon({ type: AcMCon.setAgreementModalCon, payload: false });
    dispatch({ type: Ac.setCurrentPid, payload: 0 });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const { currentPid } = useStoreViewProj();
  const { agreementFile, refetch } = useAgreementFile(currentPid, messageApi);

  const onChange = (info: UploadChangeParam<UploadFile<any>>, dId: number) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      addFile(
        {
          fileName: info.file.response.message,
          projectId: currentPid,
          fileSize: "",
          fileType: "aggrement_file",
          title: "",
        },
        messageApi,
        "/file/perma"
      ).then(() => refetch());

      // uploadSwikriti(
      //   {
      //     description: "",
      //     name: info.file.response.message,
      //     documentId: dId,
      //     personId: currentPid,
      //   },
      //   messageApi
      // ).then(() => {
      //   refetch();
      // });
      messageApi.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <Modal
        width={500}
        open={agreementModalCon}
        footer={false}
        maskClosable={false}
        onCancel={onClose}
        destroyOnClose={true}
      >
        {contextHolder}
        <h1 style={{ display: "inline" }}>Agreement - {currentPid}</h1>{" "}
        &nbsp;&nbsp;
        <span>
          <MyInfoBtn info="Download, fill and upload Agreement" />
        </span>
        <div
          style={{
            paddingTop: 60,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {admin ? (
            <div style={{ paddingTop: 20 }}>
              {agreementFile ? (
                <div>
                  <Link
                    to={
                      PDF_URL +
                      "/" +
                      imgFolders.agreement +
                      "/" +
                      agreementFile.fileName
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary">
                      <DownloadOutlined />
                    </Button>
                  </Link>
                </div>
              ) : null}{" "}
            </div>
          ) : (
            <Popover
              content={
                <div
                  style={{
                    paddingTop: 20,
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <Input
                    style={{ width: 230 }}
                    placeholder="Agreement Date: YYYY-MM-DD"
                    value={dateAgreement}
                    onChange={(e) => setDateAgreement(e.target.value)}
                  ></Input>
                  <hr />
                  <Link
                    to={"/agreementpdf/" + currentPid + "/" + dateAgreement}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button style={{ width: "100%" }} type="primary">
                      Download
                    </Button>
                  </Link>
                </div>
              }
            >
              <Button type="primary">Generate</Button>
            </Popover>
          )}

          <div
            style={{
              // background: "#e2e8f0",
              height: "auto",
              // padding: 20,
              width: 150,
            }}
          >
            {agreementFile ? (
              <div>
                <Link
                  to={
                    PDF_URL +
                    "/" +
                    imgFolders.agreement +
                    "/" +
                    agreementFile.fileName
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button type="primary">
                    <DownloadOutlined />
                  </Button>
                </Link>
              </div>
            ) : (
              <div>Not Uploaded Yet</div>
            )}
            <Upload
              maxCount={1}
              name="file"
              headers={{ authorization: getToken() }}
              beforeUpload={(e) => beforeUploadPdf1(e)}
              onChange={(e) => onChange(e, 3)}
              action={
                BASE_URL +
                `/images/digitalsignatureupload?dir=agreement&filename=agreement_${currentPid}_${Date.now()}.pdf`
              }
            >
              <LeftBorderBtn color="amber">
                <UploadOutlined />
                &nbsp; Upload
              </LeftBorderBtn>
            </Upload>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgreementModal;

export const beforeUploadPdf1 = (file: RcFile) => {
  const isPdf = file.type === "application/pdf";
  if (!isPdf) {
    message.error("You can only upload PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("PDF must smaller than 2MB!");
  }
  return isPdf && isLt2M;
};
