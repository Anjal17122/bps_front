import { Button } from "antd";
import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import "../../Assets/scss/ButtonsOnly.scss";
import { useStoreGlobal } from "../../Store/StoreGlobal/StoreGlobal";

interface Props {
  showAddComment: () => void;
  onShowLog: () => void;
  noSecondButton?: boolean;
}

const ButtonsOnly = ({
  noSecondButton = false,
  showAddComment,
  onShowLog,
}: Props) => {
  const { disabled } = useStoreGlobal();

  return (
    <div className="button">
      <Button
        disabled={disabled}
        className="NoStyle2"
        onClick={showAddComment}
        style={{ borderRight: "2px solid white", width: 160 }}
      >
        Comment <MessageOutlined className="MessageIcon" />
      </Button>
      {noSecondButton ? null : (
        <Button
          disabled={disabled}
          className="NoStyle2"
          style={{ width: 130 }}
          onClick={onShowLog}
        >
          Show Logs
        </Button>
      )}
    </div>
  );
};

export default ButtonsOnly;
