import { MessageInstance } from "antd/es/message/interface";
import { dispatch } from "../../Store/StoreViewProject/StoreViewProj";
import ApiService from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL } from "../Api";

const MyApi = new ApiService(BASE_URL);

export type DigitalSignStatus = "Active" | "Disabled" | "Inactive";

export const ChangeDigitalSignStatus = (
  status: DigitalSignStatus,
  id: number,
  messageApi: MessageInstance
) => MyApi.patchNoBody("/emsigner/status/" + `${status}/${id}`, messageApi);
