import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { DataEntryUrl } from "../constants/constants";

export interface POSToldPermit {
  category: { id: number };
  clientNameEng: string;
  clientNameNep: string;
  homeOwnerNameEng: string;
  homeOwnerNameNep: string;
  kittaNumber: string;
  dartaNumber: string;
  dartaDate: string;
  clientCitizenshipNumber: string;
  homeOwnerCitizenshipNumber: string;
  ward: Ward;
  plotArea: string;
  tole: string;
  mapSheetNo: string;
  plinthArea: string;
  totalArea: string;
  revenueAmount: string;
  houseType: Ward;
  buildingType: Ward;
  remarks: string;
  dartaDateNep: string;
  panchayatWardString: string;
  asthaiDateNep: string;
  asthaiDateEng: string;
  phoneNo: string;
  houseLength: string;
  houseWidth: string;
  houseHeight: string;
  roadWidth: string;
  roadDistance: string;
  electricityCapacity: string;
  electricityDistance: string;
  riverWidth: string;
  riverDistance: string;
  eastName: string;
  eastKittaNo: string;
  westName: string;
  westKittaNo: string;
  northName: string;
  northKittaNo: string;
  southName: string;
  southKittaNo: string;
  floorDetails: string;
}

interface Ward {
  id: string;
}

export interface PUToldPermit extends POSToldPermit {
  id: number;
}

export const postOldPermit = (
  body: POSToldPermit,
  messageApi: MessageInstance
) => MyApi.post("/dataentry/doc/building/completion", body, messageApi);

export const putOldPermit = (body: PUToldPermit, messageApi: MessageInstance) =>
  MyApi.put("/dataentry/doc/building/completion", body, messageApi);

export const getOldPermitId = (id: number, messageApi: MessageInstance) =>
  MyApi.get<ResOldPermitId>(
    "/dataentry/doc/building/completion/" + id,
    messageApi
  );

export const getBuildingType = (messageApi: MessageInstance) =>
  MyApi.get<ResCommonBOdy>("/dataentry/building/type", messageApi);

export const getOldPermitCon = (messageApi: MessageInstance) =>
  MyApi.get<ResGetOldPermitCon>(
    "/dataentry/doc/building/completion/all",
    messageApi
  );

  export const getOldPermitAdmin = (messageApi: MessageInstance) =>
    MyApi.get<ResGetOldPermitCon>(
      "/dataentry/doc/building/completion/all",
      messageApi
    );

export const getHouseType = (messageApi: MessageInstance) =>
  MyApi.get<ResCommonBOdy>("/dataentry/house/type", messageApi);

export interface POSTFileOnlyBody {
  name: string;
  docId: sN;
  documentType: { id: sN };
}

interface ResFilesOnly {
  data: FilesOnlyBody[];
  message: string;
}

export interface FilesOnlyBody {
  id: number;
  name: string;
  documentType: DocumentType;
  docId: number;
}

interface ResGETdoc {
  data: GETdocBody;
  message: string;
}

export interface ResCommonBOdy {
  data: CommonBody[];
  message: string;
}

export interface ResOldPermitId {
  data: PUToldPermit;
  message: string;
}

export interface ResOldPermitId {
  data: PUToldPermit;
  message: string;
}

export interface OldPermitContentCOn {
  content: PUToldPermit[];
}

export interface ResGetOldPermitCon {
  data: PUToldPermit[];
  message: string;
}

export interface CommonBody {
  id: number;
  name: string;
}

export interface GETdocBody {
  id: number;
  clientNameEng: string;
  clientNameNep: string;
  homeOwnerNameEng: string;
  homeOwnerNameNep: string;
  kittaNumber: string;
  dartaNumber: string;
  dartaDate: string;
  nirmanSuikritDate?: any;
  nirmanSampannaDate?: any;
  clientCitizenshipNumber: string;
  homeOwnerCitizenshipNumber: string;
  files: any[];
  category: Category;
  ward: Category;
  oldWardDto?: any;
  panchayatWardDto: Category;
  creationDate: string;
  updateDate: string;
  plotArea: string;
  tole: string;
  mapSheetNo: string;
  plinthArea: string;
  totalArea: string;
  revenueAmount: string;
  houseType: Category;
  buildingType: Category;
  remarks: string;
  dartaDateNep: string;
  nirmanSampannaDateNep?: any;
  asthaiDateNep?: any;
  sthaiDateNep?: any;
  nirmanSampannaDateEng?: any;
  asthaiDateEng?: any;
  sthaiDateEng?: any;
  uniqueId: string;
  panchayatWardString: string;
  abilekhekaranDateNep?: any;
  abilekhekaranDateEng?: any;
  sabikWardString?: any;
  haalWardString: string;
}

export const GETcategorys = () => get<ResgetWards>("/category/all");

