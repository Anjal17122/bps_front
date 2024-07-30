import { OneBody, setSTyp } from "./CreateProjectService";
import { AddressBody, CommonType } from "./AddressService";
import { BASE_URL, get, getWSub, post, put } from "./Api";
import Axios from "axios";
import { Ac } from "../Store/StoreViewProject/types";
import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { checkIfError } from "../pages/Admin/OnDeskFinal/TypeGuards/TypeGuards";
import { dispatch } from "../Store/StoreViewProject/StoreViewProj";
import { DigitalSignStatus } from "./ChangeDigitalSignatureStatus/ChangeDigitalSignatureStatus";
import { sN } from "./ProjectService";

export interface GetCommonTypArr {
  data: CommonType[];
  message: string;
}

export const getUnapprovedConsultants = () =>
  get<resGETunapprovedUsers>("/person/consultant?page=0&size=100");
export const getApprovedConsultants = () =>
  get<ResApprovedUsers>("/person/perma/consultant?page=0&size=100");
export const getDisabledConsultants = () =>
  get<ResApprovedUsers>("/person/perma/consultant/disabled?page=0&size=100");

export const verifyUser = async (id: number, messageApi: MessageInstance) => {
  return MyApi.get("/person/perma/approve?id=" + id, messageApi);
};

export interface ResgetConCertificateNotification {
  data: getConCertificateNotificationBody[];
  message: string;
}

export interface getConCertificateNotificationBody {
  id: number;
  certificateType: string;
  projectPermaId: number;
  content: string;
  signature: string;
  creationDate: string;
  signedBy: number;
  filename: string;
  chalaniId: number;
}

export const getConCertificateNotification = (messageApi: MessageInstance) =>
  MyApi.get<ResgetConCertificateNotification>("/signature/signed", messageApi);

export interface SwikritiBodyPost {
  name: string;
  description: string;
  personId: number;
  documentId: number;
}

export const uploadSwikriti = (
  body: SwikritiBodyPost,
  messageApi: MessageInstance
) => MyApi.post("/consultant/file", body, messageApi);

export const getSwikriti = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetConsultantDocs>("/consultant/file?id=" + id, messageApi);

export const delSwikriti = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/consultant/file?id=" + id, messageApi);
export const disableUser = async (
  id: number,
  status: "enabled" | "disabled" | "locked",
  messageApi: MessageInstance
) => {
  return MyApi.get(
    `/person/perma/change/status?id=${id}&status=${status}`,
    messageApi
  );
};

export const getUserstoVerify = async (page: number) => {
  return get<GETusersToVerify>(`/person/by/pagination?page=${page}&size=15`);
};

export const getUserTypes = async () => get<GetCommonTypArr>("/person/role");

export const getMunPerson = async (id: string) =>
  get<OneBody>("/person/perma/mun?id=" + id);

export const getNECPerson = async (id: string) =>
  get<OneBody>("/person/perma/nec?nec=" + id);

export const getUser = async (id: string) =>
  get<getUserTypRes>("/person/perma?id=" + id);

export const getOrganization = async (id = "0") =>
  get<ResGetOrgOnly>("/organization?id=" + id);

export interface ResGetConsultantDocs {
  data: GetConsultantDocs[];
  message: string;
}

export interface GetConsultantDocs {
  id: number;
  name: string;
  description: string;
  personId: number;
  documentId: number;
  documentType: DocumentType;
}

interface DocumentType {
  id: number;
  name: string;
}

interface putOrg {
  id: number;
  name: string;
  nameNep?: string;
  phone: string;
  email: string;
  regNumber: string;
  regFileName: string;
  panNumber: string;
  panFileName: string;
  taxClearFileName: string;
  orgLogo: string | null;
}

export const putOrganization = async (
  data: putOrg,
  messageApi: MessageInstance
) => MyApi.put("/organization", data, messageApi);

interface ResGetOrgOnly {
  data: OrgOnly;
  message: string;
}

