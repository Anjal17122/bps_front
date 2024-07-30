import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonsOnly from "../../../Common/FooterAction/ButtonsOnly";
import AddComment from "../../../Common/FooterAction/CommentsDiv";
import "../../../Assets/scss/AdLandFooter.scss";

interface Props {
  pid: string;
}

const AdPlinthFooter = ({ pid }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const showAddComment = () => {
    setShowComments(!showComments);
  };
  const page = useLocation().pathname;

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

export default AdPlinthFooter;
