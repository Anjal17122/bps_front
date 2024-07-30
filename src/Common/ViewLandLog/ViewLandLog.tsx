import React, { useState } from "react";
import { Button, Modal, Spin } from "antd";
import {
  GETLandLogsById,
  LandLog,
} from "../../Services/LogsService/LogsService";
import LogsDiv from "../FooterAction/LogsDiv";
import TableButton from "../TableButton/TableButton";
import LandLogCard from "./LandLogCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
// import "./ViewLandLog.scss";

interface Props {
  landId: number;
}

const ViewLandLog = ({ landId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LandLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(true);
  const [landData, setLandData] = useState<LandLog>({} as LandLog);

  const onShowLogs = () => {
    setIsOpen(true);
    GETLandLogsById(landId, setLoading).then((res) => setLogs(res.data));
  };

  const onView = (data: LandLog) => {
    setLandData(data);
    setShowLogs(false);
    // setModalOpen(true);
    // setProject(data);
    // if (modalOpen) {
    //   return;
    // }
    // setModalOpen(true);
  };

  return (
    <div className="ViewLandLog">
      <Modal
        title={"Show Logs"}
        open={isOpen}
        width={"900px"}
        footer={null}
        onCancel={() => {
          setShowLogs(true);
          setLogs([]);
          setIsOpen(false);
        }}
        maskClosable={false}
      >
        <Spin spinning={loading}>
          {showLogs ? (
            <LogsDiv
              data={logs}
              onView={onView}
              style={{ boxShadow: "none" }}
            />
          ) : (
            <div>
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => setShowLogs(true)}
              >
                Logs
              </Button>
              <LandLogCard data={landData} />
            </div>
          )}
        </Spin>
      </Modal>

      <TableButton bgColor="blue" onClick={onShowLogs}>
        Show Logs
      </TableButton>
    </div>
  );
};

export default ViewLandLog;
