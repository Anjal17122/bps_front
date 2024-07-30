export interface POSTPublishCertBody {
  patraSankhya: string;
  chalaniNum: string;
  publishedDateNep: string;
  publishedDateEng: string;
  certificateType: CertType;
  projectPermaId: number;
  tala: string;
  sarjaminMiti?: string;
}

export type CertType =
  | "PLINTH"
  | "SUPERSTRUCTURE"
  | "NIRMAN_SAMPANNA"
  | "AMSIK"
  | "ABHILEKHIKARAN"
  | "NAAMSARI"
  | "TIPPANI_PLINTH"
  | "TIPPANI_SUPERSTRUCTURE"
  | "TIPPANI_NIRMAN_SAMPANNA"
  | "REGULAR";

export interface ResGetPublish {
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
  tala?: string;
}

export interface ResPlinthDatas {
  data: PlinthDatas;
  message: string;
}

export interface PlinthDatas {
  plinth: Plinth;
  superStructure: SuperStructure;
  nirmanSampanna: Nirmansampanna;
}

interface SuperStructure {
  id: number;
  imageName: null | string;
  description: null | string;
  requestForm: string;
  images: string;
  uploadedAt: string;
  projectId: number;
  status: string;
}
interface Nirmansampanna {
  id: number;
  imageName: null | string;
  description: null | string;
  uploadedAt: string;
  projectId: number;
  status:string;
}
interface Plinth {
  id: number;
  description: null | string;
  uploadedAt: string;
  projectId: number;
  requestForm: string;
  images: string;
  status: string;
  verifiedBy: null | string;
  verifiedAt: string;
  chalaniNo: null | string;
  patraSankhya: null | string;
  miti: null | string;
}
