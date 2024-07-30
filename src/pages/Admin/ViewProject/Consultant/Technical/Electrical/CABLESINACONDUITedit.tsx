import { Form, Input } from "antd";
import React from "react";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { maxCables } from "../../../../../../Services/ElectricalService";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { maxCables } from "../../../../Services/ElectricalService";

interface Props {
  // onSubmit: (val: any) => void;
  data: maxCables;
  // edit: boolean;
}

const CABLESINACONDUITedit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>
                No. of 2.5 sq.mm cross-sectional area cable in 20mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcrosecA}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcrosecA", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcrosecARemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcrosecARemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 4 sq.mm cross-sectional area cable in 20mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcrosecA}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcrosecA", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcrosecARemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcrosecARemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 6 sq.mm cross-sectional area cable in 20mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSecA}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSecA", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSecARemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSecARemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 2.5 sq.mm cross-sectional area cable in 25mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcroSec25}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcroSec25", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcroSec25Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcroSec25Remark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 4 sq.mm cross-sectional area cable in 25mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcroSec25}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcroSec25", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcroSec25Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcroSec25Remark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 6 sq.mm cross-sectional area cable in 25mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSec25}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSec25", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSec25Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSec25Remark", "1234")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 2.5 sq.mm cross-sectional area cable in 32mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcroSec32}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcroSec32", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.TcroSec32Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("TcroSec32Remark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 4 sq.mm cross-sectional area cable in 32mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcroSec32}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcroSec32", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FcroSec32Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FcroSec32Remark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                No. of 6 sq.mm cross-sectional area cable in 32mm dia conduit
                (Nos. of cables)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSec32}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSec32", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ScroSec32Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ScroSec32Remark", "dsad")}
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

export default CABLESINACONDUITedit;
