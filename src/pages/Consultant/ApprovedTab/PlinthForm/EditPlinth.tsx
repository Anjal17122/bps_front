import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../Assets/scss/PlinthForm.scss";
// import "../../../Assets/scss/PlinthForm.scss";
import { UploadOutlined } from "@ant-design/icons";
import "../../../../Assets/scss/AddPlinth.scss";
import { ParsedPlinth } from "../../../../Services/ProjectService";
import {
  imgFolders,
  IMG_GET_URL,
  IMG_SAVE_URL,
} from "../../../../Services/Api";
import { editPlinth, PUTplinthReq } from "../../../../Services/PlinthService";
import {
  submitFailed,
  ColHeight,
  InputDateNolblValid,
  NoLabelReq,
  NoLblNoReq,
} from "../../../../Common/Form/FormData";
import { copyImage } from "../../../../Services/AddressService";
import { normFile } from "../../../../constants/antdConstants";
import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";

const EditPlinthForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const params = useParams();
  const pid: string = params.pid ?? "";

  const getItem = localStorage.getItem("plinth") || "{}";
  const allData = JSON.parse(getItem);
  const plinth: ParsedPlinth = {
    ...allData,
    requestForm: JSON.parse(allData.requestForm),
    images: JSON.parse(allData.images),
  };

  const defaultFileList: any = plinth?.images?.map((img, index) => ({
    uid: img.imageUrl,
    name: img.imageName,
    url: IMG_GET_URL + `/${imgFolders.plinth}/${img.imageUrl}`,
    status: "done",
    response: { message: img.imageUrl },
  }));
  const history = useNavigate();

  const onSubmit = (val: any) => {
    const filterImage = { ...val };
    delete filterImage.upload;
    const imagesOnly: {
      imageName: string;
      imageUrl: string;
    }[] = val.upload.map((val: any) => {
      if (val.status === "done") {
        return { imageName: val.name, imageUrl: val.response.message };
      } else {
        return {};
      }
    });
    const body: PUTplinthReq = {
      id: pid,
      projectId: pid,
      requestForm: JSON.stringify(filterImage),
      images: JSON.stringify(imagesOnly),
    };

    copyImageFinal(
      imagesOnly.map((data) => ({
        fileName: data.imageUrl,
        dir: imgFolders.plinth,
      })),
      messageApi
    ).then(() => {
      editPlinth(body, messageApi).then(() =>
        setTimeout(() => {
          history(-1);
        }, 500)
      );
    });
  };
  return (
    <div className="AddPlinth">
      {contextHolder}
      <div className="HeadBar">
        <div></div>
        <h1>
          <span className="title">Edit Plinth Data</span>
        </h1>

        <div></div>
      </div>
      <div className="PlinthForm">
        <Form size="middle" onFinish={onSubmit} onFinishFailed={submitFailed}>
          <div className="PlinthUploadDiv">
            <Row>
              <Col {...ColHeight(8)} className="divCol">
                <h2>Plinth Documents:</h2>
                <span style={{ marginBottom: 10 }}>
                  Photographs of all details are required to be uploaded.
                </span>
                <Form.Item
                  className="uploadDiv"
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  initialValue={[...defaultFileList]}
                >
                  <Upload
                    name="file"
                    action={IMG_SAVE_URL}
                    // defaultFileList={}
                  >
                    <Button size="large" icon={<UploadOutlined />}>
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col {...ColHeight(8)} className="divCol">
                <Form.Item
                  {...InputDateNolblValid("date")}
                  initialValue={plinth.requestForm.date}
                >
                  <Input placeholder="Date: YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                  {...NoLabelReq("deignersName", "Designer's Name")}
                  initialValue={plinth.requestForm.deignersName}
                >
                  <Input placeholder="Designer's Name" />
                </Form.Item>
                <Form.Item
                  {...NoLabelReq("cmRegdNo", "CM Regd No")}
                  initialValue={plinth.requestForm.cmRegdNo}
                >
                  <Input placeholder="CM Regd No" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(8)} className="divCol">
                <Form.Item
                  {...NoLabelReq("consultancyName", "Consultancy Name")}
                  initialValue={plinth.requestForm.consultancyName}
                >
                  <Input placeholder="Consultancy Name" />
                </Form.Item>
                <Form.Item
                  {...NoLabelReq("remarks", "Remarks/Conclusion")}
                  initialValue={plinth.requestForm.remarks}
                >
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
                      initialValue={plinth.requestForm.sizeColPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeColYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeColRemarks}
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
                      initialValue={plinth.requestForm.sizeReinfPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinfYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinfRemarks}
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
                      initialValue={plinth.requestForm.noReinfPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noReinfYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noReinfRemarks}
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
                      initialValue={plinth.requestForm.splicePosPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePosYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePosRemarks}
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
                      initialValue={plinth.requestForm.sizeStirPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStirYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStirRemarks}
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
                      initialValue={plinth.requestForm.spacStirPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirRemarks}
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
                      initialValue={plinth.requestForm.beamJuncPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJuncYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJuncRemarks}
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
                      initialValue={plinth.requestForm.verticalBandPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("verticalBandYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.verticalBandRemarks}
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
                      initialValue={plinth.requestForm.clearCoverPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCoverYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCoverRemarks}
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
                      initialValue={plinth.requestForm.sizeBeamsPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeBeamsYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeBeamsRemarks}
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
                      initialValue={plinth.requestForm.sizeReinf2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf2Remarks}
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
                      initialValue={plinth.requestForm.noRein2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("noRein2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.noRein2Remarks}
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
                      initialValue={plinth.requestForm.splicePos2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos2Remarks}
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
                      initialValue={plinth.requestForm.sizeStir2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeStir2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeStir2Remarks}
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
                      initialValue={plinth.requestForm.spacStirr2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacStirr2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacStirr2Remarks}
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
                      initialValue={plinth.requestForm.beamJunc2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("beamJunc2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.beamJunc2Remarks}
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
                      initialValue={plinth.requestForm.clearCover2Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover2YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover2Remarks}
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
                      initialValue={plinth.requestForm.saOfSlabPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("saOfSlabYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.saOfSlabRemarks}
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
                      initialValue={plinth.requestForm.thicknessSlabPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("thicknessSlabYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.thicknessSlabRemarks}
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
                      initialValue={plinth.requestForm.sizeReinf3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeReinf3YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeReinf3Remarks}
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
                      initialValue={plinth.requestForm.spacReinf3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("spacReinf3YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.spacReinf3Remarks}
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
                      initialValue={plinth.requestForm.topBotReinPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("topBotReinYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.topBotReinRemarks}
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
                      initialValue={plinth.requestForm.splicePos3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("splicePos3YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.splicePos3Remarks}
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
                      initialValue={plinth.requestForm.clearCover3Permitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3Permitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3OnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3OnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3YesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("clearCover3YesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.clearCover3Remarks}
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
                      initialValue={plinth.requestForm.setBacksPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("setBacksYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.setBacksRemarks}
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
                      initialValue={plinth.requestForm.sizeOfBuildPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("sizeOfBuildYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.sizeOfBuildRemarks}
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
                      initialValue={plinth.requestForm.lengthPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("lengthYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.lengthRemarks}
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
                      initialValue={plinth.requestForm.breadthPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("breadthYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.breadthRemarks}
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
                      initialValue={plinth.requestForm.septicTankPermitted}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankPermitted", "Email1")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankOnSite}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankOnSite", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankYesNo}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankYesNo", "Email")}
                    >
                      <Input />
                    </Form.Item>
                  </td>
                  <td className="width80">
                    <Form.Item
                      initialValue={plinth.requestForm.septicTankRemarks}
                      className="NoMarginForm ErrorMsgIn"
                      {...NoLblNoReq("septicTankRemarks", "Email")}
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
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPlinthForm;
