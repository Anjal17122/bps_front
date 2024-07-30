import {
  FloorRow,
  MuchulkaPDFdata,
  PDFBodyType,
} from "../pages/common/FinalPDF/PDFtypes";
import {
  BuildingAreaTyp,
  LandareaTyp,
} from "../pages/Consultant/ProjectCreate/Technical/BuildingByLaws/ByLawsData";
import { GetNewMuchulkaBody } from "../Services/NewMuchulkaService";
import { CharKilla, ResPlinthPdf } from "../Services/PDFService";
import { ResGetOneCertificate } from "../Services/PlinthService";
import { sN } from "../Services/ProjectService";
import { GeneralType } from "../Services/StructuralService";
import { municipalityDetails } from "./constants";
import { ConvertToNepali } from "./NumberConverter";

export const filterByDirection = (
  direction: "East" | "West" | "North" | "South",
  charkillas: CharKilla[]
): CharKilla | undefined => {
  const charkillass = charkillas.filter((charkilla) =>
    charkilla.direction.includes(direction)
  );
  return charkillass.length >= 1 ? charkillass[0] : undefined;
};

export type landscapeType =
  | "Road"
  | "Land"
  | "House"
  | "Temple"
  | "School"
  | "River"
  | "Jungle"
  | "High Tension Line";

export type directionType = "East" | "West" | "North" | "South";

export const landscapeConverter = (type: landscapeType): string => {
  if (type === "Road") return "सडक";
  else if (type === "Land") return "जमिन";
  else if (type === "House") return "घर";
  else if (type === "Temple") return "मन्दिर";
  else if (type === "School") return "विद्यालय";
  else if (type === "River") return "नदी";
  else if (type === "Jungle") return "जङ्गल";
  else if (type === "High Tension Line") return "विधुत लाइन";
  else return "";
};

export const directionOnly = (
  charkillas: CharKilla[],
  direction: directionType
): string => {
  return charkillas
    .filter((char) => char.direction === "East")
    .map(
      (chark) =>
        `${landscapeConverter(chark.landscapeType as landscapeType)} ${
          chark.nameNep
        } ${chark.kittaNo ? "कि नं. " + chark.kittaNo : ""}`
    )
    .join(", ");
};

