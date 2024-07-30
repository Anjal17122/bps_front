import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import {
  customDel,
  del,
  get,
  getWSub,
  post,
  postWres,
  put,
  putWres,
} from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const delUploadByName = (name: string) =>
  customDel("/file/name?name=" + name);

export const getProjectOnly = (id: string, url: string) =>
  get<GETProjectOnlyBODY>(url + id);

export const getProjectPermaOnly = (id: sN) =>
  get<ResProjectPermaOnly>("/project/perma/only?id=" + id);

interface ResProjectPermaOnly {
  data: ProjectPermaBody;
  message: string;
}

export interface ProjectPermaBody {
  id: number;
  applicationDate?: any;
  buildingPurposeId: number;
  buildingPurposeName: string;
  buildingClassId: number;
  waris: string;
  lat: string;
  lon: string;
  designerId: number;
  supervisorId: number;
  fiscalYear?: any;
  type: string;
  count: number;
  manjurinama?: any;
  creationDate?: any;
}

export const postFloor = (
  body: PostFloor,
  messageApi: MessageInstance,
  link = "/floor"
) => MyApi.post(link, body, messageApi);

export const FinalApproveBoth = (id: sN, sets: setSTyp) =>
  getWSub(`/project/perma/approve?id=${id}`, sets);

// export const putFloor = (body: PostFloor, setS: , link = "/floor") =>
// post(link, body, setS);

export const addFile = (
  body: PostFileBody,
  messageApi: MessageInstance,
  url = "/file/add"
) => MyApi.post(url, body, messageApi);

export const delFile = (
  id: number,
  messageApi: MessageInstance,
  link = "/file"
) => MyApi.delNoRes(link + `?id=${id}`, messageApi);

export const delFilePerma = (
  id: number,
  messageApi: MessageInstance,
  link = "/file/perma/disable"
) => MyApi.get(link + "?id=" + id, messageApi);

export const putFloor = (
  body: PostFloor,
  messageApi: MessageInstance,
  url = "/floor"
) => MyApi.put(url, body, messageApi);

export const getFloor = (url: string, id: sN) => get<FloorRes>(url + id);

export const getByLaws = (id: sN, url = "/buildingbylaws/by/project?id=") =>
  get<ByLawsGet>(url + id);

export const postByLaws = (
  body: ByLawsPost,
  setS: setSTyp,
  link = "/buildingbylaws"
) => postWres<ByLawsGet>(link, body, setS);

// export const postByLaws = (body: ByLawsPost, setS: setStType) =>
// postWres<ByLawsGet>("/buildingbylaws", body, setS);

export const putByLaws = (
  body: ByLawsPost,
  messageApi: MessageInstance,
  url: string
) => MyApi.putWRes<ByLaws, ByLawsPost>(url, body, messageApi);

export const putLandArea = (
  body: ByLawsPost,
  messageApi: MessageInstance,
  url = "/buildingbylaws/land"
) => MyApi.putWRes<ByLaws, ByLawsPost>(url, body, messageApi);

export interface PostFileBody {
  fileName: string;
  title: string;
  fileType:
    | "architectural"
    | "structural"
    | "electrical"
    | "sanitation"
    | "analysisfile"
    | "analysisreport"
    | "soilTestReport"
    | "aggrement_file";
  projectId: sN;
  fileSize: string;
}
interface GETProjectOnlyBODY {
  data: ProjectOnly;
  message: string;
}

export interface ProjectOnly {
  id: number;
  applicationDate?: string;
  buildingPurposeId: number;
  buildingClassId: number;
  warisId: number;
  designerId: number;
  supervisorId: number;
  fiscalYear?: string;
  type: string;
}

export interface PostFloor {
  projectId: sN;
  floorDetail: string;
}

export interface Floor extends PostFloor {
  id: number;
}

export interface FloorRes {
  data: Floor;
  message: string;
}

// Building By Laws

interface ByLawsGet {
  data: ByLaws;
  message: string;
}
interface ByLawsPut {
  data: ByLaws;
  message: string;
}

export interface ByLaws {
  id: number;
  buildingData: string;
  landData: string;
  drawingRequirement: string;
  projectId: number;
}

export interface ByLawsPost {
  buildingData?: string;
  landData?: string;
  drawingRequirement?: string;
  projectId: sN;
  id?: sN;
}

/* <Cascader
                    disabled={!edit}
                    options={floorTypes}
                    placeholder="Select"
                  /> */

// <Cascader options={floorTypes} placeholder="Select" />
