import { MessageInstance } from "antd/es/message/interface";
import { ActionViewProj, Ac } from "../Store/StoreViewProject/types";
import { municipalityDetails, size } from "../constants/constants";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, get, getWLoad } from "./Api";
import {
  FilesUploaded,
  LandsWithOwner,
  OwnProjectGET,
  ProjectType,
  setSTyp,
} from "./CreateProjectService";
import { getUserTyp } from "./UserService";
import { CharKilla } from "./PDFService";
import { isNagarjun } from "../constants/CommonFunctions";

export type sN = string | number;

const MyApi = new ApiService(BASE_URL);

export const PatchRasidDetails = (
  body: { fileName: string; rasidNo: sN; rasidDate: sN; amount: sN },
  messageApi: MessageInstance
) => MyApi.patch("/project/perma/rasid", body, messageApi);

export const getNoticeApproved = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/notice/published?page=${page}&size=${size}`);
// export const getNoticeApproved = (page: sN, size: sN) =>
//   get<any>(`/noticepublish/latest/${page}/${size}`);
export const getTechnicalApproved = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/technical/approved?page=${page}&size=${size}`);
export const getMuchulkaAdmin = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/muchulka?page=${page}&size=${size}`);
//Search Projects
export const searchProjectId = (id: sN, setS: setSTyp) =>
  getWLoad<ResSearchProject>("/project/perma?id=" + id, setS);

export type status1 = "PENDING" | "APPROVED" | "";

export type status2 =
  | "REGISTRATION"
  | "TECHNICAL"
  | "TECHNICAL_DEPARTMENT"
  | "EXECUTIVE"
  | "WARD"
  | "REVENUE"
  | "";

export type editingS = "ENABLED" | "DISABLED" | "";

export const searchProjectsName = (
  page: sN,
  size: sN,
  setS: setSTyp,
  name: string,
  status1?: status1,
  status2?: status2,
  editingStatus?: editingS
) =>
  getWLoad<ResOnDesk>(
    `/project/perma/search/by/applicant?page=${page}&size=${size}`,
    setS,
    { name, status1, status2, editingStatus }
  );

export const getPTlog = (id: number) =>
  get<GETPTlog>("/project/perma/history?id=" + id);

//get own projects
// export const getOwnProjects = async (page: number, sets: setSTyp) => {
//   return getWSub<OwnProjectGET>(`/project/own?page=${page}&size=10`, sets);
// };

export const getOwnProjects = async (
  page: number,
  messageApi: MessageInstance
) => {
  return MyApi.get<OwnProjectGET>(
    `/project/own?page=${page}&size=10`,
    messageApi
  );
};

//get own projects -- pending
export const getPendingUserPro = async (page: number) => {
  return get<ResOnDesk>(`/project/perma/own/pending?page=${page}&size=10`);
};

//get submitted  projects consultant -- pending
export const GETsubmittedProjs = async (
  page: number,
  messageApi: MessageInstance,
  size = 10
) =>
  MyApi.get<ResOnDesk>(
    `/project/perma/own/pending?page=${page}&size=${size}`,
    messageApi
  );

  export const GETSignedProjects = async (
    page: number,
    messageApi: MessageInstance,
    size = 10
  ) =>
    MyApi.get<ResOnDesk>(
      `/documentsign/consultant?page=${page}&size=${size}`,
      messageApi
    );

//get own projects -- verified
export const GETapprovedCon = async (page: number) => {
  return get<ResOnDesk>(`/project/perma/own/approved?page=${page}&size=10`);
};

export const GETapprovedConFinal = async (
  page: number,
  messageApi: MessageInstance,
  size = 10
) =>
  MyApi.get<ResOnDesk>(
    `/project/perma/own/approved?page=${page}&size=${size}`,
    messageApi
  );

//get returned projects -- verified
export const getReturnedUserPro = async (page: number) => {
  return get<ResOnDesk>(`/project/perma/return?page=${page}&size=10`);
};

export const getReturnedsCon = async (
  page: number,
  messageApi: MessageInstance
) =>
  MyApi.get<ResOnDesk>(
    `/project/perma/return?page=${page}&size=10`,
    messageApi
  );

export const getProjects = () => get<getProjectsRes>("/project/all");
export const getProjectId = (url: string, id: string) => get<any>(url + id);

export const submitProject = (id: string, setsub: setSTyp) =>
  getWLoad<any>("/project/perma/submit/both?id=" + id, setsub);
// get<any>("/project/perma/submit?id=" + id);

export const makeProjectUnedit = (id: string) =>
  get<any>("/project/perma/make/noneditable?id=" + id);

export const reForwardProj = (id: string, messageApi: MessageInstance) =>
  MyApi.get<any>("/project/perma/make/noneditable?id=" + id, messageApi);

// type stT11 = "PENDING" | "APPROVED";

// Admin Links
export const getOnDeskProjects = (page: sN, size: sN) =>
  get<ResOnDesk>(`/project/perma/on/desk?page=${page}&size=${size}`);

export const changeProjectStatus = (
  id: number,
  status: string,
  setSt: setSTyp
) =>
  getWLoad<any>("/project/perma/status2?id=" + id + "&status=" + status, setSt);

export const changeProjectStatusFinal = async (
  id: number,
  status: string,
  dispatch: (action: ActionViewProj) => ActionViewProj
) => {
  dispatch({ payload: true, type: Ac.disableBtn });
  try {
    await get("/project/perma/status2?id=" + id + "&status=" + status);
    return dispatch({ payload: false, type: Ac.disableBtn });
  } catch {
    return dispatch({ payload: false, type: Ac.disableBtn });
  }
};

//mandandeupur

export const approveByOne = (id: number, messageApi: MessageInstance) =>
  MyApi.get<getProjectsRes>(
    // municipalityDetails.address1 === "Mandandeupur, Kavrepalanchok"
    //   ? "/project/perma/individual/v2?id=" + id
    //   : "/project/perma/individual?id=" + id,
    "/project/perma/individual?id=" + id,
    messageApi
  );

// export const approveByOne = (id: number, messageApi: MessageInstance) =>
//   MyApi.get<getProjectsRes>("/project/perma/individual?id=" + id, messageApi);

export const noticeApproveByOne = ({ id }: { id: number }, setS: setSTyp) =>
  getWLoad("/project/perma/approve/land/details", setS, { id });

export const approvebyAll = ({
  id,
  status,
}: {
  id: number;
  status: "PENDING" | "APPROVED";
}) => get<getProjectsRes>("/project/perma/status1", { id, status });

export interface ResOnDesk {
  data: OnDeskProjects[];
  message: string;
  total: number;
}

export interface OnDeskProjects {
  id: number;
  type: string;
  applicantName?: string;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus: string;
  registrationNo?: string;
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
  lat?: string;
  lon?: string;
  chalaniNo?: string;
  patraSankhya?: string;
  pdfDate?: string;
  noticePublishedAt?: string;
  noticeRemarks?: string;
  remarks?: string;
  muchulka?: string;
  napiFile?: string;
  technicalDeptFile?: string;
  remarksFile?: string;
  ward: boolean;
  applicantDetailsApproved: boolean;
  noticePublished: boolean;
  registration: boolean;
  engineer: boolean;
  executive: boolean;
  revenue: boolean;
  napi: boolean;
  technicalDepartment: boolean;
  technical: boolean;
  wardFile: string;
  wardTechnical: boolean;
  subEngineer: boolean;
  asstSubEngineer: boolean;
  buildingR_LandM: boolean;
}

interface BuildingPurpose {
  id: number;
  name: string;
}

export interface ResGETnoticeapproved {
  data: NoticeApproved[];
  message: string;
}

export interface NoticeApproved {
  id: number;
  type?: string;
  applicantName: string;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus: string;
  registrationNo: string;
  rasidNo?: string;
  count: number;
  creationDate: string;
  plinthId: number;
  plinthStatus?: string;
  superStructureId: number;
  nirmanSampannaId: number;
  manjurinama?: string;
  approveDate?: string;
  registration: boolean;
  technical: boolean;
  executive: boolean;
  ward: boolean;
  revenue: boolean;
  applicantDetailsApproved: boolean;
  tempId: sN;
}

export interface GETPTlog {
  data: PTlog[];
  message: string;
}

export interface ResSearchProject {
  data: ProjectTypeFinal;
  message: string;
}

export interface ProjectTypeFinal {
  id: number;
  applicationDate?: string;
  buildingPurpose: BuildingPurpose;
  buildingClass: BuildingPurpose;
  waris: string;
  designer: BuildingPurpose;
  supervisor: BuildingPurpose;
  fiscalYear?: string;
  type: string;
  lands: Land[];
  floor: Floor;
  buildingByLaws: BuildingByLaws;
  architecture: Architecture;
  electrical: Electrical;
  sanitationPlumbing: SanitationPlumbing;
  structure: Structure;
  applicant: Applicant;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus: string;
  user: User;
  uploadedDocuments: UploadedDocument[];
  registrationNo: string;
  rasidNo?: string;
  creationDate: string;
  count: number;
  plinth: Plinth;
  superStructure: SuperStructure;
  nirmanSampanna?: string;
  approveDate?: string;
  manjurinama?: string;
}

interface SuperStructure {
  id: number;
  imageName?: string;
  description?: string;
  requestForm: string;
  images: string;
  uploadedAt: string;
  projectId: number;
}

interface UploadedDocument {
  id: number;
  title: string;
  fileName: string;
  fileType: string;
  projectId: number;
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
  addresses: Address[];
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
  addresses: string[];
}

interface Structure {
  id: number;
  general: string;
  nbc101_104?: string;
  nbc105?: string;
  nbc106_114?: string;
  slabDesign?: string;
  criticalBeam?: string;
  foundation?: string;
  floor?: string;
  openingDetails?: string;
  columnDesign?: string;
  projectId: number;
}

interface SanitationPlumbing {
  id: number;
  underWaterTank: string;
  projectId: number;
}

interface Electrical {
  id: number;
  ratingSize: string;
  conductorsInCable: string;
  earthing: string;
  testing: string;
  projectId: number;
}

interface Architecture {
  id: number;
  buildingPurpose?: string;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  projectId: number;
}

interface BuildingByLaws {
  id: number;
  buildingData: string;
  landData: string;
  projectId: number;
}

interface Floor {
  id: number;
  floorDetail: string;
  projectId: number;
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
  address: string[];
}

interface BuildingPurpose {
  id: number;
  name: string;
}

export interface PTlog {
  id: number;
  from: string;
  to: string;
  transferBy: TransferBy;
  project: ProjectWApp;
  transferDate: string;
}

interface ProjectWApp {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate?: string;
  projectStatus1: string;
  projectStatus2: string;
  registrationNo: string;
  rasidNo: string;
  creationDate?: string;
  executive: boolean;
  technical: boolean;
  registration: boolean;
  ward: boolean;
  revenue: boolean;
}

interface TransferBy {
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

export interface getProjectsRes {
  data: ProjectType[];
  message: string;
}

// url = "/project/perma/individual?id="
// export const getPendingPr = () => get<any>("/project/perma/get/status2");

export interface GETReturnedProjects {
  data: ReturnedProjects[];
  message: string;
}

export interface ReturnedProjects {
  id: number;
  applicationDate?: string;
  buildingPurpose: BuildingPurpose;
  buildingClass: BuildingPurpose;
  waris: string;
  designer: BuildingPurpose;
  supervisor: BuildingPurpose;
  fiscalYear?: string;
  type: string;
  lands?: string;
  floor?: string;
  buildingByLaws?: string;
  architecture?: string;
  electrical?: string;
  sanitationPlumbing?: string;
  structure?: string;
  applicant: Applicant;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: string;
  editingStatus: string;
  user: User;
  uploadedDocuments: string[];
  registrationNo: string;
  rasidNo?: string;
  creationDate: string;
  count: number;
  plinth?: string;
  superStructure?: string;
  nirmanSampanna?: string;
  approveDate?: string;
}

interface BuildingPurpose {
  id: number;
  name: string;
}

// interface GETProjectswithPlinth {
//   data: PlinthProjects[];
//   message: string;
// }

export interface PlinthProjects {
  id: number;
  applicationDate?: string;
  buildingPurpose: BuildingPurpose;
  buildingClass: BuildingPurpose;
  waris: string;
  designer: BuildingPurpose;
  supervisor: BuildingPurpose;
  fiscalYear?: string;
  type: string;
  lands: Land[];
  floor: Floor;
  buildingByLaws: BuildingByLaws;
  architecture: Architecture;
  electrical: Electrical;
  sanitationPlumbing: SanitationPlumbing;
  structure: Structure;
  applicant: Applicant;
  projectStatus1: string;
  projectStatus2: string;
  user: User;
  uploadedDocuments: UploadedDocument[];
  registrationNo: string;
  rasidNo?: string;
  creationDate: string;
  count: number;
  plinth: Plinth;
  superStructure?: string;
  nirmanSampanna?: string;
  approveDate?: string;
}

export interface Plinth {
  id: number;
  imageName: string;
  description: string;
  requestForm: string;
  images: string;
  uploadedAt: string;
  projectId: number;
  status: string;
}
export interface ParsedPlinth {
  id: number;
  description?: string;
  uploadedAt: string;
  projectId: number;
  requestForm: PlinthReqForm;
  images: PlinthImages[];
  status: string;
}
export interface PlinthImages {
  imageName: string;
  imageUrl: string;
}

export interface PlinthReqForm {
  date: string;
  deignersName: string;
  cmRegdNo: string;
  consultancyName: string;
  remarks: string;
  sizeColPermitted: string;
  sizeColOnSite: string;
  sizeColYesNo: string;
  sizeColRemarks: string;
  sizeReinfPermitted: string;
  sizeReinfOnSite: string;
  sizeReinfYesNo: string;
  sizeReinfRemarks: string;
  noReinfPermitted: string;
  noReinfOnSite: string;
  noReinfYesNo: string;
  noReinfRemarks: string;
  splicePosPermitted: string;
  splicePosOnSite: string;
  splicePosYesNo: string;
  splicePosRemarks: string;
  sizeStirPermitted: string;
  sizeStirOnSite: string;
  sizeStirYesNo: string;
  sizeStirRemarks: string;
  spacStirPermitted: string;
  spacStirOnSite: string;
  spacStirYesNo: string;
  spacStirRemarks: string;
  beamJuncPermitted: string;
  beamJuncOnSite: string;
  beamJuncYesNo: string;
  beamJuncRemarks: string;
  verticalBandPermitted: string;
  verticalBandOnSite: string;
  verticalBandYesNo: string;
  verticalBandRemarks: string;
  clearCoverPermitted: string;
  clearCoverOnSite: string;
  clearCoverYesNo: string;
  clearCoverRemarks: string;
  sizeBeamsPermitted: string;
  sizeBeamsOnSite: string;
  sizeBeamsYesNo: string;
  sizeBeamsRemarks: string;
  sizeReinf2Permitted: string;
  sizeReinf2OnSite: string;
  sizeReinf2YesNo: string;
  sizeReinf2Remarks: string;
  noRein2Permitted: string;
  noRein2OnSite: string;
  noRein2YesNo: string;
  noRein2Remarks: string;
  splicePos2Permitted: string;
  splicePos2OnSite: string;
  splicePos2YesNo: string;
  splicePos2Remarks: string;
  sizeStir2Permitted: string;
  sizeStir2OnSite: string;
  sizeStir2YesNo: string;
  sizeStir2Remarks: string;
  spacStirr2Permitted: string;
  spacStirr2OnSite: string;
  spacStirr2YesNo: string;
  spacStirr2Remarks: string;
  beamJunc2Permitted: string;
  beamJunc2OnSite: string;
  beamJunc2YesNo: string;
  beamJunc2Remarks: string;
  clearCover2Permitted: string;
  clearCover2OnSite: string;
  clearCover2YesNo: string;
  clearCover2Remarks: string;
  saOfSlabPermitted: string;
  saOfSlabOnSite: string;
  saOfSlabYesNo: string;
  saOfSlabRemarks: string;
  thicknessSlabPermitted: string;
  thicknessSlabOnSite: string;
  thicknessSlabYesNo: string;
  thicknessSlabRemarks: string;
  sizeReinf3Permitted: string;
  sizeReinf3OnSite: string;
  sizeReinf3YesNo: string;
  sizeReinf3Remarks: string;
  spacReinf3Permitted: string;
  spacReinf3OnSite: string;
  spacReinf3YesNo: string;
  spacReinf3Remarks: string;
  topBotReinPermitted: string;
  topBotReinOnSite: string;
  topBotReinYesNo: string;
  topBotReinRemarks: string;
  splicePos3Permitted: string;
  splicePos3OnSite: string;
  splicePos3YesNo: string;
  splicePos3Remarks: string;
  clearCover3Permitted: string;
  clearCover3OnSite: string;
  clearCover3YesNo: string;
  clearCover3Remarks: string;
  setBacksPermitted: string;
  setBacksOnSite: string;
  setBacksYesNo: string;
  setBacksRemarks: string;
  sizeOfBuildPermitted: string;
  sizeOfBuildOnSite: string;
  sizeOfBuildYesNo: string;
  sizeOfBuildRemarks: string;
  lengthPermitted: string;
  lengthOnSite: string;
  lengthYesNo: string;
  lengthRemarks: string;
  breadthPermitted: string;
  breadthOnSite: string;
  breadthYesNo: string;
  breadthRemarks: string;
  septicTankPermitted: string;
  septicTankOnSite: string;
  septicTankYesNo: string;
  septicTankRemarks: string;
}

interface UploadedDocument {
  id: number;
  title: string;
  fileName: string;
  fileType: string;
  projectId: number;
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
  addresses: Address[];
}

export interface Address {
  id: number;
  province: BuildingPurpose;
  district: BuildingPurpose;
  municipality: BuildingPurpose;
  ward: BuildingPurpose;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface Structure {
  id: number;
  general: string;
  nbc101_104?: string;
  nbc105?: string;
  nbc106_114?: string;
  slabDesign?: string;
  criticalBeam?: string;
  foundation?: string;
  floor?: string;
  openingDetails?: string;
  columnDesign?: string;
  projectId: number;
}

interface SanitationPlumbing {
  id: number;
  underWaterTank: string;
  projectId: number;
}

interface Electrical {
  id: number;
  ratingSize: string;
  conductorsInCable: string;
  earthing: string;
  testing: string;
  projectId: number;
}

interface Architecture {
  id: number;
  buildingPurpose?: string;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  projectId: number;
}

interface BuildingByLaws {
  id: number;
  buildingData: string;
  landData: string;
  projectId: number;
}

interface Floor {
  id: number;
  floorDetail: string;
  projectId: number;
}
export interface Land {
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
  houseOwner?: Owner;
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
  address: string[];
}

interface BuildingPurpose {
  id: number;
  name: string;
}

export interface LargeProjectType {
  id: number;
  applicationDate: string;
  buildingPurpose: { id: number; name: string };
  buildingClass: { id: number; name: string };
  waris: { id: number; name: string };
  designer: { id: number; name: string };
  supervisor: { id: number; name: string };
  fiscalYear: null;
  type: string;
  lands: LandsWithOwner[];
  floor: {
    id: number;
    floorDetail: string;
    projectId: number;
  };
  buildingByLaws: {
    id: number;
    buildingData: string;
    landData: string;
    drawingRequirement: null;
    projectId: number;
  };
  architecture: {
    id: number;
    buildingPurpose: null;
    stairCase: string;
    exit: string;
    lightVentilation: string;
    lift: string;
    other: string;
    parapetHeight: string;
    forPhyDisable: null;
    projectId: number;
  };
  electrical: {
    id: number;
    ratingSize: string;
    conductorsInCable: string;
    earthing: string;
    testing: string;
    projectId: number;
  };
  sanitationPlumbing: {
    id: number;
    underWaterTank: string;
    projectId: number;
  };
  structure: {
    id: number;
    general: string;
    nbc101_104: string;
    nbc105: string;
    nbc106_114: string;
    slabDesign: string;
    criticalBeam: string;
    foundation: string;
    floor: string;
    openingDetails: string;
    projectId: number;
    columnDesign: string;
  };
  applicant: getUserTyp;
  uploadedDocuments: FilesUploaded[];
  lat: string;
  lon: string;
}

export interface ViewProjectLog {
  id: number;
  applicationDate: string;
  buildingPurpose: { id: number; name: string };
  buildingClass: { id: number; name: string };
  waris: { id: number; name: string };
  designer: { id: number; name: string };
  supervisor: { id: number; name: string };
  fiscalYear: null;
  type: null;
  lat: string;
  lon: string;
}
