export interface OldPermitValuesPOST {
  dartaNumber: string;
  homeOwnerNameEng: string;
  homeOwnerCitizenshipNumber: string;
  kittaNumber: string;
  houseType: string[];
  buildingType: string[];
  tole: string;
  houseLength: string;
  houseWidth: string;
  houseHeight: string;
  // totalSquareFoot: string;
  roadWidth: string;
  eastName: string;
  westName: string;
  northName: string;
  southName: string;
  floorDetails: FloorDetail[];
  remarks: string;
  eastKittaNo: string;
  westKittaNo: string;
  northKittaNo: string;
  southKittaNo: string;
  dartaDateNep: string;
  homeOwnerNameNep: string;
  phoneNo: string;
  clientNameEng: string;
  clientNameNep: string;
  clientCitizenshipNumber: string;
  asthaiDateNep: string;
  revenueAmount: string;
  mapSheetNo: string;
  plotArea: string;
  plinthArea: string;
  totalArea: string;
  panchayatWardString: string;
  ward: string[];
  roadDistance: string;
  electricityCapacity: string;
  electricityDistance: string;
  riverWidth: string;
  riverDistance: string;
}

interface FloorDetail {
  description?: string;
  floorName: string[];
  floorArea: string;
}

export interface OldPermitValuesPut extends OldPermitValuesPOST {
  id: number;
}
