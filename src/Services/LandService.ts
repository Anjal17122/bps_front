import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { sN } from "./ProjectService";

export const setSameLand = (
  body: SameLandBOdy,
  messageApi: MessageInstance,
  url = "/land/same/owner"
) => MyApi.post(url, body, messageApi);

export const uploadManjurinama = (
  id: sN,
  name: string,
  messageApi: MessageInstance
) =>
  MyApi.get(
    `/project/add/manjurinama?id=${id}&manjurinama=${name}`,
    messageApi
  );

export interface SameLandBOdy {
  id: number;
  ownerType: "HouseOwner" | "LandOwner";
}
