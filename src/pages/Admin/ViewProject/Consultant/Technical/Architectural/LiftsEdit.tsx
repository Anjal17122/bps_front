import { Cascader, Form, Input } from "antd";
import React from "react";
import { ProvisionOfLift } from "../../../../../../constants/AllOptions/AllOptionsArchitectural";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { Lift } from "../../../../../../Services/ArchitecturalService";
// import { ProvisionOfLift } from "../../../../Common/AllOptions/AllOptionsArchitectural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { Lift } from "../../../../Services/ArchitecturalService";

interface Props {
  // onSubmit: (val: any) => void;
  data: Lift;
  // edit: boolean;
}
const LiftsEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Total Height of the Building (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totHbuild}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totHbuild", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.totHbuildRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("totHbuildRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Provision of Lift</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPro}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftPro", "Email1")}
                >
                  <Cascader options={ProvisionOfLift} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftProRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftProRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>No. of Lift per bank (Nos)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPBank}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftPBank", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.liftPBankRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("liftPBankRemark", "Email2")}
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

export default LiftsEdit;
