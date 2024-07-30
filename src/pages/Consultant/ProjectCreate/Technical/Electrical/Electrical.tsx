import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConElectricalFooter from "../../../../../Components/Consultant/Footers/ConElectricalFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import ElectricalDiv from "./ElectricalDiv";

const Electrical = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();
  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConElectricalFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        step="Step 10: "
        title="Electrical"
        prev={`/project/create/structural/${params.pid}`}
        next={`/project/create/sanitation/${params.pid}`}
      />

      <ElectricalDiv />
    </div>
  );
};

export default Electrical;
