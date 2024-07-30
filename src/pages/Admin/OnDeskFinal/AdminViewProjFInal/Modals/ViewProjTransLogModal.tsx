import { useEffect, useState } from "react";
import { Modal } from "antd";
import LogTable from "../../../../../Common/LogTable/LogTable";
import { getPTlog, PTlog } from "../../../../../Services/ProjectService";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";

const ViewProjTransLogModal = () => {
  const [tableData, setTableData] = useState<PTlog[]>([]);

  const { currentPid, projTransferModal } = useStoreViewProj();

  useEffect(() => {
    getPTlog(currentPid).then((res) => {
      setTableData(res.data);
    });

    return () => {
      setTableData([]);
    };
  }, []);

  const onCancel = () => {
    dispatch({
      type: Ac.setprojTransferModal,
      payload: { currentPid: 0, projTransferModal: false },
    });
  };

  return (
    <Modal
      open={projTransferModal}
      width={600}
      footer={null}
      onCancel={onCancel}
      title={false}
      centered={true}
    >
      <h2>Project Transfer Log</h2>
      <LogTable data={tableData} />
    </Modal>
  );
};

export default ViewProjTransLogModal;
