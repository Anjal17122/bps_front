import { Col, Result, Row, Typography, message } from "antd";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { PDF_URL } from "../../../../Services/Api";
import "./UploadCertificate.scss";
import { sN } from "../../../../Services/ProjectService";
import { useEffect, useState } from "react";
import {
  Base64toPDFsecond,
  Coordinates,
  GETLatestPDF,
  GetCoordinatesPosition,
  POSTcertificateSigned,
  POSTcertificateSignedBody,
  SignedBy,
  certificateTypeDigiSign,
  checkValidSignature,
  getDigitalSignatureOne,
  getLatestPDFfinal,
} from "../../../../Services/DigitalSignatureService";
import {
  FormOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { getBase64fromResp } from "../../../../Components/DigitalSignatureLocal/DigitalSignatureLocal";
import { setSTyp } from "../../../../Services/CreateProjectService";
import {
  ProjectPermaBody,
  getProjectPermaOnly,
} from "../../../../Services/TechnicalService";
import { SignSuccess } from "../../../../constants/Messages";
import { getCoordinates } from "../../../../constants/coordinates";
import { fileNameGenerator } from "../../../Consultant/ProjectCreate/Technical/UploadFiles/EditUploads";
import { SignDocument } from "../../../../Components/Admin/DigitalSignature/DigitalSign";
import Title from "antd/lib/typography/Title";

const UploadCertificate = () => {
  const { Paragraph, Text } = Typography;
  const {
    pid,
    type,
    name,
  }: {
    pid?: string;
    type?: "plinth" | "superstructure" | "nirman_sampanna";
    name?: string;
  } = useParams();

  const [signedBy, setSignedBy] = useState<SignedBy[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const [projectPerma, setProjectPerma] = useState<ProjectPermaBody>();

  const [latestPDF, setLatestPDF] = useState<GETLatestPDF>();

  const [coordinates, setCoordinates] = useState<Coordinates>();

  const [messageApi, contextHolder] = message.useMessage();

  const [checkValidSign, setCheckValidSign] = useState<{
    isSigned: boolean;
    isSigner: boolean;
  }>();

  useEffect(() => {
    getLatestPDFfinal(
      pid ?? "0",
      (type as any).toUpperCase() as certificateTypeDigiSign,
      messageApi
    ).then((res) => {
      setLatestPDF(res.data);
    });
    checkValidSignature(
      pid ?? "0",
      (type as any).toUpperCase(),
      messageApi
    ).then((res) => {
      setCheckValidSign(res.data);
    });
    getDigitalSignatureOne({
      certificateType: (type as any).toUpperCase(),
      projectPermaId: pid ?? "",
    }).then((res) => {
      setSignedBy(res.data);
      getProjectPermaOnly(pid ?? "0").then((res) => {
        setProjectPerma(res.data);
        GetCoordinatesPosition((type as any).toUpperCase() as any).then(
          (res) => {
            setCoordinates(res.data);
          }
        );
      });
    });
    return () => {
      setSignedBy([]);
      setLatestPDF(undefined);
      setProjectPerma(undefined);
    };
  }, []);
  // const getPDFurl = () => {
  //   if (type === "plinth") {
  //     return PDF_URL + "/plinthpdf" + `/plinth_${pid}.pdf`;
  //   } else if (type === "superstructure") {
  //     return PDF_URL + "/plinthpdf" + `/superstructure_${pid}.pdf`;
  //   } else if (type === "nirman_sampanna") {
  //     return PDF_URL + "/plinthpdf" + `/building_complete_${pid}.pdf`;
  //   } else return "";
  // };

  const localPDFUrl = () => {
    const urlData = `${pid}/${projectPerma?.type}/${projectPerma?.buildingPurposeName}`;
    if (type === "plinth") {
      return "/plinthpdf/" + urlData;
    } else if (type === "superstructure") {
      return "/superstructurepdf/" + urlData;
    } else if (type === "nirman_sampanna") {
      return "/buildingcompletepdf/" + urlData;
    } else {
      return "/abhilekhikaranpdf/" + pid;
      // `${pid}/${patrasa}/${projectPerma?.buildingPurposeName}`
    }
  };
  const signPDF = () => {
    const mycoordinates = getCoordinates(
      "a4",
      parseInt(coordinates?.position ?? "0")
    );

    if (!mycoordinates) return message.error("Coordinates not found!!!");
    setSubmitting(true);

    // const successCallBack = () => {};

    const successCallBack = (respData: string, id: sN, setSub: setSTyp) => {
      const fileName = fileNameGenerator(type as any, pid ?? "", Date.now());

      // sends base64 to save as pdf in given directory
      Base64toPDFsecond(
        {
          base64: getBase64fromResp(respData),
          filename: fileName,
        },
        type ?? "plinth",
        messageApi
      ).then(() => {
        const body: POSTcertificateSignedBody = {
          certificateType: (
            type as any
          ).toUpperCase() as certificateTypeDigiSign,
          content: "",
          filename: fileName + ".pdf",
          projectPermaId: parseInt(pid ?? "0"),
          signature: "",
        };
        POSTcertificateSigned(body, messageApi).then(() => {
          message.success(SignSuccess);
        });
      });
    };

    SignDocument(mycoordinates, pid ?? "0", setSubmitting, successCallBack);
  };
  const pdfurl = `/${type}/${latestPDF?.filename}`;

  return (
    <>
      <CommonHeader />
      {contextHolder}
      <div className="ViewDigitalSignature">
        <div className="ViewPdf">
          {latestPDF ? (
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
              subTitle="Generate PDF and Upload it by clicking Sign PDF button"
              extra={[
                <Link key={122} to={localPDFUrl()} target="_blank">
                  <Button type="primary">Generate PDF</Button>,
                </Link>,
              ]}
            />
          )}
        </div>
        <div className="SignData">
          <div className="TitleWrapper">
            <div>
              <span>Project Id: </span>
              {pid}
            </div>
            <Title level={3}>
              <span>Applicant: </span>
              {name}
            </Title>
          </div>
          <Result
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign Pdf"
            subTitle="Please check the information provided below before signing the document."
            extra={[
              <Row key={1} gutter={24}>
                <Col span={24}>
                  <Button
                    type="primary"
                    onClick={signPDF}
                    disabled={submitting}
                  >
                    Sign Pdf
                  </Button>
                  {checkValidSign ? (
                    checkValidSign.isSigned ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )
                  ) : null}
                </Col>
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
              {signedBy.length ? (
                signedBy.map((signed) => (
                  <Paragraph key={signed.id}>
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />{" "}
                    {signed.nameEng}
                  </Paragraph>
                ))
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

export default UploadCertificate;

export const genCertFilename = (type: string, id: sN) => `${type}_${id}`;

{
  /* <Form
form={form}
key={3}
onFinishFailed={submitFailed}
size="middle"
layout="vertical"
onFinish={uploadPDF}
>
<Form.Item
  className="UploadCertificateFormItem"
  name="filename"
  label="Upload"
  valuePropName="fileList"
  getValueFromEvent={normFile}
  required={false}
  rules={[
    {
      required: true,
      message: "Please upload file!",
    },
  ]}
>
  <Upload
    name="file"
    action={UPLOAD_URL(
      params.certificatetype ?? "",
      myPDFFilename
    )}
    listType="text"
    maxCount={1}
  >
    <Button icon={<UploadOutlined />}>upload</Button>
  </Upload>
</Form.Item>

<Form.Item>
  <Button
    htmlType="submit"
    type="primary"
    disabled={submitting}
  >
    Submit
  </Button>
</Form.Item>
</Form> */
}
