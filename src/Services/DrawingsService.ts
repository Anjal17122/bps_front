import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

type stampTyp = "first" | "second" | "third" | "fourth";

export const StampA1 = (
  filename: string,
  stampType: stampTyp,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    `/a1pdf?filename=${filename}&type=${stampType}`,
    messageApi
  );

export const StampA3 = (
  filename: string,
  stampType: stampTyp,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    `/a3pdf?filename=${filename}&type=${stampType}`,
    messageApi
  );
