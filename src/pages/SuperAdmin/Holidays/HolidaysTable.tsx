import { Table } from "antd";
import React from "react";
import MyPopconfirm from "../../../Common/Popconfirm/MyPopconfirm";
import { GETholidayBody } from "../../../Services/HolidaysService";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

type Props = {
  holidaysData: GETholidayBody[];
  handleDelHoliday: (id: number) => void;
};

const HolidaysTable = ({ holidaysData, handleDelHoliday }: Props) => {
  const { disabled } = useStoreGlobal();
  const columns = [
    {
      title: "S.N.",
      dataIndex: "sn",
      key: "sn",
      render: (_text: any, _record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "nepDate",
      key: "nepDate",
    },
    {
      title: "Eng Date",
      dataIndex: "engDate",
      key: "engDate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (text: GETholidayBody) => (
        <MyPopconfirm
          type="link"
          button={"Delete"}
          onConfirm={() => handleDelHoliday(text.id)}
          disabled={disabled}
        />
      ),
      key: "action",
    },
  ];
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={holidaysData}></Table>
    </div>
  );
};

export default HolidaysTable;
