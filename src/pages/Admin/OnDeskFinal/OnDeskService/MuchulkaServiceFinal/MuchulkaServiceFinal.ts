import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL } from "../../../../../Services/Api";
import { sN } from "../../../../../Services/ProjectService";
import ApiService from "../OnDeskApiService";

const MyApi = new ApiService(BASE_URL);

export const uploadMuchulkaNoValid = (
  id: sN,
  name: sN,
  messageApi: MessageInstance
) =>
  MyApi.getWmsgNoBody(
    `/project/perma/upload/muchulka/no/validation?id=${id}&muchulka=${name}`,
    messageApi
  );
