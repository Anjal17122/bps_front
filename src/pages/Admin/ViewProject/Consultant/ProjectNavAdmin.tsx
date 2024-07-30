import React from "react";
import { Link } from "react-router-dom";
import TableButton from "../../../../Common/TableButton/TableButton";

const StepsNav = ({ id }: { id: string }) => {
  return (
    <div className="StepsNav">
      <div id="normal">
        <h4>Go to: </h4>
        <Link to={"/admin/view/project/projectdetails/" + id}>1. Project</Link>
        <Link to={"/admin/viewproject/applicant/" + id}>2. Applicant</Link>
        <Link to={"/admin/viewproject/land/" + id}>3. Land</Link>
        <Link to={"/admin/viewproject/charkilla/" + id}>4. Charkilla</Link>
        <Link to={"/admin/viewproject/owners/" + id}>5. Owners</Link>
      </div>
      <div id="technical">
        <Link to={"/admin/viewproject/floor/" + id}>6. Floor</Link>
        <Link to={"/admin/viewproject/bylaws/" + id}>7. By Laws</Link>
        <Link to={"/admin/viewproject/architectural/" + id}>
          8. Architectural
        </Link>
        <Link to={"/admin/viewproject/structural/" + id}>9. Structural</Link>
        <Link to={"/admin/viewproject/electrical/" + id}>10. Electrical</Link>
        <Link to={"/admin/viewproject/sanitation/" + id}>11. Sanitation</Link>
        <Link to={"/admin/viewproject/uploads/" + id}>12. Uploads</Link>
      </div>
    </div>
  );
};

interface Props {
  prev?: string;
  next?: string;
  title: string;
  step: string;
  id: string;
}

const ProjectNavAdmin = ({ prev, next, title, id, step }: Props) => {
  return (
    <>
      <div className="HeadBar">
        {prev ? (
          <Link to={prev}>
            <TableButton bgColor="blue">
              {"<<"} <span className="NextPrevious">Previous</span>
            </TableButton>
          </Link>
        ) : (
          <div style={{ width: 150 }}></div>
        )}
        <h1>
          {step} <span>{title}</span>
        </h1>
        {next ? (
          <Link to={next}>
            <TableButton bgColor="blue">
              <span className="NextPrevious">Next </span>
              {" >>"}
            </TableButton>
          </Link>
        ) : (
          <div style={{ width: 150 }}></div>
        )}
      </div>
      <StepsNav id={id} />
    </>
  );
};

export default ProjectNavAdmin;
