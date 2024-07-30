import { Button, Cascader, Form, InputNumber, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  DesignFloorObj,
  FloorTotalString,
  floorProps,
  floorTotal,
  floorTypes,
  getFloorBody,
} from "./DesignFloorDatas";
import { PlusOutlined } from "@ant-design/icons";
import "../../../../Assets/scss/TableFloor.scss";
import { useParams } from "react-router-dom";
// import {
//   getFloor as getFloorApi,
//   putFloor,
// } from "../../../../Services/TechnicalService";
// import NotFound from "../../../../Common/NotFound";
import {
  switchBody,
  checkIfNoticeAndPerma,
} from "../../Project/Create/ViewCreate";

import { DeleteOutlined } from "@ant-design/icons";
import { getFloor, putFloor } from "../../../../../Services/TechnicalService";
import { NewId } from "../UploadFiles/UploadFilesDiv";
import NotFound from "../../../../../Common/NotFound";
import { sN } from "../../../../../Services/ProjectService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { isNagarjun } from "../../../../../constants/CommonFunctions";

// interface Props {
//   floorsCat: {
//     label: string;
//     value: number;
//   }[];
// }

const EditDesignFloorDiv = () => {
  const params = useParams<{ pid: string; tempId?: string }>();
  const { disabled } = useStoreGlobal();

  const [form] = Form.useForm();

  const [floors, setFloors] = useState<getFloorBody[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFloor(
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/floor/perma?id="
        : "/floor/project?id=",
      params.tempId ? params.tempId : params.pid ?? "0"
    ).then((res) => {
      setLoading(false);

      if (!res.data) {
        setFloors([]);
      } else {
        const floors = JSON.parse(res.data.floorDetail);
        setFloors(floors);
      }
    });
    return () => {
      setLoading(true);
      setFloors([]);
    };
  }, []);

  const [total, setTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  // const [total, setTotal] = useState(0);
  // const [totalTax, setTotalTax] = useState(0);
  const [totalOB, setTotalOB] = useState(0);
  const [totalPPS, setTotalPPS] = useState(0);
  const [totalFNCNT, setTotalFNCNT] = useState(0);
  const [totalFNCT, setTotalFNCT] = useState(0);
  const [totalFC, setTotalFC] = useState(0);

  function onRowsChange(val: number, prop: floorProps, i: number) {
    const newdata = [...floors];
    newdata[i][prop] = val;
    setFloors(newdata);
  }

  const initialOB = floors?.reduce((a, b) => a + b.other, 0);
  const initialPPS = floors?.reduce((a, b) => a + b.prev, 0);
  const initialFNCNT = floors?.reduce((a, b) => a + b.nCNT, 0);
  const initialFNCT = floors?.reduce((a, b) => a + b.ncT, 0);
  const initialFC = floors?.reduce((a, b) => a + b.countable, 0);

  const handleTotal = (_: string, values: { floor: FloorTotalString[] }) => {
    const rowsCopy = [...values.floor];
    if (!values.floor[0] || !values.floor) {
      return;
    } else {
      values.floor.forEach((data: FloorTotalString, index: number) => {
        if (data) {
          const myother = data.other;
          const myprev = data.prev;
          const mynCNT = data.nCNT;
          const myNCT = data.ncT;
          const mycountable = data.countable;
          data.total =
            parseInt(myother) +
            parseInt(myprev) +
            parseInt(mynCNT) +
            parseInt(myNCT) +
            parseInt(mycountable);
          data.totalTax = parseInt(mycountable) + parseInt(myNCT);

          rowsCopy.splice(index, 1, data);
          form.setFieldsValue({ floor: rowsCopy });
        }
      });
      setTimeout(() => {
        const floor: undefined | FloorTotalString[] =
          form.getFieldValue("floor");
        setTotal(floor ? floor.reduce((a, b) => a + b.total, 0) : 0);
        setTotalOB(
          floor
            ? floor.reduce((a, b) => a + parseInt(b.other), 0)
            : 0 + floors?.reduce((a, b) => a + b.other, 0)
        );
        setTotalPPS(
          floor ? floor.reduce((a, b) => a + parseInt(b.prev), 0) : 0
        );
        setTotalFNCNT(
          floor ? floor.reduce((a, b) => a + parseInt(b.nCNT), 0) : 0
        );
        setTotalFNCT(
          floor ? floor.reduce((a, b) => a + parseInt(b.ncT), 0) : 0
        );
        setTotalFC(
          floor ? floor.reduce((a, b) => a + parseInt(b.countable), 0) : 0
        );
        setTotalTax(floor ? floor.reduce((a, b) => a + b.totalTax, 0) : 0);
      }, 400);
    }
  };

  const delRow = (index: number) =>
    setFloors(floors.filter((_, ind) => ind !== index));

  const onSubmit = (val: any) => {
    const AddedRow = val.floor
      ? val.floor.map((x: DesignFloorObj) => ({
          name: x.name[0],
          other: x.other,
          prev: x.prev,
          nCNT: x.nCNT,
          ncT: x.ncT,
          countable: x.countable,
        }))
      : [];
    const body = {
      projectId: NewId(params.tempId ?? "0", params.pid ?? "0"),
      floorDetail: JSON.stringify([...floors, ...AddedRow]),
    };
    putFloor(
      switchBody(body, {
        ...body,
        id: NewId(params.tempId ?? "0", params.pid ?? "0"),
      }),
      messageApi,
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/floor/perma"
        : "/floor"
    );
  };

  return (
    <Spin spinning={loading}>
      <div className="CenterForm10">
        {contextHolder}
        {floors.length ? (
          <>
            {/* <div className="DesignHeading">
              <div>
                Application No: <b>1534</b>
              </div>
              <div>
                Building Purpose: <b>Test Heading</b>
              </div>
              <div>
                Land Area: <b>1000 sqm.</b>
              </div>
              <div>
                Applicant Name: <b>Ram Chandra Dhakal</b>
              </div>
              <div>
                House Owner Name: <b>Sita Ram Lamichhane</b>
              </div>
              <div>
                Address: <b>Satdobato, Lalitpur</b>
              </div>
            </div> */}
            {/* <h2>Edit Floor</h2> */}
            <div className="FloorTableCover" style={{ marginTop: 15 }}>
              {/* {JSON.stringify(floors)} */}
              <Form
                form={form}
                onValuesChange={handleTotal}
                onFinish={onSubmit}
              >
                <table className="FloorTable">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th colSpan={5}>Floor Area (Sq Ft)</th>
                      <th colSpan={2}></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th colSpan={2}>Existing</th>
                      <th colSpan={3}>Proposed New Construction</th>
                      <th colSpan={2}>Total Floor Area</th>
                    </tr>
                    <tr>
                      <th>S.N.</th>
                      <th>Floor</th>
                      <th>Other Building</th>
                      <th>Previous permitted Storyed</th>
                      {isNagarjun() ? null : (
                        <th>Far Non Countable (Non Taxable)</th>
                      )}
                      <th>Far Non Countable (Taxable)</th>
                      <th>Far Countable</th>
                      <th>Total (Taxable)</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  {floors.map((floor, index) => (
                    <tbody key={floor.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Cascader
                            placeholder={""}
                            defaultValue={[floor.name]}
                            options={floorTypes}
                            onChange={(val) => {
                              const floorsCopy = [...floors];
                              floorsCopy[index].name = val[0].toString();
                              setFloors(floorsCopy);
                            }}
                          />
                        </td>
                        <td>
                          <InputNumber
                            defaultValue={floor.other}
                            onChange={(e) =>
                              onRowsChange(e as number, "other", index)
                            }
                          />
                        </td>
                        {isNagarjun() ? null : (
                          <td>
                            <InputNumber
                              defaultValue={floor.prev}
                              onChange={(e) =>
                                onRowsChange(e as number, "prev", index)
                              }
                            />
                          </td>
                        )}
                        <td>
                          <InputNumber
                            defaultValue={floor.nCNT}
                            onChange={(e) =>
                              onRowsChange(e as number, "nCNT", index)
                            }
                          />
                        </td>
                        <td>
                          <InputNumber
                            defaultValue={floor.ncT}
                            onChange={(e) =>
                              onRowsChange(e as number, "ncT", index)
                            }
                          />
                        </td>
                        <td>
                          <InputNumber
                            defaultValue={floor.countable}
                            onChange={(e) =>
                              onRowsChange(e as number, "countable", index)
                            }
                          />
                        </td>
                        <td>
                          <InputNumber
                            disabled
                            value={(
                              floors[index].ncT + floors[index].countable
                            ).toFixed(2)}
                          />
                        </td>
                        <td className="positionRelative">
                          <InputNumber
                            disabled
                            value={(
                              floors[index].prev +
                              floors[index].other +
                              floors[index].nCNT +
                              floors[index].ncT +
                              floors[index].countable
                            ).toFixed(2)}
                          />
                          <div className="floatingDel">
                            <Button
                              icon={<DeleteOutlined />}
                              type="primary"
                              danger
                              // style={{ color: "red" }}
                              onClick={() => delRow(index)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}

                  <Form.List name="floor">
                    {(fields, { add, remove }) => {
                      const rules = [
                        { required: true, message: "is Required.." },
                      ];
                      return (
                        <tbody>
                          {fields.map((field, index) => (
                            <tr key={field.key}>
                              <td>{index + 1}</td>
                              <td>
                                <Form.Item
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "name"]}
                                  fieldKey={[field.key, "name"]}
                                  rules={rules}
                                >
                                  <Cascader
                                    placeholder=".."
                                    options={floorTypes}
                                  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "other"]}
                                  fieldKey={[field.key, "other"]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "prev"]}
                                  fieldKey={[field.key, "prev"]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "nCNT"]}
                                  fieldKey={[field.key, "nCNT"]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "ncT"]}
                                  fieldKey={[field.key, "ncT"]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "countable"]}
                                  fieldKey={[field.key, "countable"]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "totalTax"]}
                                  fieldKey={[field.key, "totalTax"]}
                                >
                                  <InputNumber disabled />
                                </Form.Item>
                              </td>
                              <td
                                className="positionRelative"
                                style={{ position: "relative" }}
                              >
                                <Form.Item
                                  initialValue={0}
                                  className="NoMarginForm ErrorMsgIn"
                                  name={[field.name, "total"]}
                                  fieldKey={[field.key, "total"]}
                                >
                                  <InputNumber disabled />
                                </Form.Item>
                                <div className="floatingDel">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    type="primary"
                                    danger
                                    // style={{ color: "red" }}
                                    onClick={() => {
                                      remove(field.name);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={9} className="textAlignEnd">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  ghost
                                  onClick={() => {
                                    add();
                                  }}
                                >
                                  <PlusOutlined /> Add Floor
                                </Button>
                              </Form.Item>
                            </td>
                          </tr>
                        </tbody>
                      );
                    }}
                  </Form.List>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="textAlignEnd">
                        Total:
                      </td>
                      <td>
                        <InputNumber
                          defaultValue={0}
                          value={totalOB + initialOB}
                        />
                      </td>
                      <td>
                        <InputNumber
                          defaultValue={0}
                          value={totalPPS + initialPPS}
                        />
                      </td>
                      <td>
                        <InputNumber
                          defaultValue={0}
                          value={totalFNCNT + initialFNCNT}
                        />
                      </td>
                      <td>
                        <InputNumber
                          defaultValue={0}
                          value={totalFNCT + initialFNCT}
                        />
                      </td>
                      <td>
                        <InputNumber
                          defaultValue={0}
                          value={totalFC + initialFC}
                        />
                      </td>
                      <td className="textAlignEnd">
                        {totalTax.toLocaleString()}
                      </td>
                      <td className="textAlignEnd">{total.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={9} className="textAlignEnd">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={disabled}
                        >
                          Edit Floor
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Form>
            </div>
          </>
        ) : (
          <NotFound
            text="No Floors added yet!"
            link={"/project/create/designfloor/" + params.pid}
          />
        )}
      </div>
    </Spin>
  );
};

export default EditDesignFloorDiv;

export function noticeIdorParamId(params: {
  pid: sN;
  tempId?: string | undefined;
}) {
  return checkIfNoticeAndPerma() ? params.tempId || "" : params.pid;
}
