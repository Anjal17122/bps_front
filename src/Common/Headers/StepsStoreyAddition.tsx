import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sN } from "../../Services/ProjectService";
import { MyStore, ActionType } from "../../Store/ContextApi";

interface Props {
  projectId: sN;
}

const StepsStoreyAddition = ({ projectId }: Props) => {
  const myRole = localStorage.getItem("role");
  const getRole = (url: string, adminUrl: string): string =>
    myRole === "ROLE_Consultant" ? url : adminUrl;
  const { state, dispatch } = useContext(MyStore);

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
  return (
    <div className="StepsNav">
      <div className="buttons">
        {ApplicantBtn} {TechnicalBtn}
      </div>
      <h4>Go to: </h4>

      {!state.navType ? (
        <div id="Applicant">
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/view/project/" + projectId
                : "/admin/view/project/projectdetails/" + projectId
            }
          >
            1. Project
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/applicant/" + projectId
                : "/admin/viewproject/applicant/" + projectId
            }
          >
            2. Applicant
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/landinfo/" + projectId
                : "/admin/viewproject/land/" + projectId
            }
          >
            3. Land
          </Link>
          <Link
            to={getRole(
              "/project/create/charkilla/" + projectId,
              "/admin/viewproject/charkilla/" + projectId
            )}
          >
            4. Charkilla
          </Link>
          <Link
            to={getRole(
              "/project/create/landowners/" + projectId,
              "/admin/viewproject/owners/" + projectId
            )}
          >
            5. Owners
          </Link>
        </div>
      ) : (
        <div id="technical">
          <Link
            to={getRole(
              "/project/create/storey/designfloor/" + projectId,
              "/admin/viewstorey/designfloor/" + projectId
            )}
          >
            6. Floor
          </Link>

          <Link
            to={getRole(
              "/project/create/storey/upload/" + projectId,
              "/admin/viewproject/uploads/" + projectId
            )}
          >
            12. Analysis & Drawings
          </Link>
        </div>
      )}
    </div>
  );
};

export default StepsStoreyAddition;
