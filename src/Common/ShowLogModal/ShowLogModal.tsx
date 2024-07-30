import { Modal } from "antd";
import EditLogTable from "../ProjectEditLog/EditLogTable";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  logs: any;
}

const ShowLogModal = ({ isOpen, onCancel, logs }: Props) => {
  return (
    <Modal
      open={isOpen}
      width={"auto"}
      footer={null}
      onCancel={onCancel}
      title={false}
      centered={true}
    >
      <b style={{ fontWeight: 500 }}>Comments from Municipalitysss</b>

      {logs ? (
        logs.length ? (
          <EditLogTable data={logs} />
        ) : (
          <div style={{ width: 350, fontSize: 16, color: "red", padding: 10 }}>
            No Logs
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default ShowLogModal;
