import axios from "axios";
import { BASE_URL, get, patchWSub, post, postNoSub, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";
import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { isNagarjun } from "../constants/CommonFunctions";

const MyApi = new ApiService(BASE_URL);

// Sign Drawings

export const GETdrawingsSigners = () =>
  get<ResGETdrawingsSigners>("/signature/drawing");
export const POSTdrawingSigner = (
  body: POSTdrawingSignerBody,
  setsub: setSTyp
) => postWres("/signature/drawing", body, setsub);

export const GetDocumentSign = (id: sN) => get("/documentsign/" + id);

export const GetFilesWithSign = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetFilesWithSign>("/documentsign/project/doc/" + id, messageApi);

export const GetDrawingsSignPosition = (messageApi: MessageInstance) =>
  MyApi.get<ResGetDrawingsSignPosition>(
    "/signature/drawing/by/user",
    messageApi
  );

  export const GetTypeByProjectId = (id:sN, messageApi: MessageInstance) =>
    MyApi.get<ResGetType>(
      "/project/perma/type?projectId="+id,
      messageApi
    );

interface ResGetDrawingsSignPosition {
  data: GetDrawingsSignPositionBody[];
  message: string;
}


interface ResGetType {
  data: string;
  message: string;
}

export interface GetDrawingsSignPositionBody {
  id: number;
  signaturePerson: SignaturePerson;
  signaturePersonId: number;
  creationDate: string;
  createdBy: number;
  isActive: boolean;
  name: string;
  position: string;
}

export const Base64toPDF = (
  body: {
    base64: string;
    filename: string;
  },
  dirname: string,
  setsub: setSTyp
) => postWres("/base64?dir=" + dirname, body, setsub);

export const Base64toPDFsecond = (
  body: {
    base64: string;
    filename: string;
  },
  dirname: string,
  messageApi: MessageInstance
) => MyApi.post("/base64/second?dir=" + dirname, body, messageApi);

export const postSignDrawingsLogs = (
  body: {
    projectId: sN;
    base64: string;
    filename: string;
  },
  dirname: string,
  messageApi: MessageInstance
) => MyApi.post("/sign/drawing/log?dir=" + dirname, body, messageApi);

export const getLatestPDFLog = (
  fileName: string,
  messageApi: MessageInstance
) =>
  MyApi.get<{ data: string }>(
    "/sign/drawing/log/latest?filename=" + fileName,
    messageApi
  );

export const patchSignedDrawings = (
  body: Partial<DocumentSignDto>,
  messageApi: MessageInstance
) => MyApi.patch("/documentsign", body, messageApi);

export const getSignDrawingsLogs = (
  fileName: string,
  messageApi: MessageInstance
) => MyApi.get("/sign/drawing/log?filename=" + fileName, messageApi);

export const deleteSignDrawingsLogs = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/sign/drawing/log/" + id, messageApi);

export const deleteSignDrawingsData = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/documentsign/" + id, messageApi);

export const base64toPDFfinal = (
  body: {
    certificateType: string;
    projectPermaId: number;
    content: string;
    signature: string;
    filename: string;
  },
  dirname: string,
  messageApi: MessageInstance
) => MyApi.post("/base64/final?dir=" + dirname, body, messageApi);

interface ResGETdrawingsSigners {
  data: GETdrawingsSignersBody[];
  message: string;
}

export interface GETdrawingsSignersBody {
  id: number;
  signaturePerson: SignaturePerson;
  signaturePersonId: number;
  creationDate: string;
  createdBy: number;
  isActive: boolean;
  name: string;
  position: string;
}

// interface SignaturePerson {
//   id: number;
//   nameNep?: any;
//   nameEng: string;
//   role: string;
// }

export interface POSTdrawingSignerBody {
  signaturePersonId: number;
  name: string;
  position: number;
  isActive: boolean;
}

interface ResGetFilesWithSign {
  data: GetFilesWithSignBody[];
  message: string;
}

export interface GetFilesWithSignBody {
  id: number;
  title: string;
  fileName: string;
  fileType: string;
  projectId: number;
  fileSize: "a1" | "a3";
  documentSignDtos: DocumentSignDto[];
}

export type signType = "Plinth" | "SuperStructure" | "NirmanSampanna" | "Amsik" |"Regular" | "Abhilekhikaran";

export interface DocumentSignDto {
  id: number;
  documentId: number;
  signType?: signType;
  engineerSignBy: number;
  engineerSignDate: string;
  recommenderSignBy: number;
  recommenderSignDate?: string;
  examinerSignBy: number;
  examinerSignDate?: string;
  approvedSignId: number;
  approvedSignDate?: string;
  projectid: number;
}

interface POSTDocumentSignBody {
  projectid: sN;
  signType: signType;
  documentId: sN;
  approvedSignDate?: string;
  approvedSignId?: number;
  engineerSignBy?: number;
  engineerSignDate?: string;
  examinerSignBy?: number;
  examinerSignDate?: string;
  recommenderSignBy?: number;
  recommenderSignDate?: string;
}

export const POSTDrawingsSign = (
  body: POSTDocumentSignBody,
  messageApi: MessageInstance
) => MyApi.postWres("/documentsign", body, messageApi);

export const GetUserId = () => get<ResGetUserId>("/user/token");

interface ResGetUserId {
  data: UserId;
  message: string;
}

export interface UserId {
  role: string;
  username: string;
  personPermaid: number;
}

// Returned Sign

export const getReturnedProjectHash = (id: sN) =>
  get<ResgetReturnedProjectHash>("/hash/project/perma?id=" + id);
export const getReturnedProjectHashFinal = (
  id: sN,
  messageApi: MessageInstance
) =>
  MyApi.get<ResgetReturnedProjectHash>(
    "/hash/project/perma?id=" + id,
    messageApi
  );

export const getLatestPDF = (
  projectId: sN,
  type: certificateTypeDigiSign,
  messageApi: MessageInstance
) =>
  MyApi.get<ResLatestPDF>(
    `/signature/latest?id=${projectId}&type=${type}`,
    messageApi
  );

export const getLatestPDFfinal = (
  projectId: sN,
  type: certificateTypeDigiSign,
  messageApi: MessageInstance
) =>
  MyApi.get<ResLatestPDF>(
    `/signature/latest?id=${projectId}&type=${type}`,
    messageApi
  );

export const getLatestPdfId = (chalaniId: sN, messageApi: MessageInstance) =>
  MyApi.get<ResLatestPDF>(
    `/signature/chalani?chalaniId=${chalaniId}`,
    messageApi
  );

export const sendSignedReturnedProject = (
  id: sN,
  body: sendSignedConsultantBOdy,
  messageApi: MessageInstance
) =>
  isNagarjun()
    ? MyApi.get("/project/perma/make/noneditable/v2?id=" + id, messageApi)
    : MyApi.post("/project/perma/make/noneditable?id=" + id, body, messageApi);

export const POSTcertificateSigned = (
  body: POSTcertificateSignedBody,
  messageApi: MessageInstance
) => MyApi.postWres("/signature/certificate", body, messageApi);

//Get coordinate
export type PositionType =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "AMSIK"
  | "NOTICE15"
  | "NOTICE7"
  | "DRAWING";

export const GetCoordinatesPosition = (type: PositionType) =>
  get<ResGEtCoordiantes>("/signature/person/coordinatesposition/" + type);

//Notice Publish

export const GETnoticeLatest = (id: sN) =>
  get("/noticepublish/latest?id=" + id);

export const PATCHnoticePublish = (id: sN, filename: string, setsub: setSTyp) =>
  patchWSub(
    `/noticepublish/filename?id=${id}&filename=${filename}`,
    {},
    setsub
  );

//admin approve sign
export const sendSignedAdmin = (
  id: sN,
  body: sendSignedAdminBOdy,
  messageApi: MessageInstance
) =>{
  if (body.signatureByType === "") {
    body.signatureByType = "WARD";
  }
  return MyApi.post("/project/perma/save/sign?id=" + id, body, messageApi);
}

interface sendSignedConsultantBOdy {
  hashedValue: string;
  signature: string;
}

export const addDigitalSigner = (body: AddDigitalSignBody, setsub: setSTyp) =>
  post<ResGetOneCertificate>("/signature/person", body, setsub);

export const getDigitalSigner = () =>
  get<ResGetDigitalSigners>("/signature/person/list");

export const forwardGetHash = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<any>("/hash/project?id=" + id, messageApi);
export const forwardGetHashFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<any>("/hash/project?id=" + id, messageApi);

export const forwardWithDigitalSign = (
  id: sN,
  body: { hashedValue: string; signature: string },
  messageApi: MessageInstance
) =>
  isNagarjun()
    ? MyApi.get("/project/perma/submit/both/v2?id=" + id, messageApi)
    : MyApi.post("/project/perma/submit/both?id=" + id, body, messageApi);

export const getDigitalSignatureProjects = (page: sN, size: sN) =>
  get<ResDigitalSignProjects>(
    `/project/perma/for/sign?page=${page}&size=${size}`
  );

export const getPlinthDataDigitalSign = (id: string) =>
  get("/project/perma/plinth/pdf?id=" + id);

export const getCertificateDetails = (body: getCertificateType) =>
  postNoSub<ResGetOneCertificate>("/certificate/one", body);

export const checkPDFexists = (body: getCertificateType) =>
  postNoSub<ResCheckPDF>("/check/signed/files", body);

// export const NODEJS_API = "http://43.204.240.118:5100";
export const NODEJS_API = "http://localhost:5100";

export const createPDF = (id: sN, body: any) =>
  axios.post(BASE_URL + "/node/routing/createpdf/plinth/" + id, body);

export const getDigitalSignatureOne = (body: getCertificateType) =>
  postNoSub<ResDigitalSignatureOne>(`/project/signed/details`, body);

export type AllCertificateType =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "AMSIK"
  | "NOTICE15"
  | "NOTICE7"
  | "DRAWINGABHILEKHIKARAN";

export const checkValidSignature = (
  pid: sN,
  chalaniId: sN,
  certificateType: AllCertificateType,
  messageApi: MessageInstance
) =>
  MyApi.get(
    `/signature/person/check/signer/status?certificateType=${certificateType}&chalaniId=${chalaniId}`,
    messageApi
  );

interface ResGEtCoordiantes {
  data: Coordinates;
  message: string;
}

export interface Coordinates {
  id: number;
  signaturePerson: SignaturePerson;
  signaturePersonId: number;
  certificateType: string;
  name: string;
  position: string;
  signatureType: string;
}

//Returned
interface ResgetReturnedProjectHash {
  data: string;
  message: string;
}
interface sendSignedAdminBOdy {
  hashedValue: string;
  isSignature: boolean;
  signature: string;
  signatureByType: string;
  comment:string;
}

interface ResLatestPDF {
  data: GETLatestPDF | "";
  message: string;
}

export interface GETLatestPDF {
  id: number;
  certificateType: string;
  projectPermaId: number;
  content: string;
  signature: string;
  creationDate: string;
  signedBy: number;
  filename: string;
}
export type certificateTypeDigiSign =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "AMSIK"
  | "NOTICE15"
  | "NOTICE7";

export interface POSTcertificateSignedBody {
  certificateType: certificateTypeDigiSign;
  content: string;
  projectPermaId: number;
  signature: string;
  filename: string;
  chalaniId: sN;
}
export const getTypeByRole = (): string => {
  const role = localStorage.getItem("role");
  if (role === "ROLE_Ward") {
    return "WARD";
  } else if (role === "ROLE_Registration") {
    return "REGISTER";
  } else if (role === "ROLE_Engineer") {
    return "ENGINEER";
  } else if (role === "ROLE_Technical") {
    return "TECHNICAL";
  } else if (role === "ROLE_Executive") {
    return "EXECUTIVE";
  } else if (role === "ROLE_Revenue") {
    return "REVENUE";
  } else if (role === "ROLE_Napi") {
    return "NAPI";
  } else if (role === "ROLE_Technical_Department") {
    return "TECHNICAL_DEPARTMENT";
  } else if (role === "ROLE_Sub_Engineer") {
    return "SUB_ENGINEER";
  } else {
    return "";
  }
};

interface ResGetDigitalSigners {
  data: DigitalSigner[];
  message: string;
}

export interface DigitalSigner {
  id: number;
  signaturePerson: SignaturePerson;
  signaturePersonId: number;
  certificateType: string;
  name: string;
  position: number;
}

interface SignaturePerson {
  id: number;
  nameNep: string | null;
  nameEng: string;
  role: string;
}

export interface AddDigitalSignBody {
  certificateType: string;
  signaturePersonId: number;
  position: string;
  name: string;
  signatureType: number;
}
export interface AddDrawingSignersBody {
  signaturePersonId: number;
  position: string;
  name: string;
}

interface ResDigitalSignatureOne {
  data: SignedBy[];
  message: string;
}

export interface SignedBy {
  id: number;
  nameNep: string;
  nameEng: string;
  role: string;
}

interface ResCheckPDF {
  data: boolean;
  message: string;
}

export interface getCertificateType {
  certificateType: string;
  projectPermaId?: sN;
  id: number;
}

export interface ResGetOneCertificate {
  data: CertificateOne;
  message: string;
}

export interface CertificateOne {
  id: number;
  patraSankhya: string;
  chalaniNum: string;
  publishedDateNep: string;
  publishedDateEng: string;
  certificateType: string;
  creationDate?: string;
  projectPermaId: number;
  createdById: number;
  tala?: string;
}

interface ResDigitalSignProjects {
  data: DigitalSignProject[];
  message: string;
}

export interface DigitalSignProject {
  id: number;
  type: string;
  applicantName: string;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus: string;
  registrationNo: string;
  rasidNo?: string;
  count: number;
  buildingPurpose: BuildingPurpose;
  creationDate: string;
  plinthId: number;
  plinthStatus?: string;
  superStructureId: number;
  nirmanSampannaId: number;
  manjurinama?: string;
  approveDate?: string;
  tempId: number;
  lat: string;
  lon: string;
  chalaniNo: string;
  patraSankhya: string;
  pdfDate: string;
  noticePublishedAt: string;
  noticeRemarks?: string;
  remarks?: string;
  muchulka: string;
  napiFile: string;
  technicalDeptFile?: string;
  remarksFile?: string;
  applicantDetailsApproved: boolean;
  napi: boolean;
  signedPlinth: boolean;
  signedSuperStructure: boolean;
  signedNirmanSampanna: boolean;
  noticePublished: boolean;
  registration: boolean;
  engineer: boolean;
  executive: boolean;
  revenue: boolean;
  ward: boolean;
  technicalDepartment: boolean;
  technical: boolean;
}

interface BuildingPurpose {
  id: number;
  name: string;
}
