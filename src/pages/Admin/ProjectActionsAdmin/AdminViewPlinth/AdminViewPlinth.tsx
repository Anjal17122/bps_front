import { Button, Col, Form, Input, Row, Upload } from "antd";
import React, { useEffect } from "react";
import {
  ColHeight,
  InputDateNolblValid,
  NoLabelReq,
  NoLblNoReq,
} from "../../../../Common/Form/FormData";
import { UploadOutlined } from "@ant-design/icons";
import { IMG_SAVE_URL } from "../../../../Services/Api";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../Consultant/PlinthForm/PlinthForm.scss";
import { useNavigate } from "react-router-dom";
import { normFile } from "../../../../constants/antdConstants";

const AdminViewPlinth = () => {
  useEffect(() => {
    return () => {};
  }, []);

  const history = useNavigate();

  return (
    <div>
      <>
        <div className="HeadBar">
          <div className="HeaderFirstDiv">
            <Button
              size="small"
              className="GoBackPlinthBtn"
              icon={<ArrowLeftOutlined />}
              onClick={() => history(-1)}
            >
              Go Back
            </Button>
            <span>&nbsp; Project ID: 1396</span>
          </div>
          <h1>
            <span className="title">Submitted Plinth Data</span>
          </h1>

          <div></div>
        </div>
      </>
      <Form size="middle">
        <div className="PlinthUploadDiv">
          <Row>
            <Col {...ColHeight(8)} className="divCol">
              <h2>Upload Plinth Documents:</h2>
              <span style={{ marginBottom: 10 }}>
                Photographs of all details are required to be uploaded.
              </span>
              <Form.Item
                className="uploadDiv"
                name="upload"
                // label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="file" action={IMG_SAVE_URL}>
                  <Button size="large" icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col {...ColHeight(8)} className="divCol">
              <Form.Item {...InputDateNolblValid("date")}>
                <Input placeholder="Date: YYYY-MM-DD" />
              </Form.Item>
              <Form.Item {...NoLabelReq("deignersName", "Designer's Name")}>
                <Input placeholder="Designer's Name" />
              </Form.Item>
              <Form.Item {...NoLabelReq("cmRegdNo", "CM Regd No")}>
                <Input placeholder="CM Regd No" />
              </Form.Item>
            </Col>
            <Col {...ColHeight(8)} className="divCol">
              <Form.Item {...NoLabelReq("consultancyName", "Consultancy Name")}>
                <Input placeholder="Consultancy Name" />
              </Form.Item>
              <Form.Item {...NoLabelReq("remarks", "Remarks/Conclusion")}>
                <Input.TextArea rows={4} placeholder="Remarks/Conclusion" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div></div>
        <div className="MyTableOuter">
          <table className="MyTable">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Description</th>
                <th>As per permitted drawing</th>
                <th>As per construction on site</th>
                <th>
                  Construction on the site as per permitted drawing Yes/No
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="TableHeading111">
                <td>1</td>
                <td colSpan={5}>Columns/ Wall</td>
              </tr>
              <tr>
                <td>1.1</td>
                <td>Size of Columns</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeColPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeColOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeColYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeColRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.2</td>
                <td>Size of Reinforcements</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinfPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinfOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinfYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinfRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.3</td>
                <td>Number of Reinforcements</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noReinfPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noReinfOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noReinfYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noReinfRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.4</td>
                <td>Splice Position</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePosPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePosOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePosYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePosRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.5</td>
                <td>Size of Stirrups</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStirPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStirOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStirYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStirRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.6</td>
                <td>Spacing of Stirrups</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.7</td>
                <td>Column Beam Junction Detailing</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJuncPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJuncOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJuncYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJuncRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.8</td>
                <td>Vertical and Horizontal Bands</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("verticalBandPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("verticalBandOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("verticalBandYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("verticalBandRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>1.9</td>
                <td>Clear Cover</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCoverPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCoverOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCoverYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCoverRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr className="TableHeading111">
                <td>2</td>
                <td colSpan={5}>Beams</td>
              </tr>
              <tr>
                <td>2.1</td>
                <td>Size of Beams</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeBeamsPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeBeamsOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeBeamsYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeBeamsRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.2</td>
                <td>Size of Reinforcement</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.3</td>
                <td>Number of Reinforcements</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noRein2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noRein2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noRein2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("noRein2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>

              <tr>
                <td>2.4</td>
                <td>Splice Positions</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.5</td>
                <td>Size of Stirrups</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStir2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStir2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStir2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeStir2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.6</td>
                <td>Spacing of Stirrups</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirr2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirr2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirr2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacStirr2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.7</td>
                <td>Beam Beam Junction Detailling</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJunc2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJunc2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJunc2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("beamJunc2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>2.8</td>
                <td>Clear Cover</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover2Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover2OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover2YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover2Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr className="TableHeading111">
                <td>3</td>
                <td colSpan={5}>Slab/Staircase</td>
              </tr>
              <tr>
                <td>3.1</td>
                <td>Size/Area of Slab</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("saOfSlabPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("saOfSlabOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("saOfSlabYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("saOfSlabRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.2</td>
                <td>Thickness of Slab</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("thicknessSlabPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("thicknessSlabOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("thicknessSlabYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("thicknessSlabRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.3</td>
                <td>Size of Reinforcements</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf3Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf3OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf3YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeReinf3Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.4</td>
                <td>Spacing of Reinforcements</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacReinf3Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacReinf3OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacReinf3YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("spacReinf3Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.5</td>
                <td>Position of top/bottom Reinforcement</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("topBotReinPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("topBotReinOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("topBotReinYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("topBotReinRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.6</td>
                <td>Splice Position</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos3Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos3OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos3YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("splicePos3Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>3.7</td>
                <td>Clear Cover</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover3Permitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover3OnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover3YesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("clearCover3Remarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr className="TableHeading111">
                <td>4</td>
                <td colSpan={5}>Building By-Laws</td>
              </tr>
              <tr>
                <td>4.1</td>
                <td>Set-backs</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("setBacksPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("setBacksOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("setBacksYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("setBacksRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>4.2</td>
                <td>Size of Building</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeOfBuildPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeOfBuildOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeOfBuildYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("sizeOfBuildRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Length</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("lengthPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("lengthOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("lengthYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("lengthRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Breadth</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("breadthPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("breadthOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("breadthYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("breadthRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>4.3</td>
                <td>Septic Tank Soak Pit</td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("septicTankPermitted", "Email1")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("septicTankOnSite", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("septicTankYesNo", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
                <td className="width80">
                  <Form.Item
                    initialValue={0}
                    className="NoMarginForm ErrorMsgIn"
                    {...NoLblNoReq("septicTankRemarks", "Email")}
                  >
                    <Input />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Form>
    </div>
  );
};

export default AdminViewPlinth;
