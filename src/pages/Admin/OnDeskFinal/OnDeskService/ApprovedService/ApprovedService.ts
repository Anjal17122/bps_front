import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL } from "../../../../../Services/Api";
import { sN } from "../../../../../Services/ProjectService";
import { POSTPublishCertBody } from "../../../../../Services/PublishService";
import ApiService from "../OnDeskApiService";
import { ResGetPublish, ResPlinthDatas } from "./types";

const MyApi = new ApiService(BASE_URL);

export const GETPlinthDatas = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResPlinthDatas>(`/project/perma/get/plinth?id=${id}`, messageApi);

export const PostPublish = (
  data: POSTPublishCertBody,
  messageApi: MessageInstance
) => MyApi.postWres("/certificate", data, messageApi);

export const PostTippani = (data: any, messageApi: MessageInstance) =>
  MyApi.postWres("/tippani", data, messageApi);

export const PostNirmansampanna = (data: NirsampannaType, messageApi: MessageInstance) =>
  MyApi.postWres("/nirmansampanna", data, messageApi);

export const GetCertLogs = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetPublish>("/certificate?projectId=" + id, messageApi);

export const GetTippani = (
  id: sN,
  type: "TIPPANI_PLINTH" | "TIPPANI_SUPERSTRUCTURE" | "TIPPANI_NIRMAN_SAMPANNA",
  messageApi: MessageInstance
) => MyApi.get<any>("/tippani?projectId=" + id + `&type=${type}`, messageApi);

export const GetNoticePublishDay15 = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<any>("/noticepublish/day15?id=" + id, messageApi);

export const approvePlinth = (
  status: "VERIFIED" | "UNVERIFIED" | "CORRECTION_REQUESTED",
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    "/plinth/change/status?status=" + status + `&id=${id}`,
    messageApi
  );

export const approveSuperSt = (
  status: "VERIFIED" | "UNVERIFIED",
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    "/superstructure/change/status?status=" + status + `&id=${id}`,
    messageApi
  );

  export interface NirsampannaType {
    imageName:string;
    projectId:number|string;
  }
