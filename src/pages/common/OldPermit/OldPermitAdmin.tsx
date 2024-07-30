import { Button, Table, message } from "antd";
import { useOldPermitCon } from "./useOldPermit";
import { Link } from "react-router-dom";

const OldPermitAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { oldPermitsCon } = useOldPermitCon(messageApi);

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
            <Link to={"/project/permit/view/" + text.id}>
              <Button type="link">View</Button>
            </Link>
            <Link to={"/project/permit/edit/" + text.id}>
              <Button type="link">Edit</Button>
            </Link>
          </span>
        );
      },
    },
  ];

  return (
    <main
      className="CenterForm10"
      style={{ backgroundColor: "#f5f5f5", padding: "3%" }}
    >
      {contextHolder}
      <h1>Permit List</h1>
      <Table columns={columns} dataSource={oldPermitsCon} rowKey={"id"} />
    </main>
  );
};

export default OldPermitAdmin;
