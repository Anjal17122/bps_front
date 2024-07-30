import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProjectType } from "../../pages/Consultant/ProjectCreate/SelectProjectType";
import { ActionType, MyStore } from "../../Store/ContextApi";

interface Props {
  id: string;
  isTechnical: boolean;
}

const StepsNav = ({ id, isTechnical }: Props) => {
  const { state, dispatch } = useContext(MyStore);

  const myRole = localStorage.getItem("role");
  const getRole = (url: string, adminUrl: string): string =>
    myRole === "ROLE_Consultant" ? url : adminUrl;

  const ApplicantBtn = (
    <button
      style={{ backgroundColor: state.navType ? "transparent" : "#c7ec7d" }}
      className="NoStyleBtnSm"
      onClick={() =>
        dispatch({
          type: ActionType.setNavType,
          payload: false,
        })
      }
    >
      Applicant
    </button>
  );

  const TechnicalBtn = (
    <button
      style={{
        backgroundColor: !state.navType ? "transparent" : "#c7ec7d",
      }}
      className="NoStyleBtnSm"
      onClick={() =>
        dispatch({
          type: ActionType.setNavType,
          payload: true,
        })
      }
    >
      Technical
    </button>
  );
  const checkIfBoth = localStorage.getItem("showBothBtns") === "true";
  return (
    <div className="StepsNav">
      <div className="buttons">
        <>
          {ApplicantBtn} {TechnicalBtn}
          {/* {checkIfBoth && ApplicantBtn}
          {checkIfBoth && TechnicalBtn}
          {!isTechnical && !checkIfBoth && ApplicantBtn}
          {isTechnical && !checkIfBoth && TechnicalBtn} */}
        </>
      </div>
      <h4>Go to: </h4>
      {!state.navType ? (
        <div id="Applicant">
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/view/project/" + id
                : "/admin/view/project/projectdetails/" + id
            }
          >
            1. Project
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/applicant/" + id
                : "/admin/viewproject/applicant/" + id
            }
          >
            2. Applicant
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/landinfo/" + id
                : "/admin/viewproject/land/" + id
            }
          >
            3. Land
          </Link>
          <Link
            to={getRole(
              "/project/create/charkilla/" + id,
              "/admin/viewproject/charkilla/" + id
            )}
          >
            4. Charkilla
          </Link>
          <Link
            to={getRole(
              "/project/create/landowners/" + id,
              "/admin/viewproject/owners/" + id
            )}
          >
            5. Owners
          </Link>
        </div>
      ) : localStorage.getItem("ProjectType") === ProjectType.e ? (
        <div id="technical">
          <Link
            to={getRole(
              "/project/create/storey/designfloor/" + id,
              "/admin/viewstorey/designfloor/" + id
            )}
          >
            6. Floor
          </Link>

          <Link
            to={getRole(
              "/project/create/storey/upload/" + id,
              "/admin/viewproject/uploads/" + id
            )}
          >
            7. Analysis & Drawings
          </Link>
        </div>
      ) : (
        <div id="technical">
          <Link
            to={getRole(
              "/project/edit/designfloor/" + id,
              "/admin/viewproject/floor/" + id
            )}
          >
            6. Floor
          </Link>
          <Link
            to={getRole(
              "/project/create/buildingbylaws/" + id,
              "/admin/viewproject/bylaws/" + id
            )}
          >
            7. By Laws
          </Link>
          <Link
            to={getRole(
              "/project/create/architectural/" + id,
              "/admin/viewproject/architectural/" + id
            )}
          >
            8. Architectural
          </Link>
          <Link
            to={getRole(
              "/project/create/structural/" + id,
              "/admin/viewproject/structural/" + id
            )}
          >
            9. Structural
          </Link>
          <Link
            to={getRole(
              "/project/create/electrical/" + id,
              "/admin/viewproject/electrical/" + id
            )}
          >
            10. Electrical
          </Link>
          <Link
            to={getRole(
              "/project/create/sanitation/" + id,
              "/admin/viewproject/sanitation/" + id
            )}
          >
            11. Sanitation
          </Link>
          <Link
            to={getRole(
              "/project/create/uploadfiles/" + id,
              "/admin/viewproject/uploads/" + id
            )}
          >
            12. Analysis & Drawings
          </Link>
        </div>
      )}
    </div>
  );
};

export default StepsNav;
