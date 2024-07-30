import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL } from "../../../../../Services/Api";
import { sN } from "../../../../../Services/ProjectService";
import ApiService from "../OnDeskApiService";
import {
  GETNoticePublishBody,
  POSTnoticePublishBody,
  ResGETNoticePublishBody,
  ResRemarksList,
} from "./types";

const MyApi = new ApiService(BASE_URL);

export const uploadMuchulka = (id: sN, name: sN, messageApi: MessageInstance) =>
  MyApi.get(
    `/project/perma/upload/muchulka?id=${id}&muchulka=${name}`,
    messageApi
  );

export const POSTnoticePublish = (
  body: POSTnoticePublishBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<GETNoticePublishBody, POSTnoticePublishBody>(
    "/noticepublish",
    body,
    messageApi
  );

export const GETnoticePublished = (id: number, messageApi: MessageInstance) =>
  MyApi.get<ResGETNoticePublishBody>(
    "/noticepublish/by/projectid/" + id,
    messageApi
  );

export const GETmuchulkaRemarks = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResRemarksList>(`/project/perma/get/remarks?id=${id}`, messageApi);

export const AddMuchulkaRemarks = (
  id: sN,
  remarks: string,
  remarksFile: string,
  messageApi: MessageInstance
) =>
  MyApi.get(
    `/project/perma/add/remarks?id=${id}&remarks=${remarks}&remarksFile=${remarksFile}`,
    messageApi
  );
