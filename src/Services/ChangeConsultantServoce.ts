import { getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const SearchProjectById = (id: sN, sets: setSTyp) =>
  getWSub<ResSearchProjectById>("/project/perma/by/id?id=" + id, sets);

export const SearchProjectByName = (name: string, sets: setSTyp) =>
  getWSub<ResSearchProjectById>(
    "/project/perma/by/applicant?name=" + name,
    sets
  );

export const ChangeConsultantID = (pid: sN, consultantId: sN, sets: setSTyp) =>
  getWSub(
    `/project/perma/change/consultant?id=${pid}&consultantId=${consultantId}`,
    sets
  );

interface ResSearchProjectById {
  data: ProjectsNewDTO[];
  message: string;
}

export interface ProjectsNewDTO {
  id: number;
  type: string;
  applicantName: string;
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
  lat: string;
  lon: string;
  chalaniNo?: string;
  patraSankhya?: string;
  pdfDate?: string;
  noticePublishedAt?: string;
  noticeRemarks?: string;
  remarks?: string;
  muchulka?: string;
  napiFile?: string;
  remarksFile?: string;
  applicantDetailsApproved: boolean;
  noticePublished: boolean;
  ward: boolean;
  registration: boolean;
  technical: boolean;
  revenue: boolean;
  executive: boolean;
  napi: boolean;
}

interface BuildingPurpose {
  id: number;
  name: string;
}
