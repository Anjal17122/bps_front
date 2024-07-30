import { Modal } from "antd";
import { PTlog } from "../../Services/ProjectService";
import LogTable from "../LogTable/LogTable";

interface Props {
  isVisible: boolean;
  onCancel: () => void;
  tabledata?: PTlog[];
}

const ViewLogModal = ({  isVisible, onCancel, tabledata }: Props) => {
  return (
    <Modal
      open={isVisible}
      width={600}
      footer={null}
      onCancel={onCancel}
      title={false}
      centered={true}
    >
      <h2>Project Transfer Log</h2>
      {tabledata ? (
        tabledata.length ? (
          <LogTable data={tabledata} />
        ) : (
          <div style={{ width: 350, fontSize: 18, color: "red", padding: 10 }}>
            NO LOG DATA
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default ViewLogModal;
