import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { getWLoad } from "../Api";
import { setSTyp } from "../CreateProjectService";
import { ResGETArchitecturalLogsType } from "./types";

export const projectLogUrl = "/project/perma/log?page=0&size=50&id=";
// export const applicantLogUrl = "/applicant/perma/log?page=0&size=50&id="
export const landLogUrl = "/land/perma/log?page=0&size=50&id=";
export const charkillaLogUrl = "/charkilla/perma/log?page=0&size=50&id=";
// export const ownersLogUrl = "/owners/perma/log?page=0&size=50&id="
export const floorLogUrl = "/floor/perma/log?page=0&size=50&id=";
export const bylawsLogUrl = "/buildingbylaws/perma/log?page=0&size=50&id=";
export const architecturalLogUrl = "/architecture/perma/log?page=0&size=50&id=";
export const structuralLogUrl = "/structure/perma/log?page=0&size=50&id=";
export const electricalLogUrl = "/electrical/perma/log?page=0&size=50&id=";
export const sanitationLogUrl = "/sanitation/perma/log?page=0&size=50&id=";
// export const uploadsLogUrl = "/uploads/perma/log?page=0&size=50&id="

export const GETLandLogsById = (landId: number, setS: setSTyp) =>
  getWLoad<GETLandLogsById>(landLogUrl + landId, setS);

// export const GETArchitecturallogs = (pid: string, setS: setSTyp) =>
//   getWLoad(architecturalLogUrl + pid, setS);

export const GETArchitecturalLogs = (
  pid: string,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgWbody<ResGETArchitecturalLogsType>(
    architecturalLogUrl + pid,
    messageApi
  );

export const GETProjectLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody<GETprojectEditLogs>(projectLogUrl + pid, messageApi);

export const GETLandLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(landLogUrl + pid, messageApi);

export const GETCharkillaLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(charkillaLogUrl + pid, messageApi);

export const GETFloorLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(floorLogUrl + pid, messageApi);

export const GETbylawsLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(bylawsLogUrl + pid, messageApi);

export const GETstructuralLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(structuralLogUrl + pid, messageApi);

export const GETelectricalLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(electricalLogUrl + pid, messageApi);

export const GETsanitationLogs = (pid: string, messageApi: MessageInstance) =>
  MyApi.getWmsgWbody(sanitationLogUrl + pid, messageApi);

interface GETLandLogsById {
  data: LandLog[];
  message: string;
}

export interface LandLog {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  wardName?: string;
  toleNep?: string;
  toleEng?: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  owner: Owner;
  houseOwner?: string;
  charKillas: string[];
  updatedBy: UpdatedBy;
  updatedDate: string;
  project: Project;
  charkillaLetter: string;
}

interface Project {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  registrationNo: string;
  rasidNo?: string;
  count: number;
  creationDate: string;
  executive: boolean;
  technical: boolean;
  registration: boolean;
  ward: boolean;
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

interface UpdatedBy {
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
  addresses: string[];
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
  ward: Province;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Province {
  id: number;
  name: string;
}

interface GETprojectEditLogs {
  data: ProjectEditLogs[];
  message: string;
}

export interface ProjectEditLogs {
  id: number;
  buildingClass: BuildingClass;
  buildingPurpose: BuildingClass;
  supervisor: UpdatedBy;
  designer: UpdatedBy;
  waris: BuildingClass;
  updatedDate: string;
  updatedBy: UpdatedBy;
}

interface BuildingClass {
  id: number;
  name: string;
}

// interface GetArchitecturalLogsBODY {
//   data: ArchitecturalLogs[];
//   message: string;
// }

export interface ArchitecturalLogs {
  id: number;
  buildingPurpose?: string;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  updatedBy: UpdatedBy;
  updatedDate: string;
  project: Project;
}

// interface Project {
//   id: number;
//   type: string;
//   applicant: Applicant;
//   applicationDate?: string;
//   projectStatus1: string;
//   projectStatus2: string;
//   registrationNo: string;
//   rasidNo: string;
//   creationDate?: string;
//   registration: boolean;
//   technical: boolean;
//   executive: boolean;
//   ward: boolean;
//   revenue: boolean;
// }

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

interface UpdatedBy {
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
  addresses: string[];
}

// interface Circle {
//   type: "circle";
//   radius: number;
// }

// interface Square {
//   type: "square";
//   length: number;
// }

// type TypeName = "projectLog" | "ApplicantLog" | "landLog" | "charkillaLog" | "owners" | "floor" | "bylaws" | "architectural" | "structural" | "electrical" | "sanitation" | "uploads" ;

// type ObjectType<T> =
//     T extends "projectLog" ? Circle :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     T extends "ApplicantLog" ? Square :
//     never;

// const shapes: (Circle | Square)[] = [
//     { type: "circle", radius: 1 },
//     { type: "circle", radius: 2 },
//     { type: "square", length: 10 }];

// function getItems<T extends TypeName>(type: T) : ObjectType<T>[]  {
//     return shapes.filter(s => s.type == type) as ObjectType<T>[];
// }

// const circles = getItems("circle");
// for (const circle of circles) {
// }
