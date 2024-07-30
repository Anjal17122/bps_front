import { useState } from "react";
import { Button, Cascader, Form, Input, InputNumber, message } from "antd";
import {
  NoLblNoReq,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import {
  HighTensionTypes,
  NatureOfConst,
  LandUseZone,
  LandUseSubZone,
  HighTensionLine,
} from "../../../../../constants/AllOptions/AllOptionsByLaws";
import { StandardRiverSetbackGokarna } from "../../../../../constants/constants";
import RemarksViewBtn from "./RemarksViewBtn";
import ViewRemarks from "../../../../../Components/Consultant/ViewRemarks/ViewRemarks";

interface Props {
  onSubmit: (val: any) => void;
  submitting: boolean;
}

const FloorAreaCreate = ({ onSubmit, submitting }: Props) => {
  const [highTension, setHighTension] = useState<HighTensionTypes>();
  const [HighTensionVal, setHighTensionVal] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const onHighTensionSelect = (val: HighTensionTypes[]) => {
    setHighTension(val[0]);
  };

  const highTensionMsg = (): string | null => {
    if (
      highTension === "250/240 Volts - 11000 Volts" &&
      HighTensionVal < 1.25
    ) {
      return "Must be more than or equal to " + 1.25;
    } else if (
      highTension === "11000 Volts - 33000 Volts" &&
      HighTensionVal < 1.5
    ) {
      return "Must be more than or equal to " + 1.5;
    } else if (
      highTension === "33000 Volts - 66000 Volts" &&
      HighTensionVal < 2
    ) {
      return "Must be more than or equal to " + 2;
    } else if (
      highTension === "66000 Volts - 132000 Volts" &&
      HighTensionVal < 6
    ) {
      return "Must be more than or equal to " + 6;
    } else {
      return null;
    }
  };

  const [remarks, setOpenRemarks] = useState(false);

  const openFARremarks = () => {
    setOpenRemarks(!remarks);
  };

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <ViewRemarks
        isOpen={remarks}
        onModalClose={openFARremarks}
        title={"River Setback Standard"}
        data={StandardRiverSetbackGokarna}
      />
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="small"
        onFinish={(val) => {
          if (highTensionMsg()) {
            return messageApi.error("High Tension Setback" + highTensionMsg());
          }
          onSubmit(val);
        }}
      >
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Nature of construction</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("nature", "Email1")}
                >
                  <Cascader placeholder="Select" options={NatureOfConst} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("natureRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use Zone</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("zone", "Email1")}
                >
                  <Cascader placeholder="Select" options={LandUseZone} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("zoneRemark", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use sub zone</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("subzone", "Email1")}
                >
                  <Cascader placeholder="Select" options={LandUseSubZone} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("subzoneRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Plinth Area (Sqm)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("plinthArea", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("plinthAreaRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Area (Sqm)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingArea", "Email1")}
                >
                  <InputNumber />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingAreaRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Line Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTClass", "Email1")}
                >
                  <Cascader
                    placeholder="Select"
                    options={HighTensionLine}
                    onChange={(val: any) => onHighTensionSelect(val)}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTClassRemark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Actual Setback (m)</td>
              <td className="width80">
                <Form.Item
                  style={{ margin: 0 }}
                  initialValue={0}
                  className=""
                  name="highTSetback"
                  // {...NoLblNoReq("highTSetback", "Email22")}
                >
                  <InputNumber
                    placeholder="in Meter"
                    onChange={(val) => setHighTensionVal(val as number)}
                  />
                  {/* {HighTensionVal} */}
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTSetbackRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Name Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverClass", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverClassRemark", "1234")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Bank Actual Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="riverSetback"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverSetbackRemark", "dsad")}
                >
                  <Input />
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
          >
            Submit Form
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FloorAreaCreate;
