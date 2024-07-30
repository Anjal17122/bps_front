import { Button, Cascader, Form, Input } from "antd";
import React from "react";
import {
  submitFailed,
  NoLblNoReq,
  FormReq,
} from "../../../../../Common/Form/FormData";
import { ProvisionOfLift } from "../../../../../constants/AllOptions/AllOptionsArchitectural";
import { Lift } from "../../../../../Services/ArchitecturalService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: Lift;
  edit: boolean;
}
const LiftsEdit = ({ onSubmit, data, edit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Total Height of the Building (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totHbuild}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totHbuild", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totHbuildRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totHbuildRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Provision of Lift</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPro}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("liftPro", "Email1")}
                >
                  <Cascader options={ProvisionOfLift} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftProRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftProRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>No. of Lift per bank (Nos)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPBank}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftPBank", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPBankRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftPBankRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <SubmitBtn disable={!edit} text="Edit Form" />
        </div>
      </Form>
    </div>
  );
};

export default LiftsEdit;
