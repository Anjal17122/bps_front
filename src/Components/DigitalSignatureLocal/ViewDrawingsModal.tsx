import { Modal } from "antd";
import React from "react";
import {
  dispatchModal,
  useStoreModal,
} from "../../Store/StoreModal/StoreModal";
import { AcModal } from "../../Store/StoreModal/types";
import { PDF_URL, imgFolders } from "../../Services/Api";

type Props = {
  filename: string;
};

const ViewDrawingsModal = ({ filename }: Props) => {
  const { viewDrawingsModal } = useStoreModal();

  const onClose = () => {
    dispatchModal({ type: AcModal.setViewDrawingsModal, payload: false });
  };

  return (
    <Modal
      width={700}
      bodyStyle={{ borderRadius: 16 }}
      open={viewDrawingsModal}
      footer={false}
      maskClosable={false}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <embed
        style={{
          width: "100%",
          height: 400,
        }}
        type="application/pdf"
        src={PDF_URL + `/${imgFolders.drawings}/${filename}`}
      />
    </Modal>
  );
};

export default ViewDrawingsModal;
