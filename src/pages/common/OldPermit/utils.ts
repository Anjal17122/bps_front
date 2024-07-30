import { PUToldPermit } from "../../../Services/OldPermitService";
import { PDFBodyType } from "../FinalPDF/PDFtypes";

// pdfData.houseOwnersName
// pdfData.houseOwnersName
// pdfData.landOwnersName
// pdfData.mapSheetNo
// pdfData.landArea
// pdfData.kittaNo
// pdfData.wardNo
// pdfData.roadWidth
// pdfData.roadActualSetback
// pdfData.landActualSetback
// pdfData.eastKittaNo
// pdfData.westKittaNo
// pdfData.northKittaNo
// pdfData.southKittaNo
// pdfData.sabik
// pdfData.date
// pdfData.patraSankhya
// pdfData.chalaniNo
// pdfData.landOwners
// pdfData.houseOwnersName
// pdfData.landOwnersName
// pdfData.wardNo
// pdfData.floors
// pdfData.floors
// pdfData.floors
// pdfData.floors

export const mapFromPermit = (data: PUToldPermit): PDFBodyType => {
  const body: PDFBodyType = {
    coverage: "",
    applicantPhoto: [],
    buildingHeight: data.houseHeight,
    buildingLength: data.houseLength,
    buildingWidth: data.houseWidth,
    date: data.dartaDate,
    houseOwnersName: data.homeOwnerNameNep,
    landOwnersName: data.clientNameNep,
    mapSheetNo: data.mapSheetNo,
    landArea: data.totalArea,
    kittaNo: data.kittaNumber,
    wardNo: data.ward.id,
    roadWidth: data.roadWidth,
    roadActualSetback: data.roadDistance,
    landActualSetback: "",
    eastKittaNo: data.eastKittaNo,
    westKittaNo: data.westKittaNo,
    northKittaNo: data.northKittaNo,
    southKittaNo: data.southKittaNo,
    sabik: data.panchayatWardString,
    patraSankhya: "",
    floors: JSON.parse(data.floorDetails),
    landOwners: [],
    buildingStructureType: "",
    charkillas: [],
    coveragePercent: "",
    currentTole: "",
    eastSetback: "",
    far: "",
    farCalculated: "",
    floorAreaStandard: "",
    groundCoverageStandard: "",
    northSetback: "",
    southSetback: "",
    westSetback: "",
    row: "",
    tala: "",
    chalaniNo: data.dartaNumber,
    homeOwners: [],
    landHeight: "",
    landWidth: "",
    landLength: "",
    toleNep: "",
    wardName: data.ward.id,
    landAreaSqft: 0,
    // toleNep: data.toleNep,
  };
  return body;
};
