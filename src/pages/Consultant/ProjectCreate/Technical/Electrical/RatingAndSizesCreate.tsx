import { Button, Form, Input } from "antd";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { RatingNSizes } from "../../../../../Services/ElectricalService";

interface Props {
  onSubmit: (val: RatingNSizes) => void;
  submitting: boolean;
}
const RatingAndSizesCreate = ({ onSubmit, submitting }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Min. size of copper cable for light circuit (sq.mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLight", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLightRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Min. size of copper cable for power circuit (sq.mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPower", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPowerRemark", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Wattage of ordinary power socket (2pin) estimated as (watt)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt2", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt2Remark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Wattage of power socket outlet (3pin) estimated as (watt)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt3", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt3Remark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Wall thickness of cast iron switch or regulators boxes for upto
                (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallCast", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallCastRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Wall thickness of mild steel sheet switch or regulators boxes
                for upto 20cmX30cm (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallMild", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallMildRemark", "1234")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Wall thickness of mild steel sheet switch or regulators boxes
                for above 20cmX30cm (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="wall20x30 ErrorMsgIn"
                  {...NoLblNoReq("wall20x30", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wall20x30Remark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Depth of the switch or regulator boxes (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depth", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <Button
            htmlType="submit"
            size="middle"
            loading={submitting}
            type="primary"
          >
            Submit Form
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RatingAndSizesCreate;
