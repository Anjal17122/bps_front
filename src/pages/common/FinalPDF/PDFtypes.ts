import { WitnessGet } from "../../../Services/NewMuchulkaService";
import { CharKilla, LandOwner } from "../../../Services/PDFService";
import { sN } from "../../../Services/ProjectService";

export interface FloorRow {
  id?: number;
  countable: number;
  nCNT: number;
  name: string;
  ncT: number;
  other: number;
  prev: number;
  rate?: number;
  total?: number;
}

export type PDFBodyType = {
  coverage: string;
  far: string;
  landOwners: LandOwner[];
  homeOwners: LandOwner[];
  landOwnersName: string;
  houseOwnersName: string;
  wardName: string;
  toleNep: string;
  kittaNo: string;
  landArea: string;
  landLength: string;
  landWidth: string;
  landHeight: string;
  buildingStructureType: string;
  charkillas: CharKilla[];
  floors: FloorRow[];
  patraSankhya: string;
  chalaniNo: string;
  date: string;
  tala: string;
  applicantPhoto: string[];
  wardNo: sN;
  coveragePercent: string;
  row: string;
  sabik: string;
  groundCoverageStandard: string;
  floorAreaStandard: string;
  farCalculated: string;
  mapSheetNo: string;
  roadWidth: string;
  roadActualSetback: string;
  eastKittaNo: string;
  westKittaNo: string;
  northKittaNo: string;
  southKittaNo: string;
  landActualSetback: string;
  currentTole: string;
  buildingLength: string;
  buildingWidth: string;
  buildingHeight: string;
  eastSetback: string;
  westSetback: string;
  northSetback: string;
  southSetback: string;
  landAreaSqft: number;
  pid: number;
  citizenshipNo: string;
  district: string;
  plinthDate: string;
  superStructureDate: string;
  eastOnly: string;
  westOnly: string;
  northOnly: string;
  southOnly: string;
  projectCreationDate:string;
  highTensionSetBack?:number;
  riverSetBack?:string;
  
};

export type MuchulkaPDFdata = {
  coverage: string;
  far: string;
  landOwners: LandOwner[];
  homeOwners: LandOwner[];
  landOwnersName: string;
  houseOwnersName: string;
  wardName: string;
  toleNep: string;
  kittaNo: string;
  landArea: string;
  landLength: string;
  landWidth: string;
  landHeight: string;
  buildingStructureType: string;
  charkillas: CharKilla[];
  floors: FloorRow[];
  applicantPhoto: string[];
  wardNo: sN;
  coveragePercent: string;
  row: string;
  sabik: string;
  groundCoverageStandard: string;
  floorAreaStandard: string;
  farCalculated: string;
  mapSheetNo: string;
  applicantDistrict: string;
  applicantMunicipality: string;
  applicantWard: string;
  muchulkaWitness: WitnessGet[];
  muchulkaDate: string;
  muchulkaTime: string;
  muchulkaRemarks: string;
};

export type StyleHeader = {
  width: number;
  textDecoration:
    | "none"
    | "line-through"
    | "underline"
    | "line-through underline"
    | "underline line-through"
    | undefined;
  textDecorationStyle: string;
};

export const pdfDataSample = [
  {
    id: 1,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 2,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 3,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 4,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 5,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 6,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
  {
    id: 7,
    name: "जमिन तल्ला",
    other: 0,
    prev: 0,
    nCNT: 0,
    ncT: 0,
    countable: 890.28,
  },
];
