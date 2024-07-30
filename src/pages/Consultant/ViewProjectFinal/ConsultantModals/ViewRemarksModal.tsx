import React, { useEffect, useState } from "react";
import { Button, Modal, Spin, Table, message } from "antd";
import { IMG_GET_URL, imgFolders, PDF_URL } from "../../../../Services/Api";
import {
  GETremarksConFinal,
  RemarksList,
} from "../../../../Services/MuchulkaService";
import { DownloadOutlined } from "@ant-design/icons";
import { checkIfPDF } from "../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";

// interface Props {
//   isVisible: boolean;
//   onClose: () => void;
//   currentID: number;
//   remarksData: RemarksList[];
// }

const ViewRemarksModal = () => {
  const { viewNoticeRemarks } = useStoreModalCon();
  const { currentPid } = useStoreViewProj();
  const [messageApi, contextHolder] = message.useMessage();

  const [remarksData, setRemarksData] = useState<RemarksList[]>();
  useEffect(() => {
    GETremarksConFinal(currentPid, messageApi).then((res) => {
      setRemarksData(res.data);
    });
    return () => {
      setRemarksData(undefined);
    };
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "File",
      dataIndex: "remarksFile",
      key: "remarks",
      render: (text: string | undefined) =>
        text ? (
          <a
            href={
              checkIfPDF(text)
                ? PDF_URL
                : IMG_GET_URL + "/" + imgFolders.remarks + "/" + text
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="middle" type="link" style={{ marginLeft: 0 }}>
              <DownloadOutlined />
            </Button>
          </a>
        ) : (
          <div>No Data</div>
        ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        className="SelectUserModal"
        bodyStyle={{ borderRadius: 16 }}
        open={viewNoticeRemarks}
        footer={false}
        maskClosable={true}
        onCancel={() => {
          dispatch({
            type: Ac.setCurrentPid,
            payload: 0,
          });
          dispatchModalCon({
            type: AcMCon.setviewNoticeRemarks,
            payload: false,
          });
        }}
        destroyOnClose={true}
      >
        <div style={{ paddingTop: 12 }}>
          {remarksData ? (
            <Table
              dataSource={remarksData.map((data) => ({
                key: data.id,
                remarks: data.remarks,
                remarksFile: data.remarksFile,
                date: data.date?.substr(0, 10),
              }))}
              columns={columns}
              size="middle"
            />
          ) : (
            <Spin />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ViewRemarksModal;
