import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPDFData } from "../../../../constants/CommonFunctions";
import { GETplinthPDF } from "../../../../Services/PDFService";
import {
  getCertificateDetails,
  getCertificateType,
} from "../../../../Services/PlinthService";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFBodyType } from "../PDFtypes";
import SuperStTippaniDesign from "./SuperStTippaniDesign";
import NirmanSampannaTippaniDesign from "./NirmanSampannaTippaniDesign";

const NirmanSampannaTippaniPdf = () => {
  const params = useParams<{
    pid: string;
    // projectType: string;
    // buildingPurpose: string;
  }>();

  // const [plinthData, setplinthdata] = useState<PlinthDataPDF>();

  // const [publishDetails, setPublishDetails] = useState<GETPublishLogs[]>();

  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const postBody: getCertificateType = {
    certificateType: "TIPPANI_NIRMAN_SAMPANNA",
    projectPermaId: params.pid ?? "0",
  };

  useEffect(() => {
    GETplinthPDF(params.pid ?? "0", messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        const PDFdata = GetPDFData(res, cert);
        setPdfData(PDFdata);
      });
    });

    return () => {
      setPdfData(undefined);
    };
  }, []);

  // const { mapdandaPid } = useMapdandaPid(
  //   Number(params.pid),
  //   messageApi,
  //   isDhulikhel() ? true : false
  // );

  return (
    <div>
      {contextHolder}
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <NirmanSampannaTippaniDesign pdfData={pdfData} />

          {/* {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
            <PlinthDhulikhel
              pid={params.pid}
              pdfData={pdfData}
              // backendData={plinthData}
              data={{
                chalanino: "",
                patrasankhya: "",
                projectType: params.projectType ?? "0",
                buildingPurpose: params.buildingPurpose ?? "0",
              }}
              mapdandaPid={mapdandaPid}
            />
          ) : isNagarjun() ? (
            <NagarjunPlinthDesign pdfData={pdfData} rasidList={rasidList} />
          ) : (
            <FinalPlinthDesign
              pdfData={pdfData}
              // backendData={plinthData}
              data={{
                chalanino: "",
                patrasankhya: "",
                projectType: params.projectType ?? "0",
                buildingPurpose: params.buildingPurpose ?? "0",
              }}
            />
          )} */}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default NirmanSampannaTippaniPdf;
