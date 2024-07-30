import { CommonArrRes, CommonType } from "./AddressService";
import {
  getUserTyp,
  getUserTypRes,
  OwnerType,
  PersonType,
} from "./UserService";
import { Dispatch } from "react";
import { BASE_URL, get, getWSub, putWres } from "./Api";
import { LargeProjectType, ResSearchProject, sN } from "./ProjectService";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { MessageInstance } from "antd/es/message/interface";
import { CharKilla } from "./PDFService";

const MyApi = new ApiService(BASE_URL);

//Create Project
export const getFileUploads = async (
  id: string | number,
  url = "/file/by/project?id="
) => {
  return get<getFilesUploaded>(url + id);
};

export const getBuildingClass = async () => {
  return get<CommonArrRes>("/buildingclass/all");
};

export const getBuildingPur = async () => {
  return get<CommonArrRes>("/buildingpurpose/all");
};

export const getWaris = async () => {
  return get<CommonArrRes>("/waris/all");
};

export const createProject = async (
  data: ProjectTypePost,
  messageApi: MessageInstance
) => MyApi.postWres("/project", data, messageApi);

export const editProject = async (url: string, data: ProjectTypePost) =>
  putWres(url, data);

export const getProject = async (id: string, setS: setSTyp) =>
  getWSub<GetLargeProject>("/project/perma?id=" + id, setS);

export const ViewProjectCon = async (id: string, messageApi: MessageInstance) =>
  MyApi.get<GetLargeProject>("/project/perma?id=" + id, messageApi);

export const GETprojectIdNaamsari = async (id: string, setS: setSTyp) =>
  getWSub<ResSearchProject>(
    "/project/perma/approved/by/projectid?id=" + id,
    setS
  );

export interface GetLargeProject {
  data: LargeProjectType;
  message: string;
}

// Add Applicant

// export const addPerson = (
//   url: string,
//   data: PersonType,

// ) => {
//   return post(url, data, );
// };

export const addPersonFinal = (
  url: string,
  data: PersonType,
  messageApi: MessageInstance
) => MyApi.post(url, data, messageApi);

type AddOrgBody = {
  landId: number;
  nameEng: string;
  nameNep: string;
  email: string;
  primaryPhone: string;
  panNo: string;
  citizenshipNo: string;

  addresses: {
    provinceId: string;
    districtId: string;
    municipalityId: string;
    wardId: string;
    type: number;
    toleNep: string;
    toleEng: string;
  }[];
  citizenshipFileName: string;
  photoFileName: string;
};

// export const POSTOrgOwner = (
//   data: AddOrgBody,
//   url = "/person/perma/owner"
// ) => {
//   return post(url, data, );
// };

export const POSTOrgOwnerFinal = (
  url = "/person/perma/owner",
  data: AddOrgBody,
  messageApi: MessageInstance
) => MyApi.post(url, data, messageApi);

export const editOrgOwner = (data: any, messageApi: MessageInstance) => {
  return MyApi.put("/person/perma", data, messageApi);
};

// land info

export const addLand = (data: PostLandBody, messageApi: MessageInstance, url="/land") =>
  MyApi.post(url, data, messageApi);

export const getLands = (url: string, id: string) => get<GetLands>(url + id);

export const getLand = (url: string, id: string) => get<GETLandOne>(url + id);

interface GetLands {
  data: MyLands[];
  message: string;
}

export interface MyLands {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  charkillaLetter: string;
  address: Address;
  sabik?: string;
}

interface Address {
  id: number;
  ward: Ward;
  toleNep: string;
  toleEng: string;
}

interface Ward {
  id: number;
  name: string;
}

interface GETLandOne {
  data: LandOne;
  message: string;
}

export interface LandOne {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  charkillaLetter: string;
  address: Address;
}

interface Address {
  id: number;
  ward: Ward;
  toleNep: string;
  toleEng: string;
}

interface Ward {
  id: number;
  name: string;
}

// interface GETLand {
//   data: LandBodyNew;
//   message: string;
// }

