import React, { useEffect, useState } from "react";
import { Modal, Spin, Table } from "antd";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import {
  getOldDrawings,
  ReplaceDrawingBody,
} from "../../../../../../Services/AdminViewProjService/AdminViewProjService";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { IMG_GET_URL, PDF_URL } from "../../../../../../Services/Api";

const SignedDrawingsModal = () => {
  const { signedDrawingsModal, currentPid } = useStoreViewProj();

  const [oldDrawings, setOldDrawings] = useState<ReplaceDrawingBody[]>();

  useEffect(() => {
    getOldDrawings(currentPid).then((res) => {
      setOldDrawings(res.data);
    });

    return () => setOldDrawings(undefined);
  }, []);

  const _columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "File (click to view)",
      key: "fileName",
      render: (item: ReplaceDrawingBody) => {
        const path = `/${item.fileType}/${item.fileName}`;
        return (
          <a
            href={
              checkIfPDF(item.fileName ?? "")
                ? PDF_URL + path
                : IMG_GET_URL + path
            }
            target={"_blank"}
            rel="noreferrer noopener"
          >
            {item.fileName}
          </a>
        );
      },
    },
  ];

  return (
    <Modal
      open={signedDrawingsModal}
      width={"auto"}
      footer={null}
      onCancel={() => {
        dispatch({
          type: Ac.setSignedDrawingsModal,
          payload: { currentPid: 0, signedDrawingsModal: false },
        });
      }}
      title={null}
      centered
      destroyOnClose={true}
    >
      {oldDrawings ? (
        <Table columns={_columns} dataSource={oldDrawings}></Table>
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default SignedDrawingsModal;
