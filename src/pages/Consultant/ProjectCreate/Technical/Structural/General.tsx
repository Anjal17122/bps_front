import { Button, Cascader, Form, Input } from "antd";
import React from "react";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  buildingStructureType,
  ProvisionForFurtherExt,
  sampledesignfoundations,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  onGeneralChange: (val: any) => void;
}

const General = ({ onSubmit, onGeneralChange }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small" onFinish={onSubmit} onFinishFailed={submitFailed}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Building Structure Type</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("bstype", "Email1")}
                >
                  <Cascader
                    options={buildingStructureType}
                    onChange={onGeneralChange}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bstypeRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Design Philosophy</td>
              <td className="width80">
                <Form.Item
                  initialValue={["LSM"]}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("designPhilosophy", "Email1")}
                >
                  <Cascader
                    disabled
                    options={[{ value: "LSM", label: "Limit State Method" }]}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("designPhilosophyRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Number of storey applied for permit (in Nos.)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nosforPermit", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nosforPermitRemark", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Provision for further extension considered or not</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("provfurExt", "Email1")}
                >
                  <Cascader options={ProvisionForFurtherExt} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("provfurExtRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Number of storeys considered in Structural design (in Nos.)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStdes", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStdesRemark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                If Computer Aided Design (CAD) is used, please state the name of
                the Software package
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CADisUse", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CADisUseRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Total height (h) of structure with extension (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totalHext", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totalHextRemark", "1234")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Whether sample design calculations of foundations, columns,
                beams and slabs are submitted
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("isFCBSsub", "Email1")}
                >
                  <Cascader options={sampledesignfoundations} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("isFCBSsubRemark", "dsad")}
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
  );
};

export default General;
