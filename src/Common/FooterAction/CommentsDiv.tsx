import { Form, Input, message } from "antd";
import { FormProps, submitFailedFinal } from "../Form/FormData";
import { POSTcomment } from "../../Services/CommentService";
import { SubmitBtn } from "../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  page: string;
  pid: string;
}

const AddComment = ({ page, pid }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  function onSubmit(val: { comment: string; page: string }) {
    const body = { comment: val.comment, projectId: pid, type: val.page };
    POSTcomment(body, messageApi);
  }
  const getPage = (): string => {
    if (page.includes("applicant")) {
      return "Applicant";
    } else if (page.includes("projectdetails")) {
      return "Project Details";
    } else if (page.includes("land")) {
      return "Land Details";
    } else if (page.includes("charkilla")) {
      return "Charkilla";
    } else if (page.includes("owners")) {
      return "Land Owners";
    } else if (page.includes("floor")) {
      return "Floor";
    } else if (page.includes("bylaws")) {
      return "Building By Laws";
    } else if (page.includes("architectural")) {
      return "Architectural";
    } else if (page.includes("structural")) {
      return "Structural";
    } else if (page.includes("electrical")) {
      return "Electrical";
    } else if (page.includes("sanitation")) {
      return "Sanitation";
    } else if (page.includes("uploads")) {
      return "Uploads";
    } else if (page.includes("viewplinth")) {
      return "Plinth";
    } else if (page.includes("viewsuperst")) {
      return "SuperStructure";
    } else {
      return "default";
    }
  };

  return (
    <div className="commentForm">
      {contextHolder}
      {/* <button className="closeBtn">
        <CloseOutlined style={{ color: "#1890ff" }} />
      </button> */}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormProps("page", "On Page")} initialValue={getPage()}>
          <Input placeholder="On Page" disabled />
        </Form.Item>
        <Form.Item {...FormProps("comment", "Comment")}>
          <Input.TextArea rows={4} placeholder="Comment" />
        </Form.Item>
        <SubmitBtn />
      </Form>
    </div>
  );
};
export default AddComment;
