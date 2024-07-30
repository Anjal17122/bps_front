import { useEffect, useState } from "react";
import { Button, Col, message, Row } from "antd";
import "./ViewDigitalSignatureLocal.scss";
import { useParams } from "react-router-dom";
import { Result, Typography } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import {
  Base64toPDFsecond,
  certificateTypeDigiSign,
  checkValidSignature,
  Coordinates,
  GetCoordinatesPosition,
  getDigitalSignatureOne,
  GETLatestPDF,
  getLatestPDFfinal,
  getLatestPdfId,
  POSTcertificateSigned,
  POSTcertificateSignedBody,
  SignedBy,
} from "../../Services/DigitalSignatureService";
import { PDF_URL } from "../../Services/Api";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import { SignDocument } from "../Admin/DigitalSignature/DigitalSign";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import {
  getProjectPermaOnly,
  ProjectPermaBody,
} from "../../Services/TechnicalService";
import { getCoordinates } from "../../constants/coordinates";
import { fileNameGenerator } from "../../pages/Consultant/ProjectCreate/Technical/UploadFiles/EditUploads";
import { SignSuccess } from "../../constants/Messages";
import { sN } from "../../Services/ProjectService";
import { Common } from "../../constants/constants";
import { setSTyp } from "../../Services/CreateProjectService";
import { isNagarjun } from "../../constants/CommonFunctions";

const DigitalSignatureLocal = () => {
  const { Paragraph, Text } = Typography;
  const {
    pid,
    chalaniId,
    type,
    name,
  }: {
    chalaniId?: string;
    pid?: string;
    type?: "plinth" | "superstructure" | "nirman_sampanna";
    name?: string;
  } = useParams();

  console.log({ pid, chalaniId, type, name });

  const [signedBy, setSignedBy] = useState<SignedBy[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const [projectPerma, setProjectPerma] = useState<ProjectPermaBody>();

  const [latestPDF, setLatestPDF] = useState<GETLatestPDF>();

  const [coordinates, setCoordinates] = useState<Coordinates>();

  const [messageApi, contextHolder] = message.useMessage();

  type SignValid = {
    signed: boolean;
    signer: boolean;
  };

  const [checkValidSign, setCheckValidSign] = useState<SignValid>();

  useEffect(() => {
    getLatestPdfId(chalaniId ?? "0", messageApi).then((res) => {
      if (res.data === "") {
        getLatestPDFfinal(
          pid ?? "0",
          (type as any).toUpperCase() as certificateTypeDigiSign,
          messageApi
        ).then((res) => {
          if (res.data === "") {
            return;
          }
          setLatestPDF(res.data);
        });
      }
      if (res.data === "") {
        return;
      }
      setLatestPDF(res.data);
    });

    checkValidSignature(
      pid ?? "0",
      Number(chalaniId),
      (type as any).toUpperCase(),
      messageApi
    ).then((res) => {
      setCheckValidSign(res.data);
    });

    getDigitalSignatureOne({
      certificateType: (type as any).toUpperCase(),
      projectPermaId: pid ?? 0,
      id: Number(chalaniId) ?? 0,
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
    } else if (type == "tippani_plinth") {
      return "/tippani/plinth/" + pid;
    } else if (type == "tippani_superstructure") {
      return "/tippani/superstructure/" + pid;
    } else if (type == "tippani_nirman_sampanna") {
      return "/tippani/nirman_sampanna/" + pid;
    } else if (type == "regular") {
      return "/regularpdf/" + pid;
    } else {
      return "/abhilekhikaranpdf/" + pid;
      // `${pid}/${patrasa}/${projectPerma?.buildingPurposeName}`
    }
  };
  const signPDF = () => {
    const position = isNagarjun()
      ? coordinates?.position == "3"
        ? "52"
        : coordinates?.position
      : coordinates?.position;

    const mycoordinates = getCoordinates("a4", parseInt(position ?? "0"));

    if (!mycoordinates) return message.error("Coordinates not found!!");
    setSubmitting(true);

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
          chalaniId: Number(chalaniId),
        };
        POSTcertificateSigned(body, messageApi).then(() => {
          message.success(SignSuccess);
        });
      });
    };

    SignDocument(mycoordinates, pid ?? "0", setSubmitting, successCallBack);
  };

  const pdfurl = `/${type}/${latestPDF?.filename}`;
  // const pdfurl = `/abc/anjal.pdf`;
  // POSTcertificateSigned(body, setSubmitting);

  const renderSigned = () => {
    if (!checkValidSign) return null;
    return checkValidSign.signed ? (
      <div>
        {" "}
        Signed &nbsp; <CheckCircleOutlined style={{ color: "green" }} />{" "}
      </div>
    ) : (
      <span style={{ fontSize: 12 }}>
        &nbsp; Not Signed <CloseCircleOutlined style={{ color: "red" }} />
      </span>
    );
  };

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
            ></Result>
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
                {isNagarjun() ? (
                  <Col span={24}>
                    {checkValidSign?.signer ? null : (
                      <span style={{ fontSize: 12 }}>
                        Not Registered as Signer
                      </span>
                    )}
                    <Button
                      type="primary"
                      onClick={signPDF}
                      disabled={
                        submitting ||
                        checkValidSign?.signed ||
                        !checkValidSign?.signer
                      }
                    >
                      Sign Pdf
                    </Button>
                    {renderSigned()}
                  </Col>
                ) : (
                  <Col span={24}>
                    <Button
                      type="primary"
                      onClick={signPDF}
                      disabled={submitting}
                    >
                      Sign Pdf
                    </Button>
                  </Col>
                )}
                {/* <Col span={12}>
                  <UploadSingedPDF
                    uploadPDF={uploadPDF}
                    submitting={submitting}
                    type={type ?? ""}
                    filename={fileNameGenerator(type as any, pid ?? "", ".pdf")}
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

export default DigitalSignatureLocal;

export const normFile = (e: { fileList: any }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const getBase64fromResp = (respData: string): string => {
  const siglast = respData.indexOf(Common);
  const sig = respData.substring(10, siglast);
  return sig.replaceAll(/(\r\n|\n|\r)/gm, "").replaceAll(" ", "");
};
