import { PDFViewer } from "@react-pdf/renderer";
import NagarjunPlinthDesign from "../../FinalPDF/Nagarjung/NagarjunPlinthDesign";
import { useOldPermitId } from "../useOldPermit";
import { Spin, message } from "antd";
import { NagarjunPlinthType, mapOldPermitToPlinth } from "./oldPermitTypes";
import { PUToldPermit } from "../../../../Services/OldPermitService";

type Props = {};

const OldPermitPlinth = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { oldPermitId, isLoading } = useOldPermitId(0, messageApi);

  if (!oldPermitId) {
    return <Spin />;
  }

  return (
    <div>
      {contextHolder}
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <NagarjunPlinthDesign
          pdfData={mapOldPermitToPlinth(oldPermitId)}
          rasidList={{} as any}
        />
      </PDFViewer>
    </div>
  );
};

export default OldPermitPlinth;
