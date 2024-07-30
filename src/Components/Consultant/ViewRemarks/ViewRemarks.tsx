import React from "react";
import { Modal } from "antd";

type Props = {
  onModalClose: () => void;
  isOpen: boolean;
  data: string;
  title: string;
};

const ViewRemarks = ({ onModalClose, isOpen, data, title }: Props) => {
  return (
    <Modal
      className="SelectUserModal"
      onCancel={onModalClose}
      open={isOpen}
      footer={null}
    >
      <div className="RemarksModalDiv">
        <h3>{title}</h3>
        <div
          style={{ fontSize: 13 }}
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </Modal>
  );
};

export default ViewRemarks;
