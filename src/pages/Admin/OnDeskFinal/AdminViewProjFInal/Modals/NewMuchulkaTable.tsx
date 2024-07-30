import { Table } from "antd";
import { WitnessGet } from "../../../../../Services/NewMuchulkaService";

type Props = {
  data: WitnessGet[] | undefined;
};

const NewMuchulkaTable = ({ data }: Props) => {
  const columns = [
    {
      title: "क्र. सं.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "वडा",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "जन्म मिति",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },

    // {
    //   title: "विवरण",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (data: GetNewMuchulkaBody) => (
    //     <span>
    //       <Popconfirm onConfirm={() => console.log(data)} title="Are you sure?">
    //         <button className="delBtn">
    //           <DeleteOutlined />
    //         </button>
    //       </Popconfirm>
    //     </span>
    //   ),
    // },
  ];

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
};

export default NewMuchulkaTable;
