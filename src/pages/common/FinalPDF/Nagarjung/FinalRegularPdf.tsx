import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PDFViewer } from "@react-pdf/renderer";
import { GETplinthPDF } from "../../../../Services/PDFService";
import {
  getCertificateType,
  getCertificateDetails,
} from "../../../../Services/PlinthService";
import { GetPDFData } from "../../../../constants/CommonFunctions";
import { PDFBodyType } from "../PDFtypes";
import NagarjunRegularDesign from "./NagarjunRegularDesign";

const FinalRegularPdf = () => {
  const params = useParams<{
    pid: string;
    projectType: string;
    buildingPurpose: string;
  }>();

  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const postBody: getCertificateType = {
    certificateType: "REGULAR",
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

  return (
    <div>
      {contextHolder}
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <NagarjunRegularDesign pdfData={pdfData} />
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FinalRegularPdf;
