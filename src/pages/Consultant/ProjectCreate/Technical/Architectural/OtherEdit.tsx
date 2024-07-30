import { Button, Cascader, Form, Input } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  ProvisionOfFireEsc,
  ProvisionOfSepEntrance,
} from "../../../../../constants/AllOptions/AllOptionsArchitectural";
import { ArchitecturalOther } from "../../../../../Services/ArchitecturalService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: ArchitecturalOther;
  edit: boolean;
}
const OtherEdit = ({ onSubmit, data, edit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Provision of fire escape and fire safety</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provFire}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("provFire", "Email1")}
                >
                  <Cascader options={ProvisionOfFireEsc} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.provFireRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("provFireRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Height of parapet wall & balcony handrail (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.HparapetWall}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("HparapetWall", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.HparapetWallRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("HparapetWallRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Is there a provision of separate entrance for disabled people
                next to the primary entrance of a building?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.SepEnt}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("SepEnt", "Email1")}
                >
                  <Cascader options={ProvisionOfSepEntrance} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.SepEntRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("SepEntRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Max. gradient for wheel chair ramp at entrance of building
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxWheel}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxWheel", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxWheelRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxWheelRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Min. width of wheel chair ramp at entrance of building (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minWheel}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minWheel", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minWheelRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minWheelRemark", "Email3")}
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

export default OtherEdit;
