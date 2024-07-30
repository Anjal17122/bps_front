import OldPermitForm from "./OldPermitForm";
import { FormInstance, message } from "antd";
import {
  POSToldPermit,
  postOldPermit,
} from "../../../Services/OldPermitService";
import { OldPermitValuesPOST } from "./types";
import { convertBStoAD } from "./useOldPermit";
import { useParams } from "react-router-dom";

const OldPermit = () => {
  const params = useParams();
  const type:
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "m" = params.type as
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "m";

  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (e: OldPermitValuesPOST, form: FormInstance<any>) => {
    const body: POSToldPermit = {
      ...e,
      category: { id: type === "h" ? 2 : type === "m" ? 3 : 0 },
      floorDetails: JSON.stringify(e.floorDetails),
      asthaiDateEng: convertBStoAD(e.asthaiDateNep),
      dartaDate: convertBStoAD(e.dartaDateNep),
      ward: {
        id: e.ward[0],
      },
      houseType: {
        id: e.houseType[0],
      },
      buildingType: {
        id: e.buildingType[0],
      },
    };

    postOldPermit(body, messageApi).then(() => {
      form.resetFields();
    });
  };

  return (
    <div className="CenterForm" style={{ backgroundColor: "#f5f5f5" }}>
      {contextHolder}
      <OldPermitForm handleFinish={handleFinish} />
    </div>
  );
};

export default OldPermit;
