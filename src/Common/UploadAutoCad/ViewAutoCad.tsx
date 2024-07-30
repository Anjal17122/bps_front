import { Button, Modal, Popover, RadioChangeEvent, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { imgFolders, IMG_GET_URL, PDF_URL } from "../../Services/Api";
import {
  AutocadFileTBody,
  AutocadFilesBody,
  GetAutocadTypes,
  GetAutocadFiles,
  AutocadChangeStatus,
} from "../../Services/AutoCadService";
import { sN } from "../../Services/ProjectService";
import { Radio } from "antd";
import { checkIfPDF } from "../../pages/Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { useStoreGlobal } from "../../Store/StoreGlobal/StoreGlobal";
type Props = {
  isVisible: boolean;
  onClose: () => void;
  projectId: sN;
};

const ViewAutoCad = ({ isVisible, onClose, projectId }: Props) => {
  const [fileType, setFileType] = useState<AutocadFileTBody[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  const [autoCadList, setAutoCadList] = useState<AutocadFilesBody[]>([]);

  useEffect(() => {
    GetAutocadTypes().then((res) => setFileType(res.data));
    GetAutocadFiles(projectId).then((res) => setAutoCadList(res.data));
    return () => {
      setAutoCadList([]);
      setFileType([]);
    };
  }, []);

  const onChangeStatus = (
    id: number,
    { target: { value } }: RadioChangeEvent
  ) => {
    AutocadChangeStatus(id, value, messageApi).then(() => {
      const init = [...autoCadList];
      const indexxx = init.findIndex((valuee) => valuee.id === id);
      const initRow = init[indexxx];
      const finalRow = { ...initRow, status: value };
      init[indexxx] = finalRow;
      setAutoCadList(init);
    });
  };

  // const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
  //   setValue4(value);
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "filename",
      render: (text: AutocadFilesBody) => (
        <a
          href={
            (checkIfPDF(text.filename) ? PDF_URL : IMG_GET_URL) +
            `/${imgFolders.autocad}/${text.filename}`
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          {text.filename}
        </a>
      ),
    },
    {
      title: "File Type",
      key: "fileTypeId",
      render: (text: AutocadFilesBody) => (
        <span>
          {fileType.filter((filety) => filety.id === text.fileTypeId)[0].name}
        </span>
      ),
    },
    {
      title: "Project Id",
      dataIndex: "projectId",
      key: "projectId",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Change Status",
      key: "action",
      render: (text: AutocadFilesBody) => (
        <Popover
          content={
            <Radio.Group
              disabled={disabled}
              defaultValue={text.status}
              buttonStyle="solid"
              onChange={(event) => onChangeStatus(text.id, event)}
            >
              <Radio.Button value="Unchecked">Unchecked</Radio.Button>
              <Radio.Button value="Checked">Checked</Radio.Button>
              <Radio.Button value="Resubmit">Resubmit</Radio.Button>
              <Radio.Button value="Correction_request">
                Correction_request
              </Radio.Button>
            </Radio.Group>
          }
          trigger="click"
        >
          <button className="NoStyleBtnSm">{text.status}</button>
        </Popover>
      ),
    },
  ];

  return (
    <Modal
      width={700}
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={false}
      onCancel={onClose}
      destroyOnClose={true}
    >
      {contextHolder}
      <h1 style={{ paddingBottom: 5, fontSize: 18 }}>Autocad Files</h1>
      <Table
        rowKey={"id"}
        size="small"
        columns={columns}
        dataSource={autoCadList}
      ></Table>
    </Modal>
  );
};

export default ViewAutoCad;
