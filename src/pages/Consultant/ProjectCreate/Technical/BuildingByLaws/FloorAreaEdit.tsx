import { useState } from "react";
import { Button, Cascader, Form, Input, InputNumber, message } from "antd";
import { BuildingAreaTyp } from "./ByLawsData";
import RemarksViewBtn from "./RemarksViewBtn";
import {
  FormReq,
  NoLblNoReq,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import ViewRemarks from "../../../../../Components/Consultant/ViewRemarks/ViewRemarks";
import {
  HighTensionTypes,
  NatureOfConst,
  LandUseZone,
  LandUseSubZone,
  HighTensionLine,
} from "../../../../../constants/AllOptions/AllOptionsByLaws";
import { StandardRiverSetbackGokarna } from "../../../../../constants/constants";

interface Props {
  onSubmit: (val: any) => void;
  data: BuildingAreaTyp;
  edit: boolean;
  submitting: boolean;
}

const FloorAreaEdit = ({ onSubmit, data, edit, submitting }: Props) => {
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
                  initialValue={data?.nature}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("nature", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    placeholder="Select"
                    options={NatureOfConst}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.natureRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("natureRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use Zone</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.zone : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("zone", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    placeholder="Select"
                    options={LandUseZone}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.zoneRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("zoneRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use sub zone</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.subzone : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("subzone", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    placeholder="Select"
                    options={LandUseSubZone}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.subzoneRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("subzoneRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Plinth Area (Sqm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.plinthArea}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("plinthArea", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.plinthAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("plinthAreaRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Area (Sqm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingArea}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("buildingArea", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingAreaRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Line Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTClass : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("highTClass", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    placeholder="Select"
                    options={HighTensionLine}
                    onChange={(val: any) => onHighTensionSelect(val)}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTClassRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTClassRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Actual Setback (m)</td>
              <td className="width80">
                <Form.Item>
                  <Form.Item
                    initialValue={data ? data.highTSetback : null}
                    className="NoMarginForm ErrorMsgIn"
                    name="highTSetback"
                  >
                    <InputNumber
                      disabled={!edit}
                      onChange={(val) => setHighTensionVal(val as number)}
                    />
                  </Form.Item>
                  <span style={{ color: "red", fontSize: 12 }}>
                    {highTensionMsg()}
                  </span>
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTSetbackRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTSetbackRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Name Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverClass : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("riverClass", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverClassRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverClassRemark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Bank Actual Setback (m)</td>
              <td
                className="width80"
                style={{ position: "relative", paddingRight: 32 }}
              >
                <Form.Item
                  initialValue={data ? data.riverSetback : null}
                  className="NoMarginForm ErrorMsgIn"
                  name="riverSetback"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <div style={{ position: "absolute", right: "2px", top: "6px" }}>
                  <RemarksViewBtn onclick={openFARremarks} />
                </div>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverSetbackRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverSetbackRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <Form.Item>
            <Button
              htmlType="submit"
              size="middle"
              loading={submitting}
              type="primary"
              disabled={!edit}
            >
              Edit Form
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FloorAreaEdit;
