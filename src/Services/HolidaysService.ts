import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get } from "./Api";

export const POSTholidays = (
  body: POSTholidayBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<GETholidayBody, POSTholidayBody>(
    "/holidays",
    body,
    messageApi
  );

export const GETholidays = () => get<ResGETholidayBOdy>("/holidays/getall");

export const DELholiday = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/holidays/deletebyid/" + id, messageApi);

export interface POSTholidayBody {
  description: string;
  engDate: string;
  nepDate: string;
  title: string;
}

export interface GETholidayBody extends POSTholidayBody {
  id: number;
}

export interface ResGETholidayBOdy {
  data: GETholidayBody[];
  message: string;
}
