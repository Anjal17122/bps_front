import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

const MyApi = new ApiService(BASE_URL);

export const POSTProjectImages = (
  body: ProjectImage,
  messageApi: MessageInstance
) => MyApi.post("/project/images", body, messageApi);

export const POSTProjectImagesFinal = (
  body: ProjectImage,
  messageApi: MessageInstance
) => MyApi.post("/project/images", body, messageApi);

export const GETProjectImages = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETprojectsImages>(
    "/project/images/by/project?id=" + id,
    messageApi
  );

export const GETProjectImagesFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGETprojectsImages>(
    "/project/images/by/project?id=" + id,
    messageApi
  );

export interface ProjectImage {
  name: string;
  projectId: number;
  description: string;
}

export interface ResGETprojectsImages {
  data: GETProjectImagesBody[];
  message: string;
}

export interface GETProjectImagesBody {
  id: number;
  name: string;
  projectId: number;
  creationDate: string;
  description: string;
}
