import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export const forgotPassSendEmail = (
  email: string,
  messageApi: MessageInstance
) => MyApi.get("/email/verification/code?email=" + email, messageApi);

export interface ForgotPassEmail {
  email: string;
  newp: string;
  code: string;
}

export interface ForgotPassPhone {
  phone: string;
  newp: string;
  code: string;
}

export const forgotPasswordCodeSub = (
  body: ForgotPassEmail | ForgotPassPhone,
  messageApi: MessageInstance
) => MyApi.put("/person/perma/forgot/password", body, messageApi);

export const resetPassword = (body: object, messageApi: MessageInstance) =>
  MyApi.put("/person/perma/change/password/token", body, messageApi);

export const forgotPassSendPhone = (
  phone: string,
  messageApi: MessageInstance
) => MyApi.get("/sms/verification/code?phone=" + phone, messageApi);

export const CreateResetPassUrl = (id: number, messageApi: MessageInstance) =>
  MyApi.get("/person/perma/generate/token?id=" + id, messageApi);

export interface CreateUrlBOdy {
  username: number;
}
