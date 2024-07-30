import { Cascader, Form, Input } from "antd";
import React from "react";
import {
  buildingStructureType,
  ProvisionForFurtherExt,
} from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { GeneralType } from "../../../../../../Services/StructuralService";
// import {
//   buildingStructureType,
//   ProvisionForFurtherExt,
// } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { Generaltyp } from "../../../../Services/StructuralService";
interface Props {
  // onSubmit: (val: any) => void;
  data: GeneralType;
  // edit: boolean;
}
const GeneralEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Building Structure Type</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bstype}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("bstype", "Email1")}
                >
                  <Cascader options={buildingStructureType} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bstypeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bstypeRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Design Philosophy</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.designPhilosophy}
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
                  initialValue={data?.designPhilosophyRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("designPhilosophyRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Number of storey applied for permit (in Nos.)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.nosforPermit}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nosforPermit", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.nosforPermitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nosforPermitRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Provision for further extension considered or not</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provfurExt}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("provfurExt", "Email1")}
                >
                  <Cascader options={ProvisionForFurtherExt} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provfurExtRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("provfurExtRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Number of storeys considered in Structural design (in Nos.)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.noOfStdes}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStdes", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.noOfStdesRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStdesRemark", "Email22")}
                >
                  <Input disabled={true} />
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
                  initialValue={data?.CADisUse}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CADisUse", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CADisUseRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CADisUseRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Total height (h) of structure with extension (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totalHext}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totalHext", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totalHextRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totalHextRemark", "1234")}
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

export default GeneralEdit;
