import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get } from "./Api";
import { sN } from "./ProjectService";

export const getArchitectural = (id: sN, url = "/architecture/project?id=") =>
  get<ResArchitecturalGet>(url + id);

export const postArchitectural = (
  body: any,
  link: string,
  messageApi: MessageInstance
) =>
  MyApi.postWres<ArchitecturalGet, ArchitecturalPost>(link, body, messageApi);

export const putArchitectural = (
  body: ArchitecturalPut,
  link: string,
  messageApi: MessageInstance
) => MyApi.putWRes<ArchitecturalGet, ArchitecturalPut>(link, body, messageApi);

export interface ResArchitecturalGet {
  data: ArchitecturalPost;
  message: string;
}
export interface ArchitecturalPost {
  id?: string;
  buildingPurpose: string;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  parapetHeight: string;
  forPhyDisable: string;
}

interface ArchitecturalBodyWithPid extends ArchitecturalPost {
  projectId: string;
}

export type ArchitecturalPut = Partial<ArchitecturalBodyWithPid>;

export interface ArchitecturalGet {
  id: string;
  buildingPurpose: string;
  stairCase: string;
  exit: string;
  lightVentilation: string;
  lift: string;
  other: string;
  parapetHeight: string;
  forPhyDisable: string;
}

export interface Staircase {
  bPur: string;
  bPurRemark: string;
  clwidStair: string;
  clwidStairRemark: string;
  handrail: string;
  handrailRemark: string;
  maxHeadRoom: string;
  maxHeadRoomRemark: string;
  maxRiser: string;
  maxRiserRemark: string;
  minTread: string;
  minTreadRemark: string;
  riser: string;
  riserRemark: string;
}

export interface Exit {
  maxTravel: string;
  maxTravelRemark: string;
  minHExit: string;
  minHExitRemark: string;
  minWidthExit: string;
  minWidthExitRemark: string;
  shutterOpen: string;
  shutterOpenRemark: string;
  widExit: string;
  widExitRemark: string;
}

export interface LightVent {
  MOAvent: string;
  MOAventRemark: string;
  minVent: string;
  minVentRemark: string;
  moaWin: string;
  moaWinRemark: string;
  tfaRoom: string;
  tfaRoomRemark: string;
}

export interface Lift {
  liftPBank: string;
  liftPBankRemark: string;
  liftPro: string;
  liftProRemark: string;
  totHbuild: string;
  totHbuildRemark: string;
}

export interface ArchitecturalOther {
  HparapetWall: string;
  HparapetWallRemark: string;
  SepEnt: string;
  SepEntRemark: string;
  maxWheel: string;
  maxWheelRemark: string;
  minWheel: string;
  minWheelRemark: string;
  provFire: string;
  provFireRemark: string;
}
