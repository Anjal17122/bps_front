import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  onclick: () => void;
};

const RemarksViewBtn = ({ onclick }: Props) => {
  return (
    <Button
      size="small"
      style={{ border: "none", width: 30 }}
      icon={<InfoCircleOutlined style={{ color: "red" }} />}
      onClick={onclick}
    ></Button>
  );
};

export default RemarksViewBtn;
