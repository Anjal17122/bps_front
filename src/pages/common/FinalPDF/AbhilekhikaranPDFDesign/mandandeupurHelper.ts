import { CharKilla, NoticePDFdata } from "../../../../Services/PDFService";

export const checkSetback = (charKilla: CharKilla[]) => {
  if (!charKilla) return true;
  let properSetback = true;

  charKilla.forEach((char) => {
    const actual = parseFloat(char?.actualSetBack ?? "");
    const standard = parseFloat(char?.standardSetBack ?? "");
    if (standard === actual) {
      properSetback = true;
    }
    if (standard > actual) {
      properSetback = false;
    }
  });
  return properSetback;
};

export interface BackendData {
  applicant: Applicant;
  lands: Land[];
}

export interface Applicant {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  nec: any;
  necFileName: any;
  panNo: any;
  organization: boolean;
  addresses: Address[];
  sabik: any;
}

export interface Address {
  id: number;
  province: Province;
  district: District;
  municipality: Municipality;
  ward: Ward;
  type: "PERMANENT" | "CURRENT";
  toleNep: string;
  toleEng: string;
}

export interface Province {
  id: number;
  name: string;
  nameNep: any;
}

export interface District {
  id: number;
  name: string;
  nameNep: any;
}

export interface Municipality {
  id: number;
  name: string;
  nameNep: any;
}

export interface Ward {
  id: number;
  name: string;
  nameNep: any;
}

export interface Land {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana: any;
  paisa: any;
  daam: any;
  remarks: any;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  creationDate: string;
  landOwner: any[];
  houseOwner: any[];
  owners: any;
  charKillas: CharKilla[];
  projectId: number;
  charkillaLetter: string;
  address: any;
  sabik: any;
}

export const getAddress = (
  data: NoticePDFdata | undefined | null,
  type: "CURRENT" | "PERMANENT"
): {
  province: string;
  district: string;
  municipality: string;
  ward: string;
  tole: string;
} => {
  const address = data?.applicant?.addresses?.find(
    (address) => address.type === type
  );
  return {
    province: address?.province?.nameNep ?? "",
    district: address?.district?.nameNep ?? "",
    municipality: address?.municipality?.nameNep ?? "",
    ward: address?.ward?.name ?? "",
    tole: address?.toleNep ?? "",
  };
};

export const getHouseOwnerAndLandOwnerName = (
  data: BackendData | undefined
): string => {
  const landOwners = data?.lands?.flatMap((land) => land.landOwner ?? []) ?? [];
  const houseOwners =
    data?.lands?.flatMap((land) => land.houseOwner ?? []) ?? [];
  //   land?.houseOwner?.length ? land.houseOwner : []
  // ) ?? [];

  const landOwnerNames = JSON.stringify(
    landOwners.map((owner) => owner?.owner?.nameNep)
  );
  const houseOwnerNames = JSON.stringify(
    houseOwners.map((owner) => owner?.owner?.nameNep)
  );

  return (
    (houseOwnerNames ?? "").replaceAll(/[\\[\]"]+/g, "") ||
    (landOwnerNames ?? "").replaceAll(/[\\[\]"]+/g, "")
  );
};

export const getHouseOwnerName = (data: BackendData | undefined): string => {
  const houseOwners =
    data?.lands?.flatMap((land) => land.houseOwner ?? []) ?? [];
  //   land?.houseOwner?.length ? land.houseOwner : []
  // ) ?? [];

  const houseOwnerNames = JSON.stringify(
    houseOwners.map((owner) => owner?.owner?.nameNep)
  );

  return (houseOwnerNames ?? "").replaceAll(/[\\[\]"]+/g, "");
};

export const getLandOwnerName = (data: BackendData | undefined): string => {
  const landOwners = data?.lands?.flatMap((land) => land.landOwner ?? []) ?? [];

  const landOwnerNames = JSON.stringify(
    landOwners.map((owner) => owner?.owner?.nameNep)
  );

  return (landOwnerNames ?? "").replaceAll(/[\\[\]"]+/g, "");
};

const isArrayTruthy = <T>(arr?: T[]): undefined | T[] => {
  if (!arr) return undefined;
  if (arr.length) {
    return arr;
  } else {
    return undefined;
  }
};

function isPerson(obj: Object): obj is { name: string; age: number } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "age" in obj &&
    typeof obj.name === "string" &&
    typeof obj.age === "number"
  );
}

// typeguard example for array with flexible length
