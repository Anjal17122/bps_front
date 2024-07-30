import { useEffect, useState } from "react";
import { Modal, message } from "antd";

import { CheckCircleOutlined } from "@ant-design/icons";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import {
  GETrevisionStatus,
  POSTrevisionStatus,
} from "../../../OnDeskService/RevisionServiceAdmin/RevisionServiceAdmin";
import MyPopconfirm from "../../../../../../Common/Popconfirm/MyPopconfirm";
import { ResGETrevisionStatusBody } from "../../../OnDeskService/RevisionServiceAdmin/types";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import { AcModal } from "../../../../../../Store/StoreModal/types";

const RevisionStatusModalFinal = () => {
  const { revisionStatusModal } = useStoreModal();
  const { revisionId, disabled } = useStoreViewProj();
  const [revisionStatusData, setRevisionStatusData] =
    useState<ResGETrevisionStatusBody[]>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETrevisionStatus(revisionId, messageApi).then((res) => {
      setRevisionStatusData(res.data);
    });

    return () => {
      setRevisionStatusData(undefined);
    };
  }, []);

  return (
    <Modal
      width={320}
      bodyStyle={{ borderRadius: 16 }}
      open={revisionStatusModal}
      footer={false}
      maskClosable={false}
      onCancel={() => {
        dispatchModal({ type: AcModal.setrevisionStatusModal, payload: false });
        dispatch({ type: Ac.setRevisionId, payload: 0 });
      }}
      destroyOnClose={true}
    >
      {contextHolder}
      <h4>Approve Status:</h4>
      <div style={{ display: "flex", margin: "10px 0" }}>
        {revisionStatusData?.map((revisionSta) => (
          <div
            className="GreenBorderBtn"
            style={{ marginRight: 5, padding: "0 5px", background: "white" }}
            key={revisionSta.id}
          >
            <CheckCircleOutlined /> {revisionSta.role}
          </div>
        ))}
      </div>
      <div style={{ color: "grey" }}>Click below to approve:</div>
      <MyPopconfirm
        size="middle"
        type="primary"
        disabled={disabled}
        onConfirm={() =>
          POSTrevisionStatus({ revisionId: revisionId }, messageApi)
        }
        button={"Approve"}
      />
    </Modal>
  );
};

export default RevisionStatusModalFinal;
