import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL } from "../../../../../Services/Api";
import { sN } from "../../../../../Services/ProjectService";
import ApiService from "../OnDeskApiService";
import { POSTrevisionBody, ResGETrevisionStatus } from "./types";

const MyApi = new ApiService(BASE_URL);

export const POSTrevision = (
  body: POSTrevisionBody,
  messageApi: MessageInstance
) => MyApi.postWres("/revision", body, messageApi);

export const GETrevisionProjCon = (
  page = 0,
  size = 10,
  messageApi: MessageInstance
) =>
  MyApi.get<GETrevisionProjBOdy>(
    `/revision/by/user?offset=${size}&page=${page}`,
    messageApi
  );

export const GETrevisionStatus = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETrevisionStatus>("/revision/approval/rev/" + id, messageApi);

export const POSTrevisionStatus = (
  body: { revisionId: sN },
  messageApi: MessageInstance
) => MyApi.postWres("/revision/approval", body, messageApi);

export const GETrevisionProjAdmin = (
  page = 0,
  size = 10,
  messageApi: MessageInstance
) =>
  MyApi.get<GETrevisionProjBOdy>(
    `/revision?offset=${size}&page=${page}`,
    messageApi
  );

export const GETrevisionFileType = (messageApi: MessageInstance) =>
  MyApi.get<GETrevisionFileTypeBody>(`/revision/filetype`, messageApi);

export const RevisionChangeStatus = (
  id: number,
  status: string,
  messageApi: MessageInstance
) =>
  MyApi.get<GETrevisionFileTypeBody>(
    `/revision/change/status/${id}/${status}`,
    messageApi
  );

export const GetRevisionByProjectId = (
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGetRevisionByProjectId>(
    "/revision/project/" + id + "?page=0&offset=0",
    messageApi
  );

export const DELRevisionById = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/revision/doc/" + id, messageApi);

export const GetRevisionById = (id: number, messageApi: MessageInstance) =>
  MyApi.get<GetRevisionByIdBody2>("/revision/" + id, messageApi);

export interface GETrevisionProjBOdy {
  data: RevisionProjBOdy[];
  message: string;
  total?: number;
}

export interface RevisionProjBOdy {
  id: number;
  remarks: string;
  requestBy: number;
  requestDate: string;
  approvedBy: number;
  approvedDate?: string;
  approvedStatus: string;
  project: number;
  revenueApprovedBy: number;
  revenueApprovedDate?: string;
  revenueApprovedStatus: string;
  applicantName: string;
  docs: docs[] | null;
  projectPermaDto: ProjectPermaDto;
}

interface docs {
  id: number;
  filename: string;
  revision: number;
  fileType: number;
  creationDate: string;
  createdBy: number;
}

interface GetRevisionByIdBody2 {
  data: GetRevisionByIdB;
  message: string;
}

export interface GetRevisionByIdB {
  id: number;
  remarks: string;
  requestBy: number;
  requestDate: string;
  approvedBy: number;
  approvedDate: string;
  approvedStatus: string;
  project: number;
  revenueApprovedBy: number;
  revenueApprovedDate?: string;
  revenueApprovedStatus: string;
  docs: DocRevision[];
  projectPermaDto: ProjectPermaDto;
  applicantName: string;
}

interface ProjectPermaDto {
  id: number;
  applicationDate?: string;
  buildingPurposeId: number;
  buildingClassId: number;
  waris: string;
  noticeRemarks?: string;
  remarks?: string;
  lat: string;
  lon: string;
  chalaniNo?: string;
  patraSankhya?: string;
  designerId: number;
  supervisorId: number;
  type: string;
  registrationNo: string;
  rasidNo?: string;
  count: number;
  approveDate?: string;
  manjurinama: string;
  noticePublishedAt?: string;
  muchulka?: string;
  applicantDetailsApproved: boolean;
  noticePublished: boolean;
}

interface DocRevision {
  id: number;
  filename: string;
  revision: number;
  fileType: FileTypeRev;
  creationDate: string;
  createdBy: number;
}

interface FileTypeRev {
  id: number;
  documentType: string;
}

interface ResGetRevisionByProjectId {
  data: GetRevisionByProjectIdBody[];
  message: string;
}

export interface GetRevisionByProjectIdBody {
  id: number;
  remarks: string;
  requestBy: number;
  requestDate: string;
  approvedBy: number;
  approvedDate?: string;
  approvedStatus: string;
  project: number;
  revenueApprovedBy: number;
  revenueApprovedDate?: string;
  revenueApprovedStatus: string;
  docs: DocDrawin[];
  projectPermaDto: ProjectPermaDto;
  applicantName: string;
}

interface DocDrawin {
  filename: string;
  fileType: { id: number; documentType: string };
}

// interface GetRevisionByIdBody {
//   data: RevisionProjBOdy;
//   message: string;
// }

interface GETrevisionFileTypeBody {
  data: RevisionFileTyp[];
  message: string;
}

export interface RevisionFileTyp {
  id: number;
  documentType: string;
}
