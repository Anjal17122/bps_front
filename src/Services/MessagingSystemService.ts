import { MessageInstance } from "antd/es/message/interface";
import { get } from "./Api";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export const POSTmessagingSystem = (
  body: POSTmessagingSystemBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<MessagingSystemBody, POSTmessagingSystemBody>(
    "/adminmessage",
    body,
    messageApi
  );

export const GETmessagingSystem = (pid: string) =>
  get<ResGETmessagingSystem>("/adminmessage/projectid/" + pid);

export const DELmessagingSystem = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/adminmessage/deletebyid/" + id, messageApi);

export interface POSTmessagingSystemBody {
  designation: string;
  filename: string;
  name: string;
  parentId: number;
  projectId: number;
  status: string;
  message: string;
}

interface ResPOSTMessageSystem {
  data: MessagingSystemBody;
  message: string;
}

interface ResGETmessagingSystem {
  data: MessagingSystemBody[];
  message: string;
}

export interface MessagingSystemBody {
  id: number;
  creationDate: string;
  parentId: number;
  department: string;
  designation: string;
  status: string;
  userId: number;
  name: string;
  projectId: number;
  filename: string;
  message: string;
}
