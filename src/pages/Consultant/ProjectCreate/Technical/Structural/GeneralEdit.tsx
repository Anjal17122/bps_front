import { Cascader, Form, Input } from "antd";
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
import { GeneralType } from "../../../../../Services/StructuralService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: GeneralType;
  edit: boolean;
  onGeneralChange: (val: any) => void;
}
const GeneralEdit = ({
  onSubmit,
  data,
  edit,

  onGeneralChange,
}: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small" onFinish={onSubmit} onFinishFailed={submitFailed}>
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
                  <Cascader
                    onChange={onGeneralChange}
                    options={buildingStructureType}
                    disabled={!edit}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bstypeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bstypeRemark", "Email")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.nosforPermitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nosforPermitRemark", "Email1")}
                >
                  <Input disabled={!edit} />
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
                  <Cascader options={ProvisionForFurtherExt} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provfurExtRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("provfurExtRemark", "Email2")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.noOfStdesRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStdesRemark", "Email22")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CADisUseRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CADisUseRemark", "Email3")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totalHextRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totalHextRemark", "1234")}
                >
                  <Input disabled={!edit} />
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
                  initialValue={data?.isFCBSsub}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("isFCBSsub", "Email1")}
                >
                  <Cascader
                    options={sampledesignfoundations}
                    disabled={!edit}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.isFCBSsubRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("isFCBSsubRemark", "dsad")}
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

export default GeneralEdit;
