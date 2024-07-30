import { Button, Cascader, Form, Input } from "antd";
import React from "react";
import {
  submitFailed,
  NoLblNoReq,
  FormReq,
} from "../../../../../Common/Form/FormData";
import { ShutterOpening } from "../../../../../constants/AllOptions/AllOptionsArchitectural";
import { Exit } from "../../../../../Services/ArchitecturalService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: Exit;
  edit: boolean;
}

const ExitEdit = ({ onSubmit, data, edit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Max. travel distance to exit point in each floor (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxTravel}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxTravel", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.maxTravelRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("maxTravelRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Min. width of exit door including frame (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minWidthExit}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minWidthExit", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minWidthExitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minWidthExitRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Min. Height of exit door including frame (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minHExit}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minHExit", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minHExitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minHExitRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Shutter opening of exit door to staircase & public passage
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.shutterOpen}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("shutterOpen", "Email1")}
                >
                  <Cascader options={ShutterOpening} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.shutterOpenRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("shutterOpenRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Total width of exit door (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widExit}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widExit", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widExitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widExitRemark", "Email3")}
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

export default ExitEdit;
