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
import { GETrasidList, RasidListType } from "../../../../Services/FloorService";
import NagarjunNaamsariDesign from "./NagarjunNaamsariDesign";
import { useQuery } from "@tanstack/react-query";
import { GetCertLogs } from "../../../Admin/OnDeskFinal/OnDeskService/ApprovedService/ApprovedService";
import { GETPublishLogs } from "../../../Admin/OnDeskFinal/OnDeskService/ApprovedService/types";

const FinalPDFNaamsariNagarjun = () => {
  const params = useParams<{
    pid: string;
  }>();

  const [pdfData, setPdfData] = useState<PDFBodyType>();
  const [messageApi, contextHolder] = message.useMessage();
  const pid: string = params.pid ?? "0";

  const postBody: getCertificateType = {
    certificateType: "PLINTH",
    projectPermaId: pid,
  };

  const [rasidList, setRasidList] = useState<RasidListType[]>();

  const { data: publishedLogs } = useQuery<GETPublishLogs[]>({
    queryKey: ["GetCertLogs", pid],
    queryFn: () => GetCertLogs(pid, messageApi).then((res) => res.data),
  });

  useEffect(() => {
    GETplinthPDF(pid, messageApi).then((res) => {
      getCertificateDetails(postBody).then((cert) => {
        const PDFdata = GetPDFData(res, cert);
        setPdfData(PDFdata);
      });
    });
    GETrasidList(pid).then((res) => {
      setRasidList(res.data);
    });

    return () => {
      setRasidList(undefined);
      setPdfData(undefined);
    };
  }, []);

  return (
    <div>
      {contextHolder}
      {pdfData && rasidList && publishedLogs ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <NagarjunNaamsariDesign
            pdfData={pdfData}
            rasidList={rasidList}
            publishedLogs={publishedLogs}
          />
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FinalPDFNaamsariNagarjun;
