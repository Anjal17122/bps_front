import { Form, Input } from "antd";
import React from "react";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { RatingNSizes } from "../../../../../../Services/ElectricalService";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { RatingNSizes } from "../../../../Services/ElectricalService";

interface Props {
  // onSubmit: (val: any) => void;
  data: RatingNSizes;
  // edit: boolean;
}

const RatingAndSizesEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Min. size of copper cable for light circuit (sq.mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minLight}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLight", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minLightRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLightRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Min. size of copper cable for power circuit (sq.mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPower}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPower", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPowerRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPowerRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Wattage of ordinary power socket (2pin) estimated as (watt)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.watt2}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt2", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.watt2Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt2Remark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Wattage of power socket outlet (3pin) estimated as (watt)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.watt3}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt3", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.watt3Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("watt3Remark", "Email22")}
                >
                  <Input disabled={true} />
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
                  initialValue={data?.wallCast}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallCast", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.wallCastRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallCastRemark", "Email3")}
                >
                  <Input disabled={true} />
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
                  initialValue={data?.wallMild}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallMild", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.wallMildRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wallMildRemark", "1234")}
                >
                  <Input disabled={true} />
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
                  initialValue={data?.wall20x30}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wall20x30", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.wall20x30Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("wall20x30Remark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Depth of the switch or regulator boxes (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depth}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depth", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
};

export default RatingAndSizesEdit;
