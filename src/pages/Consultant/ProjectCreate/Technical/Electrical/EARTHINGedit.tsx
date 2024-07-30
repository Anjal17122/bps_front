import { Button, Form, Input } from "antd";
import React from "react";
import { submitFailed, NoLblNoReq } from "../../../../../Common/Form/FormData";
import { Earthing } from "../../../../../Services/ElectricalService";

interface Props {
  onSubmit: (val: any) => void;
  data: Earthing;
  edit: boolean;
  submitting: boolean;
}

const EARTHINGedit = ({ onSubmit, data, edit, submitting }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>
                The value any earth system resistance unless otherwise specified
                (ohm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ESres}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ESres", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ESresRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ESresRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Diameter of electrodes of steel of galvanized iron (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.diaIron}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("diaIron", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.diaIronRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("diaIronRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Diameter of electrodes of copper (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.diaCopper}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("diaCopper", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.diaCopperRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("diaCopperRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Internal diameter of pipe electrodes of galvanized iron (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.intDiaGal}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("intDiaGal", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.intDiaGalRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("intDiaGalRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Internal diameter of pipe electrodes of cast iron (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.intDiaCast}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("intDiaCast", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.intDiaCastRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("intDiaCastRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>The B17 length of the rod & pipe electrodes (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.B17}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("B17", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.B17Remark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("B17Remark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Thickness of plate electrodes of galvanized iron or steel (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.thickGal}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("thickGal", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.thickGalRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("thickGalRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Thickness of plate electrodes of copper (mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.thickCop}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("thickCop", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.thickCopRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("thickCopRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Size of plate electrodes or galvanized iron or steel or copper
                (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sizeGal}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sizeGal", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sizeGalRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sizeGalRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Depth of the top edge of plate electrodes buried from ground
                (mm)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depth}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depth", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <Button
            htmlType="submit"
            size="middle"
            loading={submitting}
            type="primary"
            disabled={!edit}
          >
            Edit Form
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EARTHINGedit;
