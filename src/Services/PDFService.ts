import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL } from "./Api";
import { sN } from "./ProjectService";

const MyApi = new ApiService(BASE_URL);

export const GETnoticePDF = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResNoticePDF>("/project/perma/notice/pdf?id=" + id, messageApi);

export const GETplinthPDF = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResPlinthPdf>("/project/perma/plinth/pdf?id=" + id, messageApi);

export interface ResPlinthPdf {
  data: PlinthDataPDF;
  message: string;
}

export interface PlinthDataPDF {
  applicant: Applicant;
  lands: Land[];
  floor: Floor;
  byLaws: ByLaws;
  structural: Structural;
}

interface Structural {
  id: number;
  general: string;
  nbc101_104?: any;
  nbc105?: any;
  nbc106_114?: any;
  slabDesign?: any;
  criticalBeam?: any;
  foundation?: any;
  floor?: any;
  openingDetails?: any;
  columnDesign?: any;
  projectId: number;
}

interface ByLaws {
  id: number;
  buildingData: string;
  landData?: any;
  projectId: number;
}

interface Floor {
  id: number;
  floorDetail: string;
  projectId: number;
}

interface Land {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: any;
  paisa?: any;
  daam?: any;
  remarks: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  creationDate: string;
  landOwner: LandOwner[];
  houseOwner: LandOwner[];
  owners?: any;
  charKillas: CharKilla[];
  projectId: number;
  charkillaLetter: string;
  address?: any;
  sabik?: any;
}

export interface CharKilla {
  id: number;
  direction: string;
  side: string;
  landscapeType: string;
  nameNep?: any;
  nameEng?: any;
  kittaNo?: string;
  actualSetBack: string;
  standardSetBack: string;
  width: string;
  landId: number;
}

export interface LandOwner {
  id: number;
  owner: Owner;
  landId: number;
  personId: number;
  type?: any;
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
  panNo?: any;
  personRole?: any;
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
  nec?: any;
  necFileName?: any;
  panNo?: any;
  organization: boolean;
  addresses: Address[];
  sabik?: any;
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
  nameNep: string;
}

interface Address2 {
  id: number;
  province: Province2;
  district: Province2;
  municipality: Province2;
  ward: Province2;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Province2 {
  id: number;
  name: string;
  nameNep: string;
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

interface ResNoticePDF {
  data: NoticePDFdata;
  message: string;
}

export interface NoticePDFdata {
  applicant: Applicant;
  lands: Land[];
  floor: Floor;
  structural: Structural;
}

interface Province {
  id: number;
  name: string;
}
