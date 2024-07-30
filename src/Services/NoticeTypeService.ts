import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get } from "./Api";

export const POSTnoticePublish = (
  body: POSTnoticePublishBody,
  messageApi: MessageInstance
) => MyApi.post("/noticepublish", body, messageApi);

export const GETnoticePublish = (id: number) =>
  get<ResGETNoticePublishBody>("/noticepublish/by/projectid/" + id);

export interface POSTnoticePublishBody {
  chalaninum: string;
  dateEng: string;
  dateNep: string;
  filename?: string;
  noticeProjectType: string;
  noticeStatus: string;
  patrasankhya: string;
  projectId: number;
}

export interface ResGETNoticePublishBody {
  data: GETNoticePublishBody[];
  message: string;
}

export interface GETNoticePublishBody extends POSTnoticePublishBody {
  id: number;
  creationDate: string;
}