export interface OrgOnly {
  id: number;
  name: string;
  nameNep?: string;
  phone: string;
  email: string;
  regNumber: string;
  regFileName: string;
  panNumber: string;
  panFileName: string;
  taxClearFileName: string;
  orgLogo: string | null;
  address?: string;
  person?: string;
}

export const savePerson = async (data: PersonType, setS: setSTyp) =>
  post("/person", data, setS);

export const savePersonFinal = async (
  data: PersonType,
  messageApi: MessageInstance
) => MyApi.postWres("/person", data, messageApi);

export interface EditUserTyp {
  id: string;
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
  nec: string;
  necFileName: string;
  panNo: string;
}

export const editConsultant = async (
  url: "/person/perma" | "/person",
  data: EditUserTyp,
  messageApi: MessageInstance
) => MyApi.put(url, data, messageApi);

export const editPerson = async (
  data: getUserTyp,
  messageApi: MessageInstance
) => MyApi.put("/person/perma", data, messageApi);

export const saveOrg = async (data: OrgType, setS: setSTyp) => {
  return post("/organization/person", data, setS);
};

export const saveOrgFinal = async (
  data: OrgType,
  messageApi: MessageInstance
) => MyApi.post("/organization/person", data, messageApi);

export const Login = async (data: LoginType, messageApi: MessageInstance) => {
  dispatch({ type: Ac.disableBtn, payload: true });
  try {
    const res: { data: LoginRes } = await Axios.post(BASE_URL + "/login", data);
    if (res.data.success === false) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw messageApi.error(res.data.message);
    } else {
      dispatch({ type: Ac.disableBtn, payload: false });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("wardId", res.data.wardId);
      localStorage.setItem("role", res.data.roles);
      localStorage.setItem("personId", res.data.personId);
      localStorage.setItem("type",res.data.type);

      return res;
    }
    // localStorage.setItem("token", response.token);
    // notification.success({ message: "Logged In Successfully!" });
  } catch (error) {
    dispatch({ type: Ac.disableBtn, payload: false });
    throw checkIfError(error, messageApi);
  }
  // const response: LoginRes = await postWres("/public/login", data, setS);
  // localStorage.setItem('userDetail', JSON.stringify(response.user));
};

// export interface Address {
//   id: number;
//   wardId: number;
//   municipalityId: number;
//   districtId: number;
//   provinceId: number;
//   toleNep: string;
//   toleEng: string;
//   type: string;
//   personId: number;
// }

export interface GETprojectsSubmitted {
  data: ProjectsSubmitted[];
  message: string;
}

export interface ProjectsSubmitted {
  id: number;
  type: string;
  applicant: Applicant;
  applicationDate: string;
  projectStatus1: string;
  projectStatus2: string;
  registration: boolean;
  technical: boolean;
  executive: boolean;
  revenue: boolean;
  ward: boolean;
  registrationNo?: string;
  rasidNo?: string;
  creationDate: string;
  editingStatus: "ENABLED" | "DISABLED";
}

// export interface GETusersToVerify {
//   data: UsersToVerify[];
//   message: string;
// }

export interface GETusersToVerify {
  data: UserToVerify[];
  message: string;
}

export interface UserToVerify {
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
  personRole: AddObj;
  addresses: Address2[];
  organization?: Organization;
  userStatus: string;
}

interface Organization {
  id: number;
  orgLogo: string;
  name: string;
  nameNep?: string;
  phone: string;
  email: string;
  regNumber: string;
  regFileName: string;
  panNumber: string;
  panFileName: string;
  taxClearFileName: string;
  address: Address2[];
}

interface Address2 {
  id: number;
  ward: AddObj;
  municipality: AddObj;
  district: AddObj;
  province: AddObj;
  toleNep?: string;
  toleEng?: string;
  type?: string;
}

