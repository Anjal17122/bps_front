import { Form, Input } from "antd";
import React from "react";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { SanitationType } from "../../../../../../Services/SanitationService";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { SanitationType } from "../../../../Services/SanitationService";

interface Props {
  // onSubmit: (val: any) => void;
  data: SanitationType;
  // edit: boolean;
}

const EditSanitation = ({ data }: Props) => {
  return (
    <div>
      <div className="MyTableOuter">
        <Form size="small">
          <table className="MyTable">
            <tbody>
              <tr>
                <td>Residential Building Design capacity (Nos)</td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.capacity}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacity", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.capacityRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("capacityRemark", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>
                  Residential Building Water Consumption per capita per day as
                  per submitted design (Lt)
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterPerDay}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDay", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterPerDayRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterPerDayRemark", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>Residential Building Water Storage capacity</td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterCap}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCap", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={data?.waterCapRemark}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("waterCapRemark", "Email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    </div>
  );
};

export default EditSanitation;
