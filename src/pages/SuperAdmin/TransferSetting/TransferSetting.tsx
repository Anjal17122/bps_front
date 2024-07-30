import { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Col,
  Divider,
  message,
  Popover,
  Row,
  Spin,
} from "antd";
import MyInfoBtn from "../../../Common/InfoIcon/MyInfoBtn";
import { TransferSettingTable } from "./TransferSettingTable";
import {
  ChangeFinalApprover,
  ChangeProjectReceiver,
  ForwardedReceiver,
  GetFinalApprover,
  GetForwardedReceiver,
  GetTransferSetting,
  GetTransferSettingBody,
  PATCHMandatoryApprovals,
  PATCHTransferSetting,
} from "../../../Services/TransferSettingService";
import { sN } from "../../../Services/ProjectService";
import { BaseOptionType } from "antd/lib/cascader";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { SingleValueType } from "../../Consultant/Register/RegisterHelper";

const TransferSetting = () => {
  const [roles, setRoles] = useState<GetTransferSettingBody[]>([]);
  const [receiver, setReceiver] = useState<ForwardedReceiver>();
  const [finalApprover, setFinalApprover] = useState<ForwardedReceiver>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // getAdminsNoSetS(100).then((res) => setAdmins(res.data.adminList));
    GetFinalApprover().then((res) => setFinalApprover(res.data));
    GetForwardedReceiver().then((res) => setReceiver(res.data));
    GetTransferSetting().then((res) => setRoles(res.data));
    return () => {
      // setAdmins([]);
      setRoles([]);
    };
  }, []);

  const options = roles.map((admin) => ({
    value: admin.id,
    label: admin.name,
  }));

  const ProjectReceiver = (val: SingleValueType, objec: BaseOptionType) => {
    ChangeProjectReceiver(val[0], messageApi).then(() =>
      setReceiver({
        id: objec[0].value,
        active: true,
        mandatoryApproval: false,
        name: objec[0].label,
      })
    );
  };

  const changeFinalApproval = (val: SingleValueType, objec: BaseOptionType) => {
    ChangeFinalApprover(val[0], messageApi).then(() => {
      setFinalApprover({
        id: objec[0].value,
        active: true,
        mandatoryApproval: false,
        name: objec[0].label,
      });
      messageApi.success("Changed Successfully!");
    });
  };

  const content = (
    <Cascader options={options} onChange={ProjectReceiver}></Cascader>
  );

  const content2 = (
    <Cascader options={options} onChange={changeFinalApproval}></Cascader>
  );

  const changeStatusTransferSett = (value: boolean, index: number, id: sN) => {
    PATCHTransferSetting(id, messageApi).then(() => {
      const init = [...roles];
      const newRow = { ...init[index], active: value };
      init[index] = newRow;
      setRoles(init);
    });
  };

  const changeStatusMandatory = (value: boolean, index: number, id: sN) => {
    PATCHMandatoryApprovals(id, messageApi).then(() => {
      const init = [...roles];
      const newRow = { ...init[index], mandatoryApproval: value };
      init[index] = newRow;
      setRoles(init);
    });
  };

  return (
    <div style={{ backgroundColor: "#d3d3d3" }}>
      {contextHolder}
      <PageHeader title="Transfer Setting" subTitle="List of Public Holidays" />
      <div
        className="CenterForm"
        style={{
          minHeight: "80vh",
          backgroundColor: "#ebebeb",
        }}
      >
        <h2>Transfer Setting</h2>
        <Row style={{ color: "#899499" }}>
          <Col span={16}>
            Who will receive it first after the consultant forward the project?
          </Col>
          <Col span={4}>{receiver?.name}</Col>
          <Col span={4}>
            <Popover content={content} title={null} trigger="click">
              <Button type="link">Change</Button>
            </Popover>
          </Col>
        </Row>
        <Row style={{ color: "#899499" }}>
          <Col span={16}>Who will finally approve the project?</Col>
          <Col span={4}>{finalApprover?.name}</Col>
          <Col span={4}>
            <Popover content={content2} title={null} trigger="click">
              <Button type="link">Change</Button>
            </Popover>
          </Col>
        </Row>
        <div>
          {roles ? (
            <TransferSettingTable
              data={roles}
              changeActiveStatus={changeStatusTransferSett}
            />
          ) : (
            <Spin />
          )}
        </div>
        <Divider></Divider>
        <div>
          <span style={{ color: "#203346ce", fontWeight: 400, fontSize: 20 }}>
            Mandatory Approval &nbsp;
          </span>
          <MyInfoBtn info="Departments below must approve for final approval" />

          {roles ? (
            <TransferSettingTable
              isMandatory={true}
              data={roles}
              changeActiveStatus={changeStatusMandatory}
            />
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferSetting;
