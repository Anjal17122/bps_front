import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConSanitationFooter from "../../../../../Components/Consultant/Footers/ConSanitationFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import SanitationDiv from "./SanitationDiv";
// import CreatePDF from "../../../../Common/CreatePDF/CreatePDF";
// import { PDFViewer } from "@react-pdf/renderer";

const Sanitation = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConSanitationFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        step="Step 11: "
        title="Sanitation"
        prev={`/project/create/electrical/${params.pid}`}
        next={`/project/create/uploadfiles/${params.pid}`}
      />

      <SanitationDiv />
    </div>
  );
};

export default Sanitation;
