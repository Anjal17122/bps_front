import { delParam, get, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const GETfloorPerma = (id: sN, sets: setSTyp) =>
  getWSub<ResFloorDataRevenue>("/floor/perma?id=" + id, sets);

export const GETfloorRate = () => get("/floor/rate/all");

export const GETrasidList = (id: sN) =>
  get<ResGetRasidList>("/project/perma/getallrashid/" + id);

export const DELRasid = (id: sN, setS: setSTyp) =>
  delParam("/project/perma/deleterasid/" + id, setS);

interface ResGetRasidList {
  data: RasidListType[];
  message: string;
}

export interface RasidListType {
  id: number;
  discount: string;
  fine: string;
  total: string;
  projectId: number;
  rasidNo?: string;
  rasidDate: string;
  fileName?: string;
  remarks: string;
  amount: number;
}

export interface ResFloorDataRevenue {
  data: FloorDataRevenue;
  message: string;
}

export interface FloorDataRevenue {
  id: number;
  floorDetail: string;
  projectId: number;
}
