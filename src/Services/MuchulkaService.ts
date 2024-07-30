import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

const MyApi = new ApiService(BASE_URL);

export const uploadMuchulka = (id: sN, name: sN, sets: setSTyp) =>
  getWSub(`/project/perma/upload/muchulka?id=${id}&muchulka=${name}`, sets);

export const uploadMuchulkaNoValid = (id: sN, name: sN, sets: setSTyp) =>
  getWSub(`/project/perma/upload/muchulka?id=${id}&muchulka=${name}`, sets);

export const UploadRemarks = (
  id: sN,
  remarks: string,
  remarksFile: string,
  sets: setSTyp
) =>
  getWSub(
    `/project/perma/add/remarks?id=${id}&remarks=${remarks}&remarksFile=${remarksFile}`,
    sets
  );

export const GETremarksCon = (id: sN, sets: setSTyp) =>
  getWSub<ResRemarksList>(`/project/perma/get/remarks?id=${id}`, sets);

export const GETremarksConFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResRemarksList>(`/project/perma/get/remarks?id=${id}`, messageApi);

interface ResRemarksList {
  data: RemarksList[];
  message: string;
}

export interface RemarksList {
  id: number;
  date: string;
  remarks: string;
  userId: number;
  remarksFile?: string;
}
