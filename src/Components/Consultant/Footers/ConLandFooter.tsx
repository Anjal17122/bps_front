import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import AddComment from "../../../Common/FooterAction/CommentsDiv";
import LogsDiv from "../../../Common/FooterAction/LogsDiv";
import "../../../../src/Assets/scss/FooterAction.scss";
import AllLogModal from "../../Common/AllLogs/AllLogModal";
import { LandsWithOwner } from "../../../Services/CreateProjectService";
import { LandInfoCommon } from "../../../pages/Admin/ViewProject/Consultant/Project/LandInfo/LandInfo";
import { message } from "antd";

interface Props {
  pid: string;
}

const ConLandFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showLog, setShowLog] = useState(false);
  //eslint-disable-next-line
  const [logs, setLogs] = useState<any[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState<any>();

  const showAddComment = () => {
    if (showLog) {
      messageApi.info("Only Open one card at a time");
      return;
    }
    setShowComments(!showComments);
  };
  const page = useLocation().pathname;

  const onshowlog = () => {
    if (showComments) {
      return messageApi.info("Only Open one card at a time");
    } else if (!showLog) {
      if (logs) {
        setShowLog(!showLog);
        return;
      } else {
        setShowLog(!showLog);
        return;
      }
    } else {
      return setShowLog(!showLog);
    }
  };

  const onView = (data: LandsWithOwner[]) => {
    setModalOpen(true);
    setProject(data);
    if (modalOpen) {
      return;
    }
    setModalOpen(true);
  };
  return (
    <div className="comment">
      {contextHolder}
      {project ? (
        <AllLogModal
          isOpen={modalOpen}
          title={"Project Details"}
          onCancel={() => {
            setProject(undefined);
            setModalOpen(false);
          }}
          children={<LandInfoCommon lands={project} pid={pid} />}
        />
      ) : null}
      {showComments ? <AddComment page={page} pid={pid} /> : null}
      {showLog ? (
        logs ? (
          logs.length ? (
            <LogsDiv data={logs} onView={onView} />
          ) : (
            <div>No Logs Here!</div>
          )
        ) : (
          <div>Loading...</div>
        )
      ) : null}
      <ButtonsOnly onShowLog={onshowlog} showAddComment={showAddComment} />
    </div>
  );
};

export default ConLandFooter;
