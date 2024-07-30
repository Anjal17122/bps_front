import { MessageInstance } from "antd/es/message/interface";
import { get } from "../../../../Services/Api";
import { MyApi } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export const getBuildingCompletionReportData = async (pId: number | string) => {
  return get<FullDetail>("/building/completion/pdfdata?id=" + pId);
};

export const saveBuildingCompletionReport = async (
  data: BuildingReportPdfDataType,
  messageApi: MessageInstance
) => MyApi.postWres("/building/completion", data, messageApi);

export const getBuildingCompletionReportDataByProjectId = async (
  projectId: string | number,
  messageApi: MessageInstance
) =>
  MyApi.get<FullDetail>(
    "/building/completion/project?projectId=" + projectId,
    messageApi
  );

export const editBuildingCompletionReport = async (
  data: BuildingReportPdfDataType,
  messageApi: MessageInstance
) => MyApi.postWres("/building/completion", data, messageApi);

interface FullDetail {
  data: BuildingReportPdfDataType;
  message: string;
}

export interface BuildingReportPdfDataType {
  id: number | string;
  landOwnerName: string;
  houseOwnerName: string;
  buildingPurpose: string;
  address: string;
  plotAreaRopani: string;
  plotAreaSqFt: string;
  zone: string;
  far: string;
  designerName: string;
  classs: string;
  groundCoverateP: string;
  groundCoverageSqFt: string;
  row: string;
  rowMap: string;
  rowRemarks: string;
  setBack: string;
  setBackMap: string;
  setBackRemarks: string;
  riverBank: string;
  riverBankMap: string;
  riverBankRemarks: string;
  electricLine: string;
  electricLineMap: string;
  electricLineRemarks: string;
  floorDetail: string;
  totalFloorArea: string;
  floorAreaDifference: string;
  permissibleArea: string;
  actualFloorArea: string;
  permissibleBuildingHeight: string;
  plinthArea: string;
  storey: string;
  buildingHeight: string;
  projectId: number | string;
  plotNo: string;
  regdNo: string;
}
