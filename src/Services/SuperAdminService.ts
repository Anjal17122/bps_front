import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { CommonType } from "./AddressService";
import { BASE_URL, get, postWres } from "./Api";
import { DigitalSignStatus } from "./ChangeDigitalSignatureStatus/ChangeDigitalSignatureStatus";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";
import { MessageInstance } from "antd/es/message/interface";

const MyApi = new ApiService(BASE_URL);

export const postAdmin = (
  body: any,
  setS: setSTyp,
  url = "/person/perma/admin"
) => postWres(url, body, setS);

export const postAdminFinal = (
  body: any,
  messageApi: MessageInstance,
  url = "/person/perma/admin"
) => MyApi.post(url, body, messageApi);

export const getAdmins = (
  size: number,
  messageApi: MessageInstance,
  page = 0
) =>
  MyApi.get<getAdminsBody>(
    `/person/perma/admin?page=${page}&size=${size}`,
    messageApi
  );

export const getAdminsNoSetS = (size: number, page = 0) =>
  get<getAdminsBody>(`/person/perma/admin?page=${page}&size=${size}`);

export const changeAdminPass = (
  body: putAdminPass,
  messageApi: MessageInstance
) => MyApi.put("/person/perma/change/password/admin", body, messageApi);

export const changeAdminAccess = (
  status: "enabled" | "disabled",
  id: number,
  messageApi: MessageInstance
) =>
  MyApi.get(
    `/person/perma/change/status?id=${id}&status=` + status,
    messageApi
  );

export const getAdminType = () => get<getAdminTypes>("/person/role");

export const POSTTechnicalMember = (
  body: POSTTechnicalMemBOdy,
  messageApi: MessageInstance
) => {
  return MyApi.postWres<GETTechnicalMemBOdy, POSTTechnicalMemBOdy>(
    "/technicalmember",
    body,
    messageApi
  );
};

export const GETtechnicalMembers = (messageApi: MessageInstance) =>
  MyApi.get<ResGetTechnicalMem>("/technicalmember/getall", messageApi);

export const DELtechnicalMem = (id: number, messageApiub: MessageInstance) =>
  MyApi.delNoRes("/technicalmember/deletebyid/" + id, messageApiub);

export const setWardAdmin = (
  body: { personId: sN; wardId: sN },
  messageApi: MessageInstance
) => MyApi.patch("/secuser/assign/ward", body, messageApi);

// this

// is

// nth

// just

// a

// gap

// this

// is

// nth

// just

// a

// gap

// this

// is

// nth

// just

// a

// gap

// TYpes

interface ResPostTechnicalMem {
  data: GETTechnicalMemBOdy;
  message: string;
}

interface ResGetTechnicalMem {
  data: GETTechnicalMemBOdy[];
  message: string;
}

export interface GETTechnicalMemBOdy extends POSTTechnicalMemBOdy {
  id: number;
}

export interface POSTTechnicalMemBOdy {
  department: string;
  designation: string;
  fullName: string;
  address: string;
  personId: number;
  status: string;
}

export interface POSTFloorRateBody {
  areaCategoryId: sN;
  buildingCategoryId: sN;
  floorId: sN;
  rate: string;
}

export const POSTfloorRate = (
  body: POSTFloorRateBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<FloorRateBody, POSTFloorRateBody>(
    "/floor/rate",
    body,
    messageApi
  );

// interface ResPostFloorData {
//   data: FloorRateTyp;
//   message: string;
// }

export const GETfloorRate = () => get<ResFloorRates>("/floor/rate/all");

export const DELfloorData = (id: number, messageApi: MessageInstance) =>
  MyApi.delNoRes("/floor/rate?id=" + id, messageApi);

// Add Category links

export interface ResAreaCatsBody {
  data: AreaCatsBody[];
  message: string;
}

export interface AreaCatsBody {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
}

// interface ResFloorListBody {
//   data: FloorListBody[];
//   message: string;
// }

// export interface FloorListBody {
//   id: number;
//   name: string;
// }

interface ResFloorListBody {
  data: FloorListBody[];
  message: string;
}

export interface FloorListBody {
  id: number;
  name: string;
  status?: string;
  deleted: boolean;
}

export const GETareaCategory = () => get<ResAreaCatsBody>("/area/category/all");

export const GETbuildingCategory = () =>
  get<ResAreaCatsBody>("/building/category/all");

export const GETfloorCategory = () => get<ResFloorListBody>("/floor/list/all");

export const POSTareaCategory = (
  body: POSTareaCategoryBody,
  messageApi: MessageInstance
) => MyApi.postWres("/area/category", body, messageApi);

export const POSTbuildingCategory = (
  body: POSTareaCategoryBody,
  messageApi: MessageInstance
) => MyApi.post("/building/category", body, messageApi);

export const POSTfloorCategory = (
  body: POSTbuildingCategoryBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<ResPostFloorCatBody, POSTbuildingCategoryBody>(
    "/floor/list",
    body,
    messageApi
  );

interface ResPostFloorCat {
  data: ResPostFloorCatBody;
  message: string;
}

interface ResPostFloorCatBody {
  id: number;
  name: string;
  status?: string;
  deleted: boolean;
}

export interface POSTbuildingCategoryBody {
  name: string;
}

export interface POSTareaCategoryBody {
  name: string;
  level: number;
  parentId: number;
}

// export interface ResFloorRate {
//   data: FloorRateTyp[];
//   message: string;
// }

// export interface FloorRateTyp {
//   id: number;
//   name: string;
//   rate: string;
// }

interface ResFloorRates {
  data: FloorRateBody[];
  message: string;
}

export interface FloorRateBody {
  id: number;
  rate: string;
  areaCategoryId: number;
  buildingCategoryId: number;
  floorId: number;
  floorName?: string;
  buildingCategoryname?: string;
  areaCategoryName?: string;
  status?: string;
  deleted: boolean;
}

interface getAdminTypes {
  data: CommonType[];
  message: string;
}

export interface putAdminPass {
  email: string;
  newp: string;
}

interface getAdminsBody {
  data: Data;
  message: string;
}

interface Data {
  adminList: AdminBody[];
  totalRows: number;
}

export interface AdminBody {
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
  personRole: PersonRole;
  addresses: Address[];
  userStatus: "enabled" | "disabled";
  emSignerStatus: DigitalSignStatus;
  // user: User;
}

// interface User {
//   pk?: string;
//   username: string;
//   password: string;
//   phone?: string;
//   email?: string;
//   status: "enabled" | "disabled";
//   type?: string;
//   wardId?: string;
// }

interface Address {
  id: number;
  province: PersonRole;
  district: PersonRole;
  municipality: PersonRole;
  ward: PersonRole;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface PersonRole {
  id: number;
  name: string;
}

// interface getAdminsBody {
//   data: {
//     adminList: AdminBody[];
//     totalRows: number;
//   };
//   message: string;
// }

// export interface AdminBody {
//   id: number;
//   nameNep: string;
//   nameEng: string;
//   primaryPhone: string;
//   secondaryPhone: string;
//   email: string;
//   photoFileName: string;
//   citizenshipNo: string;
//   citizenshipFileName: string;
//   citizenIssueDist: string;
//   citizenIssueDate: string;
//   fatherNameNep: string;
//   fatherNameEng: string;
//   grandfatherNameNep?: string;
//   grandfatherNameEng?: string;
//   gender: string;
//   maritalStatus: string;
//   nec?: string;
//   necFileName?: string;
//   personRole: PersonRole;
//   addresses: any[];
// }

// interface PersonRole {
//   id: number;
//   name: string;
// }
// export const changeAdminPassword = () =>
//   postWres()
