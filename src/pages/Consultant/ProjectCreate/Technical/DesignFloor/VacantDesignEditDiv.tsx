import { useContext, useEffect, useState } from "react";
import { Button, Cascader, InputNumber, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import {
  FloorListBody,
  GETfloorCategory,
} from "../../../../../Services/SuperAdminService";
import {
  getFloor as getFloorApi,
  putFloor,
} from "../../../../../Services/TechnicalService";
import { MyStore, ActionType } from "../../../../../Store/ContextApi";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { switchBody } from "../../Project/Create/ViewCreate";
import PDFfloor from "../../../../../Common/ProjectPDFs/PDFfloor";
import { NewId } from "../UploadFiles/UploadFilesDiv";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { isNagarjun } from "../../../../../constants/CommonFunctions";

export interface FloorsState {
  floorId: number;
  name: string;
  nCNT: number;
  ncT: number;
  countable: number;
  other: number;
  prev: number;
  totalTaxable: number;
  total: number;
}

const VacantDesignEditDiv = () => {
  const { pid, tempId } = useParams();
  const { state, dispatch } = useContext(MyStore);

  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  const initFloorState = [
    {
      floorId: 0,
      name: "",
      nCNT: 0,
      ncT: 0,
      countable: 0,
      prev: 0,
      other: 0,
      totalTaxable: 0,
      total: 0,
    },
  ];

  const [floorsState, setFloorsState] = useState<FloorsState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFloorApi(
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/floor/perma?id="
        : "/floor/project?id=",
      tempId ? tempId : pid ?? "0"
    ).then((res) => {
      setLoading(false);
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
            other: 0,
            prev: 0,
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
      //   setLoading(true);
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
    val: any,
    type: "nCNT" | "ncT" | "countable",
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
    }
  };

  // const onChangeFloor = (val: number, index: number) => {
  //   const init = [...floorsState];
  //   const myrow = init[index];
  //   const newRow = {
  //     ...myrow,
  //     floorId: val,
  //     name:
  //       state.floorCat?.filter((floorca) => val === floorca.id)[0].name || "",
  //   };
  //   init[index] = newRow;
  //   setFloorsState(init);
  // };

  const onSubmit = () => {
    // Check if any value in floorsState is null or undefined
    const hasNullorUndefined = floorsState.some((floor) =>
      Object.values(floor).some(
        (value) => value === null || value === undefined
      )
    );

    if (hasNullorUndefined)
      return messageApi.error("Floor value cannot be empty, 0 or number");
    const floor = floorsState.map((floorSt, index) => {
      const { name, nCNT, ncT, countable } = floorSt;
      return {
        id: index,
        name,
        other: 0,
        prev: 0,
        nCNT,
        ncT,
        countable,
      };
    });
    const body = {
      projectId: NewId(tempId || "", pid ?? "0"),
      floorDetail: JSON.stringify(floor),
    };
    putFloor(
      switchBody(body, { ...body, id: NewId(tempId || "", pid ?? "0") }),
      messageApi,
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/floor/perma"
        : "/floor"
    );
  };

  return (
    <div className="CenterForm10" style={{ padding: 30, overflowY: "hidden" }}>
      {contextHolder}
      <PDFfloor data={JSON.stringify(floorsState)} projectId={pid ?? "0"} />
      <Spin spinning={loading}>
        <div className="FloorTableCover">
          <table className="FloorTable">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th colSpan={3}>FLOOR AREA (Sq. ft)</th>
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
                  <td>
                    {index + 1}
                    {/* {JSON.stringify(floorSt)} */}
                  </td>
                  <td>
                    <Cascader
                      placeholder={""}
                      defaultValue={[floorSt.name]}
                      options={GetFloorTypes(state.floorCat)}
                      onChange={(val) => {
                        const floorsCopy = [...floorsState];
                        floorsCopy[index].name = val[0].toString();
                        setFloorsState(floorsCopy);
                      }}
                    />
                  </td>
                  {isNagarjun() ? null : (
                    <td>
                      <InputNumber
                        onChange={(val) => onInputChange(val, "nCNT", index)}
                        value={floorSt.nCNT}
                      />
                    </td>
                  )}
                  <td>
                    <InputNumber
                      onChange={(val) => onInputChange(val, "ncT", index)}
                      value={floorSt.ncT}
                    />
                  </td>
                  <td>
                    <InputNumber
                      onChange={(val) => onInputChange(val, "countable", index)}
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
                <td colSpan={2}>Total:</td>
                <td style={{ paddingLeft: 18 }}>
                  {floorsState.reduce((a, b) => a + b.nCNT, 0)}
                </td>
                <td style={{ paddingLeft: 18 }}>
                  {floorsState.reduce((a, b) => a + b.ncT, 0)}
                </td>
                <td style={{ paddingLeft: 18 }}>
                  {floorsState.reduce((a, b) => a + b.countable, 0)}
                </td>
                <td style={{ paddingLeft: 18 }}>
                  {floorsState.reduce((a, b) => a + b.totalTaxable, 0)}
                </td>
                <td style={{ paddingLeft: 18 }} className="">
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
      </Spin>
    </div>
  );
};

export default VacantDesignEditDiv;

export const GetFloorTypes = (
  floorTYp: FloorListBody[] | undefined
): { label: string; value: string }[] => {
  const mapped: { label: string; value: string }[] =
    floorTYp?.map((floorty) => ({
      label: floorty.name,
      value: floorty.name,
    })) ?? [];
  return mapped;
};
