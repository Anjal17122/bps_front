import { Button, Cascader, Input, Modal, Form, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import {
  FormNoLabel,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import CommentsTable from "../../../../../Common/LogTable/CommentsTable";
import {
  GETcommentsFinal,
  POSTcommentFinal,
} from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import { CommentType } from "../../../../../Services/CommentService";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { commentSections } from "../../../../../constants/helper";

// interface Props {
//   commentsModal: boolean;
//   setCommentsModal: React.Dispatch<React.SetStateAction<boolean>>;
//   comments: CommentType[] | undefined;
//   projectId: sN;
// }

export const CommentsModalFinal = () => {
  const { commentsModal, currentPid, disabled } = useStoreViewProj();

  const [comments, setComments] = useState<CommentType[]>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETcommentsFinal(currentPid, messageApi).then((res) =>
      setComments(res.data)
    );

    return () => setComments(undefined);
  }, []);

  const onSubmit = (val: any) => {
    const body = {
      comment: val.comment,
      projectId: currentPid,
      type: val.section[0],
    };
    POSTcommentFinal(body, messageApi);
  };
  return (
    <Modal
      open={commentsModal}
      width={600}
      footer={null}
      onCancel={() =>
        dispatch({
          type: Ac.setCommentsModal,
          payload: {
            currentPid: 0,
            commentsModal: false,
          },
        })
      }
      title={false}
      centered={true}
    >
      {contextHolder}
      <h4>Add Comment</h4>
      <Form
        style={{ marginTop: 10 }}
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Row gutter={14}>
          <Col span={12}>
            <Form.Item {...FormNoLabel("comment", "Comment")}>
              <Input.TextArea rows={2} placeholder="comment" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...FormNoLabel("section", "Section")}>
              <Cascader options={commentSections} placeholder="Section" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button htmlType="submit" type="primary" disabled={disabled}>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <b style={{ fontWeight: 500 }}>Comments from Municipality</b>
      {comments ? (
        comments.length ? (
          <CommentsTable data={comments} />
        ) : (
          <div style={{ width: 350, fontSize: 18, color: "red", padding: 10 }}>
            No Comments
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};
