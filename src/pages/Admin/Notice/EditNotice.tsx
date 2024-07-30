import { Form, Input, message } from "antd";
import { useContext } from "react";
import { FormNReq, submitFailed } from "../../../Common/Form/FormData";
import { putDownload } from "../../../Services/AdminService";
import { MyStore } from "../../../Store/ContextApi";
import { useParams } from "react-router-dom";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface EditDownload {
  description: string;
  title: string;
}

const EditNotice = () => {
  const params = useParams();

  const { state } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();

  function onSubmit(val: EditDownload) {
    const body = {
      title: val.title,
      description: val.description,
      id: params.id,
    };
    putDownload(body, messageApi);
  }

  return (
    <Form
      onFinishFailed={submitFailed}
      size="middle"
      layout="vertical"
      onFinish={onSubmit}
    >
      {contextHolder}
      <Form.Item
        {...FormNReq("title", "Title")}
        initialValue={state.download.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...FormNReq("description", "Description")}
        initialValue={state.download.description}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <SubmitBtn />
      </Form.Item>
    </Form>
  );
};

export default EditNotice;
