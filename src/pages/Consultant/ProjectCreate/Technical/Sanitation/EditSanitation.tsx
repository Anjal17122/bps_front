import { Button, Form, Input } from "antd";
import React from "react";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { SanitationType } from "../../../../../Services/SanitationService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: SanitationType;
  edit: boolean;
}

const EditSanitation = ({ onSubmit, data, edit }: Props) => {
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
                    initialValue={data?.capacity}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacity", "Email")}
                  >
                    <Input disabled={!edit} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.capacityRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacityRemark", "Email")}
                  >
                    <Input disabled={!edit} />
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
                    initialValue={data?.waterPerDay}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDay", "Email")}
                  >
                    <Input disabled={!edit} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterPerDayRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDayRemark", "Email")}
                  >
                    <Input disabled={!edit} />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>Residential Building Water Storage capacity</td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterCap}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCap", "Email")}
                  >
                    <Input disabled={!edit} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterCapRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCapRemark", "Email")}
                  >
                    <Input disabled={!edit} />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="formSubmitDiv">
            <SubmitBtn disable={!edit} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditSanitation;
