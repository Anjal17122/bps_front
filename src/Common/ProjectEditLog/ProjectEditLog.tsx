import { useState } from "react";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, message } from "antd";
import { FormProps, submitFailedFinal } from "../Form/FormData";
import "../../Assets/scss/Comment.scss";
import { POSTcomment } from "../../Services/CommentService";
import { useLocation } from "react-router-dom";
import { SubmitBtn } from "../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  projectId: string;
}

const ProjectEditLog = ({ projectId }: Props) => {
  const [showdiv, setShowdiv] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const page = useLocation().pathname;
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
    } else {
      return "default";
    }
  };
  function onSubmit(val: any) {
    const body = { comment: val.comment, projectId, type: val.page };

    POSTcomment(body, messageApi);
  }

  const openDiv = () => setShowdiv(!showdiv);

  return (
    <div className="comment">
      {contextHolder}
      {showdiv ? (
        <div className="commentForm">
          <button className="closeBtn" onClick={openDiv}>
            <CloseOutlined style={{ color: "#1890ff" }} />
          </button>
          {/* On Page: {JSON.stringify(page)} */}
          <Form
            onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
            size="middle"
            layout="vertical"
            onFinish={onSubmit}
          >
            <Form.Item
              {...FormProps("page", "On Page")}
              initialValue={getPage()}
            >
              <Input placeholder="On Page" disabled />
            </Form.Item>
            <Form.Item {...FormProps("comment", "Comment")}>
              <Input.TextArea rows={4} placeholder="Comment" />
            </Form.Item>
            <SubmitBtn />
          </Form>
        </div>
      ) : (
        <Tooltip title="Show Project Edit Log">
          <div className="button" onClick={openDiv}>
            Edit Log <MessageOutlined className="MessageIcon" />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ProjectEditLog;
