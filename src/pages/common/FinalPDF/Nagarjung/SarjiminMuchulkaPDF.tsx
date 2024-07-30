import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETplinthPDF } from "../../../../Services/PDFService";
import SarjiminMuchulkaNagarjung from "./SarjiminMuchulkaNagarjung";
import { MuchulkaPDFdata } from "../PDFtypes";
import {
  isNagarjun,
  mapMuchulkaData,
} from "../../../../constants/CommonFunctions";
import { PDFViewer } from "@react-pdf/renderer";
import { getSarjiminMuchulka } from "../../../../Services/NewMuchulkaService";

const SarjiminMuchulkaPDF = () => {
  const params = useParams<{
    pid: string;
    projectType: string;
    buildingPurpose: string;
  }>();

  const [pdfData, setPdfData] = useState<MuchulkaPDFdata>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const pid = params.pid ?? "0";
    GETplinthPDF(pid, messageApi).then((res) => {
      getSarjiminMuchulka(pid, messageApi).then(({ data }) => {
        const PDFdata = mapMuchulkaData(res, data);
        setPdfData(PDFdata);
      });
    });

    return () => {
      setPdfData(undefined);
    };
  }, [params.pid ?? "0"]);

  return (
    <div>
      {contextHolder}
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {isNagarjun() ? (
            <SarjiminMuchulkaNagarjung pdfData={pdfData} />
          ) : (
            <>No Data</>
          )}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default SarjiminMuchulkaPDF;