export const GETWards = () => get<ResgetWards>("/ward/all");

export const GetDocsByWard = (
  page: sN,
  size: sN,
  id: sN,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/ward?page=${page}&size=${size}&id=${id}`,
    messageApi
  );

export const GETdocTypes = () => get<ResgetWards>("/document/type/all");
export const GEThomeTypes = () => get<ResgetWards>("/house/type");
export const GETbuildingTypes = () => get<ResgetWards>("/building/type");

export const POSTdoc = (body: POSTdocBody, messageApi: MessageInstance) =>
  post("/doc", body, messageApi);

export const PUTdoc = (body: POSTdocBody, messageApi: MessageInstance) =>
  putWres("/doc", body, messageApi);

export const GETdocById = (id: sN) => get<ResGETdoc>(`/doc?id=${id}`);

export const GETdocs = (page: sN, size: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(`/doc/all?page=${page}&size=${size}`, messageApi);

export const GETdocsAsc = (page: sN, size: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(
    `/doc/all?page=${page}&size=${size}&order=asc`,
    messageApi
  );

//Change Status
export const PATCHstatus = (id: sN, catId: sN, messageApi: MessageInstance) =>
  patchWres(`/doc?id=${id}&categoryId=${catId}`, messageApi);

//Sort Link

export const GETdocsSOrt = (
  id: sN,
  page: sN,
  size: sN,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/category?page=${page}&size=${size}&id=${id}`,
    messageApi
  );

// Search Links

export const GETdocsName = (name: string, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(
    DataEntryUrl + `/doc/search/by/name?page=0&size=100&name=${name}`,
    messageApi
  );

export const SearchDocsByUniqueId = (
  name: string,
  messageApi: MessageInstance
) => MyApi.get<ResGETalldoc>(`/doc/uniqueid/${name}`, messageApi);

export const GETdocsKitta = (kitta: string, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/kittano?kittano=${kitta}`,
    messageApi
  );

export const GETdocsDarta = (darta: string, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/dartano?dartano=${darta}`,
    messageApi
  );

export const GETdocsPhone = (phoneNo: string, messageApi: MessageInstance) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/phoneNo?phoneNo=${phoneNo}`,
    messageApi
  );

export const GETdocscitizenship = (
  citizenship: string,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/citizenshipno?citizenshipno=${citizenship}`,
    messageApi
  );

export const GETdocsbyDate = (
  from: string,
  to: string,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGETalldoc>(
    `/doc/search/by/dartadate?from=${from}&to=${to}`,
    messageApi
  );

export const GETdocsByWard = (
  wardId: sN,
  page: sN,
  size: sN,
  messageApi: MessageInstance
) =>
  MyApi.get<ResGETalldoc>(
    `/doc/ward?wardId=${wardId}&page=${page}&size=${size}`,
    messageApi
  );

export const GETfilesonly = (id: sN) =>
  axios.get<ResFilesOnly>(BASE_URL + "/files/entity/by/doc?id=" + id);

export const POSTfileonly = (body: POSTFileOnlyBody) =>
  axios.post(BASE_URL + "/files/entity", body);

//del file

export const DELdocFile = (id: sN, messageApi: MessageInstance) =>
  del("files/entity?id=" + id, messageApi);

export interface ResGETalldoc {
  data: Data;
  message: string;
}

interface Data {
  total: number;
  data: GETDocBody[];
}

export interface GETDocBody {
  dartaDateNep?: string | null;
  nirmanSampannaDateNep?: string | null;
  asthaiDateNep?: string | null;
  sthaiDateNep?: string | null;
  nirmanSampannaDateEng?: string | null;
  asthaiDateEng?: string | null;
  sthaiDateEng?: string | null;

  id: number;
  clientNameEng: string;
  clientNameNep: string;
  homeOwnerNameEng?: string;
  homeOwnerNameNep?: string;
  kittaNumber: string;
  dartaNumber: string;
  dartaDate: string;
  nirmanSuikritDate?: string;
  nirmanSampannaDate?: string;
  clientCitizenshipNumber?: string;
  homeOwnerCitizenshipNumber?: string;
  files?: File[];
  category: DocumentType;
  ward?: DocumentType;
  panchayatWardString: string;
  oldWardDto?: DocumentType;
  panchayatWardDto?: DocumentType;
  creationDate: string;
  updateDate: string;
  plotArea: string;
  tole: string;
  mapSheetNo: string;
  plinthArea?: string;
  totalArea?: string;
  revenueAmount?: string;
  houseType?: DocumentType;
  buildingType?: DocumentType;
  remarks: string;
  phoneNo?: string;
  abilekhekaranDateNep: string;
  haalWardString: string;
  sabikWardString: string;
  uniqueId?: string;
}
