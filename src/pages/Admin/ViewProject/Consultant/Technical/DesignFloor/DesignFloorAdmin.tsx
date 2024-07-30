import { Cascader, Col, Form, InputNumber } from "antd";
import React, { useContext, useEffect } from "react";
// import { floorTypes } from "./DesignFloorDatas";
import { MinusCircleOutlined } from "@ant-design/icons";
import "../../../../../../Assets/scss/TableFloor.scss";
import { ActionType, MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import {
  FloorListBody,
  GETfloorCategory,
} from "../../../../../../Services/SuperAdminService";
import AdFloorFooter from "../../../../../../Components/Admin/Footers/AdFloorFooter";
import { GetFloorTypes } from "../../../../../Consultant/ProjectCreate/Technical/DesignFloor/VacantDesignEditDiv";
import { useParams } from "react-router-dom";
import PDFfloor from "../../../../../../Common/ProjectPDFs/PDFfloor";
import { isNagarjun } from "../../../../../../constants/CommonFunctions";

interface Props {
  admin?: boolean;
}

const DesignFloorAdmin = ({ admin = false }: Props) => {
  const params = useParams();
  const pid: string = params.pid ?? "";

  const { state, dispatch } = useContext(MyStore);

  const floors = state.project.floor.floorDetail
    ? JSON.parse(state.project.floor.floorDetail)
    : null;

  useEffect(() => {
    if (!state.floorCat) {
      GETfloorCategory().then((res) => {
        dispatch({ payload: res.data, type: ActionType.setFloorCat });
      });
    }
    return () => {
      //   setLoading(true);
    };
  }, []);

  //       prev: `/user/viewproject/owners/${props.match.params.pid}`,
  //       next: `/user/viewproject/bylaws/${props.match.params.pid}`,

  return (
    <div style={{ minHeight: "85vh" }}>
      {ifCon() ? null : <AdFloorFooter pid={pid} />}

      <ViewProjectHeader
        id={pid}
        title="Floor"
        step="Step 6: "
        prev={
          admin
            ? `/admin/viewproject/owners/${pid}`
            : `/user/viewproject/owners/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/bylaws/${pid}`
            : `/user/viewproject/bylaws/${pid}`
        }
      />
      {/* {state.project.id ? (
        ) : null} */}
      <div className="CenterForm10">
        {state.project.id ? (
          <>
            <PDFfloor data={JSON.stringify(floors)} projectId={pid} />
            <DesignFloorCommon floors={floors} floorCat={state.floorCat} />
          </>
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </div>
  );
};

export default DesignFloorAdmin;

interface MyProps {
  floors: any;
  floorCat: FloorListBody[] | undefined;
}

export const DesignFloorCommon = ({ floors, floorCat }: MyProps) => {
  return (
    <Form>
      <div className="FloorTableCover" style={{ marginTop: 15 }}>
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
              {isNagarjun() ? null : <th>Far Non Countable (Non Taxable)</th>}
              <th>Far Non Countable (Taxable)</th>
              <th>Far Countable</th>
              <th>Total (Taxable)</th>
              <th>Total</th>
            </tr>
          </thead>

          {floors?.map((floor: any, index: any) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Cascader
                    placeholder=".."
                    defaultValue={[floor.name]}
                    options={GetFloorTypes(floorCat)}
                    // onChange={(val) => {
                    //   const floorsCopy = [...floors];
                    //   floorsCopy[index].name = val[0].toString();
                    //   setFloors(floorsCopy);
                    // }}
                  />
                </td>
                <td>
                  <InputNumber
                    defaultValue={floor.other}
                    // onChange={(e) =>
                    //   onRowsChange(e as number, "other", index)
                    // }
                  />
                </td>
                <td>
                  <InputNumber
                    defaultValue={floor.prev}
                    // onChange={(e) =>
                    //   onRowsChange(e as number, "prev", index)
                    // }
                  />
                </td>
                {isNagarjun() ? null : (
                  <td>
                    <InputNumber
                      defaultValue={floor.nCNT}
                      // onChange={(e) =>
                      //   onRowsChange(e as number, "nCNT", index)
                      // }
                    />
                  </td>
                )}
                <td>
                  <InputNumber
                    defaultValue={floor.ncT}
                    // onChange={(e) =>
                    //   onRowsChange(e as number, "ncT", index)
                    // }
                  />
                </td>
                <td>
                  <InputNumber
                    defaultValue={floor.countable}
                    // onChange={(e) =>
                    //   onRowsChange(e as number, "countable", index)
                    // }
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
                <td>
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
                  {/* <div>
                          <MinusCircleOutlined onClick={() => delRow(index)} />
                        </div> */}
                </td>
              </tr>
            </tbody>
          ))}

          <Form.List name="floor">
            {(fields, { remove }) => {
              const rules = [{ required: true, message: "is Required.." }];
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
                            options={GetFloorTypes(floorCat)}
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
                      <td className="positionRelative">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          name={[field.name, "total"]}
                          fieldKey={[field.key, "total"]}
                        >
                          <InputNumber disabled />
                        </Form.Item>
                        <Col flex="none" className="floatingDel">
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Col>
                      </td>
                    </tr>
                  ))}
                </tbody>
              );
            }}
          </Form.List>
        </table>
      </div>
    </Form>
  );
};
