import { useEffect, useState } from "react";
import { Button, Col, Divider, message, Row } from "antd";
import "./ViewDigitalSignatureLocal.scss";
import { useParams } from "react-router-dom";
import { Result, Typography } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import {
  Base64toPDFsecond,
  GETLatestPDF,
  GETnoticeLatest,
  PATCHnoticePublish,
} from "../../Services/DigitalSignatureService";
import { PDF_URL } from "../../Services/Api";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import { SignDocument } from "../Admin/DigitalSignature/DigitalSign";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";

import { SignPDF } from "./SignPDF";
import { sN } from "../../Services/ProjectService";
import { setSTyp } from "../../Services/CreateProjectService";
import { SignSuccess } from "../../constants/Messages";
import { fileNameGenerator } from "../../pages/Consultant/ProjectCreate/Technical/UploadFiles/EditUploads";
import { getBase64fromResp } from "./DigitalSignatureLocal";

export const NoticeCoordinates = `440,100,560,145`;

const DigitalSignNoticeLocal = () => {
  const { Paragraph, Text } = Typography;
  interface Params {
    pid?: string;
    chalaninum?: string;
    patrasankhya?: string;
    date?: string;
    type?: "days7" | "days15";
    id?: string;
    filename?: string;
  }

  const {
    pid,
    chalaninum,
    patrasankhya,
    date,
    type,
    id: noticeId,
  }: Params = useParams();

  const [submitting, setSubmitting] = useState(false);

  const [latestNotice, setLatestNotice] = useState<GETLatestPDF>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETnoticeLatest(pid ?? "").then((res: any) => setLatestNotice(res.data));
    return () => {
      setLatestNotice(undefined);
    };
  }, []);

  const signPDF = (values: { filePath: string }) => {
    const fileNam = fileNameGenerator(
      type === "days15" ? "notice-15" : "notice-7",
      pid ?? "0",
      Date.now() + ".pdf"
    );
    const successCallback = (msg: string, id: sN, setSub: setSTyp) => {
      message.success(SignSuccess);
      Base64toPDFsecond(
        {
          base64: getBase64fromResp(msg),
          filename: fileNam,
        },
        type === "days15" ? "notice-15" : "notice-7",
        messageApi
      ).then(() => {
        PATCHnoticePublish(noticeId ?? "0", fileNam, setSubmitting).then(() => {
          alert("Signed and Uploaded Notice Successfully!");
        });
      });
    };
    SignDocument(NoticeCoordinates, pid ?? "", setSubmitting, successCallback);
  };

  // const uploadNoticePDF = (values: ValuesUpload, form: FormInstance<any>) => {
  //   PATCHnoticePublish(
  //     noticeId ?? "",
  //     values.filename[0].response.message,
  //     setSubmitting
  //   ).then(() => {
  //     message.success("Signed Notice Successfully!");
  //     form.resetFields();
  //   });
  // };
  const pdfurl = `/${(type as any).replace("days", "notice-")}/${
    latestNotice?.filename
  }`;

  const myPdfUrl = PDF_URL + pdfurl;

  const generateUrl = `/noticepdf/${pid}/${chalaninum}/${patrasankhya}/${date}/${type}`;
  return (
    <>
      <CommonHeader />
      {contextHolder}
      <div className="ViewDigitalSignature">
        <div className="ViewPdf">
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href={myPdfUrl} target="_blank" rel="noreferrer noopener">
                <Button type="primary">View PDF</Button>
              </a>
              <Divider type="vertical"></Divider>
              <Link to={generateUrl} target="_blank">
                <Button type="primary" ghost>
                  Generate New
                </Button>
              </Link>
            </div>
            <embed
              style={{
                width: "100%",
                height: "400px",
                background: "white",
              }}
              type="application/pdf"
              src={myPdfUrl}
            />
          </>
          {/* {latestNotice ? (
            <embed
              style={{
                width: "100%",
                height: "600px",
              }}
              type="application/pdf"
              src={PDF_URL + pdfurl}
            />
          ) : (
            <Result
              status="error"
              title="PDF not found"
              subTitle="Click below to generate PDF"
              extra={[
                <Link key={122} to={generateUrl} target="_blank">
                  <Button type="primary">Generate Notice</Button>,
                </Link>,
              ]}
            ></Result>
          )} */}
        </div>
        <div className="SignData">
          <div className="TitleWrapper">
            <div>
              <span>Project Id: </span>
              {pid}
            </div>
            <Title level={3}>
              <span>Notice Sign</span>
            </Title>
          </div>
          <Result
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign Pdf"
            subTitle="Please check the information provided below before signing."
            extra={[
              <Row key={1} gutter={24}>
                <Col span={12}>
                  <SignPDF signPDF={signPDF} submitting={submitting} />
                </Col>
                {/* <Col span={12}>
                  <UploadSingedPDF
                    uploadPDF={uploadNoticePDF}
                    submitting={submitting}
                    type={type === "days15" ? "notice-15" : "notice-7"}
                    filename={fileNameGenerator(
                      type === "days15" ? "notice-15" : "notice-7",
                      pid ?? "0",
                      ".pdf"
                    )}
                  />
                </Col> */}
              </Row>,
            ]}
          >
            <div className="desc">
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  This pdf has been signed by following:
                </Text>
              </Paragraph>
              {latestNotice ? (
                <Paragraph>
                  <CheckCircleOutlined style={{ color: "#52c41a" }} /> Signed
                </Paragraph>
              ) : (
                <Paragraph>
                  <CloseCircleOutlined style={{ color: "red" }} /> Nobody has
                  signed the document
                </Paragraph>
              )}
            </div>
          </Result>
        </div>
      </div>
    </>
  );
};

export default DigitalSignNoticeLocal;

export const normFile = (e: { fileList: any }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
