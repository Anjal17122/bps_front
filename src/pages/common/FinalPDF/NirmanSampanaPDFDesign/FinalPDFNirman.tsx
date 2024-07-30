import pdf from "@react-pdf/renderer";
import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GetPDFData,
  isDhulikhel,
  isNagarjun,
} from "../../../../constants/CommonFunctions";
import { GETplinthPDF } from "../../../../Services/PDFService";
import {
  getCertificateType,
  getCertificateDetails,
} from "../../../../Services/PlinthService";
import FinalNirmanDesign from "./FinalNirmanDesign";
import { PDFBodyType } from "../PDFtypes";
import NirmanSampannaDhulikhel from "../NirmanSampannaDhulikhel";
import { municipalityDetails } from "../../../../constants/constants";
import { useMapdandaPid } from "../../../Admin/Mapdanda/useMapdanda";
import NagarjunNirmanSampannaDesign from "../Nagarjung/NagarjunNirmanSampannaDesign";

const FinalPDFNirman = () => {
  const params = useParams<{
    pid: string;
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  }>();

  // const [publishDetails, setPublishDetails] = useState<GETPublishLogs[]>();

  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const postBody: getCertificateType = {
    certificateType: "NIRMAN_SAMPANNA",
    projectPermaId: params.pid ?? "",
  };

  const { pathname } = useLocation();

  useEffect(() => {
    GETplinthPDF(params.pid ?? "", messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        const PDFdata = GetPDFData(res, cert);
        setPdfData(PDFdata);
      });
    });

    // GETplinthPDF(params.pid ??"").then((res) => setplinthdata(res.data));
    // GetPublish(params.pid ?? "").then((res) => setPublishDetails(res.data));
    return () => {
      // setplinthdata(undefined);
      setPdfData(undefined);
    };
  }, [params.pid]);
  const { mapdandaPid } = useMapdandaPid(
    Number(params.pid),
    messageApi,
    isDhulikhel() ? true : false
  );

  const PDFViewer = pdf.PDFViewer;
  return (
    <div>
      {contextHolder}
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
            <NirmanSampannaDhulikhel
              pdfData={pdfData}
              pid={pdfData.pid}
              mapdandaPid={mapdandaPid}
              // backendData={plinthData}
              data={{
                chalanino: "",
                patrasankhya: "",
                projectType: params.projectType ?? "0",
                buildingPurpose: params.buildingPurpose ?? "0",
              }}
            />
          ) : isNagarjun() ? (
            <NagarjunNirmanSampannaDesign
              pdfData={pdfData}
              rasidList={[]}
              type={pathname}
            />
          ) : (
            <FinalNirmanDesign
              data={{
                chalanino: params.chalanino ?? "0",
                patrasankhya: params.patrasankhya ?? "0",
                projectType: params.projectType ?? "0",
                buildingPurpose: params.buildingPurpose ?? "0",
              }}
              pdfData={pdfData}
            />
          )}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FinalPDFNirman;
