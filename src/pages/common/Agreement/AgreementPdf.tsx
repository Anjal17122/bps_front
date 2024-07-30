import { PDFViewer } from "@react-pdf/renderer";
import { Spin, message } from "antd";
import { useParams } from "react-router-dom";
import AgreementDesign from "./AgreementDesign";
import { useAgreementPdf } from "./useAgreement";

const AgreementPdf = () => {
  const { pid, date } = useParams<{
    pid: string;
    date: string;
  }>();

  const [messageApi, contextHolder] = message.useMessage();

  const { agreementPdf, refetch } = useAgreementPdf(pid ?? "0", messageApi);

  return (
    <div>
      {contextHolder}
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        {agreementPdf && (
          <AgreementDesign agreementPdf={agreementPdf} date={date ?? ""} />
        )}
      </PDFViewer>
    </div>
  );
};

export default AgreementPdf;
