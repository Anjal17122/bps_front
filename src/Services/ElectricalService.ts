import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get, putWres } from "./Api";
import { sN } from "./ProjectService";

export const getElectrical = (id: sN, url = "/electrical/project?id=") =>
  get<ElectricalGet>(url + id);

export const postElectrical = (
  body: any,
  messageApi: MessageInstance,
  link: string
) => MyApi.postWres<ElectricalGet, any>(link, body, messageApi);

export const putElectrical = (body: any, link: string) =>
  putWres<ElectricalGet>(link, body);

export interface ElectricalType {
  ratingSize: string;
  conductorsInCable: string;
  earthing: string;
  testing: string;
}

export interface ElectricalPost {
  projectId: number;
  ratingSize?: string;
  conductorsInCable?: string;
  earthing?: string;
  testing?: string;
}

export interface ElectricalGet {
  data: ElectricalType;
  message: string;
}

export interface RatingNSizes {
  depth: string;
  depthRemark: string;
  wall20x30: string;
  minLight: string;
  minLightRemark: string;
  minPower: string;
  minPowerRemark: string;
  wall20x30Remark: string;
  wallCast: string;
  wallCastRemark: string;
  wallMild: string;
  wallMildRemark: string;
  watt2: string;
  watt2Remark: string;
  watt3: string;
  watt3Remark: string;
}

export interface maxCables {
  FcroSec25: string;
  FcroSec25Remark: string;
  FcroSec32: string;
  FcroSec32Remark: string;
  FcrosecA: string;
  FcrosecARemark: string;
  ScroSec25: string;
  ScroSec25Remark: string;
  ScroSec32: string;
  ScroSec32Remark: string;
  ScroSecA: string;
  ScroSecARemark: string;
  TcroSec25: string;
  TcroSec25Remark: string;
  TcroSec32: string;
  TcroSec32Remark: string;
  TcrosecA: string;
  TcrosecARemark: string;
}

export interface Earthing {
  B17: string;
  B17Remark: string;
  ESres: string;
  ESresRemark: string;
  depth: string;
  depthRemark: string;
  diaCopper: string;
  diaCopperRemark: string;
  diaIron: string;
  diaIronRemark: string;
  intDiaCast: string;
  intDiaCastRemark: string;
  intDiaGal: string;
  intDiaGalRemark: string;
  sizeGal: string;
  sizeGalRemark: string;
  thickCop: string;
  thickCopRemark: string;
  thickGal: string;
  thickGalRemark: string;
}

export interface Testing {
  dcVol: string;
  dcVolRemark: string;
  eachSwitch: string;
  eachSwitchRemark: string;
  insulConduct: string;
  insulConductRemark: string;
  insulEarth: string;
  insulEarthRemark: string;
  insulLive: string;
  insulLiveRemark: string;
  noOfPoint: string;
  noOfPointRemark: string;
  workVol: string;
  workVolRemark: string;
}
