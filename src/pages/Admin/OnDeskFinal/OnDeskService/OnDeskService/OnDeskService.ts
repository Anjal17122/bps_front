import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL } from "../../../../../Services/Api";
import { ResFloorDataRevenue } from "../../../../../Services/FloorService";
import { POSTnoticePublishBody } from "../../../../../Services/NoticeTypeService";
import { ResGETprojectsImages } from "../../../../../Services/ProjectImagesServices";
import { LargeProjectType, sN } from "../../../../../Services/ProjectService";
import ApiService from "../OnDeskApiService";
import { POSTRasidBody } from "../../AdminViewProjFInal/common/types";

const MyApi = new ApiService(BASE_URL);

export const getProject = async (id: string, messageApi: MessageInstance) =>
  MyApi.get<LargeProjectType>("/project/perma?id=" + id, messageApi);

export const approveOneFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.getWmsgNoBody(`/project/perma/individual?id=${id}`, messageApi);

export interface PUTSetDartaBody {
  id: number;
  registrationNo: string;
}
export function sendDartaNo(
  body: PUTSetDartaBody,
  messageApi: MessageInstance
) {
  return MyApi.putWRes("/project/perma/registrationno", body, messageApi);
}

export function onTransferProj(
  id: sN,
  status: string,
  messageApi: MessageInstance
) {
  return MyApi.getWmsgNoBody(
    "/project/perma/status2?id=" + id + "&status=" + status,
    messageApi
  );
}

export const POSTnoticePublishFinal = (
  body: POSTnoticePublishBody,
  messageApi: MessageInstance
) => MyApi.post("/noticepublish", body, messageApi);

export const GETfloorPerma = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResFloorDataRevenue>("/floor/perma?id=" + id, messageApi);

export const POSTrasidNo = (body: POSTRasidBody, messageApi: MessageInstance) =>
  MyApi.post("/project/perma/rasidno", body, messageApi);

export const copyImageFinal = async (
  b: {
    fileName: string;
    dir: string;
  }[],
  messageApi: MessageInstance
) => MyApi.post("/copy/image/mul", b, messageApi);

export const DELRasidFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/project/perma/deleterasid/" + id, messageApi);

export const GETProjectImagesFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETprojectsImages>(
    "/project/images/by/project?id=" + id,
    messageApi
  );
