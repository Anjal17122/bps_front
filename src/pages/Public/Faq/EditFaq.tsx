import { Input, Form, message } from "antd";
import { useContext } from "react";
import { submitFailed, FormNReq } from "../../../Common/Form/FormData";
import { putFaq } from "../../../Services/AdminService";
import { MyStore } from "../../../Store/ContextApi";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const EditFaq = () => {
  const {
    state: { faq },
  } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();
  function onEditSubmit(val: any) {
    putFaq(
      { id: faq.id, question: val.question, answer: val.answer },
      messageApi
    );
  }

  return (
    <Form
      onFinishFailed={submitFailed}
      size="middle"
      layout="vertical"
      onFinish={onEditSubmit}
    >
      {contextHolder}
      <Form.Item
        initialValue={faq.question}
        {...FormNReq("question", "Question")}
      >
        <Input />
      </Form.Item>
      <Form.Item initialValue={faq.answer} {...FormNReq("answer", "Answer")}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <SubmitBtn />
      </Form.Item>
    </Form>
  );
};

export default EditFaq;
