import React, { useState } from "react";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import LogsDiv from "../../../Common/FooterAction/LogsDiv";
import {
  GETProjectLogs,
  ProjectEditLogs,
} from "../../../Services/LogsService/LogsService";
import { ViewProjectLog } from "../../../Services/ProjectService";
import "../../../../src/Assets/scss/FooterAction.scss";
import AllLogModal from "../../Common/AllLogs/AllLogModal";
import CommentsTable from "../../../Common/LogTable/CommentsTable";
import { CommentType, GETcomments } from "../../../Services/CommentService";
import { message } from "antd";
import { ProjectCommon } from "../../../pages/Admin/ViewProject/Consultant/Project/ViewProject/ViewProject";
// import HideClickOutside from "./HideClickOutside";

interface Props {
  pid: string;
}

const ConProjectFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<ProjectEditLogs[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [projectLogs, setProject] = useState<ViewProjectLog>();
  const [comments, setComments] = useState<CommentType[]>();
  const [messageApi, contextHolder] = message.useMessage();

  // const { ref, isComponentVisible, setIsComponentVisible } = HideClickOutside(
  //   true
  // );

  const showAddComment = () => {
    if (showLog) {
      messageApi.error("Only Open one card at a time");
      return;
    } else if (!showComments) {
      if (comments) {
        setShowComments(!showComments);

        return;
      } else {
        setShowComments(!showComments);
        GETcomments(pid, messageApi).then((res) => setComments(res.data));
        return;
      }
    } else {
      return setShowComments(!showComments);
    }
  };

  const onShowLog = () => {
    if (showComments) {
      return messageApi.error("Only Open one card at a time");
    } else if (!showLog) {
      if (logs) {
        setShowLog(!showLog);

        return;
      } else {
        setShowLog(!showLog);
        GETProjectLogs(pid, messageApi).then((res) => setLogs(res.data));
        return;
      }
    } else {
      return setShowLog(!showLog);
    }
  };

  const onView = (data: any) => {
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
      {projectLogs ? (
        <AllLogModal
          isOpen={modalOpen}
          title={"Project Details"}
          onCancel={() => {
            setProject(undefined);
            setModalOpen(false);
          }}
          children={ProjectCommon(projectLogs, setModalOpen)}
        />
      ) : null}

      {ShowComments(showComments, comments)}
      <>
        {showLog ? (
          logs ? (
            <LogsDiv data={logs} onView={onView} />
          ) : (
            <div>Loading...</div>
          )
        ) : null}
      </>
      <ButtonsOnly onShowLog={onShowLog} showAddComment={showAddComment} />
    </div>
  );
};

export default ConProjectFooter;

export function ShowComments(
  showComments: boolean,
  comments: CommentType[] | undefined
): React.ReactNode {
  return showComments ? (
    comments ? (
      comments.length ? (
        <div className="BlueWrapper">
          <CommentsTable data={comments} />
        </div>
      ) : (
        <div>No Comments Yet</div>
      )
    ) : (
      <div>Loading...</div>
    )
  ) : null;
}
