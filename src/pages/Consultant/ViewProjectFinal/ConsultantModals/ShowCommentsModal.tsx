import { Button, Cascader, Input, Modal, Form, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import CommentsTable from "../../../../Common/LogTable/CommentsTable";
import {
  CommentType,
  GETcommentsFinal,
  POSTcommentFinal,
} from "../../../../Services/CommentService";
import {
  FormNoLabel,
  submitFailedFinal,
} from "../../../../Common/Form/FormData";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { commentSections } from "../../../../constants/helper";

export const ShowCommentsModal = () => {
  const { viewComments } = useStoreModalCon();
  const { currentPid, disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    GETcommentsFinal(currentPid, messageApi).then((res) => {
      setComments(res.data);
    });

    return () => {
      setComments(undefined);
    };
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
      open={viewComments}
      width={600}
      footer={null}
      onCancel={() => {
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
        dispatchModalCon({
          type: AcMCon.setViewComments,
          payload: false,
        });
      }}
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
              <Button htmlType="submit" type="primary" loading={disabled}>
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
