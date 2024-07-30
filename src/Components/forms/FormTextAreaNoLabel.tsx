import React from "react";
import { Form, Input } from "antd";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const FormTextAreaNoLabel = ({ name, label, placeholder }: Props) => {
  return (
    <Form.Item
      label={null}
      name={name}
      rules={[
        {
          message: label + " is Required!",
        },
      ]}
    >
      <Input.TextArea
        rows={3}
        style={{ fontSize: 11 }}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default FormTextAreaNoLabel;
