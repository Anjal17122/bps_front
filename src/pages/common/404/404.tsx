import { Link, useNavigate } from "react-router-dom";
import "./Page404.scss";
import TableButton from "../../../Common/TableButton/TableButton";

const Page404 = () => {
  const history = useNavigate();

  return (
    <div className="Page404">
      <div className="content">
        <h4>404 | This page could not be found.</h4>
        <div className="mybuttons121">
          <TableButton
            bgColor="green"
            type="button"
            onClick={() => history(-1)}
          >
            {"<"} &nbsp;Go Back
          </TableButton>
          <Link to="/public/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
