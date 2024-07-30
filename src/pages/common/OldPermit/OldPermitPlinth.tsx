import { Spin, message } from "antd";
import { PDFViewer } from "@react-pdf/renderer";
import { useOldPermitId } from "./useOldPermit";
import { useParams } from "react-router-dom";
import { mapFromPermit } from "./utils";
import NagarjunPlinthDesign from "../FinalPDF/Nagarjung/NagarjunPlinthDesign";
import { mapOldPermitToPlinth } from "./OldPermitPdf/oldPermitTypes";

const OldPermitPlinth = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const { oldPermitId } = useOldPermitId(Number(id), messageApi);

  return (
    <div>
      {contextHolder}
      {oldPermitId ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <NagarjunPlinthDesign
            pdfData={mapOldPermitToPlinth(oldPermitId)}
            rasidList={[]}
          />
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default OldPermitPlinth;
