import React from "react";
import { MessageInstance } from "antd/es/message/interface";
import axios from "axios";

export const checkIfError = (error: unknown, messageApi: MessageInstance) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "status" in error.response &&
    error.response.status === 403
  ) {
    // dispatchGlobal({ type: AcG.setLoginModal, payload: true });
    return messageApi.error({
      content: React.createElement(
        "span",
        {
          className: "myList",
        },
        "Token Expired. Click ",
        React.createElement(
          "a",
          { href: "/public/login", target: "_blank" },
          "here"
        ),
        " to ",
        React.createElement(
          "a",
          { href: "/public/login", target: "_blank" },
          "login"
        ),
        " again"
      ),
      duration: 4,
      style: {
        marginTop: "2vh",
      },
      className: "messageSuccess",
    });
  } else if (axios.isAxiosError(error)) {
    messageApi.error(error.response?.data.message);
  } else if (error instanceof Error) {
    messageApi.error(error.message);
  } else {
    messageApi.error("Failed! No error message.");
  }
};

export const isString = (data: unknown): string => {
  if (data !== null && typeof data === "string") {
    return data;
  }
  return "";
};
