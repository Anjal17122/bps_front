import React, { useContext } from "react";
// import StepsHeader from "../../../../Common/Headers/StepsHeader";
import EditSanitation from "./EditSanitation";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import AdSanitationFooter from "../../../../../../Components/Admin/Footers/AdSanitationFooter";
import { useParams } from "react-router-dom";
import PDFsanitation from "../../../../../../Common/ProjectPDFs/PDFsanitation";

interface Props {
  admin?: boolean;
}

const ViewSanitationAd = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);
  const sanitation = state.project.sanitationPlumbing
    ? JSON.parse(state.project.sanitationPlumbing.underWaterTank)
    : null;
  const params = useParams();
  const pid: string = params.pid ?? "";

  // const [sanitation, setSanitation] = useState<SanitationType>();
  // const [edit, setEdit] = useState(false);

  return (
    <div>
      {ifCon() ? null : <AdSanitationFooter pid={pid} />}
      {/* <ProjectNavAdmin
        id={pid}
        step="Step 11: "
        title="Sanitation"
        prev={`/admin/viewproject/electrical/${pid}`}
        next={`/admin/viewproject/uploads/${pid}`}
      />
        <StepsHeader
        id={pid}
        step="Step 11: "
        title="Sanitation"
        prev={`/project/create/electrical/${pid}`}
        next={`/project/create/uploadfiles/${pid}`}
      /> */}
      <ViewProjectHeader
        id={pid}
        step="Step 11: "
        title="Sanitation"
        prev={
          admin
            ? `/admin/viewproject/electrical/${pid}`
            : `/user/viewproject/electrical/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/uploads/${pid}`
            : `/user/viewproject/uploads/${pid}`
        }
      />
      <div className="CenterForm10">
        {state.project.id ? (
          <>
            <PDFsanitation data={sanitation} projectId={params.pid ?? "0"} />
            <SanitationCommon sanitation={sanitation} />
          </>
        ) : (
          <GoBackToProjects />
        )}
        {/* {sanitation ? (
        ) : (
          <RollingLoading height="20vh" />
      */}
      </div>
    </div>
  );
};

export default ViewSanitationAd;

export const SanitationCommon = ({ sanitation }: { sanitation: any }) => {
  return (
    <>
      <div className="TabWrapper">
        <div className="MyTableOuter">
          <table className="MyTable">
            <thead>
              <tr>
                <th colSpan={3}>
                  <div className="thSteps">
                    <b>Floor Area </b>
                  </div>
                </th>
              </tr>
              <tr>
                <th>Building Element</th>
                <th className="width80">As per submitted design</th>
                <th className="width80">Remarks</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <EditSanitation data={sanitation} />
    </>
  );
};
