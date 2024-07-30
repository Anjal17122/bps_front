import React, { useState } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
// import { useNavigate } from "react-router-dom";
import "../../../Assets/scss/AddAdmin.scss";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  POSTFloorRateBody,
  POSTfloorRate,
} from "../../../Services/SuperAdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

//

const AddFloorRate = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  // const history = useNavigate();
  const onSubmit = (val: {
    areaCategoryId: string;
    buildingCategoryId: string;
    floorId: string;
    rate: string;
  }) => {
    const body: POSTFloorRateBody = {
      areaCategoryId: val.areaCategoryId,
      buildingCategoryId: val.buildingCategoryId,
      floorId: val.floorId,
      rate: val.rate,
    };
    POSTfloorRate(body, messageApi).then(() => {
      form.resetFields();
    });
  };

  return (
    <div className="AddAdminWrap">
      {contextHolder}
      <Form
        form={form}
        className="AddAdmin"
        onFinishFailed={submitFailed}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Add Floor Rate</h1>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("name", "Name")}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("rate", "Rate")}>
              <Input placeholder="Rate" />
            </Form.Item>
          </Col>
        </Row>
        <SubmitBtn />
      </Form>
    </div>
  );
};

export default AddFloorRate;
