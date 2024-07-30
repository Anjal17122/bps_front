import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import AddComment from "../../../Common/FooterAction/CommentsDiv";
import LogsDiv from "../../../Common/FooterAction/LogsDiv";
import {
  GETelectricalLogs,
  ProjectEditLogs,
} from "../../../Services/LogsService/LogsService";
import "../../../../src/Assets/scss/FooterAction.scss";
import AllLogModal from "../../Common/AllLogs/AllLogModal";
import { ElectricalCommon } from "../../../pages/Admin/ViewProject/Consultant/Technical/Electrical/ViewElectricalAd";
import { message } from "antd";

interface Props {
  pid: string;
}

const ConElectricalFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<ProjectEditLogs[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState<any>();
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
        GETelectricalLogs(pid, messageApi).then((res) => setLogs(res.data));
        return;
      }
    } else {
      return setShowLog(!showLog);
    }
  };

  // function onCancel() {
  //   setModalOpen(false);
  // }

  const onView = (data: any) => {
    setModalOpen(true);
    setProject(data);
    if (modalOpen) {
      return;
    }
    // setModalOpen(true);
  };
  return (
    <div className="comment">
      {contextHolder}
      {project ? (
        <AllLogModal
          isOpen={modalOpen}
          title={"Project Details"}
          onCancel={() => {
            setModalOpen(false);
            setProject(undefined);
          }}
          children={
            <ElectricalCommon
              rating={JSON.parse(project.ratingSize)}
              maxCables={JSON.parse(project.conductorsInCable)}
              earthing={JSON.parse(project.earthing)}
              testing={JSON.parse(project.testing)}
            />
          }
        />
      ) : null}
      {showComments ? <AddComment page={page} pid={pid} /> : null}
      {showLog ? (
        logs ? (
          <LogsDiv data={logs} onView={onView} />
        ) : (
          <div>Loading...</div>
        )
      ) : null}
      <ButtonsOnly onShowLog={onShowLog} showAddComment={showAddComment} />
    </div>
  );
};

export default ConElectricalFooter;
