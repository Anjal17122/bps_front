import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import AddComment from "../../../Common/FooterAction/CommentsDiv";
import "../../../Assets/scss/AdLandFooter.scss";

interface Props {
  pid: string;
}

const AdSuperStFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const showAddComment = () => {
    setShowComments(!showComments);
  };

  const page = useLocation().pathname;

  // const onshowlog = () => {
  //   if (showComments) {
  //     return CustomMsgErr("Only Open one card at a time");
  //   } else if (!showLog) {
  //     if (logs) {
  //       setShowLog(!showLog);

  //       return;
  //     } else {
  //       setShowLog(!showLog);
  //       GETArchitecturallogs(pid, ).then((res) =>
  //         setLogs(res.data)
  //       );
  //       return;
  //     }
  //   } else {
  //     return setShowLog(!showLog);
  //   }
  // };

  // function onCancel() {
  //   setModalOpen(false);
  // }

  return (
    <div className="comment">
      {showComments ? <AddComment page={page} pid={pid} /> : null}

      <ButtonsOnly
        noSecondButton={true}
        onShowLog={() => {}}
        showAddComment={showAddComment}
      />
    </div>
  );
};

export default AdSuperStFooter;
