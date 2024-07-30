import { Link, useParams } from "react-router-dom";
import StoreySteps from "../../../Common/Headers/StoreySteps";
import UploadFilesDiv from "../ProjectCreate/Technical/UploadFiles/UploadFilesDiv";
import SignPdfLocal from "../../../Components/Consultant/UploadFiles/SignPdfLocal";

// const StoreyUploadFiles = ({ oldData = true }:{oldData: boolean}) => {
const StoreyUploadFiles = () => {
  const params = useParams();
  return (
    <>
      <StoreySteps
        id={params.pid ?? ""}
        title="Upload Documents"
        step="Step 7: "
        prev={`/project/create/storey/designfloor/${params.pid}`}
        // next={undefined}
      />
      <Link to={"/signconsultant/" + params.pid} target="_blank">
        <SignPdfLocal />
      </Link>
      <UploadFilesDiv />
    </>
  );
};

export default StoreyUploadFiles;
