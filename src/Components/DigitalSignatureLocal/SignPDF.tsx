import { Button, Form, Input } from "antd";
import { FormProps, submitFailed } from "../../Common/Form/FormData";

type Props = {
  signPDF: (values: { filePath: string }) => void;
  submitting: boolean;
};

export function SignPDF({ signPDF, submitting }: Props) {
  return (
    <Form
      key={2}
      onFinishFailed={submitFailed}
      size="middle"
      layout="vertical"
      onFinish={signPDF}
    >
      <Form.Item {...FormProps("filePath", "File Path")}>
        <Input placeholder="Eg: C:/User/Document/sample.pdf" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" disabled={submitting}>
          Sign Pdf
        </Button>
      </Form.Item>
    </Form>
  );
}
