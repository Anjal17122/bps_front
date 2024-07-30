import { useContext, useEffect, useState } from "react";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import LogsDiv from "../../../Common/FooterAction/LogsDiv";
import {
  GETFloorLogs,
  ProjectEditLogs,
} from "../../../Services/LogsService/LogsService";
import { ViewProjectLog } from "../../../Services/ProjectService";
import "../../../../src/Assets/scss/FooterAction.scss";
import AllLogModal from "../../Common/AllLogs/AllLogModal";
import { CommentType, GETcomments } from "../../../Services/CommentService";
import { message } from "antd";
import { ShowComments } from "./ConProjectFooter";
import { DesignFloorCommon } from "../../../pages/Admin/ViewProject/Consultant/Technical/DesignFloor/DesignFloorAdmin";
import { GETfloorCategory } from "../../../Services/SuperAdminService";
import { MyStore, ActionType } from "../../../Store/ContextApi";

interface Props {
  pid: string;
}

const ConFloorFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<ProjectEditLogs[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState<ViewProjectLog>();
  const [comments, setComments] = useState<CommentType[]>();
  const { state, dispatch } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!state.floorCat) {
      GETfloorCategory().then((res) => {
        dispatch({ payload: res.data, type: ActionType.setFloorCat });
      });
    }

    return () => {};
  }, []);

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
        GETFloorLogs(pid, messageApi).then((res) => setLogs(res.data));
        return;
      }
    } else {
      return setShowLog(!showLog);
    }
  };

  const onView = (data: any) => {
    setModalOpen(true);
    setProject(JSON.parse(data.floorDetail));
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
            <DesignFloorCommon floorCat={state.floorCat} floors={project} />
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

export default ConFloorFooter;
