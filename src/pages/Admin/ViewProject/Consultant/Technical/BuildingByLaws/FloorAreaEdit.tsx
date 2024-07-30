import { Cascader, Form, Input } from "antd";
import {
  NatureOfConst,
  LandUseZone,
  LandUseSubZone,
  HighTensionLine,
} from "../../../../../../constants/AllOptions/AllOptionsByLaws";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { BuildingAreaTyp } from "../../../../../Consultant/ProjectCreate/Technical/BuildingByLaws/ByLawsData";
// import {
//   HighTensionLine,
//   LandUseSubZone,
//   LandUseZone,
//   NatureOfConst,
//   RiverNameClass,
// } from "../../../../Common/AllOptions/AllOptionsByLaws";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";

interface Props {
  data: BuildingAreaTyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}

const FloorAreaEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
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
                    disabled={true}
                    placeholder="Select"
                    options={NatureOfConst}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.natureRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("natureRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use Zone</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.zone : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("zone", "Email")}
                >
                  <Cascader
                    disabled={true}
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Land Use sub zone</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.subzone : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("subzone", "Email")}
                >
                  <Cascader
                    disabled={true}
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
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.plinthAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("plinthAreaRemark", "Email2")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingAreaRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Line Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTClass : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("highTClass", "Email")}
                >
                  <Cascader
                    disabled={true}
                    placeholder="Select"
                    options={HighTensionLine}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTClassRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTClassRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>High Tension Actual Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTSetback : null}
                  className="NoMarginForm ErrorMsgIn"
                  name="highTSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.highTSetbackRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("highTSetbackRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Name Classification (if any)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverClass : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("riverClass", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverClassRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverClassRemark", "1234")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>River Bank Actual Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverSetback : null}
                  className="NoMarginForm ErrorMsgIn"
                  name="riverSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.riverSetbackRemark : null}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("riverSetbackRemark", "dsad")}
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

export default FloorAreaEdit;
