import { get } from "./Api";
import { sN } from "./ProjectService";

export const getPerson = (id: sN) => get<ResGetPerson>("/person/" + id);
export const getPersonPerma = ( id: sN) =>{
  const url = "/person/perma?id="+id;
  return get<ResGetPerson>(url);

}
export const getConSultant = (url: "/person/" | "/person/perma/id/", id: sN) =>
  get<ResGetPerson>(url + id);

interface ResGetPerson {
  data: GetPerson;
  message: string;
}

export interface GetPerson {
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
  nec: string;
  necFileName: string;
  panNo?: string;
  personRole: PersonRole;
  addresses: Address[];
  organization: Organization;
  gender: "male" | "female" | "others";
  maritalStatus: "married" | "unmarried";
}

interface Organization {
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
  address: Address2[];
}

interface Address2 {
  id: number;
  ward: Province;
  municipality: Province;
  district: Province;
  province: Province;
  toleNep?: string;
  toleEng?: string;
  type?: string;
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

interface PersonRole {
  id: number;
  name: string;
}
