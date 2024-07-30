import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { MapdandaType } from "../pages/Admin/Mapdanda/utils";

export const getMapdanda = (id: number, messageApi: MessageInstance) =>
  MyApi.get<ResgetMapdanda>("/mapdanda/project?id=" + id, messageApi);

export const checkMapdanda = (id: number, messageApi: MessageInstance) =>
  MyApi.get<{ data: boolean; message: string }>(
    "/mapdanda/project/exists?id=" + id,
    messageApi
  );

export const postMapdanda = (
  body: PostMapdandaBody[],
  messageApi: MessageInstance
) => MyApi.post("/mapdanda", body, messageApi);

export const putMapdanda = (
  body: PostMapdandaBody[],
  messageApi: MessageInstance
) => MyApi.put("/mapdanda", body, messageApi);

export interface PostMapdandaBody {
  standard: string;
  actual: string;
  remarks: string;
  projectId: number;
  type: MapdandaType;
}

export interface ResgetMapdanda {
  data: GetMapdandaBody;
  message: string;
}

export interface GetMapdandaBody {
  groundCoverageStandard: string;
  groundCoverageActual: string;
  groundCoverageRemarks: string;
  totalFloorAreaStandard: string;
  totalFloorAreaActual: string;
  totalFloorAreaRemarks: string;
  tallaStandard: string;
  tallaActual: string;
  tallaRemarks: string;
  rowStandard: string;
  rowActual: string;
  rowRemarks: string;
  setBackStandard: string;
  setBackActual: string;
  setBackRemarks: string;
  highTensionStandard: string;
  highTensionActual: string;
  highTensionRemarks: string;
  riverStandard: string;
  riverActual: string;
  riverRemarks: string;
  farStandard: string;
  farActual: string;
  farRemarks: string;
}
