import { get, getWLoad, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export type CertType =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "AMSIK"
  | "ABHILEKHIKARAN"
  | "NAAMSARI";

export interface POSTPublishCertBody {
  patraSankhya: string;
  chalaniNum: string;
  publishedDateNep: string;
  publishedDateEng: string;
  certificateType: CertType;
  projectPermaId: number;
  tala: string;
}

// interface ResGetPublish {
//   data: GETPublishLogs[];
//   message: string;
// }

// export interface GETPublishLogs {
//   id: number;
//   patraSankhya: string;
//   chalaniNum: string;
//   publishedDateNep: string;
//   publishedDateEng: string;
//   certificateType: string;
//   creationDate?: any;
//   projectPermaId: number;
//   createdById: number;
//   tala?: any;
// }

export const PostPublish = (data: POSTPublishCertBody, setS: setSTyp) =>
  postWres("/certificate", data, setS);

export const GetCertLogs = (id: sN, setS: setSTyp) =>
  getWLoad<ResGetPublish>("/certificate/both/" + id, setS);

export const GetPublish = (id: sN) =>
  get<ResGetPublish>("/certificate?projectId=" + id);

interface ResGetPublish {
  data: GETPublishLogs[];
  message: string;
}

export interface GETPublishLogs {
  id: number;
  patraSankhya: string;
  chalaniNum: string;
  publishedDateNep: string;
  publishedDateEng: string;
  certificateType: string;
  creationDate?: string;
  projectPermaId: number;
  createdById: number;
  pdfFilename?: any;
  certificateSignatureDtos: CertificateSignatureDto[];
  tala?: string;
}

interface CertificateSignatureDto {
  id: number;
  certificateType: string;
  projectPermaId: number;
  content: string;
  signature: string;
  creationDate: string;
  signedBy: number;
  filename: string;
}
