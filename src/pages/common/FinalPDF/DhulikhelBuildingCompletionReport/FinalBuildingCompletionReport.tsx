import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BuildingReportPdfDataType,
  getBuildingCompletionReportData,
  getBuildingCompletionReportDataByProjectId,
} from "./BuildingCompletionReportService";
import { PDFViewer } from "@react-pdf/renderer";
import { BuildingCompletionReportPdf } from "./BuildingCompletionReportPdf";

const FinalBuildingCompleteReport = () => {
  const params = useParams<{
    pid: string;
  }>();

  const [pdfData, setPdfData] = useState<BuildingReportPdfDataType>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getBuildingCompletionReportDataByProjectId(
      params.pid ?? "0",
      messageApi
    ).then((res) => {
      setPdfData(res.data);
    });
  }, []);

  return (
    <div>
      {contextHolder}
      {pdfData != undefined ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <BuildingCompletionReportPdf pdfData={pdfData} />
        </PDFViewer>
      ) : (
        <Spin></Spin>
      )}
    </div>
  );
};

export default FinalBuildingCompleteReport;
