import { Form, Input, message } from "antd";
import { FormNReq, submitFailedFinal } from "../../../Common/Form/FormData";
import { postFaq } from "../../../Services/AdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const AddFaq = () => {
  const [messageApi, contextHolder] = message.useMessage();

  function onSubmit(val: any) {
    const body = {
      question: val.question,
      answer: val.answer,
    };
    postFaq(body, messageApi);
  }

  return (
    <div>
      {contextHolder}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormNReq("question", "Question")}>
          <Input />
        </Form.Item>
        <Form.Item {...FormNReq("answer", "Answer")}>
          <Input.TextArea />
        </Form.Item>

        <SubmitBtn />
      </Form>
    </div>
  );
};

export default AddFaq;
