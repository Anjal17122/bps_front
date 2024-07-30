import { useParams } from "react-router-dom";
import Person from "../PersonAdd/Person";

const Applicant = () => {
  const params = useParams();
  return (
    <Person pId={params.pid ?? ""} addPersonUrl="/person/perma/applicant" />
  );
};

export default Applicant;
