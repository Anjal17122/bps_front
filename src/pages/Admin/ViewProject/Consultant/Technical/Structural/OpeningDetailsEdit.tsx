import { Cascader, Form, Input } from "antd";
import React from "react";
import {
  Verticaldistancetwoopening,
  horizontalbetweenopening,
} from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { OpeningDetailsTyp } from "../../../../../../Services/StructuralService";
// import {
//   casesdonotcomply,
//   horizontalbetweenopening,
//   Verticaldistancetwoopening,
// } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { OpeningDetailsTyp } from "../../../../Services/StructuralService";

interface Props {
  data: OpeningDetailsTyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}
const OpeningDetailsEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Least distance from inside corner (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.leastDisMM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("leastDisMM", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.leastDisMMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("leastDisMMRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Maximum percentage of opening in any wall with respect to its
                length
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxPerOp}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxPerOp", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxPerOpRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxPerOpRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Does the Vertical distance between two opening less than 600 mm
                or 1/2 of width of smaller opening?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.dis600mm12}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("dis600mm12", "Email1")}
                >
                  <Cascader
                    options={Verticaldistancetwoopening}
                    disabled={true}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.dis600mm12Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("dis600mm12Remark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Does the horizontal distance between any two opening less than
                600 mm or 1/2 of height of shorter opening?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.horDis60012}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("horDis60012", "Email1")}
                >
                  <Cascader
                    options={horizontalbetweenopening}
                    disabled={true}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.horDis60012Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("horDis60012Remark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            {/* <tr>
              <td>
                If any of above mentioned cases do not comply, do you have
                provision for strengthening around opening?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provStrength}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("provStrength", "Email1")}
                >
                  <Cascader options={casesdonotcomply} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provStrengthRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("provStrengthRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr> */}
            <tr>
              <td>Thickness of lintel band(mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.lintelThick}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("lintelThick", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.lintelThickRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("lintelThickRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Thickness of sill band(mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sillBand}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sillBand", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sillBandRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sillBandRemark", "Email3")}
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

export default OpeningDetailsEdit;
