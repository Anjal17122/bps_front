import { Button, Form, Input } from "antd";
import React from "react";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
}

const CreateSanitation = ({ onSubmit }: Props) => {
  return (
    <div>
      <div className="MyTableOuter">
        <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
          <table className="MyTable">
            <tbody>
              <tr>
                <td>Residential Building Design capacity (Nos)</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacity", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacityRemark", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>
                  Residential Building Water Consumption per capita per day as
                  per submitted design (Lt)
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDay", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDayRemark", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>Residential Building Water Storage capacity</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCap", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCapRemark", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="formSubmitDiv">
            <SubmitBtn />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateSanitation;
