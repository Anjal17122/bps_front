import { Button, Form, Input } from "antd";
import React from "react";

import { TreeSelect } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import { MaterialsUsed } from "../../../../../constants/AllOptions/AllOptionsStructural";
import { MaterialsAndLoadingBody } from "../../../../../Services/StructuralService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: MaterialsAndLoadingBody;
  edit: boolean;
}
const NBC104edit = ({ onSubmit, data, edit }: Props) => {
  const tProps = {
    treeData: MaterialsUsed,

    treeCheckable: true,

    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>
                Materials to be used in structure (tick the listed materials
                that will be used in structural element
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.matUsed}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("matUsed", "Email1")}
                >
                  <TreeSelect disabled={!edit} {...tProps} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.matUsedRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("matUsedRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Specify the design unit weight of materials: RCC (in kN/m3)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.RCCkNm3}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("RCCkNm3", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.RCCkNm3Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("RCCkNm3Remark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Occupancy Load (Uniformly Distributed load in kN/m2) for Rooms
                and Kitchen
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.occLoadkNm2}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("occLoadkNm2", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.occLoadkNm2Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("occLoadkNm2Remark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Occupancy Load (Uniformly Distributed load in KN/m2) for
                Corridors, Staircase, Store
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.occLoadCSS}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("occLoadCSS", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.occLoadCSSRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("occLoadCSSRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Occupancy Load (Uniformly Distributed load in KN/m2) for Balcony
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.KNm2Bal}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("KNm2Bal", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.KNm2BalRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("KNm2BalRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <SubmitBtn text="Edit Form" disable={!edit} />
        </div>
      </Form>
    </div>
  );
};

export default NBC104edit;
