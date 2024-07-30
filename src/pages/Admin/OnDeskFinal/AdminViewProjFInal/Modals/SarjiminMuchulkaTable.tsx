import { Table } from "antd";
import { WitnessGet } from "../../../../../Services/NewMuchulkaService";

type Props = {
  data: WitnessGet[] | undefined;
};

const SarjiminMuchulkaTable = ({ data }: Props) => {
  const columns = [
    {
      title: "क्र. सं.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "दिशा",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "नाम",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "कित्ता नं",
      dataIndex: "kittaNo",
      key: "kittaNo",
    },
    {
      title: "जन्म मिति",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "नागरिकता",
      dataIndex: "citizenshipPhoto",
      key: "citizenshipPhoto",
    },
    // {
    //   title: "विवरण",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (data) => (
    //     <span>
    //       <Popconfirm onConfirm={() => console.log(data)} title="Are you sure?">
    //         <Button>
    //           <DeleteOutlined />
    //         </Button>
    //       </Popconfirm>
    //     </span>
    //   ),
    // },
  ];

  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default SarjiminMuchulkaTable;
