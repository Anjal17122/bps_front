import { get, getWLoad, postWres } from "./Api";
import { setSTyp } from "./CreateProjectService";

export const genRandomNum = (setsub: setSTyp) =>
  getWLoad<ResgenRandomNum>("/emsigner/random/number", setsub);

export const SignStatus = () => get<ResSignStatus>("/emsigner/latest");

interface ResSignStatus {
  data: SignStatusBody;
  message: string;
}

export interface SignStatusBody {
  id: number;
  personPerma: number;
  created_date: string;
  expiry_date: string;
  status: "Active" | "Disable" | "Inactive";
  creationDateNep?: any;
  expiryDateNep?: any;
  phoneNo: string;
  email: string;
  signDataBase64Encoded?: any;
  uniqueId: string;
}

interface ResgenRandomNum {
  data: genRandomNumBody;
  message: string;
}

export interface genRandomNumBody {
  return: string;
}

export interface POSTRegRadiantBody {
  email: string;
  phoneNo: string;
  signDataBase64Encoded: string;
}
export const POSTRegRadiant = (body: POSTRegRadiantBody, setsub: setSTyp) =>
  postWres("/emsigner", body, setsub);

export const POSTReRegRadiant = (body: POSTRegRadiantBody, setsub: setSTyp) =>
  postWres("/emsigner/reregister", body, setsub);
