import { Form, Input } from "antd";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const FormInputNoLabel = ({ name, label, placeholder }: Props) => {
  return (
    <Form.Item
      label={null}
      name={name}
      rules={[
        {
          required: false,
          message: label + " is Required!",
        },
      ]}
    >
      <Input
        style={{ fontSize: 11 }}
        placeholder={placeholder ? placeholder : label}
      />
    </Form.Item>
  );
};

export default FormInputNoLabel;
