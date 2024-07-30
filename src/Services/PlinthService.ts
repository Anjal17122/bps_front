import { MessageInstance } from "antd/es/message/interface";
import { GetPlinths } from "./AdminService";
import { get, getWSub, post, postNoSub, putWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { CharKilla } from "./PDFService";

export const GETPlinthDatas = (id: sN, sets: setSTyp) =>
  getWSub<ResPlinthDatas>(`/project/perma/get/plinth?id=${id}`, sets);

export const POSTUploadNotice = (
  id: sN,
  filename: string,
  messageApi: MessageInstance
) => MyApi.get(`/noticepublish/change/filename/${id}/${filename}`, messageApi);

export const PATCHUploadCertificate = (
  id: sN,
  filename: string,
  messageApi: MessageInstance
) => MyApi.patch(`/certificate?id=${id}&filename=${filename}`, {}, messageApi);

interface ResPlinthDatas {
  data: PlinthDatas;
  message: string;
}

export interface PlinthDatas {
  plinth?: string;
  superStructure?: string;
  nirmanSampanna?: string;
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
  superStructureDate: string;
  plinthDate: string;
  sarjiminMiti: string;
  projectCreationDate:string;
}

export interface getCertificateType {
  certificateType: string;
  projectPermaId: sN;
}

export const getCertificateDetails = (body: getCertificateType) =>
  postNoSub<ResGetOneCertificate>("/certificate/one", body);

export const getPlinth = (id: string) =>
  get<getPlinthFormData>("/plinth?id=" + id);

export const postPlinth = (body: any, messageApi: MessageInstance) =>
  MyApi.post("/plinth", body, messageApi);

export const postSuperSt = (body: any, messageApi: MessageInstance) =>
  MyApi.post("/superstructure", body, messageApi);

export const putSuperSt = (body: any) => putWres("/superstructure", body);

export const editPlinth = (body: any, messageApi: MessageInstance) =>
  MyApi.put("/plinth", body, messageApi);

export const approvePlinth = (
  status: "VERIFIED" | "UNVERIFIED" | "CORRECTION_REQUESTED",
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.get("/plinth/change/status?status=" + status + `&id=${id}`, messageApi);

export const approveSuperSt = (
  status: "VERIFIED" | "UNVERIFIED",
  id: number,
  setS: setSTyp
) =>
  getWSub("/superstructure/change/status?status=" + status + `&id=${id}`, setS);

export const editPlinthForm = (body: POSTplinthReq, setS: setSTyp) =>
  post("/plinth/requestform", body, setS);

export const getPlinthCert = (id: number, setS: setSTyp) =>
  getWSub<GETPlinthCerti>("/project/perma/plinthcert?id=" + id, setS);

export const getUnverifiedPlinthOwn = (page: number) =>
  get<GetPlinths>(`/project/perma/own/plinth/unverified?page=${page}&size=10`);

export const getVerifiedPlinthOwn = (page: number) =>
  get<GetPlinths>(`/project/perma/own/plinth/verified?page=${page}&size=10`);

export const getUnVerifiedSuperStOwn = (page: number) =>
  get<GetPlinths>(`/project/perma/own/plinth/verified?page=${page}&size=10`);

export const getVerifiedSuperStOwn = (page: number) =>
  get<GetPlinths>(`/project/perma/own/plinth/unverified?page=${page}&size=10`);

export const getNirmanSampanna = (page: number) =>
  get<GetPlinths>(`/project/perma/own/nirmansampanna?page=${page}&size=10`);

export interface POSTplinthReq {
  projectId: string;
  requestForm: string;
  images: string;
}

// export interface PUTplinthReq extends POSTplinthReq {
//   id: string
// }

export interface PostBodySuperSt {
  projectId: string;
  images: string;
}
export interface PUTplinthReq {
  id: string;
  projectId: string;
  requestForm: string;
  images: string;
}

export interface getPlinthFormData {
  data: PlinthTableData;
  message: string;
}

export interface PlinthTableData {
  id: number;
  imageName: string;
  description?: string;
  uploadedAt?: string;
  projectId: number;
  requestForm?: string;
  images?: string;
}

interface GETPlinthCerti {
  data: CertData;
  message: string;
}

export interface CertData {
  applicant: Applicant;
  lands: Land[];
  byLaws: ByLaws;
  floor: Floor;
  buildingPurpose: Province;
}

interface Floor {
  id: number;
  floorDetail: string;
  projectId: number;
}

interface ByLaws {
  id: number;
  buildingData: string;
  landData: string;
  projectId: number;
}

interface Land {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  owner?: Owner;
  houseOwner?: string;
  charKillas: CharKilla[];
  projectId: number;
  charkillaLetter: string;
  address?: string;
}

interface Owner {
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
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  personRole?: string;
  address: Address[];
}

interface Applicant {
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
