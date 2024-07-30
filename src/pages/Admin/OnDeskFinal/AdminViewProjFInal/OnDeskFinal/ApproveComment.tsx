import React, { useState } from "react";
import { Button, Col, Form, Popover, Row, message } from "antd";
import { ColHeight } from "../../../../../Common/Form/FormData";
import TextArea from "antd/es/input/TextArea";
interface Props {
  disabled: boolean;
  onConfirm: (comment: string) => void;
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
export const ApproveComment = ({
  disabled,
  onConfirm,
  button,
  size = "small",
  type = undefined,
  icon,
  popDisabled = false,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [comment, setComment] = useState("");

  return (
    <Popover
      content={
        <React.Fragment>
          <Form size="middle" layout="horizontal" onFinish={(values) => {}}>
            {/* <Form.Item> */}
            <TextArea
              rows={3}
              value={comment}
              placeholder="Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            {/* </Form.Item> */}
            <Row style={{ marginTop: "5px" }}>
              <Col>
                {/* <Button
                  onClick={() => onConfirm(comment)}
                  type="primary"
                  style={{ width: "auto" }}
                >
                  Approve
                </Button> */}
                <Button onClick={() => onConfirm(comment)} type="primary">
                  Approve
                </Button>
              </Col>
              <Col {...ColHeight(12)}></Col>
            </Row>
          </Form>
        </React.Fragment>
      }
      trigger={["click"]}
    >
      {contextHolder}
      <Button disabled={disabled} icon={icon} size={size} type={type}>
        {button}
      </Button>
    </Popover>
  );
};
