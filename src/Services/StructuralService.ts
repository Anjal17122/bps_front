import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get, putWres } from "./Api";
import { sN } from "./ProjectService";

export const getStructural = (id: sN, url = "/structure/project?id=") =>
  get<StructuralGet>(url + id);

export const postStructural = (
  body: any,
  link: string,
  messageApi: MessageInstance
) => MyApi.postWres(link, body, messageApi);

export const putStructural = (body: any, link: string) => putWres(link, body);

export interface StructuralGet {
  data: StructuralType;
  message: string;
}
export interface StructuralType {
  id: string;
  general: string;
  nbc101_104: string;
  nbc105: string;
  nbc106_114: string;
  slabDesign: string;
  criticalBeam: string;
  foundation: string;
  floor: string;
  openingDetails: string;
  columnDesign: string;
}

export interface GeneralType {
  isFCBSsubRemark: string;
  isFCBSsub: string;
  CADisUse: string;
  CADisUseRemark: string;
  bstype: string;
  bstypeRemark: string;
  noOfStdes: string;
  noOfStdesRemark: string;
  nosforPermit: string;
  nosforPermitRemark: string;
  provfurExt: string;
  provfurExtRemark: string;
  totalHext: string;
  totalHextRemark: string;
  designPhilosophy: string;
  designPhilosophyRemark: string;
}

export interface MaterialsAndLoadingBody {
  KNm2Bal: string;
  KNm2BalRemark: string;
  RCCkNm3: string;
  RCCkNm3Remark: string;
  matUsed: string;
  matUsedRemark: string;
  occLoadCSS: string;
  occLoadCSSRemark: string;
  occLoadkNm2: string;
  occLoadkNm2Remark: string;
}

export interface NBC105typ {
  soilTest: string;
  soilTestRemark: string;
  ACSeisDes: string;
  ACSeisDesRemark: string;
  BSCXC: string;
  BSCXCRemark: string;
  BSCYC: string;
  BSCYCRemark: string;
  BaseVBX: string;
  BaseVBXRemark: string;
  BaseVBY: string;
  BaseVBYRemark: string;
  DesXAh: string;
  DesXAhRemark: string;
  DesXCd: string;
  DesXCdRemark: string;
  DesYAh: string;
  DesYAhRemark: string;
  DesYCd: string;
  DesYCdRemark: string;
  ERD: string;
  ERDRemark: string;
  ImpFacI: string;
  ImpFacIRemark: string;
  SeisZonZ: string;
  SeisZonZRemark: string;
  SpecACXSag: string;
  SpecACXSagRemark: string;
  SpecACYSag: string;
  SpecACYSagRemark: string;
  corrMaxISDh: string;
  corrMaxISDhRemark: string;
  funTPXTxSec: string;
  funTPXTxSecRemark: string;
  maxISD: string;
  maxISDR: string;
  maxISDRRemark: string;
  maxISDRemark: string;
  seisWinkN: string;
  seisWinkNRemark: string;
  subsoil: string;
  subsoilRemark: string;
  buildingHeight: number;
  buildingHeightRemark: string;
  timePeriod: number;
  timePeriodRemark: string;
  amplifiedTimePeriod: number;
  amplifiedTimePeriodRemark: string;
  buildingType: number;
  buildingTypeRemark: string;
  elasticSiteSpectraULS: number;
  elasticSiteSpectraULSRemark: string;
  ductilityFactor: number;
  ductilityFactorRemark: string;
  baseShearDesignCoefficient: number;
  baseShearDesignCoefficientRemark: string;
  elasticSiteSpectraSLS: number;
  elasticSiteSpectraSLSRemark: string;
  overstrengthFactor: number;
  overstrengthFactorRemark: string;
  baseShearDesignCoefficient2: number;
  baseShearDesignCoefficient2Remark: string;
}
export interface NBC106typ {
  SafetyWares: string;
  SafetyWaresRemark: string;
  conGrade: string;
  conGradeRemark: string;
  fireSafety: string;
  fireSafetyRemark: string;
  reinSteel: string;
  reinSteelRemark: string;
  river50m: string;
  river50mRemark: string;
  safetyCode: string;
  safetyCodeRemark: string;
  snowType: string;
  snowTypeRemark: string;
  soilTest: string;
  soilTestRemark: string;
  toe50m: string;
  toe50mRemark: string;
}
export interface SlabDesignTyp {
  conGrade: string;
  conGradeRemark: string;
  BasicLdRatio: string;
  BasicLdRatioRemark: string;
  ConSlab: string;
  ConSlabRemark: string;
  EDRLd: string;
  EDRLdRemark: string;
  ETSlabDmm: string;
  ETSlabDmmRemark: string;
  ReqMod: string;
  ReqModRemark: string;
  actualMod: string;
  actualModRemark: string;
  proTRAst: string;
  proTRAstRemark: string;
  reqTRAst: string;
  reqTRAstRemark: string;
  sSpanLmm: string;
  sSpanLmmRemark: string;
}
export interface CriticalBeamtyp {
  minPerRein: string;
  minPerReinRemark: string;
  conGrade: string;
  conGradeRemark: string;
  minColmm2: string;
  basicLD: string;
  basicLDRemark: string;
  calCriSpan: string;
  calCriSpanRemark: string;
  checkCritical: string;
  checkCriticalRemark: string;
  cricolLen: string;
  cricolLenRemark: string;
  criticalLmm: string;
  criticalLmmRemark: string;
  depthBeamMM: string;
  depthBeamMMRemark: string;
  designPhil: string;
  designPhilRemark: string;
  isFCBSsub: string;
  isFCBSsubRemark: string;
  minColmm: string;
  minColmmRemark: string;
  minLongit: string;
  minLongitRemark: string;
  shortCol: string;
  shortColRemark: string;
  support: string;
  supportRemark: string;
}
export interface FoundationTyp {
  minPerReinRemark: string;
  minPerRein: string;
  bcStrnmm: string;
  bcStrnmmRemark: string;
  conGrade: string;
  conGradeRemark: string;
  depthGm: string;
  depthGmRemark: string;
  depthGtB: string;
  depthGtBRemark: string;
  morRatio: string;
  morRatioRemark: string;
  type: string;
  typeRemark: string;
  widthFm: string;
  widthFmRemark: string;
}

export interface FloorTypArc {
  OCrossM: string;
  OCrossMRemark: string;
  OfloorWalM: string;
  OfloorWalMM: string;
  OfloorWalMMRemark: string;
  OfloorWalMRemark: string;
  TCrossM: string;
  TCrossMRemark: string;
  TWallM: string;
  TWallMRemark: string;
  TWallTmm: string;
  TWallTmmRemark: string;
  gFloorMM: string;
  gFloorMMRemark: string;
  gfloorM: string;
  gfloorMRemark: string;
  maxLenCrossm: string;
  maxLenCrossmRemark: string;
}

export interface OpeningDetailsTyp {
  dis600mm12: string;
  dis600mm12Remark: string;
  horDis60012: string;
  horDis60012Remark: string;
  leastDisMM: string;
  leastDisMMRemark: string;
  maxPerOp: string;
  maxPerOpRemark: string;
  provStrength: string;
  provStrengthRemark: string;
  lintelThick: string;
  lintelThickRemark: string;
  sillBand: string;
  sillBandRemark: string;
}
