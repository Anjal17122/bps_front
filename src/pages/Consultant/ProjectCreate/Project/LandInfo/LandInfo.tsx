import "../../../../../Assets/scss/Project.scss";
import { useParams } from "react-router-dom";
import LandInfoDiv from "./LandInfoDiv";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

const LandInfo = ({ oldData = true }: { oldData?: boolean }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div className="gradientbg">
      <StepsHeader
        id={params.pid ?? "0"}
        title="Land Information"
        step="Step 3: "
        prev={`/project/create/applicant/${params.pid ?? "0"}`}
        next={`/project/create/charkilla/${params.pid ?? "0"}`}
      />

      <LandInfoDiv />
    </div>
  );
};

export default LandInfo;
