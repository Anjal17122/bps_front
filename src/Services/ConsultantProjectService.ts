import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, get, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { ResGETnoticeapproved, ResOnDesk, sN } from "./ProjectService";
import { size } from "../constants/constants";

const MyApi = new ApiService(BASE_URL);

export const getNoticeApprovedCon = (page: number) =>
  get<ResOnDesk>(`/project/perma/own/notice/published?page=${page}&size=10`);

export const GETnoticeApprovedCo = (
  page: number,
  messageApi: MessageInstance
) =>
  MyApi.get<ResOnDesk>(
    `/project/perma/own/notice/published?page=${page}&size=${size}`,
    messageApi
  );

export const getTechnicalApprovedCon = (page: number) =>
  get<ResGETnoticeapproved>(
    `/project/perma/own/technical/approved?page=${page}&size=10`
  );

export const GETMuchulkaCon = (page: number) =>
  get<ResOnDesk>(`/project/perma/own/muchulka?page=${page}&size=10`);

export const GETMuchulkaCo = (page: number, messageApi: MessageInstance) =>
  MyApi.get<ResOnDesk>(
    `/project/perma/own/muchulka?page=${page}&size=${size}`,
    messageApi
  );

export const forwardTechnical = (tempId: sN, permaId: sN, sets: setSTyp) =>
  getWSub(
    `/project/perma/submit/technical?temp_id=${tempId}&perma_id=${permaId}`,
    sets
  );
