export interface AddAdminFormVal {
  personImage: PersonImage[];
  nameEng: string;
  email: string;
  phone: string;
  Username: string;
  password: string;
  personRoleId: number[];
  panNo: string;
  cNo: string;
  cIDistrict: string[];
  cDate: string;
  citizenshipImage: CitizenshipImage[];
  gender: string;
  maritalStatus: string;
  fatherNep: string;
  fatherEng: string;
  gfNep: string;
  gfName: string;
  provinceIdPerma: number[];
  districtIdPerma: number[];
  municipalityIdPerma: number[];
  wardIdPerma: number[];
  wardId?: number[];
  toleEngPerma: string;
  toleNepPerma: string;
  provinceIdTemp: number[];
  districtIdTemp: number[];
  municipalityIdTemp: number[];
  wardIdTemp: number[];
  toleEngTemp: string;
  toleNepTemp: string;
}

export interface PersonImage {
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

export interface OriginFileObj {
  uid: string;
}

export interface Response {
  message: string;
}

export interface CitizenshipImage {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj2;
  status: string;
  response: Response2;
  thumbUrl: string;
}

export interface OriginFileObj2 {
  uid: string;
}

export interface Response2 {
  message: string;
}

