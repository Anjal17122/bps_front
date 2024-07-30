import { MessageInstance } from "antd/es/message/interface";

export const CustomMsg = (
  msg: string,
  duration = 3,
  myMessageApi: MessageInstance
) => {
  myMessageApi.success({
    content: msg,
    className: "messageSuccess",
    duration,
  });
};

export const CustomMsgErr = (
  msg: string,
  myMessageApi: MessageInstance,
  duration = 1,
  className = "messageSuccess"
) => {
  myMessageApi.error({
    content: msg,
    className,
    duration,
  });
};
