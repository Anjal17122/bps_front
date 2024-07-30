import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL } from "../Api";
import { OwnProjectGET } from "../CreateProjectService";

const MyApi = new ApiService(BASE_URL);

export const getOwnProjects = async (
  url: string,
  messageApi: MessageInstance
) => {
  return MyApi.get<OwnProjectGET>(url, messageApi);
};
