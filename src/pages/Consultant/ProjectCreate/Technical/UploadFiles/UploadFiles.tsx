import { Link, useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import SignPdfLocal from "../../../../../Components/Consultant/UploadFiles/SignPdfLocal";
import UploadFilesDiv from "./UploadFilesDiv";

const UploadFiles = ({ oldData = true }: { oldData?: boolean }) => {
  const params: { pid?: string; tempId?: string } = useParams();
  return (
    <div style={{ background: "#EFECF8" }}>
      <StepsHeader
        id={params.pid ?? ""}
        step="Step 12: "
        title="Upload Documents"
        prev={`/project/create/sanitation/${params.pid}`}
      />

      <Link to={"/signconsultant/" + params.pid} target="_blank">
        <SignPdfLocal />
      </Link>
      <UploadFilesDiv />
    </div>
  );
};

export default UploadFiles;
