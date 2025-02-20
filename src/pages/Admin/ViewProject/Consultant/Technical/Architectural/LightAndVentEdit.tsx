import { Form, Input } from "antd";
import React from "react";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { LightVent } from "../../../../../../Services/ArchitecturalService";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { LightVent } from "../../../../Services/ArchitecturalService";

interface Props {
  // onSubmit: (val: any) => void;
  data: LightVent;
  // edit: boolean;
}
const LightAndVentEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td> Total Floor Area of Largest Habitable room (sq. m.)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.tfaRoom}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("tfaRoom", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.tfaRoomRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("tfaRoomRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Min. opening area of window for lighting largest habitable room
                from external wall (sq.m)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.moaWin}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("moaWin", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.moaWinRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("moaWinRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Min. opening area of natural ventilator for largest habitable
                room from external wall (sq.m)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.MOAvent}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("MOAvent", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.MOAventRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("MOAventRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Min. size of ventilator for water closets and bathroom (sq.m)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minVent}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minVent", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minVentRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minVentRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div className="formSubmitDiv">
          <Button
            htmlType="submit"
            size="middle"
            type="primary"
            disabled={true}
          >
            Edit Form
          </Button>
        </div> */}
      </Form>
    </div>
  );
};

export default LightAndVentEdit;
