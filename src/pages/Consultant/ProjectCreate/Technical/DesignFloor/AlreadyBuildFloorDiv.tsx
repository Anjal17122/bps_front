import { useContext, useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, InputNumber, message } from "antd";
import { Select } from "antd";
import "../../../../Assets/scss/DesignFloorTable.scss";
import { useParams } from "react-router-dom";
import { GETfloorCategory } from "../../../../../Services/SuperAdminService";
import {
  PostFloor,
  putFloor,
  postFloor,
} from "../../../../../Services/TechnicalService";
import { MyStore, ActionType } from "../../../../../Store/ContextApi";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { isNagarjun } from "../../../../../constants/CommonFunctions";

const AlreadyBuildFloorDiv = () => {
  const initFloorState = [
    {
      floorId: 0,
      floorName: "",
      FNCNT: 0,
      FNCT: 0,
      FC: 0,
      totalTaxable: 0,
      total: 0,
    },
  ];
  const [floorsState, setFloorsState] = useState(initFloorState);
  const [messageApi, contextHolder] = message.useMessage();
  const { state, dispatch } = useContext(MyStore);
  const { disabled } = useStoreGlobal();

  useEffect(() => {
    if (!state.floorCat) {
      GETfloorCategory().then((res) => {
        dispatch({ payload: res.data, type: ActionType.setFloorCat });
      });
    }
  });

  const onAddFloor = () => {
    const init = [...floorsState];
    init.push(initFloorState[0]);
    setFloorsState(init);
  };

  const onDeleteRow = (index: number) => {
    const init = [...floorsState];
    const newFloors = init.filter((_, myindex) => index !== myindex);

    setFloorsState(newFloors);
  };

  const onInputChange = (
    val: any,
    type: "FNCNT" | "FNCT" | "FC",
    index: number
  ) => {
    const init = [...floorsState];
    const myrow = init[index];
    if (type === "FNCNT") {
      const newRow = {
        ...myrow,
        FNCNT: val,
        total: val + myrow.FNCT + myrow.FC,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "FNCT") {
      const newRow = {
        ...myrow,
        FNCT: val,
        totalTaxable: val + myrow.FC,
        total: val + myrow.FNCNT + myrow.FC,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "FC") {
      const newRow = {
        ...myrow,
        FC: val,
        totalTaxable: myrow.FNCT + val,
        total: val + myrow.FNCT + myrow.FNCNT,
      };
      init[index] = newRow;
      setFloorsState(init);
    }
  };
  const params = useParams();

  const onSubmit = () => {
    const floor = floorsState.map((floorSt) => ({
      id: floorSt.floorId,
      name: floorSt.floorName,
      other: 0,
      prev: 0,
      nCNT: floorSt.FNCNT,
      ncT: floorSt.FNCT,
      countable: floorSt.FC,
    }));
    const body: PostFloor = {
      projectId: (params.tempId ? params.tempId : params.pid) as string,
      floorDetail: JSON.stringify(floor),
    };
    localStorage.getItem("isNotice") === "true" &&
    localStorage.getItem("isPerma") === "true"
      ? putFloor(body, messageApi, "/floor/perma")
      : postFloor(body, messageApi, "/floor");
  };

  const onChangeFloor = (val: number, index: number) => {
    const init = [...floorsState];
    const myrow = init[index];
    const newRow = {
      ...myrow,
      floorId: val,
      floorName:
        state.floorCat?.filter((floorca) => val === floorca.id)[0].name || "",
    };
    init[index] = newRow;
    setFloorsState(init);
  };

  const { Option } = Select;

  return (
    <div className="CenterForm10" style={{ padding: 30, overflowY: "hidden" }}>
      {contextHolder}
      <div className="FloorTableCover">
        <table className="FloorTable">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th colSpan={3}>FLOOR AREA EDIT</th>
              <th colSpan={2}></th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th colSpan={3}>PROPOSED NEW CONSTRUCTION</th>
              <th colSpan={2}>TOTAL FLOOR AREA</th>
            </tr>
            <tr>
              <th>S.N.</th>
              <th>Floor</th>
              {isNagarjun() ? null : (
                <th>
                  Far Non Countable <br /> (Non Taxable)
                </th>
              )}
              <th>
                Far Non Countable <br /> (Taxable)
              </th>
              <th>Far Countable</th>
              <th>
                Total <br /> (Taxable)
              </th>
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
                    {state.floorCat?.map((myFloorCat) => (
                      <Option key={myFloorCat.id} value={myFloorCat.id}>
                        {myFloorCat.name}
                      </Option>
                    ))}
                  </Select>
                </td>
                {isNagarjun() ? null : (
                  <td>
                    <InputNumber
                      onChange={(val) => onInputChange(val, "FNCNT", index)}
                      value={floorSt.FNCNT}
                    />
                  </td>
                )}
                <td>
                  <InputNumber
                    onChange={(val) => onInputChange(val, "FNCT", index)}
                    value={floorSt.FNCT}
                  />
                </td>
                <td>
                  <InputNumber
                    onChange={(val) => onInputChange(val, "FC", index)}
                    value={floorSt.FC}
                  />
                </td>
                <td>
                  <InputNumber disabled value={floorSt.totalTaxable} />
                </td>
                <td>
                  <InputNumber disabled value={floorSt.total} />
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
          <tfoot>
            <tr>
              <td colSpan={2} className="">
                Total:
              </td>
              <td>{floorsState.reduce((a, b) => a + b.FNCNT, 0)}</td>
              <td>{floorsState.reduce((a, b) => a + b.FNCT, 0)}</td>
              <td>{floorsState.reduce((a, b) => a + b.FC, 0)}</td>
              <td className="">
                {floorsState.reduce((a, b) => a + b.totalTaxable, 0)}
              </td>
              <td className="">
                {floorsState.reduce((a, b) => a + b.total, 0)}
              </td>
            </tr>
            <tr>
              <td colSpan={9} className="textAlignEnd">
                <Button type="primary" onClick={onSubmit} loading={disabled}>
                  Submit
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AlreadyBuildFloorDiv;
