import { Table, message } from "antd";
import { useEffect, useState } from "react";
import MyPopconfirm from "../../Common/Popconfirm/MyPopconfirm";
import { useStoreGlobal } from "../../Store/StoreGlobal/StoreGlobal";
import {
  deleteSignDrawingsLogs,
  getSignDrawingsLogs,
} from "../../Services/DigitalSignatureService";
import { dispatchModal } from "../../Store/StoreModal/StoreModal";
import { AcModal } from "../../Store/StoreModal/types";
import ViewDrawingsModal from "./ViewDrawingsModal";

type Props = {
  name: string;
};

export interface SignDrawingsLogsBody {
  id: number;
  originalFilename: string;
  changedFileName: string;
  order: number;
  personId: number;
  projectId: number;
}

const DrawingsSignLogs = ({ name }: Props) => {
  const { disabled } = useStoreGlobal();

  const [messageApi, contextHolder] = message.useMessage();

  const [reRender, setReRender] = useState(false);

  const [signDrawingsLogs, setSignDrawingsLogs] =
    useState<SignDrawingsLogsBody[]>();

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    getSignDrawingsLogs(name, messageApi).then((res) => {
      setSignDrawingsLogs(res.data);
    });
    console.log("DrawingsSignLogs rendered");

    return () => {
      setSignDrawingsLogs(undefined);
      console.log("DrawingsSignLogs cleared");
    };
  }, [reRender]);

  const handleRefresh = () => {
    setReRender((prev) => !prev);
  };

  const columns = [
    {
      title: "I.D.",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "File Name",
      dataIndex: "changedFileName",
      key: "changedFileName",
    },
    {
      title: "Action",
      render: (text: SignDrawingsLogsBody) => (
        <>
          <button
            className="NoStyleBtnTiny"
            onClick={() => {
              setFileName(text.changedFileName);
              dispatchModal({
                type: AcModal.setViewDrawingsModal,
                payload: true,
              });
            }}
          >
            view
          </button>
          <MyPopconfirm
            type="link"
            button={"Del"}
            onConfirm={() => {
              deleteSignDrawingsLogs(text.id, messageApi);
            }}
            disabled={disabled}
          />
        </>
      ),
      key: "action",
    },
  ];

  return (
    <>
      {contextHolder}
      <ViewDrawingsModal filename={fileName} />
      <button
        className="NoStyleBtnSm"
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={handleRefresh}
      >
        Refresh
      </button>
      <Table
        className="drawings_logs_table"
        style={{ width: 400, fontSize: 11 }}
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={signDrawingsLogs}
      />
    </>
  );
};

export default DrawingsSignLogs;