export interface LandBodyNew {
  id: number;
  tiroRasid: string;
  traceNaksa: string;
  mapSheetNo: string;
  landParcelNo: string;
  charkillaLetter: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  owner: Owner;
  houseOwner?: string;
  charKillas: CharKilla[];
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

interface Address {
  id: number;
  province: Province;
  district: Province;
  municipality: Province;
  ward: Ward;
  type: string;
  toleNep: string;
  toleEng: string;
}

// interface Province {
//   id: number;
//   name: string;
// }

export const editLand = (
  url: string,
  data: PutLandBody,
  messageApi: MessageInstance
) => MyApi.put(url, data, messageApi);

// charkilla

export interface IdType {
  id: number;
}

export interface IdResType {
  data: IdType[];
  message: string;
}
export const getLandsWithCharKilla = (id: string, url = "/land/project?id=") =>
  get<LandAndCharkillaRes>(url + id);

export const getLandsIds = (id: string) => get<IdResType>("/land/id?id=" + id);

export const addCharkilla = (
  data: AddCharkillaBody,
  messageApi: MessageInstance,
  url = "/charkilla"
) => MyApi.post(url, data, messageApi);

export const delCharkilla = (
  id: number,
  messageApi: MessageInstance,
  url = "/charkilla"
) => MyApi.delNoRes(url + `?id=${id}`, messageApi);

// /charkilla?id

export interface LandsWithOwner extends Land {
  owner: OwnerType;
  houseOwner: OwnerType;
  charKillas: CharkillaType[];
}

interface ResGetMultipleLand {
  data: GETLandWithOwner[];
  message: string;
}

export interface GETLandWithOwner {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks?: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  houseOwner: Owner2[];
  landOwner: Owner2[];
  owners?: string;
  charkillaLetter: string;
}

export interface Owner2 {
  id: number;
  owner?: Owner;
  landPermaId: number;
  personId: number;
  type: string;
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
  panNo?: string;
  personRole?: string;
  address: Address[];
}

interface Address {
  id: number;
  province: Province;
  district: Province;
  municipality: Province;
  ward: Ward;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Province {
  id: number;
  name: string;
  nameNep: string;
}

interface ResHOuseOWners {
  data: GEThomeOwners[];
  message: string;
}

export interface GEThomeOwners {
  id: number;
  houseOwner: HouseOwner;
  projectId: number;
  personId: number;
}

interface HouseOwner {
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
  panNo?: string;
  personRole?: string;
  address: Address[];
}

interface Address {
  id: number;
  province: Province;
  district: Province;
  municipality: Province;
  ward: Ward;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Province {
  id: number;
  name: string;
  nameNep: string;
}

export const getLandsWithOwner = (url: string, id: sN) =>
  get<ResGetMultipleLand>(url + id);

export const getManjurinama = (
  id: sN,
  url = "/project/perma/manjurinama/only/"
) => get<ResgetManjurinama>(url + id);

interface ResgetManjurinama {
  data: ManjurinamaBody;
  message: string;
}

export interface ManjurinamaBody {
  manjurinama: string | null;
}

export const getHouseOwners = (url: string, id: sN) =>
  get<ResHOuseOWners>(url + id);

export const getApplicant = (url: string, id: string) =>
  get<getUserTypRes>(url + id);

export interface DocBodyPOST {
  fileName: string;
  fileType: string;
  projectId: string;
  title: string;
}

// export const uploadDocs = (data: DocBodyPOST[], ) =>
//   post("/file", data, );

export interface getFilesUploaded {
  data: FilesUploaded[];
  message: string;
}
export interface FilesUploaded {
  id: number;
  fileName: string;
  title: string;
  fileType:
    | "architectural"
    | "structural"
    | "electrical"
    | "sanitation"
    | "analysisfile"
    | "analysisreport";
  projectId: number;
}

// export interface ProjectType extends ProjectTypePost {
//   id: number;
// }
export interface ProjectType {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate: string;
  projectStatus1: string;
  projectStatus2: string;
  registration: boolean;
  technical: boolean;
  executive: boolean;
  ward: boolean;
  registrationNo?: string;
  rasidNo?: string;
  plinth?: {
    imageName: string;
    description?: string;
    projectId: number;
  };
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
  grandfatherNameNep?: string;
  grandfatherNameEng?: string;
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
  ward: Ward;
  type: string;
  toleNep: string;
  toleEng: string;
}

// interface Province {
//   id: number;
//   name: string;
// }

export interface ViewProjectType {
  applicationDate: string;
  id: number;
  projectStatus1: "PENDING" | "APPROVED";
  projectStatus2: string;
  type: string;
  applicant: getUserTyp;
  executive: boolean;
  registration: boolean;
  technical: boolean;
  ward: boolean;
}

export interface ProjectTypePost {
  // applicationDate: string;
  buildingPurposeId: number;
  buildingClassId: number;
  waris: string;
  supervisorId: number;
  designerId: number;
}

export interface GetProject {
  id: number;
  applicationDate: string;
  lat: string;
  lon: string;
  buildingPurpose: {
    id: number;
    name: string;
  };
  buildingClass: {
    id: number;
    name: string;
  };
  waris: {
    id: number;
    name: string;
  };
  designer: {
    id: number;
    name: string;
  };
  supervisor: {
    id: number;
    name: string;
  };
  type: string;
}

// interface GetProjectRes {
//   data: GetProject;
//   message: string;
// }

export interface OneBody {
  data: CommonType;
  message: string;
}

export interface PutLandBody {
  projectId?: string | number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  tiroRasid: string;
  traceNaksa: string;
  charkillaLetter: string;
  // aana: string;
  // paisa: string;
  // daam: string;
  remarks: string;
  landImageName: string;
  address: {
    id: number | undefined;
    toleNep: string;
    toleEng: string;
    wardId: sN;
  };
  toleNep?: string;
  toleEng?: string;
  wardName?: string;
  sabik?: string;
}

export interface PostLandBody {
  projectId?: string | number;
  mapSheetNo: string;
  landParcelNo: string;
  sabik: string;
  ropani: string;
  tiroRasid: string;
  traceNaksa: string;
  charkillaLetter: string;
  // aana: string;
  // paisa: string;
  // daam: string;
  remarks: string;
  landImageName: string;
  address?: {
    wardId: number;
    toleNep: string;
    toleEng: string;
  };
  wardId?: string;
  toleNep?: string;
  toleEng?: string;
  wardName?: string;
}

export interface Land extends PutLandBody {
  id: number;
}

export interface LandsRes {
  data: Land[];
  message: string;
}
export interface LandRes {
  data: Land;
  message: string;
}
export interface AddCharkillaBody {
  direction: string;
  side: string;
  landscapeType: string;
  nameNep: string;
  nameEng: string;
  kittaNo: string;
  actualSetBack: string;
  standardSetBack: string;
  width: string;
  landId: number | string;
}

export interface CharkillaType extends AddCharkillaBody {
  id: number;
}
export interface LandAndCharkilla {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana: string;
  paisa: string;
  daam: string;
  remarks: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  charKillas: CharkillaType[];
}
export interface LandAndCharkillaRes {
  data: LandAndCharkilla[];
  message: string;
}

export type setSTyp = Dispatch<React.SetStateAction<boolean>>;

export interface ProjectRes {
  data: ProjectType;
  message: string;
}

export interface OwnProjectGET {
  data: OwnProjectBody[];
  message: string;
  total: number;
}

export interface OwnProjectBody {
  count: number;
  id: number;
  applicationDate: string;
  buildingPurpose: BuildingPurpose;
  buildingClass: BuildingPurpose;
  waris: BuildingPurpose;
  designer: BuildingPurpose;
  supervisor: BuildingPurpose;
  fiscalYear?: string;
  type: string;
  lands: any[];
  floor?: string;
  buildingByLaws?: string;
  architecture?: string;
  electrical?: string;
  sanitationPlumbing?: string;
  structure?: string;
  applicant?: string;
  user: User;
  creationDate: string;
  projectStatus2: string;
  registrationNo: string;
  rasidNo: string;
}

interface User {
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
  grandfatherNameNep?: string;
  grandfatherNameEng?: string;
  gender: string;
  maritalStatus: string;
  nec: string;
  necFileName: string;
  addresses: any[];
}

interface BuildingPurpose {
  id: number;
  name: string;
}
