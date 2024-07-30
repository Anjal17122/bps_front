import { useState } from "react";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import LogsDiv from "../../../Common/FooterAction/LogsDiv";
import {
  GETbylawsLogs,
  ProjectEditLogs,
} from "../../../Services/LogsService/LogsService";
import "../../../../src/Assets/scss/FooterAction.scss";
import AllLogModal from "../../Common/AllLogs/AllLogModal";
import { CommentType, GETcomments } from "../../../Services/CommentService";
import { message } from "antd";
import { ShowComments } from "./ConProjectFooter";
import { BylawsCommon } from "../../../pages/Admin/ViewProject/Consultant/Technical/BuildingByLaws/ViewBylawsAd";

interface Props {
  pid: string;
}

const ConBylawsFooter = ({ pid }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<ProjectEditLogs[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState<any>();
  const [comments, setComments] = useState<CommentType[]>();

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
        GETbylawsLogs(pid, messageApi).then((res) => setLogs(res.data));
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
      {project ? (
        <AllLogModal
          isOpen={modalOpen}
          title={"Project Details"}
          onCancel={() => {
            setProject(undefined);
            setModalOpen(false);
          }}
          children={
            <BylawsCommon
              building={JSON.parse(project.buildingData)}
              land={JSON.parse(project.landData)}
            />
          }
        />
      ) : null}
      {ShowComments(showComments, comments)}
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

export default ConBylawsFooter;
