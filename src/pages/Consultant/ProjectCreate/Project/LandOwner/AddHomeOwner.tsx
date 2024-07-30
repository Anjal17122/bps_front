import { useParams } from "react-router-dom";
import Person from "../../PersonAdd/Person";

const AddHomeOwner = () => {
  const params = useParams();
  return (
    <Person
      addPersonUrl={
        localStorage.getItem("isPerma") === "true"
          ? "/person/perma/house/owner?perma=true"
          : "/person/perma/house/owner"
      }
      pId={params.pid ?? ""}
      landId={parseInt(params.landid ?? "0")}
    />
  );
};

export default AddHomeOwner;
