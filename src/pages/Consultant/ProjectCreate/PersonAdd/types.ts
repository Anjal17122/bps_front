export interface PersonVal {
  Username?: string;
  password?: string;
  personimg: Personimg[];
  nameNep: string;
  nameEng: string;
  phone: string;
  email: string;
  citizenshipNo: string;
  citizenIssueDate: string;
  citizenshipImg: Upload[];
  citizenIssueDist: string[];
  gender: "male" | "female" | "others";
  maritalStatus: "married" | "unmarried";
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  provinceIdPerma: number[];
  districtIdPerma: number[];
  municipalityIdPerma: number[];
  wardIdPerma: number[];
  toleEngPerma: string;
  toleNepPerma: string;
  provinceIdTemp?: number[];
  districtIdTemp?: number[];
  municipalityIdTemp?: number[];
  wardIdTemp?: number[];
  toleEngTemp?: string;
  toleNepTemp?: string;
  sabik?: string;
}

interface Upload {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: Response;
}

interface Personimg {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: Response;
  thumbUrl: string;
}

interface Response {
  message: string;
}

interface OriginFileObj {
  uid: string;
}
