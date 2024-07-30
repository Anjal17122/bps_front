export interface ResGETArchitecturalLogsType {
  data: GETArchitecturalLogsType[];
  message: string;
}

export interface GETArchitecturalLogsType {
  id: number;
  buildingPurpose?: any;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  updatedBy: UpdatedBy;
  updatedDate: string;
  project: Project;
}

interface Project {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate?: any;
  projectStatus1: string;
  projectStatus2: string;
  reportStatus?: any;
  editingStatus: string;
  registrationNo: string;
  rasidNo: string;
  count: number;
  creationDate: string;
  plinth: Plinth;
  superStructure?: any;
  nirmanSampanna?: any;
  manjurinama?: any;
  noticeRemarks: string;
  remarks?: any;
  approveDate?: any;
  lat: string;
  lon: string;
  chalaniNo?: any;
  patraSankhya?: any;
  noticePublishedAt: string;
  muchulka: string;
  napiFile?: any;
  technical: boolean;
  wardTechnical: boolean;
  registration: boolean;
  napi: boolean;
  ward: boolean;
  executive: boolean;
  revenue: boolean;
  noticePublished: boolean;
  applicantDetailsApproved: boolean;
}

interface Plinth {
  id: number;
  description?: any;
  uploadedAt: string;
  projectId: number;
  requestForm: string;
  images: string;
  status: string;
  verifiedBy?: any;
  verifiedAt?: any;
  chalaniNo?: any;
  patraSankhya?: any;
  miti?: any;
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
  addresses: any[];
  organization: boolean;
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
  grandfatherNameNep?: any;
  grandfatherNameEng?: any;
  gender: string;
  maritalStatus: string;
  nec: string;
  necFileName: string;
  panNo?: any;
  addresses: any[];
  organization: boolean;
}
