import { Tooltip } from "antd";
import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
  info: string;
}

const MyInfoBtn = ({ info }: Props) => {
  return (
    <Tooltip title={info}>
      <InfoCircleOutlined style={{ cursor: "pointer" }} />
    </Tooltip>
  );
};

export default MyInfoBtn;
