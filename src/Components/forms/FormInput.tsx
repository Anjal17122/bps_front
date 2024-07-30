import { Form, Input } from "antd";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const FormInput = ({ name, label, placeholder }: Props) => {
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
      <Input placeholder={placeholder ? placeholder : label} />
    </Form.Item>
  );
};

export default FormInput;
