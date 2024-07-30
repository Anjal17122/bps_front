import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { POSTdartaDetailsBOdy } from "./AdminViewProjService/RegistrationService";
import { del, get, getWLoad, post, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { Plinth, ResOnDesk, sN } from "./ProjectService";
import { ProjectsSubmitted } from "./UserService";

export interface GETProjectsAdmin {
  data: ProjectsSubmitted[];
  message: string;
}

export const ChangeAdminRole = (
  personId: sN,
  roleId: sN,
  messageApi: MessageInstance
) =>
  MyApi.get(
    "/person/perma/change/role?personId=" + `${personId}&roleId=${roleId}`,
    messageApi
  );

export const approveTechnical = (id: sN, sets: setSTyp) =>
  getWLoad("/project/perma/technical/approve?id=" + id, sets);

export const getUnverifiedPlinth = (page: number) =>
  get<GetPlinths>(`/project/perma/plinth/unverified?page=${page}&size=10`);

export const getVerifiedPlinth = (page: number) =>
  get<GetPlinths>(`/project/perma/plinth/verified?page=${page}&size=10`);

export const getUnverifiedSuperSt = (page: number) =>
  get<GetPlinths>(
    `/project/perma/superstructure/unverified?page=${page}&size=10`
  );
export const getVerifiedSuperSt = (page: number) =>
  get<GetPlinths>(
    `/project/perma/superstructure/verified?page=${page}&size=10`
  );
export const getCompleteProjects = (page: number) =>
  get<GetPlinths>(`/project/perma/nirmansampanna?page=${page}&size=10`);

export const getPendingProjects = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/pending?page=${page}&size=${size}`);

export const getReturnProjects = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/return/admin?page=${page}&size=${size}`);

export const getApprovedProjects = (page: number) =>
  get<ResOnDesk>(`/project/perma/approved?page=${page}&size=10`);

export const postDartaDetails = (body: POSTdartaDetailsBOdy, setsub: setSTyp) =>
  postWres("/project/perma/update/darta", body, setsub);

export const sendRasidNo = (body: any, setS: setSTyp) =>
  post("/project/perma/rasidno", body, setS);

export const getFaqs = () => get<GETFaqBOdy>("/faq/all");

export const postFaq = (body: POSTFaq, messageApi: MessageInstance) =>
  MyApi.post("/faq", body, messageApi);

export const putFaq = (body: FaqTyp, messageApi: MessageInstance) =>
  MyApi.putWRes("/faq", body, messageApi);

export const delFaq = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/faq?id=" + id, messageApi);

export const getDownloads = () => get<getDownloadsBody>("/public/file/all");

export const postDownload = (body: PostDownload, messageApi: MessageInstance) =>
  MyApi.post("/public/file", body, messageApi);

export const putDownload = (body: PostDownload, messageApi: MessageInstance) =>
  MyApi.put("/public/file", body, messageApi);

export const delDownloadFile = (id: number, setSt: setSTyp) =>
  del("/public/file/details", id, setSt);
export const delDownload = (id: number, setSt: setSTyp) =>
  del("/public/file", id, setSt);

export const addDownloadFile = (
  body: { fileName: string; publicFileId: number; title: string },
  setS: setSTyp
) => postWres("/public/file/details", body, setS);

export const getNotices = () => get<getNoticeBody>("/notice/all");

export const postNotice = (body: PostDownload, messageApi: MessageInstance) =>
  MyApi.post("/notice", body, messageApi);

export const putNotice = (body: PostDownload, messageApi: MessageInstance) =>
  MyApi.put("/notice", body, messageApi);

export const delNoticeFile = (id: number, setSt: setSTyp) =>
  del("/notice/details", id, setSt);
export const delNotice = (id: number, setSt: setSTyp) =>
  del("/notice", id, setSt);

export const addNoticeFile = (
  body: { fileName: string; noticeId: number; title: string },
  setS: setSTyp
) => postWres("/notice/details", body, setS);

export const postHelp = (body: postMessage, setS: setSTyp) =>
  postWres("/help", body, setS);

export const getHelps = () => get<GetHelps>("/help/all");
export const changeMsgStatus = (
  id: number,
  status: "SEEN" | "NOTSEEN",
  setS: setSTyp
) => getWLoad("/help/change/status?id=" + id + "&status=" + status, setS);

export interface GetPlinths {
  data: PlinthPr[];
  message: string;
}

export interface PlinthPr {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus?: string;
  registrationNo: string;
  rasidNo?: string;
  count: number;
  creationDate: string;
  plinth: Plinth;
  superStructure: Plinth;
  nirmanSampanna?: string;
  approveDate?: string;
  ward: boolean;
  registration: boolean;
  technical: boolean;
  executive: boolean;
  revenue: boolean;
}

interface Applicant {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone?: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  nec?: string;
  necFileName?: string;
  addresses: Address[];
}

interface Address {
  id: number;
  province: Province;
  district: Province;
  municipality: Province;
  ward: Province;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Province {
  id: number;
  name: string;
}

export interface PUTDartaBody {
  id: number;
  registrationNo: string;
}
export interface PUTRasidBody {
  projectId: sN;
  rasidNo: string;
  fine: sN;
  discount: sN;
  total: sN;
  amount: number;
  fileName: string;
}

export interface postMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface GetHelps {
  data: Help[];
  message: string;
}

export interface Help {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "SEEN" | "NOTSEEN";
}

export interface GETFaqBOdy {
  data: FaqTyp[];
  message: string;
}
export interface FaqTyp extends POSTFaq {
  id: number;
}
export interface POSTFaq {
  question: string;
  answer: string;
}
export interface PostDownload {
  title: string;
  description: string;
  publicFileDetails?: string;
}

interface getDownloadsBody {
  data: DownloadsBody[];
  message: string;
}

interface getNoticeBody {
  data: NoticeBody[];
  message: string;
}

export interface DownloadsBody {
  id: number;
  title: string;
  description: string;
  publicFileDetails: {
    id: number;
    fileName: string;
    publicFileId: number;
    title: string;
  }[];
}

export interface NoticeBody {
  id: number;
  title: string;
  description: string;
  noticeDetails: {
    id: number;
    fileName: string;
    noticeId: number;
    title: string;
  }[];
}

export interface DownloadsBody {
  id: number;
  title: string;
  description: string;
  noticeDetails: {
    id: number;
    fileName: string;
    publicFileId: number;
    title: string;
  }[];
}
