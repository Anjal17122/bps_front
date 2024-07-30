import { Row, Col, Button } from "antd";
import React from "react";
import { ColHeight } from "../../Common/Form/FormData";
import TableButton from "../../Common/TableButton/TableButton";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import MyTable from "../../Common/Table/Table";
import MyAvatar from "../Common/Avatar/Avatar";
const OrgDetail = () => {
  return (
    <div className="CenterForm">
      <Row justify="space-between">
        <Col {...ColHeight(10)}>
          <div className="flexRow">
            <MyAvatar />
            <div className="flexColEnd paddingLeft20">
              <h2>Ram Kumar Shrestha</h2>
              <p>
                <b>Email:</b> thisistestemail@gmail.com
              </p>
              <p>
                <b>Phone: </b> 9803146768
              </p>
            </div>
          </div>
        </Col>
        <Col {...ColHeight(10)}>
          <div className="flexSpaceB ">
            <TableButton bgColor="green">Enable</TableButton>{" "}
            <div>
              {/* <Button type="primary" icon={<SaveOutlined />} /> */}
              <Button type="primary" icon={<EditOutlined />} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col {...ColHeight(24)}>
          <div className="flexSpaceB paddingTop">
            <Button type="primary" icon={<EyeOutlined />}>
              View NEC Certificate
            </Button>
            <Button type="primary" icon={<EyeOutlined />}>
              View PAN Document
            </Button>
            <Button type="primary" icon={<EyeOutlined />}>
              View Tax Clearance
            </Button>
            <Button type="primary" icon={<EyeOutlined />}>
              View Application
            </Button>
          </div>
        </Col>
        <Col {...ColHeight(18)} className="paddingTop">
          <div className="PurpleCard">
            <h2>Address</h2>
            <Row>
              <Col {...ColHeight(12)}>
                <p>
                  <b>State:</b> Gandaki
                </p>
                <p>
                  <b>District:</b> Gandaki
                </p>
                <p>
                  <b>Municipality:</b> Gandaki
                </p>
              </Col>
              <Col {...ColHeight(12)}>
                <p>
                  <b>Ward:</b> Gandaki
                </p>
                <p>
                  <b>Tole:</b> Gandaki
                </p>
                {/* <p>
                  <b>State:</b> Gandaki
                </p> */}
              </Col>
            </Row>
          </div>
        </Col>
        <Col {...ColHeight(24)}>
          <MyTable />
        </Col>
      </Row>
    </div>
  );
};

export default OrgDetail;
