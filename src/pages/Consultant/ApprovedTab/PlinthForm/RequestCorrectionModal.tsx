import { Button, Divider, Input, message, Modal } from "antd";
import React, { useState } from "react";
import {
  POSTreqCorrectionBody,
  POSTrequestCorrection,
  POSTrequestCorrectionBody,
  ReqCorrectionByPidBody,
} from "../../../../Services/RequestCorrectionService";
import { useStoreGlobal } from "../../../../Store/StoreGlobal/StoreGlobal";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  projectId: string;
  type: "Plinth" | "Superstructure";
  remarksReqCorrection: ReqCorrectionByPidBody[] | undefined;
  RequestCorrectionSuccess: (resBody: POSTrequestCorrectionBody) => void;
};

const RequestCorrectionModal = ({
  onClose,
  isVisible,
  projectId,
  type,
  remarksReqCorrection,
  RequestCorrectionSuccess,
}: Props) => {
  const [comment, setComment] = useState("");

  const { disabled } = useStoreGlobal();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmitRemarks = () => {
    if (!comment) {
      return message.error("Pls input comment!");
    }
    const body: POSTreqCorrectionBody = {
      message: comment,
      projectPerma: parseInt(projectId),
      type: type,
    };

    POSTrequestCorrection(body, messageApi).then((res) => {
      setComment("");
      RequestCorrectionSuccess(res.data);
    });
  };

  return (
    <div>
      <Modal
        width={600}
        bodyStyle={{ borderRadius: 16 }}
        open={isVisible}
        footer={false}
        maskClosable={true}
        onCancel={onClose}
        destroyOnClose={true}
      >
        {contextHolder}
        <div>
          <h4>Comment</h4>
          <Input.TextArea
            value={comment}
            rows={4}
            onChange={(e) => setComment(e.target.value)}
          />
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button
              disabled={disabled}
              style={{ width: 150 }}
              type="primary"
              onClick={onSubmitRemarks}
            >
              Submit
            </Button>
          </div>
        </div>
        <Divider type="horizontal"></Divider>
        <div className="MyTableOuter">
          <table className="MyTable" style={{ minWidth: 400, fontSize: 11.5 }}>
            <thead>
              <tr>
                <th style={{ width: 20 }}>ID</th>
                <th>Message</th>
                <th>Type</th>
                <th>Project Id</th>
                {/* <th style={{ width: "50px" }}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {remarksReqCorrection?.map((remarksReqCorr) => (
                <tr key={remarksReqCorr.id}>
                  <td>{remarksReqCorr.id}</td>
                  <td>{remarksReqCorr.message}</td>
                  <td>{remarksReqCorr.type}</td>
                  <td>{remarksReqCorr.projectPerma}</td>

                  {/* <td>
                    <button className="NoColorButton">view </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default RequestCorrectionModal;
