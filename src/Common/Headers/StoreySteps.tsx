import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ActionType, MyStore } from "../../Store/ContextApi";
import TableButton from "../TableButton/TableButton";
import StepsStoreyAddition from "./StepsStoreyAddition";

interface Props {
  prev: string | null;
  next?: string;
  title: string;
  step: string;
  id: string;
}

const StoreySteps = ({ prev, next, title, id, step }: Props) => {
  const { dispatch } = useContext(MyStore);
  const { pathname } = useLocation();

  function testIfTechnical(path: string) {
    if (
      path.includes("designfloor") ||
      // path.includes("buildingbylaws") ||
      // path.includes("architectural") ||
      // path.includes("structural") ||
      // path.includes("electrical") ||
      // path.includes("sanitation") ||
      path.includes("upload")
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    dispatch({
      type: ActionType.setNavType,
      payload: testIfTechnical(pathname),
    });
    return () => {
      dispatch({
        type: ActionType.setNavType,
        payload: false,
      });
    };
  }, []);

  return (
    <>
      <div className="HeadBar">
        {prev ? (
          <Link to={prev}>
            <TableButton bgColor="blue">{"<<"} Previous</TableButton>
          </Link>
        ) : (
          <div style={{ width: 150 }}></div>
        )}
        <h1>
          {step} <span className="title">{title}</span>
        </h1>
        {next ? (
          <Link to={next}>
            <TableButton bgColor="blue">Next{">>"}</TableButton>
          </Link>
        ) : (
          <div style={{ width: 150 }}></div>
        )}
      </div>
      <StepsStoreyAddition projectId={id} />
    </>
  );
};

export default StoreySteps;
