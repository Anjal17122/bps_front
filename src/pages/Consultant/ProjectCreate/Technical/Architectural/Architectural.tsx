import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConArchitecturalFooter from "../../../../../Components/Consultant/Footers/ConArchitecturalFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";
import ArchitecturalDiv from "./ArchitecturalDiv";

const Architectural = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConArchitecturalFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        step="Step 8: "
        title="Architectural"
        prev={`/project/create/buildingbylaws/${params.pid}`}
        next={`/project/create/structural/${params.pid}`}
      />

      <ArchitecturalDiv />
    </div>
  );
};

export default Architectural;
