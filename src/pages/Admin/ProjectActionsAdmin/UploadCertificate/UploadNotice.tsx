import {
  Divider,
  GetProp,
  Result,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, FormOutlined } from "@ant-design/icons";
import CommonHeader from "./CommonHeader";
import {
  DIGI_SIGN_UPLOAD_URL,
  imgFolders,
  PDF_URL,
} from "../../../../Services/Api";
import "./UploadCertificate.scss";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { POSTUploadNotice } from "../../../../Services/PlinthService";
import { sN } from "../../../../Services/ProjectService";
import { Base64toPDFsecond } from "../../../../Services/DigitalSignatureService";
import { SignDocument } from "../../../../Components/Admin/DigitalSignature/DigitalSign";
import { getBase64fromResp } from "../../../../Components/DigitalSignatureLocal/DigitalSignatureLocal";
import { setSTyp } from "../../../../Services/CreateProjectService";
import { NoticeCoordinates } from "../../../../Components/DigitalSignatureLocal/DigitalSignNoticeLocal";
import { useState } from "react";
import { useStoreGlobal } from "../../../../Store/StoreGlobal/StoreGlobal";
import { UploadChangeParam } from "antd/lib/upload";

const UploadNotice = () => {
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  const params: {
    certificatetype?: "days15" | "days7" | "days21";
    pid?: string;
    id?: string;
    projectType?: string;
    buildingPurpose?: string;
    filename?: string;
    patrasankhya?: string;
    chalanino?: string;
    date?: string;
  } = useParams();

  const myPDFFilename = genNoticeFilename(
    params.certificatetype ?? "days15",
    params.id ?? "0"
  );
  const signNoticePDF = () => {
    const successCallback = (respData: string, id: sN, setSub: setSTyp) => {
      Base64toPDFsecond(
        {
          base64: getBase64fromResp(respData),
          filename: myPDFFilename ?? "",
        },
        params.certificatetype === "days15" ? "notice-15" : "notice-7",
        messageApi
      ).then(() => {
        POSTUploadNotice(params.id ?? "days15", myPDFFilename, messageApi).then(
          () => {
            window.location.reload();
          }
        );
      });
    };
    SignDocument(NoticeCoordinates, "0", setSubmitting, successCallback);
  };

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const beforeUpload = (file: FileType) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("PDF must smaller than 2MB!");
    }
    return isPDF && isLt2M;
  };

  const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      messageApi.success(`${info.file.name} uploaded. Refresh Page to view`);

      window.location.reload();
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  };

  // const [form] = Form.useForm();

  const myPdfUrl =
    PDF_URL +
    `/${(params.certificatetype ?? "").replace(
      "days",
      "notice-"
    )}/${myPDFFilename}.pdf`;

  return (
    <div>
      {contextHolder}
      <CommonHeader />
      <div className="ViewDigitalSignature">
        <div className="ViewPdf">
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href={myPdfUrl} target="_blank" rel="noreferrer noopener">
                <Button type="primary">
                  <DownloadOutlined /> PDF
                </Button>
              </a>
              <Divider type="vertical"></Divider>
              <Link
                key={122}
                to={`/noticepdf/${params.pid}/${params.chalanino}/${params.patrasankhya}/${params.date}/${params.certificatetype}`}
                target="_blank"
              >
                <Button type="primary" ghost>
                  Generate New
                </Button>
              </Link>
              <Divider type="vertical"></Divider>
              <Upload
                name="file"
                beforeUpload={beforeUpload}
                action={
                  DIGI_SIGN_UPLOAD_URL +
                  `${
                    params.certificatetype === "days15"
                      ? imgFolders.notice15
                      : params.certificatetype === "days7"
                      ? imgFolders.notice7
                      : imgFolders.notice21
                  }&filename=${myPDFFilename}.pdf`
                }
                onChange={(event) => handleUploadChange(event)}
              >
                <Button type="primary" ghost>
                  <UploadOutlined />
                  Upload
                </Button>
              </Upload>
            </div>
            <embed
              style={{
                width: "100%",
                height: 500,
              }}
              type="application/pdf"
              src={myPdfUrl}
            />
          </>
          {/* 
          <Result
            status="error"
            title="PDF not found"
            subTitle="Click below to generate PDF"
            extra={[
              <Link
                key={122}
                to={`/noticepdf/${params.pid}/${params.chalanino}/${params.patrasankhya}/${params.date}/${params.certificatetype}`}
                target="_blank"
              >
                <Button type="primary">Generate</Button>,
              </Link>,
            ]}
          ></Result> */}
        </div>
        <div className="SignData">
          <div className="TitleWrapper">
            <div>
              <span>Project Id: </span>
              {params.pid}
            </div>
            <Title level={3}>
              <span>Notice Signing</span>
            </Title>
          </div>
          <Result
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign PDF Below"
            subTitle="Sign PDF after downloading with generate new"
            extra={[
              <Button
                key={1}
                onClick={signNoticePDF}
                type="primary"
                disabled={disabled || submitting}
              >
                Sign
              </Button>,
            ]}
          ></Result>
        </div>
      </div>
    </div>
  );
};

export default UploadNotice;

export const genNoticeFilename = (
  noticetype: "days15" | "days7" | "days21",
  pid: sN
) => {
  return `${noticetype.replace("days", "notice-")}_${pid}`;
};
