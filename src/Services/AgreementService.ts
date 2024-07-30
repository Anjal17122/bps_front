import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { sN } from "./ProjectService";

export const getAgreementPdfData = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetAgreementPdfData>(
    "/project/perma/aggrement/pdfdata?projectId=" + id,
    messageApi
  );

export const getAgreementFile = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResgetAgreementFile>(
    "/file/perma/aggrement?projectId=" + id,
    messageApi
  );

export interface ResgetAgreementFile {
  data: getAgreementFileBody;
  message: string;
}

export interface getAgreementFileBody {
  id: number;
  title: string;
  fileName: string;
  fileType: string;
  projectId: number;
  personId: number;
}
export interface ResGetAgreementPdfData {
  data: GetAgreementPdfDataBody;
  message: string;
}

export interface GetAgreementPdfDataBody {
  id: number;
  charkilla: Charkilla[];
  buildingPurpose: string;

  floor: Floor;
  kittaNo: string;
  mapSheetNo: string;
  totalArea: string;
  wardNo: string;
  sabik: string;
  toleName: string;
  applicantName: null;
  consultantMunNo: number;
  consultantName: string;
  municipality: string;
  name: string;
  landOwnerName: string;
  landOwnerPhoneNo: string;
  landOwnerFatherName: string;
  landOwnerCitizenshipNo: string;
  houseOwnerName: string;
  houseOwnerPhoneNo: string;
  houseOwnerFatherName: string;
  houseOwnerCitizenshipNo: string;
}

interface Floor {
  id: number;
  floorDetail: string;
  projectId: number;
}

interface Charkilla {
  id: number;
  direction: string;
  side: string;
  landscapeType: string;
  nameNep: null | string;
  nameEng: string;
  kittaNo: null | string;
  actualSetBack: string;
  standardSetBack: string;
  width: string;
  landId: number;
  filename: null;
}
