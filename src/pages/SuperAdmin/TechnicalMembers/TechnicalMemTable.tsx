import { Table } from "antd";
import MyPopconfirm from "../../../Common/Popconfirm/MyPopconfirm";
import { GETTechnicalMemBOdy } from "../../../Services/SuperAdminService";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

type Props = {
  technicalMem: GETTechnicalMemBOdy[];
  handleDelMem?: (id: number) => void;
};

const TechnicalMemTable = ({ technicalMem, handleDelMem }: Props) => {
  const { disabled } = useStoreGlobal();

  const columns = [
    {
      title: "S.N.",
      dataIndex: "sn",
      key: "sn",
      render: (
        _text: GETTechnicalMemBOdy,
        _record: GETTechnicalMemBOdy,
        index: number
      ) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   key: "designation",
    // },
    {
      title: "User Id",
      dataIndex: "personId",
      key: "personId",
    },
  ];

  const getColumns = () => {
    return handleDelMem
      ? [
          ...columns,
          {
            title: "Action",
            render: (text: GETTechnicalMemBOdy) => (
              <MyPopconfirm
                type="link"
                button={"Delete"}
                onConfirm={() => handleDelMem(text.id)}
                disabled={disabled}
              />
            ),
            key: "action",
          },
        ]
      : columns;
  };

  return (
    <Table rowKey="id" columns={getColumns()} dataSource={technicalMem}></Table>
  );
};

export default TechnicalMemTable;
