import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL } from "../Api";
import { GETCommentsBOdy, POSTcommentBody } from "../CommentService";
import { DigitalSignProject } from "../DigitalSignatureService";
import { ResOnDesk, sN } from "../ProjectService";

const MyApi = new ApiService(BASE_URL);

export const replaceDrawing = (
  id: number,
  filename: string,
  title: string,
  messageApi: MessageInstance
) =>
  MyApi.putNoBody<ResReplaceDrawing>(
    `/file/perma/replace?id=${id}&filename=${filename}&title=${title}`,
    messageApi
  );

export type AllProjectStatus =
  | "PENDING"
  | "NOTICEPUBLISH"
  | "UPLOADMUCHULKA"
  | "APPROVED"
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMANSAMPANNA";

export const changeApprovedStatus = (
  id: sN,
  status: AllProjectStatus,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    `/project/perma/status1?id=${id}&status=${status}`,
    messageApi
  );

export const getOldDrawings = (id: number, messageApi: MessageInstance) =>
  MyApi.get<ResgetOldDrawings>(`/signed/old/${id}`, messageApi);

export const POSTcommentFinal = (
  body: POSTcommentBody,
  messageApi: MessageInstance
) => MyApi.postWres("/comment", body, messageApi);

export const GETcommentsFinal = (
  id: number,
  messageApi: MessageInstance,
  page = 0
) =>
  MyApi.get<GETCommentsBOdy>(
    `/comment/all?page=${page}&size=150&id=` + id,
    messageApi
  );

export const GETonDeskAll = (url: string, messageApi: MessageInstance) =>
  MyApi.get<ResOnDesk>(url, messageApi);

export const GETAllProjects = (page: string|number, size:string|number, messageApi: MessageInstance) =>
  MyApi.get<ResOnDesk>("/project/perma/all?page="+page+"&size="+size, messageApi);

export const GETdigiSignTab = (url: string, messageApi: MessageInstance) =>
  MyApi.get<ResDigiSignTab>(url, messageApi);

export type ResDigiSignTab = {
  data: DigitalSignProject[];
  message: string;
  total: number;
};

type ResgetOldDrawings = {
  data: ReplaceDrawingBody[];
  message: string;
};

type ResReplaceDrawing = {
  data: ReplaceDrawingBody;
  message: string;
};

export type ReplaceDrawingBody = {
  id: number;
  title: string;
  fileName: string;
  fileType: string;
  projectId: number;
  personId: number;
};
