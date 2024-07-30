import React from "react";
import { Timeline } from "antd";
import { MessagingSystemBody } from "../../../Services/MessagingSystemService";
import "./MessagingSystem.scss";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import MyPopconfirm from "../../../Common/Popconfirm/MyPopconfirm";

type Props = {
  messages: MessagingSystemBody[];
  onDelete: (id: number) => void;
  delButtonDisabled: boolean;
  projectId: string;
};

const MessagingSystemTimeline = ({
  messages,
  onDelete,
  delButtonDisabled,
  projectId,
}: Props) => {
  return (
    <div className="MessagingSystemTimeline">
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 5,
        }}
      >
        <span style={{ color: "rgba(9, 94, 128, 0.523)" }}>
          Project Id: {projectId}
        </span>
      </div>
      <h2>Messages:</h2>
      <Timeline>
        {messages.map((messag) => {
          const dateTime = new Date(messag.creationDate).toLocaleTimeString(
            [],
            { timeStyle: "short" }
          );
          const date = new Date(messag.creationDate).toLocaleDateString("en", {
            month: "2-digit",
            day: "2-digit",
          });
          return (
            <Timeline.Item
              key={messag.id}
              dot={
                <UserOutlined style={{ fontSize: 16, borderRadius: "50%" }} />
              }
            >
              <div className="MessageContent">
                <p>
                  {messag.name}{" "}
                  <span>
                    {messag.department.substring(5, messag.department.length)}
                  </span>
                </p>
                <p className="mainContent">{messag.message}</p>
                <h4>
                  {date} {dateTime}
                </h4>
                <div className="DeleteButton">
                  <MyPopconfirm
                    disabled={delButtonDisabled}
                    button={<DeleteOutlined style={{ color: "red" }} />}
                    type="link"
                    onConfirm={() => onDelete(messag.id)}
                  />
                </div>
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default MessagingSystemTimeline;