interface AddObj {
  id: number;
  name: string;
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
  addresses: AddressWithObj[];
}
interface AddressWithObj {
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

export interface LoginRes {
  success: boolean;
  username: string;
  token: string;
  roles: string;
  message: string;
  wardId: string;
  personId: string;
  type:string;
}

// export const logout = (history: string) => {
//   localStorage.clear();
//   history("/public/login");
// };
export const getToken = (): string => {
  const token = localStorage.getItem("token");
  return token ? token : "null";
};

export interface OwnerType {
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
  address: getAddresses[];
}

// interface AddressOfOwner {
//   id: number;
//   province: Province;
//   district: Province;
//   municipality: Province;
//   ward: Province;
//   type: string;
//   toleNep: string;
//   toleEng: string;
// }

// interface Province {
//   id: number;
//   name: string;
// }
export interface PersonType {
  id?: string | number;
  nameEng: string;
  nameNep: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  citizenshipNo: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: "male" | "female" | "others";
  maritalStatus: "married" | "unmarried";
  nec?: string;
  necFileName?: string;
  projectId?: number;
  pId?: number | string;
  user?: {
    username: string;
    password: string;
  };
  addresses?: AddressBody[];
  address?: getAddresses[];
  citizenshipFileName: string;
  photoFileName: string;
}

export interface OrgType {
  name: string;
  phone: string;
  email: string;
  regNumber: string;
  regFileName: string;
  panNumber: string;
  panFileName: string;
  taxClearFileName: string;
  address: AddressBody[];
  person: PersonType[];
}

export interface ChangePasswordType {
  oldPassword: string;
  password: string;
}

export interface LoginType {
  userName: string;
  password: string;
}

export interface getAddresses {
  id: number;
  province: { id: number; name: string };
  district: { id: number; name: string };
  municipality: { id: number; name: string };
  ward: { id: number; name: string };
  type: string;
  toleNep: string;
  toleEng: string;
}

export interface getUserTypRes {
  data: getUserTyp;
  message: string;
}

export interface getUserTyp {
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
  personRole?: string;
  addresses: Address[];
  userStatus?: string;
  sabik?: string;
}

export interface Address {
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

interface resGETunapprovedUsers {
  data: UnapprovedUsers[];
  message: string;
}

export interface UnapprovedUsers {
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
  nec: string;
  necFileName: string;
  personRole: PersonRole;
  addresses: Address[];
  organization?: string;
  userStatus: string;
  emSignerStatus?: any;
}

// interface Address {
//   id: number;
//   province: PersonRole;
//   district: PersonRole;
//   municipality: PersonRole;
//   ward: PersonRole;
//   type: string;
//   toleNep: string;
//   toleEng: string;
// }

interface PersonRole {
  id: number;
  name: string;
}

interface ResApprovedUsers {
  data: Data2;
  message: string;
}

interface Data2 {
  adminList: ApprovedUsers[];
  totalRows: number;
}

export interface ApprovedUsers {
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
  nec: string;
  necFileName: string;
  personRole: PersonRole;
  addresses: Address[];
  userStatus: string;
  emSignerStatus: DigitalSignStatus;
}

// interface Address {
//   id: number;
//   province: PersonRole;
//   district: PersonRole;
//   municipality: PersonRole;
//   ward: PersonRole;
//   type: string;
//   toleNep: string;
//   toleEng: string;
// }

interface PersonRole {
  id: number;
  name: string;
}
// export interface getUserTyp {
//   id: number | string;
//   nameNep: string;
//   nameEng: string;
//   primaryPhone: string;
//   secondaryPhone?: string;
//   email: string;
//   photoFileName: string;
//   citizenshipNo: string;
//   citizenshipFileName: string;
//   citizenIssueDist: string;
//   citizenIssueDate: string;
//   fatherNameNep: string;
//   fatherNameEng: string;
//   grandfatherNameNep: string;
//   grandfatherNameEng: string;
//   gender: "male" | "female" | "others";
//   maritalStatus: "married" | "unmarried";
//   nec?: string;
//   necFileName?: string;
//   addresses?: getAddresses[];
// }
// s
