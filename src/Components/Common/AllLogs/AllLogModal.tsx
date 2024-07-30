import { Modal } from "antd";
import React from "react";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  title?: string;
  children: React.ReactNode;
}

const AllLogModal = ({ isOpen, onCancel, children, title = "Test" }: Props) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      width={"900px"}
      footer={null}
      onCancel={onCancel}
      maskClosable={false}
    >
      {children}
    </Modal>
  );
};

export default AllLogModal;
