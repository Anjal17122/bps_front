import { Modal, Popover, Radio, RadioChangeEvent, Table, message } from "antd";
import { useEffect, useState } from "react";
import { PDF_URL, IMG_GET_URL, imgFolders } from "../../../../../Services/Api";
import {
  AutocadFileTBody,
  AutocadFilesBody,
  GetAutocadTypes,
  GetAutocadFiles,
  AutocadChangeStatus,
} from "../../../../../Services/AutoCadService";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const ViewAutoCadModal = () => {
  const [fileType, setFileType] = useState<AutocadFileTBody[]>([]);

  const [autoCadList, setAutoCadList] = useState<AutocadFilesBody[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { autocadModal, currentPid } = useStoreViewProj();
  const { disabled } = useStoreGlobal();

  useEffect(() => {
    GetAutocadTypes().then((res) => setFileType(res.data));
    GetAutocadFiles(currentPid).then((res) => setAutoCadList(res.data));
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

  const onClose = () => {
    dispatch({
      type: Ac.setAutoCadModal,
      payload: { autocadModal: false, currentPid: 0 },
    });
  };

  return (
    <Modal
      width={700}
      bodyStyle={{ borderRadius: 16 }}
      open={autocadModal}
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

export default ViewAutoCadModal;
