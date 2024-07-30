import { PUToldPermit } from "../../../../Services/OldPermitService";
export interface Root {
  data: NagarjunPlinthType
  message: string
}

export interface NagarjunPlinthType {
  id: number
  clientNameEng: string
  clientNameNep: string
  homeOwnerNameEng: string
  homeOwnerNameNep: string
  kittaNumber: string
  dartaNumber: string
  dartaDate: string
  category: Category
  clientCitizenshipNumber: string
  homeOwnerCitizenshipNumber: string
  files: any
  ward: Ward
  creationDate: any
  updateDate: any
  plotArea: string
  tole: string
  mapSheetNo: string
  plinthArea: string
  totalArea: string
  revenueAmount: string
  houseType: HouseType
  buildingType: BuildingType
  remarks: string
  dartaDateNep: string
  panchayatWardString: string
  asthaiDateNep: string
  asthaiDateEng: string
  phoneNo: string
  houseLength: string
  houseWidth: string
  houseHeight: string
  roadWidth: string
  roadDistance: string
  electricityCapacity: string
  electricityDistance: string
  riverWidth: string
  riverDistance: string
  eastName: string
  eastKittaNo: string
  westName: string
  westKittaNo: string
  northName: string
  northKittaNo: string
  southName: string
  southKittaNo: string
  floorDetails: string
  permit: boolean
}

export interface Category {
  id: number
  name: string
}

export interface Ward {
  id: number
  name: string
}

export interface HouseType {
  id: number
  name: string
}

export interface BuildingType {
  id: number
  name: string
}


export const mapOldPermitToPlinth = (
  oldPermitId: PUToldPermit
): NagarjunPlinthType => {
  return {
    chalaniNo: oldPermitId.dartaNumber,
    currentTole: oldPermitId.tole,
    date: oldPermitId.asthaiDateNep,
    eastKittaNo: oldPermitId.eastKittaNo,
    westKittaNo: oldPermitId.westKittaNo,
    northKittaNo: oldPermitId.northKittaNo,
    southKittaNo: oldPermitId.southKittaNo,
    floors: JSON.parse(oldPermitId.floorDetails),
    homeOwners: [],
    landOwnersName: oldPermitId.clientNameNep,
    houseOwnersName: oldPermitId.homeOwnerNameNep,
    kittaNo: oldPermitId.kittaNumber,
    landActualSetback: "oldPermitId.landActualSetback",
    sabik: "oldPermitId.sabik",
    // landOwners: "oldPermitId.landOwnerNameNep",
    patraSankhya: "",
    mapSheetNo: oldPermitId.mapSheetNo,
    landArea: oldPermitId.plotArea,
    roadActualSetback: oldPermitId.roadDistance,
    roadWidth: oldPermitId.roadWidth,
    wardNo: oldPermitId.ward.id,
  };
};
