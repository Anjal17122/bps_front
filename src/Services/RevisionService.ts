import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, delWParam, get, getWLoad, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";
import { size } from "../constants/constants";

const MyApi = new ApiService(BASE_URL);

export const POSTrevision = (body: POSTrevisionBody, setsub: setSTyp) =>
  postWres("/revision", body, setsub);

export const POSTrevisionFinal = (
  body: POSTrevisionBody,
  messageApi: MessageInstance
) => MyApi.post("/revision", body, messageApi);

export const GetRevisionByProjectId = (
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGetRevisionByProjectId>(
    "/revision/project/" + id + "?page=0&offset=0",
    messageApi
  );

export const DELRevisionById = (id: number, setsub: setSTyp) =>
  delWParam("/revision/doc/" + id, setsub);

export const GETrevisionProjCon = (page = 0, size = 10) =>
  get<GETrevisionProjBOdy>(`/revision/by/user?offset=${size}&page=${page}`);

export const GETrevisionsCon = (page = 0, messageApi: MessageInstance) =>
  MyApi.get<GETrevisionProjBOdy>(
    `/revision/for/user?page=${page}&size=${size}`,
    messageApi
  );

export const GETrevisionProjAdmin = (page = 0, size = 10) =>
  get<GETrevisionProjBOdy>(`/revision?offset=${size}&page=${page}`);

export const GETrevisionFileType = () =>
  get<GETrevisionFileTypeBody>(`/revision/filetype`);

export const GETrevisionFileTypeFinal = (messageApi: MessageInstance) =>
  MyApi.get<GETrevisionFileTypeBody>(`/revision/filetype`, messageApi);

export const RevisionChangeStatus = (
  id: number,
  status: string,
  setsub: setSTyp
) =>
  getWLoad<GETrevisionFileTypeBody>(
    `/revision/change/status/${id}/${status}`,
    setsub
  );

export const GetRevisionById = (id: number, setsub: setSTyp) =>
  getWLoad<GetRevisionByIdBody2>("/revision/" + id, setsub);

export const GetRevisionByIdFinal = (id: number, messageApi: MessageInstance) =>
  MyApi.get<GetRevisionByIdBody2>("/revision/" + id, messageApi);

export const GETrevisionStatus = (id: sN, setsub: setSTyp) =>
  getWLoad<ResGETrevisionStatus>("/revision/approval/rev/" + id, setsub);

export const POSTrevisionStatus = (body: { revisionId: sN }, setsub: setSTyp) =>
  postWres("/revision/approval", body, setsub);

export interface POSTrevisionBody {
  remarks: string;
  project: sN;
  docs: Doc[];
}

interface Doc {
  filename: string;
  fileType: sN;
}

interface ResGETrevisionStatus {
  data: ResGETrevisionStatusBody[];
  message: string;
}

export interface ResGETrevisionStatusBody {
  id: number;
  revisionId: number;
  approvedBy: number;
  approvedDate: string;
  role: string;
}

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

export interface GetRevisionByIdBody2 {
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

interface GetRevisionByIdBody {
  data: RevisionProjBOdy;
  message: string;
}

interface GETrevisionFileTypeBody {
  data: RevisionFileTyp[];
  message: string;
}

export interface RevisionFileTyp {
  id: number;
  documentType: string;
}
