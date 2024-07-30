import React from "react";
import { Cascader, Form } from "antd";
import { CascaderType } from "../../constants/constants";
import { filter } from "../../constants/antdConstants";

type Props = {
  name: string;
  label: string;
  options: CascaderType[];
  fullWidth?: boolean;
};

const FormCascader = ({ name, label, options, fullWidth = false }: Props) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required
      className={fullWidth ? "full-width" : ""}
      rules={[{ required: true, message: label + " is Required!" }]}
    >
      <Cascader
        options={options}
        placeholder={"Select " + label}
        showSearch={{ filter }}
      />
    </Form.Item>
  );
};

export default FormCascader;
