import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { ProjectImage } from "./ProjectImagesServices";

interface ResGetAddDoc {
  data: AdditionalDocBody[];
  message: string;
}

export interface AdditionalDocBody {
  id: number;
  name: string;
  projectId: number;
  creationDate: string;
  description: string;
}

export const GETadditionalDocs = (id: number, messageApi: MessageInstance) =>
  MyApi.get<ResGetAddDoc>("/project/document/by/project?id=" + id, messageApi);

export const POSTadditionalDoc = (
  body: ProjectImage,
  messageApi: MessageInstance
) => MyApi.post("/project/document", body, messageApi);

export const delAdditionalDoc = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/project/document?id=" + id, messageApi);

export const patchAdditionalDoc = (
  body: { id: number; name: string },
  messageApi: MessageInstance
) => MyApi.patch("/project/document", body, messageApi);

export const UploadWardTechnical = (
  body: POSTUploadWardBody,
  messageApi: MessageInstance
) => MyApi.post("/project/perma/upload/ward", body, messageApi);

export interface POSTUploadWardBody {
  projectId: number;
  wardFileName: string;
}
