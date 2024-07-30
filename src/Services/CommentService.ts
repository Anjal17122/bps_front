import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, getWLoad, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

const MyApi = new ApiService(BASE_URL);

// export const POSTcomment = (body: POSTcommentBody, setS: setSTyp) =>
//   postWres("/comment", body, setS);

export const POSTcomment = (
  body: POSTcommentBody,
  messageApi: MessageInstance
) => MyApi.post("/comment", body, messageApi);

export const POSTcommentFinal = (
  body: POSTcommentBody,
  messageApi: MessageInstance
) => MyApi.post("/comment", body, messageApi);

export const GETcomments = (
  id: string,
  messageApi: MessageInstance,
  page = 0
) =>
  MyApi.get<GETCommentsBOdy>(
    `/comment/all?page=${page}&size=150&id=` + id,
    messageApi
  );

export const GETcommentsFinal = (id: number, messageApi: MessageInstance) =>
  MyApi.get<GETCommentsBOdy>(
    `/comment/all?page=0&size=150&id=` + id,
    messageApi
  );

export interface POSTcommentBody {
  type: string;
  comment: string;
  projectId: sN;
}

export interface GETCommentsBOdy {
  data: CommentType[];
  message: string;
}

export interface CommentType {
  id: number;
  type: string;
  comment: string;
  project?: string;
  commentDate: string;
  commentBY: CommentBY;
}

interface CommentBY {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep?: string;
  grandfatherNameEng?: string;
  gender: string;
  maritalStatus: string;
  nec: string;
  necFileName: string;
  addresses: any[];
}
