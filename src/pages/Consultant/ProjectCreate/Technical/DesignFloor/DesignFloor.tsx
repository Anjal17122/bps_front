import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../Assets/scss/TableFloor.scss";
import { Spin } from "antd";
import VacantDesignFloorDiv from "./VacantDesignFloorDiv";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";
import { GETfloorCategory } from "../../../../../Services/SuperAdminService";

const DesignFloor = ({ oldData = false }: { oldData?: boolean }) => {
  const params = useParams<{ pid: string; tempId: string }>();

  const [floors, setFloors] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  useEffect(() => {
    GETfloorCategory().then((res) => {
      const floorNames = res.data.map((floor) => {
        return { label: floor.name, value: floor.name };
      });
      setFloors(floorNames);
    });
    return () => {
      setFloors(undefined);
    };
  }, []);
  return (
    <>
      <StepsHeader
        id={params.pid ?? "0"}
        title="Design Floor"
        step="Step 6: "
        prev={`/project/create/landowners/${params.pid ?? "0"}`}
        next={`/project/create/buildingbylaws/${params.pid ?? "0"}`}
      />
      {floors ? <VacantDesignFloorDiv /> : <Spin />}
    </>
  );
};

export default DesignFloor;
