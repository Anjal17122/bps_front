import { notification } from "antd";
import React from "react";

export interface ResponseMessageType {
  message: string;
  data: unknown;
}

export const showToastResponse = (response: ResponseMessageType) =>
  alert(response?.message);

export const showToastError = function (error: unknown) {
  if (error.response && error.response.data && error.response.data.message) {
    notification.error({ message: error.response.data.message });
  } else if (error?.response?.status === 403) {
    alert({
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
  } else if (error?.response?.status === 413) {
    alert("File size should be less than 8mb!");
  } else if (error?.response?.status === 429) {
    alert("Too many Requests from same IP");
  } else {
    notification.error({ message: error.message });
  }
  return error;
};
