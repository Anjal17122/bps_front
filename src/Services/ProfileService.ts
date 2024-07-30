import { get, putWres } from "./Api";
import { PUTnaamsariLand } from "./NaamSariService";
import { sN } from "./ProjectService";

export const getProfile = () => get<ResGetProfile>("/person/perma/own/info");
export const GetAdmin = (id: sN) =>
  get<ResGetProfile>("/person/perma/id/" + id);

export const editProfile = (body: PUTnaamsariLand) =>
  putWres("/person/perma", body);

interface ResGetProfile {
  data: ProfileBody;
  message: string;
}

export interface ProfileBody {
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
  addresses?: Address[];
  organization: boolean;
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
