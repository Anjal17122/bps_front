import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetPDFData,
  isDhulikhel,
  isNagarjun,
} from "../../../constants/CommonFunctions";
import { GETplinthPDF } from "../../../Services/PDFService";
import {
  getCertificateDetails,
  getCertificateType,
} from "../../../Services/PlinthService";
import FinalPlinthDesign from "./FinalPlinthDesign";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFBodyType } from "./PDFtypes";
import { municipalityDetails } from "../../../constants/constants";
import PlinthDhulikhel from "./PlinthDhulikhel";
import NagarjunPlinthDesign from "./Nagarjung/NagarjunPlinthDesign";
import { GETrasidList, RasidListType } from "../../../Services/FloorService";
import { useMapdandaPid } from "../../Admin/Mapdanda/useMapdanda";
import NagarjunFloorAddition from "./Nagarjung/NagarjunFloorAddition";

const FinalPDFPlinth = () => {
  const params = useParams<{
    pid: string;
    projectType: string;
    buildingPurpose: string;
  }>();

  // const [plinthData, setplinthdata] = useState<PlinthDataPDF>();

  // const [publishDetails, setPublishDetails] = useState<GETPublishLogs[]>();

  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const postBody: getCertificateType = {
    certificateType: "PLINTH",
    projectPermaId: params.pid ?? "0",
  };

  const [rasidList, setRasidList] = useState<RasidListType[]>();

  useEffect(() => {
    GETplinthPDF(params.pid ?? "0", messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        const PDFdata = GetPDFData(res, cert);
        setPdfData(PDFdata);
      });
    });
    GETrasidList(params.pid).then((res) => {
      setRasidList(res.data);
    });

    return () => {
      setRasidList(undefined);
      setPdfData(undefined);
    };
  }, []);

  const { mapdandaPid } = useMapdandaPid(
    Number(params.pid),
    messageApi,
    isDhulikhel() ? true : false
  );

  return (
    <div>
      {contextHolder}
      {pdfData && rasidList ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
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
          )}
          {/* <NagarjunFloorAddition pdfData={pdfData} rasidList={rasidList} /> */}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FinalPDFPlinth;
