import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ActionType, MyStore } from "../../../Store/ContextApi";

const OldDataSteps = () => {
  // const [tech, setTech] = useState(false);
  const { state, dispatch } = useContext(MyStore);

  const params = useParams();

  // const myRole = localStorage.getItem("role");
  // const getRole = (url: string, adminUrl: string): string =>
  //   myRole === "ROLE_Consultant" ? url : adminUrl;

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
        {ApplicantBtn}
        {TechnicalBtn}
      </div>
      <h4>Go to: </h4>
      {!state.navType ? (
        <div id="Applicant">
          <Link to={"/project/view/project/" + params.id}>1. Project</Link>
          <Link to={"/project/create/applicant/" + params.id}>
            2. Applicant
          </Link>
          <Link to={"/project/create/landinfo/" + params.id}>3. Land</Link>
          <Link to={"/project/create/charkilla/" + params.id}>
            4. Charkilla
          </Link>
          <Link to={"/project/create/landowners/" + params.id}>5. Owners</Link>
        </div>
      ) : (
        <div id="technical">
          <Link to={"/project/edit/designfloor/" + params.id}>6. Floor</Link>
          <Link to={"/project/create/buildingbylaws/" + params.id}>
            7. By Laws
          </Link>
          <Link to={"/project/create/architectural/" + params.id}>
            8. Architectural
          </Link>
          <Link to={"/project/create/structural/" + params.id}>
            9. Structural
          </Link>
          <Link to={"/project/create/electrical/" + params.id}>
            10. Electrical
          </Link>
          <Link to={"/project/create/sanitation/" + params.id}>
            11. Sanitation
          </Link>
          <Link to={"/project/create/uploadfiles/" + params.id}>
            12. Analysis & Drawings
          </Link>
        </div>
      )}
    </div>
  );
};

export default OldDataSteps;
