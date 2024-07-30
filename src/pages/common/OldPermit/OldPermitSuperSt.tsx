import { Spin, message } from "antd";
import { PDFViewer } from "@react-pdf/renderer";
import { useOldPermitId } from "./useOldPermit";
import { useParams } from "react-router-dom";
import NagarjunSuperStDesign from "../FinalPDF/Nagarjung/NagarjunSuperStDesign";
import { mapFromPermit } from "./utils";

const OldPermitSuperSt = () => {
  const { pid } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const { oldPermitId } = useOldPermitId(Number(pid), messageApi);

  // pdfData: PDFBodyType;
  // rasidList: RasidListType[];

  return (
    <div>
      {contextHolder}
      {oldPermitId ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <NagarjunSuperStDesign
            pdfData={mapFromPermit(oldPermitId)}
            rasidList={[]}
          />
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default OldPermitSuperSt;
