import { Cascader, Form, Input } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  MethodAdopted,
  AdoptedCode,
  Subsoilcategory,
  soiltestreport,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { useState } from "react";

interface Props {
  onSubmit: (val: any) => void;
}

const NBC105 = ({ onSubmit }: Props) => {
  const [adoptedCode, setAdoptedCode] = useState(null); // State to track adopted code

  const handleAdoptedCodeChange = (value: any) => {
    console.log(value);
    setAdoptedCode(value[0]); // Assuming the value is in the first element
  };
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Adopted Code for Seismic Design</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  name="ACSeisDes"
                  rules={[
                    {
                      required: true,
                      message: "Please select an adopted code!",
                    },
                  ]}
                >
                  <Cascader
                    options={AdoptedCode}
                    onChange={handleAdoptedCodeChange}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  name="ACSeisDesRemark"
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Method adopted for earthquake resistant design</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("ERD", "Email1")}
                >
                  <Cascader options={MethodAdopted} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ERDRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td>Subsoil category</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("subsoil", "Email1")}
                >
                  <Cascader options={Subsoilcategory} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("subsoilRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Seismic Weight (W) (in kN)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("seisWinkN", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("seisWinkNRemark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Basic Seismic Coefficient Along X (C)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BSCXC", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BSCXCRemark", "1234")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Basic Seismic Coefficient Along Y (C)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BSCYC", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BSCYCRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Seismic zoning factor (Z)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("SeisZonZ", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("SeisZonZRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Importance Factor (I)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ImpFacI", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ImpFacIRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>

            {/* Conditionally Render Fields Based on Adopted Code */}
            {adoptedCode && adoptedCode === "NBC 105" ? (
              <>
                {/* Fields to be removed when "NBC" is selected */}
                <tr>
                  <td>Building Height in consideration</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="buildingHeight"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="buildingHeightRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Time Period</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="timePeriod"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="timePeriodRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Amplified time period by 1.25</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="amplifiedTimePeriod"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="amplifiedTimePeriodRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Building Type</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="buildingType"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="buildingTypeRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Elastic Site spectra for ULS</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="elasticSiteSpectraULS"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="elasticSiteSpectraULSRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Ductility Factor</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="ductilityFactor"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="ductilityFactorRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Base Shear design coefficient</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="baseShearDesignCoefficient"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="baseShearDesignCoefficientRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Elastic Site spectra for SLS</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="elasticSiteSpectraSLS"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="elasticSiteSpectraSLSRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Overstrength Factor</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="overstrengthFactor"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="overstrengthFactorRemark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Base Shear design coefficient</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      name="baseShearDesignCoefficient2"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      name="baseShearDesignCoefficient2Remark"
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {/* Fields to be displayed when "NBC" is not selected */}
                <tr>
                  <td>
                    Fundamental Time Period of the building along X (Tx) (in
                    Seconds)
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("funTPXTxSec", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("funTPXTxSecRemark", "Email3")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Spectral acceleration coefficient Along X (Sa/g)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("SpecACXSag", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("SpecACXSagRemark", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Design Horizontal Seismic Coefficient Along X (Cd)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesXCd", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesXCdRemark", "Email2")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Design Horizontal Seismic Coefficient Along X (Ah)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesXAh", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesXAhRemark", "Email22")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Spectral acceleration coefficient Along Y (Sa/g)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("SpecACYSag", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("SpecACYSagRemark", "Email3")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Design Horizontal Seismic Coefficient Along Y (Cd)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesYCd", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesYCdRemark", "1234")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Design Horizontal Seismic Coefficient Along Y (Ah)</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesYAh", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("DesYAhRemark", "dsad")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Base Shear(VB) for Seismic Coefficient Along X</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("BaseVBX", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("BaseVBXRemark", "dsad")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Base Shear(VB) for Seismic Coefficient Along Y</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("BaseVBY", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("BaseVBYRemark", "dsad")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Maximum Inter-Storey Drift</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("maxISD", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("maxISDRemark", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>
                    Corresponding Storey height for Maximum Inter-Storey Drift
                    (h)
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("corrMaxISDh", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("corrMaxISDhRemark", "Email2")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Maximum Inter-Storey Drift Ratio</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={0}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("maxISDR", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("maxISDRRemark", "Email22")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>Availability of soil test report</td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...FormReq("soilTest", "Email1")}
                    >
                      <Cascader options={soiltestreport} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("soilTestRemark", "Email3")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <SubmitBtn />
        </div>
      </Form>
    </div>
  );
};

export default NBC105;
