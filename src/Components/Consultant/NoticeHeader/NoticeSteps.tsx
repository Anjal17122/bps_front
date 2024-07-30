import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyStore, ActionType } from "../../../Store/ContextApi";

interface Props {
  id: string;
  isTechnical: boolean;
  tempId: string;
}

const NoticeSteps = ({ id }: Props) => {
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
  const onlyTechnical = localStorage.getItem("onlyTechnical") === "true";
  return (
    <div className="StepsNav">
      <div className="buttons">
        {ApplicantBtn} {TechnicalBtn}
        {/* {onlyTechnical ? (
          TechnicalBtn
        ) : checkIfBoth ? (
          <>
            {ApplicantBtn} {TechnicalBtn}
          </>
        ) : (
          ApplicantBtn
        )} */}
        {/* {onlyTechnical && TechnicalBtn} */}
        {/* {!isTechnical && !checkIfBoth && ApplicantBtn}
        {isTechnical && !checkIfBoth && TechnicalBtn} */}
      </div>
      <h4>Go to: </h4>
      {!onlyTechnical ? (
        <div id="Applicant">
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/view/project/" + id + "/" + id
                : "/admin/view/project/projectdetails/" + id + "/" + id
            }
          >
            1. Project
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/applicant/" + id + "/" + id
                : "/admin/viewproject/applicant/" + id + "/" + id
            }
          >
            2. Applicant
          </Link>
          <Link
            to={
              myRole === "ROLE_Consultant"
                ? "/project/create/landinfo/" + id + "/" + id
                : "/admin/viewproject/land/" + id + "/" + id
            }
          >
            3. Land
          </Link>
          <Link
            to={getRole(
              "/project/create/charkilla/" + id + "/" + id,
              "/admin/viewproject/charkilla/" + id + "/" + id
            )}
          >
            4. Charkilla
          </Link>
          <Link
            to={getRole(
              "/project/create/landowners/" + id + "/" + id,
              "/admin/viewproject/owners/" + id + "/" + id
            )}
          >
            5. Owners
          </Link>
        </div>
      ) : (
        <div id="technical">
          <Link
            to={getRole(
              "/project/edit/designfloor/" + id + "/" + id,
              "/admin/viewproject/floor/" + id + "/" + id
            )}
          >
            6. Floor
          </Link>
          <Link
            to={getRole(
              "/project/create/buildingbylaws/" + id + "/" + id,
              "/admin/viewproject/bylaws/" + id + "/" + id
            )}
          >
            7. By Laws
          </Link>
          <Link
            to={getRole(
              "/project/create/architectural/" + id + "/" + id,
              "/admin/viewproject/architectural/" + id + "/" + id
            )}
          >
            8. Architectural
          </Link>
          <Link
            to={getRole(
              "/project/create/structural/" + id + "/" + id,
              "/admin/viewproject/structural/" + id + "/" + id
            )}
          >
            9. Structural
          </Link>
          <Link
            to={getRole(
              "/project/create/electrical/" + id + "/" + id,
              "/admin/viewproject/electrical/" + id + "/" + id
            )}
          >
            10. Electrical
          </Link>
          <Link
            to={getRole(
              "/project/create/sanitation/" + id + "/" + id,
              "/admin/viewproject/sanitation/" + id + "/" + id
            )}
          >
            11. Sanitation
          </Link>
          <Link
            to={getRole(
              "/project/create/uploadfiles/" + id + "/" + id,
              "/admin/viewproject/uploads/" + id + "/" + id
            )}
          >
            12. Analysis & Drawings
          </Link>
          {/* <Link to={"/project/create/completeform/" + id + "/" + id}>13. Finish</Link> */}
        </div>
      )}
    </div>
  );
};

export default NoticeSteps;
