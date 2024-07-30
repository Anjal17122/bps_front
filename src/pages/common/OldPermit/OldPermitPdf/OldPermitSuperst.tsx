import { PDFViewer } from "@react-pdf/renderer";
import { useOldPermitId } from "../useOldPermit";
import { Spin, message } from "antd";
import { mapOldPermitToPlinth } from "./oldPermitTypes";
import NagarjunSuperStDesign from "../../FinalPDF/Nagarjung/NagarjunSuperStDesign";

type Props = {};

const OldPermitSuperst = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { oldPermitId } = useOldPermitId(0, messageApi);

  if (!oldPermitId) {
    return <Spin />;
  }

  return (
    <div>
      {contextHolder}
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <NagarjunSuperStDesign
          pdfData={mapOldPermitToPlinth(oldPermitId)}
          rasidList={{} as any}
        />
      </PDFViewer>
    </div>
  );
};

export default OldPermitSuperst;
