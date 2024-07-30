import React, { useContext, useState } from "react";
import "../../Assets/scss/Comment.scss";
import AddComment from "./CommentsDiv";
import ButtonsOnly from "./ButtonsOnly";
import { GETArchitecturalLogs } from "../../Services/LogsService/LogsService";
import { useLocation } from "react-router-dom";
import LogsDiv from "./LogsDiv";
import { ActionType, MyStore } from "../../Store/ContextApi";
import AllLogModal from "../../Components/Common/AllLogs/AllLogModal";
import { message } from "antd";

interface Props {
  projectId: string;
  myComponent: React.ReactElement;
  getLogLink?: string;
}

const FooterBarAdmin = ({ projectId, myComponent, getLogLink }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState<any>();
  const { dispatch } = useContext(MyStore);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showAddComment = () => {
    setShowComments(!showComments);
  };
  const page = useLocation().pathname;

  const onshowlog = () => {
    setShowLog(!showLog);
    GETArchitecturalLogs(
      getLogLink ? getLogLink + projectId : "test",
      messageApi
    ).then((res) => setLogs(res.data));
  };

  // function onCancel() {
  //   setModalOpen(false);
  // }

  const onView = (data: any) => {
    setModalOpen(true);
    dispatch({ type: ActionType.setEditLogData, payload: data });
  };

  return (
    <div className="comment">
      {contextHolder}
      <AllLogModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        children={myComponent}
      />
      {showComments ? <AddComment page={page} pid={projectId} /> : null}
      {showLog ? (
        getLogLink ? (
          <LogsDiv data={logs} onView={onView} />
        ) : (
          <div>No logs in this page </div>
        )
      ) : null}
      <ButtonsOnly onShowLog={onshowlog} showAddComment={showAddComment} />
    </div>
  );
};

export default FooterBarAdmin;

// {!admin ? (
//   showComments ? (
//     comments ? (
//       <div className="BlueWrapper">
//         {comments.length ? (
//           <CommentsTable data={comments} myclass="LogTable BigShadow" />
//         ) : (
//           <div className="nocomments">
//             <span>No Comments yet</span>
//           </div>
//         )}
//       </div>
//     ) : (
//       <div>Loading...</div>
//     )
//   ) : null
// ) : null}