export const GetPDFData = (
  res: ResPlinthPdf,
  cert: ResGetOneCertificate
): PDFBodyType => {
  const landData: LandareaTyp = JSON.parse(res.data.byLaws.landData ?? "{}");
  const buildingData: BuildingAreaTyp = JSON.parse(
    res.data.byLaws.buildingData ?? "{}"
  );


  const Structural: GeneralType = JSON.parse(
    res.data.structural.general ?? "{}"
  );

  const FloorData: FloorRow[] = JSON.parse(res.data.floor.floorDetail ?? "{}");
  const wardName = res.data.lands[0].wardName;

  const actualSqm = landData?.actualSqm ?? 0;
  // const buildingArea = parseFloat(extractNum(buildingData?.buildingArea ?? ""));
  // console.log({
  //   buildingArea: Number(buildingData?.buildingArea),
  //   actualSqm: landData?.actualSqm,
  // });

  const farCalculated = (
    Number(buildingData?.buildingArea) / Number(landData?.actualSqm)
  ).toFixed(2);

  // console.log({ farCalculated });

  const houseOwnersAddresses = res.data.lands
    .map((land) => land.houseOwner)
    .map((owner) => owner.map((own) => own.owner.address))
    .flat(2)
    .filter((add) => add.type === "CURRENT");
  const landOwnersAddresses = res.data.lands
    .map((land) => land.landOwner)
    .map((owner) => owner.map((own) => own.owner.address))
    .flat(2)
    .filter((add) => add.type === "CURRENT");

  const allDistricts = [...houseOwnersAddresses, ...landOwnersAddresses].map(
    (add) => add.district.nameNep
  );

  // remove duplicates from district
  const district = [...new Set(allDistricts)].join(", ");

  const charkillas = res.data.lands.map((land) => land.charKillas).flat(3);
  const road = charkillas.filter((chark) => chark.landscapeType === "Road");
  const land = charkillas.find((chark) => chark.landscapeType === "Land");
  const landList = charkillas.filter((chark) => chark.landscapeType === "Land");
  const houseList = charkillas.filter(
    (chark) => chark.landscapeType === "House"
  );
  const roadList = charkillas.filter((chark) => chark.landscapeType === "Road");

  const allMerged = [...landList, ...houseList, ...roadList];

  const allSetBacks = allMerged.map((d) => ({
    id: d.id,
    actualSetback: getSetbackNum(d.actualSetBack),
  }));
  // console.log("all set backs")
  // console.log(allSetBacks);
  // remove all elements from allSetBacks less than 1
  const removeLow = allSetBacks.filter((d) => d.actualSetback > 1);
  // console.log({ allSetBacks, removeLow });

  let highestActualSetback;
  // get lowest id from removeLow
  const lowestObject = removeLow.reduce((min, current) => {
    return current.actualSetback < min.actualSetback ? current : min;
  }, removeLow[0]);

  // console.log({ lowestObject });

  if (!removeLow.length || !lowestObject) {
    // was 0 before
    highestActualSetback = "5";
  } else {
    highestActualSetback = allMerged.filter((d) => d.id === lowestObject.id)[0]
      .actualSetBack;
  }

  const landActualSetback = isNagarjun()
    ? highestActualSetback
    : land?.actualSetBack ?? "";
  const roadWidth = road
    .map((roadone) => `${convertDirection(roadone.direction)} ${roadone.width}`)
    .join(", ");
  const roadActualSetback = road
    .map((roadone) => roadone.actualSetBack)
    .join(", ");

  const east = filterByDirection("East", charkillas);
  const west = filterByDirection("West", charkillas);
  const north = filterByDirection("North", charkillas);
  const south = filterByDirection("South", charkillas);

  const eastOnly = charkillas
    .filter((char) => char.direction === "East")
    .map(
      (chark) =>
        `${landscapeConverter(chark.landscapeType as landscapeType)} ${
          chark.nameNep
        } ${chark.kittaNo ? "कि नं. " + chark.kittaNo : ""}`
    )
    .join(", ");

  // const east = charkillas.find((chark) => chark.direction === "East");
  const eastKittaNo = east?.kittaNo ?? "";
  const westKittaNo = west?.kittaNo ?? "";
  const northKittaNo = north?.kittaNo ?? "";
  const southKittaNo = south?.kittaNo ?? "";

  const currentTole = res.data.lands[0].toleNep;
  const buildingLength = landData?.lengthM ?? "";
  const buildingWidth = landData?.widthM ?? "";
  const buildingHeight = landData?.buildingH ?? "";

  const eastSetback = east?.actualSetBack ?? "-";
  const westSetback = west?.actualSetBack ?? "-";

  const northSetback = north?.actualSetBack ?? "-";
  const southSetback = south?.actualSetBack ?? "-";

  const eastRoad =
    convertLandscape(east?.landscapeType ?? "") + (east?.nameNep ?? "");
  const westRoad =
    convertLandscape(west?.landscapeType ?? "") + (west?.nameNep ?? "");
  const northRoad =
    convertLandscape(north?.landscapeType ?? "") + (north?.nameNep ?? "");
  const southRoad =
    convertLandscape(south?.landscapeType ?? "") + (south?.nameNep ?? "");

  // console.log(res.data.plinthDate);

  const sendPlinthBody: PDFBodyType = {
    landOwnersName: res.data.lands
      .map((land) => land.landOwner)
      .map((owner) => owner.map((ownerrr) => ownerrr.owner.nameNep))
      .toString()
      .replace(/[\]"]+/g, ""),
    houseOwnersName: res.data.lands
      .map((land) => land.houseOwner)
      .map((owner) => owner.map((ownerrr) => ` ` + ownerrr.owner.nameNep))
      .toString()
      .replace(/[\]"]+/g, ""),
    wardName: res.data.lands[0].wardName,
    wardNo: wardName.length > 2 ? wardName.substring(5) : wardName,
    landOwners: res.data.lands.map((lannnddd) => lannnddd.landOwner).flat(),
    homeOwners: res.data.lands.map((lannnddd) => lannnddd.houseOwner).flat(),
    toleNep: res.data.lands[0].toleNep,
    kittaNo: res.data.lands
      ?.map((land) => land.landParcelNo)
      .toString()
      .replace(/[\]"]+/g, ""),
    landArea: res.data.lands
      ?.map((land) => land.ropani)
      .toString()
      .replace(/[\]"]+/g, ""),
    landLength: JSON.stringify(landData?.lengthM ?? "").replace(/[\]"]+/g, ""),
    landWidth: JSON.stringify(landData?.widthM ?? "").replace(/[\]"]+/g, ""),
    landHeight: JSON.stringify(landData?.buildingH ?? "").replace(
      /[\]"]+/g,
      ""
    ),
    buildingStructureType: JSON.stringify(Structural?.bstype ?? "").replace(
      /[^\w\s]|_/g,
      ""
    ),
    charkillas: charkillas,
    floors: FloorData,
    patraSankhya: cert.data.patraSankhya,
    chalaniNo: cert.data.chalaniNum,
    date: cert.data.projectCreationDate,
    tala: cert.data.tala ?? "",
    applicantPhoto: [
      JSON.stringify(
        res.data.lands.map((landdddd) =>
          landdddd.houseOwner.map((houseOwne) => houseOwne.owner.photoFileName)
        )
      ).replace(/[\]"]+/g, ""),
    ],
    coverage: (Number(actualSqm) * 10.764).toFixed(2),
    // (landData?.coverageSqm?.toString() ?? "").replace(/[\]"]+/g, ""),
    coveragePercent: landData?.coveragePer ?? "",
    far: (landData?.FAR?.toString() ?? "").replace(/[\]"]+/g, ""),
    row: (landData?.rowM?.toString() ?? "").replace(/[\]"]+/g, ""),
    sabik: ConvertToNepali(res.data.lands[0]?.sabik) ?? "",
    groundCoverageStandard: (Number(actualSqm) * 10.764 * 0.7).toFixed(2),
    floorAreaStandard: (Number(actualSqm) * 10.764 * 4).toFixed(2),
    farCalculated,
    mapSheetNo:
      res.data.lands
        ?.map((land) => land.mapSheetNo)
        .toString()
        .replace(/[\]"]+/g, "") ?? "",
    roadWidth,
    roadActualSetback: roadActualSetback,
    eastKittaNo: eastKittaNo ? eastKittaNo : eastRoad,
    westKittaNo: westKittaNo ? westKittaNo : westRoad,
    northKittaNo: northKittaNo ? northKittaNo : northRoad,
    southKittaNo: southKittaNo ? southKittaNo : southRoad,
    landActualSetback: landActualSetback,
    currentTole: currentTole,
    buildingLength: buildingLength,
    buildingWidth: buildingWidth,
    buildingHeight: buildingHeight,
    eastSetback: eastSetback,
    westSetback: westSetback,
    northSetback: northSetback,
    southSetback: southSetback,
    landAreaSqft: Number(landData.actualSqm) ?? 0,
    pid: cert.data.projectPermaId,
    citizenshipNo: res.data.lands
      .map((land) => land.landOwner)
      .map((owner) => owner.map((ownerrr) => ownerrr.owner.citizenshipNo))
      .flat()
      .join(", "),
    district: district,
    plinthDate: cert.data.plinthDate,
    superStructureDate: cert.data.superStructureDate,
    eastOnly: directionOnly(charkillas, "East"),
    westOnly: directionOnly(charkillas, "West"),
    northOnly: directionOnly(charkillas, "North"),
    southOnly: directionOnly(charkillas, "South"),
    highTensionSetBack:buildingData.highTSetback,
    riverSetBack: buildingData.riverSetback.length===0 ? "0": buildingData.riverSetback[0],
  };

  if (cert.data.sarjiminMiti)
    sendPlinthBody.sarjiminMiti = cert.data.sarjiminMiti;

  // projectCreationDate: cert.data.projectCreationDate,
  if (cert.data.projectCreationDate)
    sendPlinthBody.projectCreationDate = cert.data.projectCreationDate;
  return sendPlinthBody;
};

export const mapMuchulkaData = (
  res: ResPlinthPdf,
  muchulkaData: GetNewMuchulkaBody
) => {
  const landData: LandareaTyp = JSON.parse(res.data.byLaws.landData ?? "{}");
  const buildingData: BuildingAreaTyp = JSON.parse(
    res.data.byLaws.buildingData ?? "{}"
  );

  const Structural: GeneralType = JSON.parse(
    res.data.structural.general ?? "{}"
  );

  const FloorData: FloorRow[] = JSON.parse(res.data.floor.floorDetail ?? "{}");
  const wardName = res.data.lands[0].wardName;

  const actualSqm = landData?.actualSqm ?? 0;
  const farCalculated = (
    Number(buildingData?.buildingArea) / Number(landData?.actualSqm)
  ).toFixed(2);

  console.log({ actualSqm });

  const sendPlinthBody: MuchulkaPDFdata = {
    landOwnersName: res.data.lands
      .map((land) => land.landOwner)
      .map((owner) => owner.map((ownerrr) => ownerrr.owner.nameNep))
      .toString()
      .replace(/[\]"]+/g, ""),
    houseOwnersName: res.data.lands
      .map((land) => land.houseOwner)
      .map((owner) => owner.map((ownerrr) => ` ` + ownerrr.owner.nameNep))
      .toString()
      .replace(/[\]"]+/g, ""),
    wardName: res.data.lands[0].wardName,
    wardNo: wardName.length > 2 ? wardName.substring(5) : wardName,
    landOwners: res.data.lands.map((lannnddd) => lannnddd.landOwner).flat(),
    homeOwners: res.data.lands.map((lannnddd) => lannnddd.houseOwner).flat(),
    toleNep: res.data.lands[0].toleNep,
    kittaNo: res.data.lands
      ?.map((land) => land.landParcelNo)
      .toString()
      .replace(/[\]"]+/g, ""),
    landArea: res.data.lands
      ?.map((land) => land.ropani)
      .toString()
      .replace(/[\]"]+/g, ""),
    landLength: JSON.stringify(landData?.lengthM ?? "").replace(/[\]"]+/g, ""),
    landWidth: JSON.stringify(landData?.widthM ?? "").replace(/[\]"]+/g, ""),
    landHeight: JSON.stringify(landData?.buildingH ?? "").replace(
      /[\]"]+/g,
      ""
    ),
    buildingStructureType: JSON.stringify(Structural?.bstype ?? "").replace(
      /[^\w\s]|_/g,
      ""
    ),
    charkillas: res.data.lands.map((land) => land.charKillas).flat(3),
    floors: FloorData,
    applicantPhoto: [
      JSON.stringify(
        res.data.lands.map((landdddd) =>
          landdddd.houseOwner.map((houseOwne) => houseOwne.owner.photoFileName)
        )
      ).replace(/[\]"]+/g, ""),
    ],
    coverage: (landData?.coverageSqm?.toString() ?? "").replace(/[\]"]+/g, ""),
    coveragePercent: landData?.coveragePer ?? "",
    far: (landData?.FAR?.toString() ?? "").replace(/[\]"]+/g, ""),
    row: (landData?.rowM?.toString() ?? "").replace(/[\]"]+/g, ""),
    sabik: res.data.lands[0]?.sabik ?? "",
    groundCoverageStandard: (Number(actualSqm) * 10.764 * 0.7).toFixed(2),
    floorAreaStandard: (Number(actualSqm) * 10.764 * 4).toFixed(2),
    farCalculated,
    mapSheetNo:
      res.data.lands
        ?.map((land) => land.mapSheetNo)
        .toString()
        .replace(/[\]"]+/g, "") ?? "",
    applicantDistrict: res.data.applicant.addresses[0].district.nameNep,
    applicantMunicipality: res.data.applicant.addresses[0].municipality.nameNep,
    applicantWard: res.data.applicant.addresses[0].ward.nameNep,
    muchulkaWitness: muchulkaData.witnesses,
    muchulkaDate: muchulkaData.date,
    muchulkaTime: muchulkaData.time,
    muchulkaRemarks: muchulkaData.remarks,
  };
  return sendPlinthBody;
};

export const getAge = (dob: string): sN => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

export const convertDirection = (
  direction: "East" | "West" | "North" | "South"
) => {
  if (direction === "East") {
    return "पुर्व";
  } else if (direction === "West") {
    return "पश्चिम";
  } else if (direction === "North") {
    return "उत्तर";
  } else {
    return "दक्षिण";
  }
};

export const getSetbackNum = (str: string): number => {
  if (str.includes("'")) {
    const num1 = Number(str.substring(0, str.indexOf("'")));
    console.log({ num1 });
    return num1;
  } else if (str.includes("ft")) {
    const num2 = Number(str.substring(0, str.indexOf("ft")));
    return Number(num2);
  } else if (str.includes("फि")) {
    const num3 = Number(str.substring(0, str.indexOf("फि")));
    return Number(num3);
  } else if (str.includes("फी")) {
    const num3 = Number(str.substring(0, str.indexOf("फी")));
    return Number(num3);
  } else {
    return 0;
  }
};

export const convertLandscape = (landscapeUse: string): string => {
  return landscapeUse
    .replaceAll("Road", "सडक")
    .replaceAll("Land", "जमिन")
    .replaceAll("House", "घर")
    .replaceAll("Temple", "मन्दिर")
    .replaceAll("School", "विद्यालय")
    .replaceAll("River", "नदी")
    .replaceAll("Jungle", "जङ्गल")
    .replaceAll("High Tension Line", "विधुत लाइन");

  // const landscapeUseData = [
  //   { value: "Road", label: "Road", nepali: "सडक" },
  //   { value: "Land", label: "Land", nepali: "जमिन" },
  //   { value: "House", label: "House", nepali: "घर" },
  //   { value: "Temple", label: "Temple", nepali: "मन्दिर" },
  //   { value: "School", label: "School", nepali: "विद्यालय" },
  //   { value: "River", label: "River", nepali: "नदी" },
  //   { value: "Jungle", label: "Jungle", nepali: "जङ्गल" },
  //   {
  //     value: "High Tension Line",
  //     label: "High Tension Line",
  //     nepali: "विधुत लाइन",
  //   },
  // ];

  // const filteredLandscapeUse = landscapeUseData.filter((data) =>
  //   landscapeUse.includes(data.value)
  // );

  // return filteredLandscapeUse.map((data) => data.nepali)?.toString();
};

export function convertToFeet(meters: number) {
  const feet = Math.floor(meters * 3.28084);
  const remainingInches = (meters * 3.28084 - feet) * 12;
  const inches = Math.round(remainingInches);
  return `${feet}'${inches}"`;
}

export const calculateNagarjunRevenue = (
  total: number,
  type:
    | "Residental"
    | "Commercial"
    | "Health"
    | "Education"
    | "Tourism"
    | "Others(Specify)"
    | "Asthai Tahara"
) => {
  if (type === "Commercial") {
    return total * 25;
  }

  if (type === "Asthai Tahara") {
    return total * 5;
  }

  if (total <= 1500) {
    return total * 10;
  } else if (total <= 2500) {
    return 1500 * 10 + (total - 1500) * 15;
  } else if (total <= 3500) {
    return 1500 * 10 + 1000 * 15 + (total - 2500) * 20;
  } else if (total <= 5000) {
    return 1500 * 10 + 1000 * 15 + 1000 * 20 + (total - 3500) * 23;
  } else {
    return 1500 * 10 + 1000 * 15 + 1000 * 20 + 1500 * 23 + (total - 5000) * 25;
  }
};

export const isNagarjun = () => {
  // return true;
  if (municipalityDetails.letterheadTitle === "नागार्जुन नगरपालिका") {
    return true;
  } else {
    return false;
  }
};

export const isDhulikhel = () => {
  if (municipalityDetails.letterheadTitle === "धुलिखेल नगरपालिका") {
    return true;
  } else {
    return false;
  }
};

export const isMandandeupur = () => {
  if (municipalityDetails.letterheadTitle === "मण्डनदेउपुर नगरपालिका") {
    return true;
  } else {
    return false;
  }
};

export const calArthikBarsa = (date: string | undefined | ""): string => {
  if (!date) return "";
  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(5, 7));

  if (month > 3) {
    return year + `/${year + 1}`;
  } else {
    return year - 1 + `/${year}`;
  }
};
