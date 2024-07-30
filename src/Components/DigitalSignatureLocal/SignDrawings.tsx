import { useEffect, useState } from "react";
import { Cascader, Col, message, Row } from "antd";
import "./ViewDigitalSignatureLocal.scss";
import { useParams } from "react-router-dom";
import { Result } from "antd";
import Title from "antd/lib/typography/Title";
import {
  GetDrawingsSignPosition,
  GetDrawingsSignPositionBody,
  GetUserId,
  POSTDrawingsSign,
  getLatestPDFLog,
  postSignDrawingsLogs,
  signType,
} from "../../Services/DigitalSignatureService";
import { imgFolders, PDF_URL } from "../../Services/Api";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import { SignDocument } from "../Admin/DigitalSignature/DigitalSign";
import { FormOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { optionsPdfSize } from "./DigitalSignConsultantLocal";
import { getCoordinates, pdfSizes } from "../../constants/coordinates";
import { setSTyp } from "../../Services/CreateProjectService";
import { sN } from "../../Services/ProjectService";
import { getBase64fromResp } from "./DigitalSignatureLocal";
import { FormProps, submitFailed } from "../../Common/Form/FormData";

const SignDrawings = () => {
  const { pid, type, documentid, signer, filename } = useParams();

  const [submitting, setSubmitting] = useState(false);

  const [userId, setUserId] = useState(0);

  const [coordinates, setCoordinates] =
    useState<GetDrawingsSignPositionBody[]>();

  const [messageApi, contextHolder] = message.useMessage();

  const [latestPDF, setLatestPDF] = useState<string>();

  useEffect(() => {
    getLatestPDFLog(filename + ".pdf", messageApi).then((res) => {
      setLatestPDF(res.data);
    });
    GetUserId()
      .then((res) => setUserId(res.data.personPermaid))
      .then(() => {
        GetDrawingsSignPosition(messageApi).then((res) => {
          setCoordinates(res.data);
        });
      });
    return () => {
      setUserId(0);
      setLatestPDF(undefined);
      setCoordinates(undefined);
    };
  }, []);

  const GetIndexPosition = (): number => {
    const position = coordinates ? coordinates[0].position : "1";
    if (type === "Plinth") {
      if (position === "1") {
        return 1;
      }
      if (position === "2") {
        return 2;
      }
      if (position === "3") {
        return 3;
      }
      if (position === "4") {
        return 4;
      }
    } else if (type === "SuperStructure") {
      if (position === "1") {
        return 5;
      }
      if (position === "2") {
        return 6;
      }
      if (position === "3") {
        return 7;
      }
      if (position === "4") {
        return 8;
      }
    } else if (type === "NirmanSampanna") {
      if (position === "1") {
        return 9;
      }
      if (position === "2") {
        return 10;
      }
      if (position === "3") {
        return 11;
      }
      if (position === "4") {
        return 12;
      }
    } else if (type === "Amsik") {
      if (position === "1") {
        return 13;
      }
      if (position === "2") {
        return 14;
      }
      if (position === "3") {
        return 15;
      }
      if (position === "4") {
        return 16;
      }
    } else if (type === "Regular") {
      if (position === "1") {
        return 17;
      }
      if (position === "2") {
        return 18;
      }
      if (position === "3") {
        return 19;
      }
      if (position === "4") {
        return 20;
      }
    } else if (type === "Abhilekhikaran") {
      if (position === "1") {
        return 1;
      }
      if (position === "2") {
        return 2;
      }
      if (position === "3") {
        return 3;
      }
      if (position === "4") {
        return 4;
      }
    }
    return 100;
  };

  const signPDF = ({
    fileType,
  }: {
    filePath: string;
    fileType: pdfSizes[];
  }) => {
    setSubmitting(true);
    const mycoordinates = getCoordinates(fileType[0], GetIndexPosition());
    if (!mycoordinates) return message.error("Coordinates not found!");

    const successCallback = (respData: string, id: sN, setSub: setSTyp) => {
      postSignDrawingsLogs(
        {
          projectId: pid ?? "",
          base64: getBase64fromResp(respData),
          filename: filename ?? "",
        },
        imgFolders.drawings,
        messageApi
      ).then(() => {
        POSTDrawingsSign(
          {
            documentId: documentid ?? "0",
            projectid: pid ?? "0",
            signType: type as signType,
            [signer ?? ""]: userId,
            [(signer ?? "").substring(0, (signer ?? "").length - 2) + "Date"]:
              new Date().toISOString(),
          },
          messageApi
        ).then(() => {
          message.success("PDF signed!");
          // window.location.reload();
        });
      });
    };

    SignDocument(mycoordinates, pid ?? "0", setSubmitting, successCallback);
  };

  // const uploadDrawing = (values: ValuesUpload, form: FormInstance<any>) => {
  //   POSTDrawingsSign(
  //     {
  //       documentId: documentid,
  //       projectid: pid,
  //       signType: type,
  //       [signer]: userId,
  //       [signer.substring(0, signer.length - 2) + "Date"]:
  //         new Date().toISOString(),
  //     },
  //     setSubmitting
  //   ).then(() => {
  //     message.success("Signed Notice Successfully!");
  //     form.resetFields();
  //     window.location.reload();
  //   });
  // };
  const pdfUrl = `/${imgFolders.drawings}/${latestPDF}`;

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
              src={PDF_URL + pdfUrl}
            />
          ) : null}
        </div>
        <div className="SignData">
          <div className="TitleWrapper">
            <div>
              <span>Project Id: </span>
              {pid}
            </div>
            <Title level={3}>
              <span>Drawings Signs</span>
            </Title>
          </div>
          <Result
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign Pdf"
            subTitle="Drawings Sign: Please check the information provided below before signing."
            extra={[
              <Row key={1} gutter={24}>
                <Col span={24}>
                  <Form
                    key={2}
                    onFinishFailed={submitFailed}
                    size="middle"
                    layout="vertical"
                    onFinish={signPDF}
                  >
                    <Form.Item {...FormProps("fileType", "File Type")}>
                      <Cascader options={optionsPdfSize} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        disabled={submitting}
                      >
                        Sign Pdf
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                {/* <Col span={12}>
                  <UploadSingedPDF
                    filename={filename + "." + filetype}
                    uploadPDF={uploadDrawing}
                    submitting={submitting}
                    type={foldertype}
                  />
                </Col> */}
              </Row>,
            ]}
          ></Result>
        </div>
      </div>
    </>
  );
};

export default SignDrawings;
