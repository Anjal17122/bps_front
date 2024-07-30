import { Form, Input } from "antd";
import React from "react";
import { NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { Staircase } from "../../../../../../Services/ArchitecturalService";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { Staircase } from "../../../../Services/ArchitecturalService";

interface Props {
  // onSubmit: (val: any) => void;
  data: Staircase;
  // edit: boolean;
}

const StaircaseEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>ARCHITECTURAL BUILDING PURPOSE</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bPur}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bPur", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bPurRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bPurRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Min. Tread of Staircase excluding nosing (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minTread}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minTread", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minTreadRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minTreadRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Riser of Staircase (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.riser}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riser", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.riserRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riserRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Clear width of Staircase - Residential (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.clwidStair}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("clwidStair", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.clwidStairRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("clwidStairRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Height of Handrail (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.handrail}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("handrail", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.handrailRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("handrailRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Max. no. of riser per flight (Nos)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxRiser}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxRiser", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxRiserRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxRiserRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Max. head room under staircase from the nosing of the road (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxHeadRoom}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxHeadRoom", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxHeadRoomRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxHeadRoomRemark", "1234")}
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

export default StaircaseEdit;
