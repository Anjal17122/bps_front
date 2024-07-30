import { Button, Table, Tabs, TabsProps, message } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  approveNonPerma,
  approvePerma,
  getByStatus,
  getRequested,
  OrgConsultantBody,
} from "../service/OrganizationConsultant";
import ViewConsultantDetail from "./ViewConsultantDetail";
import PageHeader from "../../../Common/PageHeader/PageHeader";

const OrgConsultantsTabs = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [requestedUnapproved, setRequestedUnapproved] = useState<
    OrgConsultantBody[]
  >([]);
  const [requestedApproved, setRequestedApproved] = useState<
    OrgConsultantBody[]
  >([]);
  const [organizationApproved, setOrganizationApproved] = useState<
    OrgConsultantBody[]
  >([]);

  const [refreshTab, setRefreshTab] = useState<boolean>(false);

  useEffect(() => {
    getRequested(messageApi).then((res) => {
      setRequestedUnapproved(res.data);
    });
    getByStatus("requested", messageApi).then((res) => {
      setRequestedApproved(res.data);
    });
    getByStatus("approved", messageApi).then((res) => {
      setOrganizationApproved(res.data);
    });
  }, [refreshTab]);
  const requested = [
    {
      title: "ID",
      key: "id",
      render: (text: string, record: OrgConsultantBody) => record.consultant.id,
    },
    {
      title: "Name",
      key: "name",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.name,
    },
    {
      title: "Phone NO",
      key: "phoneNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.phoneNo,
    },
    {
      title: "Citizenship No",
      key: "citizenshipNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.citizenshipNo,
    },
    {
      title: "ACTION",
      key: "action",
      render: (text: string, record: OrgConsultantBody) => (
        <>
          <ViewConsultantDetail perma={false} userId={record.consultant.id} />
          <Button
            onClick={() => {
              approveNonPerma(record.id, record.consultant.id, messageApi).then(
                () => {
                  setRefreshTab(!refreshTab);
                }
              );
            }}
          >
            Approve
          </Button>
        </>
      ),
    },
  ];

  const requestedPerma = [
    {
      title: "Id",
      key: "id",
      render: (text: string, record: OrgConsultantBody) => record.consultant.id,
    },
    {
      title: "Name",
      key: "name",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.name,
    },
    {
      title: "Phone NO",
      key: "phoneNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.phoneNo,
    },
    {
      title: "Citizenship No",
      key: "citizenshipNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.citizenshipNo,
    },
    {
      title: "ACTION",
      key: "action",
      render: (text: string, record: OrgConsultantBody) => (
        <>
          <ViewConsultantDetail perma={true} userId={record.consultant.id} />
          <Button
            onClick={() => {
              approvePerma(record.id, record.consultant.id, messageApi).then(
                () => {
                  setRefreshTab(!refreshTab);
                }
              );
            }}
          >
            Approve
          </Button>
        </>
      ),
    },
  ];
  const approved = [
    {
      title: "Id",
      key: "id",
      render: (text: string, record: OrgConsultantBody) => record.consultant.id,
    },
    {
      title: "Name",
      key: "name",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.name,
    },
    {
      title: "Phone NO",
      key: "phoneNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.phoneNo,
    },
    {
      title: "Citizenship No",
      key: "citizenshipNo",
      render: (text: string, record: OrgConsultantBody) =>
        record.consultant.citizenshipNo,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Requested Unapproved",
      children: (
        <Table
          dataSource={requestedUnapproved}
          columns={requested}
          rowKey="id"
        />
      ),
    },
    {
      key: "2",
      label: "Requested Approved",
      children: (
        <Table
          dataSource={requestedApproved}
          columns={requestedPerma}
          rowKey="id"
        />
      ),
    },
    {
      key: "3",
      label: "Our Consultant",
      children: (
        <Table
          dataSource={organizationApproved}
          columns={approved}
          rowKey="id"
        />
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <PageHeader title="Consultants" subTitle="Our Consultants" />

      <div className="CenterForm">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default OrgConsultantsTabs;
