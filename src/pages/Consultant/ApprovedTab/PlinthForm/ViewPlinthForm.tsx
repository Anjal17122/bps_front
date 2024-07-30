import { Button, Col, Form, Image, Input, Row, Upload, message } from "antd";
import "../../../../Assets/scss/PlinthForm.scss";
import { UploadOutlined } from "@ant-design/icons";

import "../../../../Assets/scss/AddPlinth.scss";
import {
  submitFailed,
  ColHeight,
  InputDateValid,
  NoLblNoReq,
  FormProps,
} from "../../../../Common/Form/FormData";
import {
  PDF_URL,
  imgFolders,
  IMG_GET_URL,
  IMG_SAVE_URL,
} from "../../../../Services/Api";
import { ParsedPlinth } from "../../../../Services/ProjectService";
import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";
import TableButton from "../../../../Common/TableButton/TableButton";
import RequestCorrectionModal from "./RequestCorrectionModal";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GETrequestCorrectionByPid,
  POSTrequestCorrectionBody,
  ReqCorrectionByPidBody,
} from "../../../../Services/RequestCorrectionService";
import { approvePlinth } from "../../../../Services/PlinthService";
import { normFile } from "../../../../constants/antdConstants";

const ViewPlinthForm = () => {
  const params = useParams();

  const getItem = localStorage.getItem("plinth") || "{}";
  const allData = JSON.parse(getItem);
  const plinth: ParsedPlinth = {
    ...allData,
    requestForm: JSON.parse(allData.requestForm),
    images: JSON.parse(allData.images),
  };
  const [messageApi, contextHolder] = message.useMessage();
  const defaultFileList = plinth?.images?.map((img) => ({
    uid: img.imageUrl,
    name: img.imageName,
    url: checkIfPDF(img?.imageUrl || "")
      ? PDF_URL + `/${imgFolders.plinth}/${img.imageUrl}`
      : IMG_GET_URL + `/${imgFolders.plinth}/${img.imageUrl}`,
    status: "done",
    response: { message: img.imageUrl },
  }));

  const [ReqCorrectionModalIsOpen, setReqCorrectionModalIsOpen] =
    useState(false);

  const [remarksReqCorrection, setRemarksReqCorrection] =
    useState<ReqCorrectionByPidBody[]>();

  const onComment = () => {
    GETrequestCorrectionByPid(params.pid ?? "0").then((res) => {
      setRemarksReqCorrection(res.data);
      setReqCorrectionModalIsOpen(true);
    });
  };

  const RequestCorrectionSuccess = (resBOdy: POSTrequestCorrectionBody) => {
    approvePlinth(
      "CORRECTION_REQUESTED",
      parseInt(params.pid ?? "0"),
      messageApi
    );
    setRemarksReqCorrection([...(remarksReqCorrection ?? []), resBOdy]);
  };

  const location = useLocation();
  location.pathname;
  return (
    <div className="AddPlinth">
      {contextHolder}
      <RequestCorrectionModal
        RequestCorrectionSuccess={RequestCorrectionSuccess}
        remarksReqCorrection={remarksReqCorrection}
        isVisible={ReqCorrectionModalIsOpen}
        onClose={() => {
          setReqCorrectionModalIsOpen(false);
        }}
        projectId={params.pid ?? "0"}
        type={"Plinth"}
      />

      {/* {ifCon() ? null : <AdPlinthFooter pid={match.params.pid} />} */}
      <div className="HeadBar">
        <div></div>
        <h1>
          <span className="title">View Plinth Data</span>
        </h1>

        <div></div>
      </div>
      <div className="PlinthForm">
        <Form size="middle" layout="vertical" onFinishFailed={submitFailed}>
          <div className="PlinthUploadDiv" style={{ paddingTop: 10 }}>
            {location.pathname.includes("admin") ? (
              <div
                style={{
                  textAlign: "center",
                  background: "#E5E4E2",
                  padding: "10px 20px",
                  marginBottom: 10,
                }}
              >
                <TableButton bgColor="yellow" onClick={onComment}>
                  Comment
                </TableButton>
              </div>
            ) : null}
            <Row>
              <Col {...ColHeight(8)} className="divCol">
                <h2>Plinth Documents:</h2>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {defaultFileList.map((file: { url: string | undefined }) => (
                    <Image src={file.url} width={50} height={50} />
                  ))}
                </div>

                {/* <Form.Item
                  className="uploadDiv"
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  initialValue={[...defaultFileList]}
                >
                  <Upload
                    listType="picture-card"
                    disabled
                    name="file"
                    action={IMG_SAVE_URL}
                  >
                    <Button disabled size="small" icon={<UploadOutlined />}>
                      Upload
                    </Button>
                  </Upload>
                </Form.Item> */}
              </Col>
              <Col {...ColHeight(8)} className="divCol">
                <Form.Item
                  {...InputDateValid("date", "Date")}
                  initialValue={plinth.requestForm.date}
                >
                  <Input disabled={true} placeholder="Date: YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                  {...FormProps("deignersName", "Designer's Name")}
                  initialValue={plinth.requestForm.deignersName}
                >
                  <Input disabled={true} placeholder="Designer's Name" />
                </Form.Item>
                <Form.Item
                  {...FormProps("cmRegdNo", "CM Regd No")}
                  initialValue={plinth.requestForm.cmRegdNo}
                >
                  <Input disabled={true} placeholder="CM Regd No" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(8)} className="divCol">
                <Form.Item
                  {...FormProps("consultancyName", "Consultancy Name")}
                  initialValue={plinth.requestForm.consultancyName}
                >
                  <Input disabled={true} placeholder="Consultancy Name" />
                </Form.Item>
                <Form.Item
                  {...FormProps("remarks", "Remarks/Conclusion")}
                  initialValue={plinth.requestForm.remarks}
                >
                  <Input.TextArea
                    disabled={true}
                    rows={4}
                    placeholder="Remarks/Conclusion"
                  />
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
                      initialValue={plinth.requestForm.sizeColPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.2</td>
                  <td>Size of Reinforcements</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.3</td>
                  <td>Number of Reinforcements</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.4</td>
                  <td>Splice Position</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.5</td>
                  <td>Size of Stirrups</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.6</td>
                  <td>Spacing of Stirrups</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.7</td>
                  <td>Column Beam Junction Detailing</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.8</td>
                  <td>Vertical and Horizontal Bands</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>1.9</td>
                  <td>Clear Cover</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverRemarks", "Email")}
                    >
                      <Input disabled={true} />
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
                      initialValue={plinth.requestForm.sizeBeamsPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.2</td>
                  <td>Size of Reinforcement</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.3</td>
                  <td>Number of Reinforcements</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>

                <tr>
                  <td>2.4</td>
                  <td>Splice Positions</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.5</td>
                  <td>Size of Stirrups</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.6</td>
                  <td>Spacing of Stirrups</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.7</td>
                  <td>Beam Beam Junction Detailling</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>2.8</td>
                  <td>Clear Cover</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2Remarks", "Email")}
                    >
                      <Input disabled={true} />
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
                      initialValue={plinth.requestForm.saOfSlabPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.2</td>
                  <td>Thickness of Slab</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.3</td>
                  <td>Size of Reinforcements</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.4</td>
                  <td>Spacing of Reinforcements</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.5</td>
                  <td>Position of top/bottom Reinforcement</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.6</td>
                  <td>Splice Position</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3Remarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>3.7</td>
                  <td>Clear Cover</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3Permitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3OnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3YesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3Remarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3Remarks", "Email")}
                    >
                      <Input disabled={true} />
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
                      initialValue={plinth.requestForm.setBacksPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>4.2</td>
                  <td>Size of Building</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>Length</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>Breadth</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td>4.3</td>
                  <td>Septic Tank Soak Pit</td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankPermitted", "Email1")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankOnSite", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankYesNo", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankRemarks", "Email")}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewPlinthForm;
