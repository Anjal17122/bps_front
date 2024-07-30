import React, { useContext } from "react";
import "../../../../../../Assets/scss/Project.scss";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import LandCard from "./LandCard";
import { LandsWithOwner } from "../../../../../../Services/CreateProjectService";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import PDFland from "../../../../../../Common/ProjectPDFs/PDFLand";
import { ifCon } from "../ViewProject/ViewProject";
import { useParams } from "react-router-dom";
import AdProjectFooter from "../../../../../../Components/Admin/Footers/AdProjectFooter";
// import AdLandFooter from "../../../../Footers/AdLandFooter";
interface Props {
  admin?: boolean;
}

const LandInfoAdmin = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);

  const lands = state.project.lands;

  const params = useParams();
  const pid: string = params.pid ?? "";

  return (
    <div>
      {/* <ProjectNavAdmin
        id={match.params.pid}
        title="Land Information"
        step="Step 3: "
        prev={`/admin/viewproject/applicant/${match.params.pid}`}
        next={`/admin/viewproject/charkilla/${match.params.pid}`}
      /> */}
      <ViewProjectHeader
        id={pid}
        title="Land Information"
        step="Step 3: "
        prev={
          admin
            ? `/admin/viewproject/applicant/${pid}`
            : `/user/viewproject/applicant/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/charkilla/${pid}`
            : `/user/viewproject/charkilla/${pid}`
        }
      />
      <div className="CenterForm10">
        <LandInfoCommon lands={lands} pid={pid} />
      </div>
      {ifCon() ? null : <AdProjectFooter pid={pid} />}
      {/* <NextDiv myurl={`/project/create/charkilla/${match.params.pid}`} /> */}
    </div>
  );
};

export default LandInfoAdmin;

interface MyProps {
  lands: LandsWithOwner[];
  pid: string;
}

export const LandInfoCommon = ({ lands, pid }: MyProps) => {
  return (
    <>
      <div className="bluehead bgwhite" style={{ padding: "5px 2%" }}>
        <h2>Land Information</h2>
        <PDFland data={lands as any} projectId={pid} />
        {/* <Link to={`/project/create/addlandinfo/${match.params.pid}`}>
            <TableButton bgColor="green" width="150px">
              Add Land
            </TableButton>
          </Link> */}
      </div>
      {lands ? (
        lands.map((land, i) => <LandCard data={land} key={land.id} pid={pid} />)
      ) : (
        <GoBackToProjects />
      )}
    </>
  );
};
