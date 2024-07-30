import OldPermitForm from "./OldPermitForm";
import { FormInstance, Spin, message } from "antd";
import { PUToldPermit, putOldPermit } from "../../../Services/OldPermitService";
import { OldPermitValuesPOST } from "./types";
import {
  convertBStoAD,
  convertToInitialOldPermit,
  useOldPermitId,
} from "./useOldPermit";
import { useParams } from "react-router-dom";

const EditOldPermit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();

  const { oldPermitId, refetch } = useOldPermitId(
    Number(params.id) ?? 0,
    messageApi
  );

  const handleFinish = (e: OldPermitValuesPOST, form: FormInstance<any>) => {
    const body: PUToldPermit = {
      ...e,
      id: oldPermitId?.id ?? 0,
      category: { id: oldPermitId?.category.id ?? 0 },
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
    putOldPermit(body, messageApi).then(() => {
      refetch();
    });
  };
  return (
    <div className="CenterForm" style={{ backgroundColor: "#f5f5f5" }}>
      {contextHolder}
      {oldPermitId ? (
        <OldPermitForm
          handleFinish={handleFinish}
          initialValues={convertToInitialOldPermit(oldPermitId)}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default EditOldPermit;
