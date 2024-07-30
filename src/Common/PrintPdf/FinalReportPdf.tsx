import { PDFViewer } from "@react-pdf/renderer";
import { BuildingCompletionPdf } from "./BuildingCompletionPdf";

const FinalReportPdf = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <BuildingCompletionPdf />
    </PDFViewer>
  );
};
export default FinalReportPdf;
