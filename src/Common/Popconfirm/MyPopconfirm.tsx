import { Button, Popconfirm } from "antd";
import React from "react";
import "../../Assets/scss/MyPopconfirm.scss";
import { CustomMsgErr } from "../../Components/Common/CustomMsg/CustomMsg";

interface Props {
  disabled: boolean;
  onConfirm: () => void;
  button: any;
  size?: "small" | "middle" | "large";
  type?:
    | "text"
    | "link"
    | "ghost"
    | "primary"
    | "default"
    | "dashed"
    | undefined;
  icon?: string;
  popDisabled?: boolean;
}

const MyPopconfirm = ({
  disabled,
  onConfirm,
  button,
  size = "small",
  type = undefined,
  icon,
  popDisabled = false,
}: Props) => {
  return (
    <Popconfirm
      disabled={popDisabled}
      title="Are you sure ?"
      onConfirm={onConfirm}
      onCancel={() => alert("Cancelled!")}
      okText="Yes"
      cancelText="No"
    >
      <Button disabled={disabled} icon={icon} size={size} type={type}>
        {button}
      </Button>
    </Popconfirm>
  );
};

export default React.memo(MyPopconfirm);
