import { Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * Higher order Modal Wrapping Component
 * */

export default function ModalWrapper({ ...props }) {
  const history = useNavigate();

  return (
    <Modal
      open={true}
      width={props.width}
      footer={null}
      onCancel={() => history(-1)}
      title={props.title! ? props.title : false}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Outlet />
    </Modal>
  );
}
