import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export type ExcelSort = "APPROVED" | "ALL" | "UNAPPROVED";

export const GETExcelData = (
  startDate: string,
  endDate: string,
  messageApi: MessageInstance,
  status: ExcelSort
) =>
  MyApi.get<ResExcelTable>(
    `/project/perma/excel?page=0&size=1000&startDate=${startDate}&endDate=${endDate}${
      status === "ALL" ? "" : "&status=" + status
    }`,
    messageApi
  );

export const GETExcelDataUnapproved = (
  startDate: string,
  endDate: string,
  messageApi: MessageInstance
) =>
  MyApi.get<ResExcelTable>(
    `/project/perma/excel/unapproved?page=0&size=1000&startDate=${startDate}&endDate=${endDate}`,
    messageApi
  );

interface ResExcelTable {
  data: ExcelTable[];
  message: string;
}

export interface ExcelTable {
  projectId: number;
  applicantNameEng: string;
  applicantNameNep: string;
  projectType: string;
  approvedDate?: string;
  creationDate: string;
  landDetails: LandDetail[];
  status: string;
}

interface LandDetail {
  kittaNo: string;
  landWardNo: string;
  landToleEng: string;
  landToleNep: string;
}
