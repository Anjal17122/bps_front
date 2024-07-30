import { Form, Input } from "antd";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { FloorTypArc } from "../../../../../Services/StructuralService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: FloorTypArc;
  edit: boolean;
}
const FloorEdit = ({ onSubmit, data, edit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Ground Floor - Wall height (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.gfloorM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("gfloorM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.gfloorMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("gfloorMRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Floor - Wall thickness (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.gFloorMM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("gFloorMM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.gFloorMMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("gFloorMMRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Floor - Maximum Length between cross wall (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxLenCrossm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxLenCrossm", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxLenCrossmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxLenCrossmRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>First Floor - Wall height (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OfloorWalM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OfloorWalM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OfloorWalMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OfloorWalMRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>First Floor - Wall thickness (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OfloorWalMM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OfloorWalMM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OfloorWalMMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OfloorWalMMRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>First Floor - Maximum Length between cross wall (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OCrossM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OCrossM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.OCrossMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("OCrossMRemark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Second Floor - Wall height (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TWallM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TWallM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TWallMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TWallMRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Second Floor - Wall thickness (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TWallTmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TWallTmm", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TWallTmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TWallTmmRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Second Floor - Maximum Length between cross wall (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TCrossM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TCrossM", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TCrossMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TCrossMRemark", "dsad")}
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

export default FloorEdit;
