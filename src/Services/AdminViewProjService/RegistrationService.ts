import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL } from "../Api";
import { sN } from "../ProjectService";

const MyApi = new ApiService(BASE_URL);

export const postDartaDetails = (
  body: POSTdartaDetailsBOdy,
  messageApi: MessageInstance
) => MyApi.post("/project/perma/update/darta", body, messageApi);

export interface POSTdartaDetailsBOdy {
  projectId: sN;
  dartaDateEng?: string;
  dartaDateNep?: string;
  dartaNo: string;
}
