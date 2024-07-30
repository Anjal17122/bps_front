import {
  Button,
  Empty,
  Input,
  message,
  Popover,
  Select,
  Spin,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import "../../../Assets/scss/Naamsari.scss";
import {
  ChangeConsultantID,
  ProjectsNewDTO,
  SearchProjectById,
  SearchProjectByName,
} from "../../../Services/ChangeConsultantServoce";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const ConsultantChange = () => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<"id" | "name">("id");

  const [projects, setProjects] = useState<ProjectsNewDTO[]>();

  const [consultantID, setConsultant] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onSelect = (val: "id" | "name") => {
    setSelect(val);
  };

  const { Option } = Select;
  const addonBefore = (
    <Select value={select} onChange={onSelect} className="select">
      <Option value="id">Project ID</Option>
      <Option value="name">Applicant Name</Option>
    </Select>
  );
  const onSearch = (val: string) => {
    if (select === "id") {
      SearchProjectById(val, setLoading).then((res) => setProjects(res.data));
    } else {
      SearchProjectByName(val, setLoading).then((res) => setProjects(res.data));
    }
  };

  const onChangeConsultantID = (val: ProjectsNewDTO) => {
    if (!consultantID) {
      messageApi.error("Pls insert Consultant ID");
    } else {
      ChangeConsultantID(val.id, consultantID, setLoading).then(() =>
        messageApi.success("Changed Consultant Successfully!")
      );
    }
  };

  const columns = [
    {
      title: "Project ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Project Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      //   dataIndex: "action",
      key: "action",
      render: (text: ProjectsNewDTO) => (
        <div>
          <Popover
            trigger="click"
            content={
              <div style={{ display: "flex" }}>
                <Input
                  placeholder="New Consultant ID"
                  onChange={(e) => setConsultant(e.target.value)}
                ></Input>
                <Button
                  type="primary"
                  onClick={() => onChangeConsultantID(text)}
                >
                  Submit
                </Button>
              </div>
            }
          >
            <Button type="link">Change ID</Button>
          </Popover>
        </div>
      ),
    },
  ];
  return (
    <div className="Naamsari">
      {contextHolder}
      <PageHeader title="Change Consultant" subTitle="Consultant Naam Sari" />
      <div className="SearchWrapper">
        <Search
          loading={loading}
          size="large"
          addonBefore={addonBefore}
          placeholder="Search Project"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div className="TableWrapper">
        <Spin spinning={loading} tip="Loading...">
          {projects ? (
            <Table
              columns={columns}
              dataSource={projects.map((proj) => ({ ...proj, key: proj.id }))}
            />
          ) : (
            <Empty />
          )}
        </Spin>
      </div>
    </div>
  );
};

export default ConsultantChange;
