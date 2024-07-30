import pdf from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinalNoticePDFDesign from "./FinalNoticePDFDesign";
import FinalNotice7PDFDesign from "../NoticeDhulikhel/FinalNotice7PDFDesign";
import { GETplinthPDF, PlinthDataPDF } from "../../../../Services/PDFService";
import {
  ResGetOneCertificate,
  getCertificateDetails,
} from "../../../../Services/PlinthService";
import { GetPDFData } from "../../../../constants/CommonFunctions";
import { PDFBodyType } from "../PDFtypes";

const FinalPDFNotice = () => {
  const params = useParams<{
    pid: string;
    chalanino: string;
    patrasankhya: string;
    date: string;
    createddate: string;
    type: "days15" | "days7";
  }>();

  const [noticeData, setNoticeData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    GETplinthPDF(params.pid ?? "0", messageApi).then((res) => {
      const cert: ResGetOneCertificate = {
        data: {
          certificateType: "PLINTH",
          projectPermaId: parseInt(params.pid ?? "0"),
          chalaniNum: params.chalanino ?? "",
          patraSankhya: params.patrasankhya ?? "",
          createdById: 0,
          id: 0,
          publishedDateEng: params.createddate ?? "",
          publishedDateNep: "",
          creationDate: params.createddate ?? "",
          tala: "",
        },
        message: "",
      };
      const PDFdata = GetPDFData(res, cert);
      setNoticeData(PDFdata);
    });

    return () => {
      setNoticeData(undefined);
    };
  }, []);
  const PDFViewer = pdf.PDFViewer;

  const dataDesign = {
    chalanino: params.chalanino === "empty" ? "" : params.chalanino,
    patrasankhya: params.patrasankhya ?? "0",
    date: params.date ?? "0",
    createddate: params.createddate ?? "0",
    type: params.type ?? "days15",
  };
  return (
    <div>
      {contextHolder}
      {noticeData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {params.type === "days7" ? (
            <FinalNotice7PDFDesign data={dataDesign} backendData={noticeData} />
          ) : (
            <FinalNoticePDFDesign data={dataDesign} backendData={noticeData} />
          )}
        </PDFViewer>
      ) : (
        <Spin />
      )}
      {/* <PDFDownloadLink document={<NoticePDFDesign />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
    </div>
  );
};

export default FinalPDFNotice;
