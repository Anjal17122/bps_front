import { useEffect, useState } from "react";
import { Input, message, Spin } from "antd";
import MyPopconfirm from "../../../Common/Popconfirm/MyPopconfirm";
import "./MessagingSystem.scss";
import {
  DELmessagingSystem,
  GETmessagingSystem,
  MessagingSystemBody,
  POSTmessagingSystem,
} from "../../../Services/MessagingSystemService";
import { useParams } from "react-router-dom";
import MessagingSystemTimeline from "./MessagingSystemTimeline";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

const MessagingSystem = () => {
  const [myMessage, setMessage] = useState("");
  const [messagingSystem, setMessagingSystem] =
    useState<MessagingSystemBody[]>();

  const [delButtonDisabled, setDelButtonDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  const params: { pid?: string } = useParams();

  useEffect(() => {
    GETmessagingSystem(params.pid ?? "0").then((res) => {
      setMessagingSystem(res.data);
    });
    return () => {
      setMessagingSystem(undefined);
    };
  }, []);

  const onSendMessage = () => {
    if (!myMessage) return messageApi.error("Message is Empty!");
    const body = {
      designation: "",
      filename: "",
      name: "test",
      parentId: 0,
      projectId: parseInt(params.pid ?? "0"),
      status: "",
      message: myMessage,
    };
    POSTmessagingSystem(body, messageApi).then((res) => {
      setMessage("");
      const init: MessagingSystemBody[] = [...(messagingSystem ?? []), res];
      setMessagingSystem(init);
    });
  };

  const onDelMessage = (id: number) => {
    DELmessagingSystem(id, messageApi).then(() => {
      const init = [...(messagingSystem ?? [])];
      const filtered = init.filter((messages) => messages.id !== id);
      setMessagingSystem(filtered);
    });
  };

  return (
    <div className="MessagingSystem">
      {contextHolder}
      <div className="MyMessages">
        {messagingSystem ? (
          <MessagingSystemTimeline
            projectId={params.pid ?? "0"}
            messages={messagingSystem}
            delButtonDisabled={delButtonDisabled}
            onDelete={onDelMessage}
          />
        ) : (
          <Spin />
        )}
      </div>
      <div className="MessageSend">
        <Input.TextArea
          rows={2}
          placeholder="Message.."
          onChange={(e) => setMessage(e.target.value)}
        />

        <MyPopconfirm
          type="primary"
          size="middle"
          button={"Send"}
          disabled={disabled}
          onConfirm={onSendMessage}
        />
      </div>
    </div>
  );
};

export default MessagingSystem;
