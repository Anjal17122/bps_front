import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETplinthPDF, NoticePDFdata } from "../../../../Services/PDFService";
import { PDFViewer } from "@react-pdf/renderer";
import { FloorRow, PDFBodyType } from "../PDFtypes";
import MandandeupurAbhilekhikaran from "./MandandeupurAbhilekhikaran";
import { municipalityDetails } from "../../../../constants/constants";
import DhulikhelAbhilekhikaran from "./DhulikhelAbhilekhikaran";
import {
  CertificateOne,
  getCertificateDetails,
  getCertificateType,
} from "../../../../Services/PlinthService";
import { GetPDFData, isDhulikhel } from "../../../../constants/CommonFunctions";
import { useMapdandaPid } from "../../../Admin/Mapdanda/useMapdanda";

const FinalAbhilekikaran = () => {
  const params = useParams<{
    pid: string;
    chalanino: string;
    patrasankhya: string;
    pubdate: string;
  }>();

  const [certData, setCertData] = useState<CertificateOne>();

  const [floors, setFloors] = useState<FloorRow[]>();
  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [backendData, setBackendData] = useState<NoticePDFdata>();
  const [messageApi, contextHolder] = message.useMessage();
  const postBody: getCertificateType = {
    certificateType: "ABHILEKHIKARAN",
    projectPermaId: params.pid ?? "0",
  };

  useEffect(() => {
    GETplinthPDF(params.pid ?? "0", messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        setCertData(cert.data);
      });
      setFloors(JSON.parse(res.data.floor.floorDetail));
      setBackendData({
        applicant: res.data.applicant,
        lands: res.data.lands,
        floor: res.data.floor,
        structural: res.data.structural,
        byLaws: res.data.byLaws,
      });
    });
    GETplinthPDF(params.pid ?? "0", messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        const PDFdata = GetPDFData(res, cert);
        setPdfData(PDFdata);
      });
    });

    return () => {
      setFloors(undefined);
      setBackendData(undefined);
    };
  }, []);

  const certDetails = {
    chalanino: certData?.chalaniNum ?? "0",
    patrasankhya: certData?.patraSankhya ?? "0",
    date: certData?.publishedDateNep ?? "0",
  };
  const { mapdandaPid } = useMapdandaPid(
    Number(params.pid),
    messageApi,
    isDhulikhel() ? true : false
  );

  return (
    <div>
      {contextHolder}
      {floors && backendData && pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
            <DhulikhelAbhilekhikaran
              pdfData={pdfData}
              backendData={backendData}
              floors={floors}
              data={certDetails}
              mapdandaPid={mapdandaPid}
            />
          ) : (
            <MandandeupurAbhilekhikaran
              backendData={backendData}
              floors={floors}
              data={certDetails}
            />
          )}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FinalAbhilekikaran;
