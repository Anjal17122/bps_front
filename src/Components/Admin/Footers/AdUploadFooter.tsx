import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import AddComment from "../../../Common/FooterAction/CommentsDiv";
import {
  GETsanitationLogs,
  ProjectEditLogs,
} from "../../../Services/LogsService/LogsService";
import "../../../Assets/scss/FooterAction.scss";
import { message } from "antd";

interface Props {
  pid: string;
}

const AdUploadFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<ProjectEditLogs[]>();
  const [messageApi, contextHolder] = message.useMessage();

  const showAddComment = () => {
    if (showLog) {
      messageApi.info("Only Open one card at a time");
      return;
    }
    setShowComments(!showComments);
  };
  const page = useLocation().pathname;

  const onShowLog = () => {
    if (showComments) {
      return messageApi.info("Only Open one card at a time");
    } else if (!showLog) {
      if (logs) {
        setShowLog(!showLog);

        return;
      } else {
        setShowLog(!showLog);
        GETsanitationLogs(pid, messageApi).then((res) => setLogs(res.data));
        return;
      }
    } else {
      return setShowLog(!showLog);
    }
  };

  // function onCancel() {
  //   setModalOpen(false);
  // }

  return (
    <div className="comment">
      {contextHolder}
      {showComments ? <AddComment page={page} pid={pid} /> : null}

      <ButtonsOnly
        noSecondButton={true}
        onShowLog={onShowLog}
        showAddComment={showAddComment}
      />
    </div>
  );
};

export default AdUploadFooter;
