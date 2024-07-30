import { Modal, Spin } from "antd";
import React, { useState } from "react";

interface Props {
  open: boolean;
  imgSrc: string;
  onCancel: () => void;
}

const ImagePopup = ({ open, imgSrc, onCancel }: Props) => {
  const [loading, setLoading] = useState(true);
  return (
    <Modal
      open={open}
      width={"auto"}
      footer={null}
      onCancel={() => {
        setLoading(true);
        onCancel();
      }}
      title={null}
      centered
      destroyOnClose={true}
    >
      {loading && (
        <div style={{ padding: "7px 10px 0 10px" }}>
          <Spin />
        </div>
      )}
      <img
        onLoad={() => setLoading(false)}
        src={imgSrc}
        alt=""
        height="90%"
        width="100%"
      />
    </Modal>
  );
};

export default ImagePopup;
