import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import "../../../../Assets/scss/AddSuperStructure.scss";
import {
  FormProps,
  NoLblNoReq,
  submitFailedFinal,
} from "../../../../Common/Form/FormData";
import { imgFolders, IMG_SAVE_URL } from "../../../../Services/Api";
import { POSTplinthReq, postSuperSt } from "../../../../Services/PlinthService";
import { useParams } from "react-router-dom";

import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";
import ConBuilidngFloor from "./ConBuilidingFloor";
import { useEffect, useState } from "react";
import {
  BuildingReportPdfDataType,
  editBuildingCompletionReport,
  getBuildingCompletionReportDataByProjectId,
  saveBuildingCompletionReport,
} from "../../../common/FinalPDF/DhulikhelBuildingCompletionReport/BuildingCompletionReportService";

const EditBuildingReport = () => {
  const params = useParams();
  const pid = params.pid ?? "";
  const [messageApi, contextHolder] = message.useMessage();
  const [floor, setFloor] = useState("");
  const [form] = Form.useForm();
  const [buildingReportData, setBuildingReportData] = useState<
    BuildingReportPdfDataType | undefined
  >(undefined);
  useEffect(() => {
    getBuildingCompletionReportDataByProjectId(pid, messageApi).then((res) => {
      form.setFieldsValue(res.data);
      setBuildingReportData(res.data);
    });
  }, []);

  const onSubmit = (val: BuildingReportPdfDataType) => {
    if (floor == "") {
      message.error("Floor Not added");
      return;
    }
    const fullData: BuildingReportPdfDataType = {
      ...val,
      projectId: pid,
      floorDetail: floor,
    };
    console.log(fullData);
    editBuildingCompletionReport(fullData, messageApi).then((res) => {
      console.log(res);
    });
    console.log(fullData);
  };

  return (
    <div>
      {contextHolder}
      <div>
        <div className="HeadBar">
          <div></div>
          <h1>
            <span className="title">Edit Nirmansampanna Report</span>
          </h1>
          <div></div>
        </div>
        <div className="AddSuperStructure">
          <Form
            form={form}
            onFinishFailed={(err) => console.error("Submit Failed:", err)}
            size="middle"
            layout="vertical"
            onFinish={onSubmit}
            style={{
              boxShadow: "0 1px 4px rgba(0, 21, 41, 0.25)",
              backgroundColor: "white",
              paddingTop: "20px",
              padding: "20px",
              margin: "1% 0",
            }}
          >
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("landOwnerName", "Land Owner Name")}>
                  <Input placeholder="Land Owner Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("houseOwnerName", "House Owner Name")}>
                  <Input placeholder="House Owner Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("buildingPurpose", "Building Purpose")}
                >
                  <Input placeholder="Building Purpose" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("address", "Address")}>
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("plotAreaRopani", "Plot Area (Ropani)")}
                >
                  <Input placeholder="Plot Area (Ropani)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("plotAreaSqFt", "Plot Area (SqFt)")}>
                  <Input placeholder="Plot Area (SqFt)" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("zone", "Zone")}>
                  <Input placeholder="Zone" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("far", "FAR")}>
                  <Input placeholder="FAR" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("designerName", "Designer Name")}>
                  <Input placeholder="Designer Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("classs", "Class")}>
                  <Input placeholder="Class" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("groundCoverateP", "Ground Coverate %")}
                >
                  <Input placeholder="Ground Coverate %" type="number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("groundCoverageSqFt", "Ground Coverage (SqFt)")}
                >
                  <Input placeholder="Ground Coverage (SqFt)" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              {/* <h1>{buildingReportData?.floorDetail}</h1> */}
              <ConBuilidngFloor setFloorData={setFloor} />
            </Row>
            <Row>
              <div
                className="MyTableOuter"
                style={{ width: "100%", marginBottom: "50px" }}
              >
                <table className="MyTable">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Coordinate</th>
                      <th>Distance According To Map</th>
                      <th>Distance Actual In Site</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>R.O.W</td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("rowMap", "map")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("row", "site")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("rowRemarks", "remarks")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Setback</td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("setBackMap", "map")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("setBack", "site")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("setBackRemarks", "remarks")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>River Bank</td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("riverBankMap", "map")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("riverBank", "site")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("riverBankRemarks", "remarks")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>K V Electric Line</td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("electricLineMap", "map")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          initialValue={0}
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("electricLine", "site")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                      <td className="width80">
                        <Form.Item
                          className="NoMarginForm ErrorMsgIn"
                          {...NoLblNoReq("electricLineRemarks", "remarks")}
                        >
                          <Input />
                        </Form.Item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("totalFloorArea", "Total Floor Area")}>
                  <Input placeholder="Total Floor Area" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("floorAreaDifference", "Floor Area Difference")}
                >
                  <Input placeholder="Floor Area Difference" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("permissibleArea", "Permissible Area")}
                >
                  <Input placeholder="Permissible Area" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps("actualFloorArea", "Actual Floor Area")}
                >
                  <Input placeholder="Actual Floor Area" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  {...FormProps(
                    "permissibleBuildingHeight",
                    "Permissible Building Height"
                  )}
                >
                  <Input placeholder="Permissible Building Height" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("plinthArea", "Plinth Area")}>
                  <Input placeholder="Plinth Area" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("storey", "Storey")}>
                  <Input placeholder="Storey" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("buildingHeight", "Building Height")}>
                  <Input placeholder="Building Height" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("plotNo", "Plot No")}>
                  <Input placeholder="Plot No" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item {...FormProps("regdNo", "Regd. No")}>
                  <Input placeholder="Regd. No" />
                </Form.Item>
              </Col>
            </Row>
            <div className="formSubmitDiv">
              <SubmitBtn />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBuildingReport;
