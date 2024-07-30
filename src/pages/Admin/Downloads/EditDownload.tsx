import { Form, Input, message } from "antd";
import { useContext } from "react";
import { FormNReq, submitFailedFinal } from "../../../Common/Form/FormData";
import { putDownload } from "../../../Services/AdminService";
import { MyStore } from "../../../Store/ContextApi";
import { useParams } from "react-router-dom";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface EditDownloadOnSub {
  description: string;
  title: string;
}

const EditDownload = () => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const { state } = useContext(MyStore);

  function onSubmit(val: EditDownloadOnSub) {
    const body = {
      title: val.title,
      description: val.description,
      id: params.id,
    };
    putDownload(body, messageApi);
  }

  return (
    <Form
      onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
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

export default EditDownload;
