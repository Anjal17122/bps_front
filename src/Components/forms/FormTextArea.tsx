import React from "react";
import { Form, Input } from "antd";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const FormTextArea = ({ name, label, placeholder }: Props) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: label + " is Required!",
        },
      ]}
    >
      <Input.TextArea placeholder={placeholder} />
    </Form.Item>
  );
};

export default FormTextArea;
