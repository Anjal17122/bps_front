import "../../../../../Assets/scss/TableFloor.scss";
import { useParams } from "react-router-dom";

import VacantDesignEditDiv from "./VacantDesignEditDiv";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConFloorFooter from "../../../../../Components/Consultant/Footers/ConFloorFooter";

// const EditDesignFloor = ({ oldData = true }) => {
const EditDesignFloor = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  // const [floors, setFloors] = useState<
  //   {
  //     label: string;
  //     value: number;
  //   }[]
  // >();

  // useEffect(() => {
  //   GETfloorCategory().then((res) => {
  //     const floorNames = res.data.map((floor) => {
  //       return { label: floor.name, value: floor.id };
  //     });
  //     setFloors(floorNames);
  //   });
  //   return () => {
  //     setFloors(undefined);
  //   };
  // }, []);

  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConFloorFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        title="Edit Design Floor"
        step="Step 6: "
        prev={`/project/create/landowners/${params.pid}`}
        next={`/project/create/buildingbylaws/${params.pid}`}
      />

      <VacantDesignEditDiv />
    </div>
  );
};

export default EditDesignFloor;
