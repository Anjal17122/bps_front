import { Table, message } from "antd";
import { useOldPermitCon } from "./useOldPermit";
import MyButton from "../../../Common/TableButton/MyButton";
import PermitActions from "./PermitActions";
import { useState } from "react";

type Props = {};

const ConsultantOldPermit = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { oldPermitsCon } = useOldPermitCon(messageApi);

  const [currentId, setCurrentId] = useState(0);

  const columns = [
    {
      title: "Project ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "LandOwners Name",
      dataIndex: "clientNameEng",
      key: "clientNameEng",
    },
    {
      title: "HouseOwners Name",
      dataIndex: "homeOwnerNameEng",
      key: "homeOwnerNameEng",
    },
    {
      title: "KittaNo",
      dataIndex: "kittaNumber",
      key: "kittaNumber",
    },
    {
      title: "Action",
      // dataIndex: "kittaNo",
      key: "kittaNo",
      render: (text) => {
        return (
          <span>
            <MyButton color="fuchsia" onClick={() => setCurrentId(text.id)}>
              Action
            </MyButton>
          </span>
        );
      },
    },
  ];

  const handleClose = () => {
    setCurrentId(0);
  };

  return (
    <main
      className="CenterForm10"
      style={{ backgroundColor: "#f5f5f5", padding: "3%" }}
    >
      {contextHolder}
      {currentId ? (
        <PermitActions isOpen={true} id={currentId} onClose={handleClose} />
      ) : null}
      <h1>Permit List</h1>
      <Table columns={columns} dataSource={oldPermitsCon} rowKey={"id"} />
    </main>
  );
};

export default ConsultantOldPermit;
