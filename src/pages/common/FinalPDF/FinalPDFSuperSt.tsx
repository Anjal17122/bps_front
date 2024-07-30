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
import FinalSuperStDesign from "./FinalSuperStDesign";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFBodyType } from "./PDFtypes";
import SuperStDhulikhel from "./SuperStDhulikhel";
import { municipalityDetails } from "../../../constants/constants";
import { useMapdandaPid } from "../../Admin/Mapdanda/useMapdanda";
import NagarjunSuperStDesign from "./Nagarjung/NagarjunSuperStDesign";
import { RasidListType, GETrasidList } from "../../../Services/FloorService";

const FinalPDFSuperSt = () => {
  const params: {
    pid?: string;
    chalanino?: string;
    patrasankhya?: string;
    projectType?: string;
    buildingPurpose?: string;
  } = useParams();

  // const [plinthData, setplinthdata] = useState<PlinthDataPDF>();
  const [pdfData, setPdfData] = useState<PDFBodyType>();

  const [messageApi, contextHolder] = message.useMessage();
  const [rasidList, setRasidList] = useState<RasidListType[]>();

  const postBody: getCertificateType = {
    certificateType: "SUPERSTRUCTURE",
    projectPermaId: params.pid ?? "0",
  };

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
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
            <SuperStDhulikhel
              data={{
                chalanino: params.chalanino ?? "0",
                patrasankhya: params.patrasankhya ?? "0",
                projectType: params.projectType ?? "0",
                buildingPurpose: params.buildingPurpose ?? "0",
              }}
              pdfData={pdfData}
              pid={params.pid}
              mapdandaPid={mapdandaPid}
            />
          ) : isNagarjun() ? (
            <NagarjunSuperStDesign
              pdfData={pdfData}
              rasidList={rasidList ?? []}
            />
          ) : (
            <FinalSuperStDesign
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

export default FinalPDFSuperSt;
