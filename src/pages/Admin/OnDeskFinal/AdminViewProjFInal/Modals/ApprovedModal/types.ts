import { CertType } from "../../../OnDeskService/ApprovedService/types";

export interface PlinthLogType {
  id: number;
  patraSankhya: string;
  chalaniNum: string;
  publishedDateNep: string;
  publishedDateEng: string;
  certificateType: CertType;
  creationDate: string;
  projectPermaId: number;
  createdById: number;
  tala?: string;
  filename: string | null;
}

export const delSlash = (mystr: string) => {
  return mystr.replaceAll("/", "-");
};

export const CheckCertificateType = (type: string) => {
  if (type === "PLINTH") return "/plinthpdf";
  if (type === "SUPERSTRUCTURE") return "/superstructurepdf";
  if (type === "NIRMAN_SAMPANNA") return "/buildingcompletepdf";
  if (type === "ABHILEKHIKARAN") return "/abhilekhikaranpdf";
};

export interface NoticePubVals {
  patraSankhya: string;
  chalaniNum: string;
  publishDateNep: string;
  tala: string;
  sarjiminMiti?:string;
}
