import { useContext, useEffect, useState } from "react";
import { Button, InputNumber, message } from "antd";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { GETfloorCategory } from "../../../Services/SuperAdminService";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import "../../../Assets/scss/DesignFloorTable.scss";
import {
  getFloor,
  postFloor,
  PostFloor,
  putFloor,
} from "../../../Services/TechnicalService";
import { useParams } from "react-router-dom";

import StoreySteps from "../../../Common/Headers/StoreySteps";
import ConFloorFooter from "../../../Components/Consultant/Footers/ConFloorFooter";
import { FloorsState } from "../ProjectCreate/Technical/DesignFloor/VacantDesignEditDiv";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";
import { isNagarjun } from "../../../constants/CommonFunctions";

// interface Props {
//   oldData: boolean;
// }

// const StoreyAdditionDesignFloor = ({ oldData = true }: Props) => {
const StoreyAdditionDesignFloor = () => {
  const initFloorState = [
    {
      floorId: 0,
      name: "",
      other: 0,
      prev: 0,
      nCNT: 0,
      ncT: 0,
      countable: 0,
      totalTaxable: 0,
      total: 0,
    },
  ];

  const [floorsState, setFloorsState] = useState<FloorsState[]>([]);
  const { state, dispatch } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  useEffect(() => {
    if (!state.floorCat) {
      GETfloorCategory().then((res) => {
        dispatch({ payload: res.data, type: ActionType.setFloorCat });
      });
    }
  });

  useEffect(() => {
    getFloor(
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/floor/perma?id="
        : "/floor/project?id=",
      params.tempId ? params.tempId : (params.pid as string)
    ).then((res) => {
      //   setLoading(false);
      if (!res.data) {
        setFloorsState([]);
      } else {
        const floors: {
          id: number;
          name: string;
          other: number;
          prev: number;
          nCNT: number;
          ncT: number;
          countable: number;
        }[] = JSON.parse(res.data.floorDetail);
        setFloorsState(
          floors.map((floor) => ({
            floorId: floor.id,
            name: floor.name,
            nCNT: floor.nCNT,
            ncT: floor.ncT,
            countable: floor.countable,
            other: floor.other,
            prev: floor.prev,
            totalTaxable: floor.ncT + floor.countable,
            total:
              floor.ncT +
              floor.countable +
              floor.nCNT +
              floor.prev +
              floor.other,
          }))
        );
      }
    });
    if (!state.floorCat) {
      GETfloorCategory().then((res) => {
        dispatch({ payload: res.data, type: ActionType.setFloorCat });
      });
    }
    return () => {
      setFloorsState([]);
    };
  }, []);

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
    val: number,
    type: "nCNT" | "ncT" | "countable" | "other" | "prev",
    index: number
  ) => {
    const init = [...floorsState];
    const myrow = init[index];
    if (type === "nCNT") {
      const newRow = {
        ...myrow,
        nCNT: val,
        total: val + myrow.ncT + myrow.countable,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "ncT") {
      const newRow = {
        ...myrow,
        ncT: val,
        totalTaxable: val + myrow.countable,
        total: val + myrow.nCNT + myrow.countable,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "countable") {
      const newRow = {
        ...myrow,
        countable: val,
        totalTaxable: myrow.ncT + val,
        total: val + myrow.ncT + myrow.nCNT,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "other") {
      const newRow = {
        ...myrow,
        other: val,
      };
      init[index] = newRow;
      setFloorsState(init);
    } else if (type === "prev") {
      const newRow = {
        ...myrow,
        prev: val,
      };
      init[index] = newRow;
      setFloorsState(init);
    }
  };

  const params = useParams();

  const onSubmit = () => {
    const floor = floorsState.map((floorSt) => ({
      id: floorSt.floorId,
      name: floorSt.name,
      other: floorSt.other,
      prev: floorSt.prev,
      nCNT: floorSt.nCNT,
      ncT: floorSt.ncT,
      countable: floorSt.countable,
    }));
    const body: PostFloor = {
      projectId: params.tempId ? params.tempId : (params.pid as string),
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
      name:
        state.floorCat?.filter((floorca) => val === floorca.id)[0].name || "",
    };
    init[index] = newRow;
    setFloorsState(init);
  };

  const { Option } = Select;

  return (
    <>
      {contextHolder}
      <div>
        {localStorage.getItem("isPerma") === "true" ? (
          <ConFloorFooter pid={params.pid ?? ""} />
        ) : null}

        <StoreySteps
          id={params.pid ?? ""}
          title="Add Design Floor"
          step="Step 6: "
          prev={`/project/create/landowners/${params.pid}`}
          next={`/project/create/storey/upload/${params.pid}`}
        />
      </div>
      <div
        className="CenterForm10"
        style={{ padding: 30, overflowY: "hidden" }}
      >
        <div className="FloorTableCover">
          <table className="FloorTable">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th colSpan={5}>FLOOR AREA EDIT</th>
                <th colSpan={2}></th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th colSpan={2}>EXISTING</th>
                <th colSpan={3}>PROPOSED NEW CONSTRUCTION</th>
                <th colSpan={2}>TOTAL FLOOR AREA</th>
              </tr>
              <tr>
                <th>S.N.</th>
                <th>Floor</th>
                <th>Other Building</th>
                <th>Previous permitted Storyed</th>
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
                      defaultValue={floorSt.floorId}
                      style={{ width: 160 }}
                      showSearch
                      placeholder="Select Floor"
                      optionFilterProp="children"
                      onChange={(val) =>
                        onChangeFloor(typeof val === "number" ? val : 0, index)
                      }
                      filterOption={(input, option) =>
                        (option?.children)
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
                  <td>
                    <InputNumber
                      onChange={(val) =>
                        onInputChange(val ?? 0, "other", index)
                      }
                      value={floorSt.other}
                    />
                  </td>
                  <td>
                    <InputNumber
                      onChange={(val) => onInputChange(val ?? 0, "prev", index)}
                      value={floorSt.prev}
                    />
                  </td>
                  {isNagarjun() ? null : (
                    <td>
                      <InputNumber
                        onChange={(val) =>
                          onInputChange(val ?? 0, "nCNT", index)
                        }
                        value={floorSt.nCNT}
                      />
                    </td>
                  )}
                  <td>
                    <InputNumber
                      onChange={(val) => onInputChange(val ?? 0, "ncT", index)}
                      value={floorSt.ncT}
                    />
                  </td>
                  <td>
                    <InputNumber
                      onChange={(val) =>
                        onInputChange(val ?? 0, "countable", index)
                      }
                      value={floorSt.countable}
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
                      disabled={localStorage.getItem("isPerma") === "true"}
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
                <td colSpan={9}>
                  <Button
                    disabled={localStorage.getItem("isPerma") === "true"}
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
                <td>{floorsState.reduce((a, b) => a + b.other, 0)}</td>
                <td>{floorsState.reduce((a, b) => a + b.prev, 0)}</td>
                <td>{floorsState.reduce((a, b) => a + b.nCNT, 0)}</td>
                <td>{floorsState.reduce((a, b) => a + b.ncT, 0)}</td>
                <td>{floorsState.reduce((a, b) => a + b.countable, 0)}</td>
                <td className="">
                  {floorsState.reduce((a, b) => a + b.totalTaxable, 0)}
                </td>
                <td className="">
                  {floorsState.reduce((a, b) => a + b.total, 0)}
                </td>
              </tr>
              <tr>
                <td colSpan={9} className="textAlignEnd">
                  <Button
                    disabled={localStorage.getItem("isPerma") === "true"}
                    type="primary"
                    onClick={onSubmit}
                    loading={disabled}
                  >
                    Submit
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default StoreyAdditionDesignFloor;
