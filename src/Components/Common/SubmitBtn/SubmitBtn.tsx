import { Button, Form } from "antd";
import useStoreViewProj from "../../../Store/StoreViewProject/StoreViewProj";

type Props = {
  text?: string;
  width?: number | string;
  style?: object;
  disable?: boolean;
};

export function SubmitBtn({
  width = "auto",
  text = "Submit",
  style,
  disable,
}: Props) {
  const { disabled } = useStoreViewProj();
  return (
    <Form.Item style={{ ...style }}>
      <Button
        htmlType="submit"
        type="primary"
        loading={disabled}
        style={{ width: width }}
        disabled={disable}
      >
        {text}
      </Button>
    </Form.Item>
  );
}
