import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export const UploadNapi = (link: string, messageApi: MessageInstance) =>
  MyApi.get(link, messageApi);
