import { useContext, useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, InputNumber, message } from "antd";
import { Select } from "antd";
import "../../../../Assets/scss/DesignFloorTable.scss";
import { useParams } from "react-router-dom";
import { MyStore } from "../../../../Store/ContextApi";
import { useStoreGlobal } from "../../../../Store/StoreGlobal/StoreGlobal";
import { GETfloorCategory } from "../../../../Services/SuperAdminService";

type data = {
  // floorData: string | undefined;
  setFloorData: (floor: string) => void;
};
type floor = {
  id: number;
  name: string;
  total: number;
}[];
const floorList = [
  { id: 1, name: "Ground Floor" },
  { id: 2, name: "1st Floor" },
  { id: 3, name: "2nd Floor" },
  { id: 4, name: "3rd Floor" },
  { id: 5, name: "4th Floor" },
  { id: 6, name: "5th Floor" },
  { id: 7, name: "6th Floor" },
  { id: 8, name: "7th Floor" },
  { id: 9, name: "8th Floor" },
];
const ConBuilidngFloor = ({ setFloorData }: data) => {
  const initFloorState = [
    {
      id: 0,
      name: "",
      total: 0,
    },
  ];
  const [floorsState, setFloorsState] = useState<floor>(initFloorState);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  //   useEffect(() => {
  //     if (!state.floorCat) {
  //       GETfloorCategory().then((res) => {
  //         dispatch({ payload: res.data, type: ActionType.setFloorCat });
  //       });
  //     }
  //   });
  // useEffect(() => {
  //   console.log("Floor Data");
  //   console.log(floorData);

  //   if (floorData != undefined) {
  //     const floors: floor = JSON.parse(floorData);
  //     setFloorsState(floors);
  //   }
  // }, [floorData]);
  const onAddFloor = () => {
    const init = [...floorsState];
    init.push(initFloorState[0]);
    setFloorsState(init);
    onSubmit(init);
  };

  const onDeleteRow = (index: number) => {
    const init = [...floorsState];
    const newFloors = init.filter((_, myindex) => index !== myindex);
    setFloorsState(newFloors);
    onSubmit(newFloors);
  };

  const onInputChange = (val: any, index: number) => {
    const init = [...floorsState];
    const myrow = init[index];
    const newRow = {
      ...myrow,
      total: val,
    };
    init[index] = newRow;
    setFloorsState(init);
    onSubmit(init);
  };
  const params = useParams();

  const onSubmit = (onSubmitFloor: floor) => {
    const floor = onSubmitFloor.map((floorSt) => ({
      id: floorSt.id,
      name: floorSt.name,
      total: floorSt.total,
    }));
    const floorBody = JSON.stringify(floor);
    setFloorData(floorBody);
  };

  const onChangeFloor = (val: number, index: number) => {
    const init = [...floorsState];
    const myrow = init[index];
    const newRow = {
      ...myrow,
      id: val,
      name: floorList.filter((floorca) => val === floorca.id)[0].name || "",
    };
    init[index] = newRow;
    setFloorsState(init);
    onSubmit(init);
  };

  const { Option } = Select;

  return (
    <div
      className=""
      style={{
        padding: 30,
        overflowY: "hidden",
        width: "100%",
      }}
    >
      {contextHolder}
      <div className="FloorTableCover">
        <table className="FloorTable">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Floor</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {floorsState.map((floorSt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Select
                    style={{ width: 160 }}
                    defaultValue={Number(floorSt.id)}
                    showSearch
                    placeholder="Select Floor"
                    optionFilterProp="children"
                    onChange={(val) =>
                      onChangeFloor(typeof val === "number" ? val : 0, index)
                    }
                    filterOption={(input, option: any) =>
                      (option?.children as string)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {floorList.map((myFloorCat) => (
                      <Option key={myFloorCat.id} value={myFloorCat.id}>
                        {myFloorCat.name}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td>
                  <InputNumber
                    onChange={(val) => onInputChange(val, index)}
                    value={floorSt.total}
                  />
                </td>

                <td>
                  <Button
                    type="primary"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteRow(index)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={7}>
                <Button
                  style={{ backgroundColor: "white" }}
                  icon={<PlusOutlined />}
                  type="primary"
                  ghost
                  onClick={onAddFloor}
                >
                  Add Floor
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConBuilidngFloor;
