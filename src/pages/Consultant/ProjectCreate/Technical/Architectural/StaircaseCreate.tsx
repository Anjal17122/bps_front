import { Button, Form, Input } from "antd";
import React from "react";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { ProjectOnly } from "../../../../../Services/TechnicalService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  project?: ProjectOnly;
}

const StaircaseCreate = ({ onSubmit, project }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            {project ? (
              <tr>
                <td>ARCHITECTURAL BUILDING PURPOSE</td>
                <td className="width80">
                  <Form.Item
                    initialValue={project?.type}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("bPur", "email")}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("bPurRemark", "email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
            ) : null}
            <tr>
              <td>Min. Tread of Staircase excluding nosing (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minTread", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minTreadRemark", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Riser of Staircase (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riser", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riserRemark", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Clear width of Staircase - Residential (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("clwidStair", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("clwidStairRemark", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Height of Handrail (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("handrail", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("handrailRemark", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Max. no. of riser per flight (Nos)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxRiser", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxRiserRemark", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Max. head room under staircase from the nosing of the road (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxHeadRoom", "email")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxHeadRoomRemark", "email")}
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

export default StaircaseCreate;
