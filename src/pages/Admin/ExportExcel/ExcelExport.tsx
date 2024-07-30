import { Col, Radio, Row, Spin, Table, message } from "antd";
import { useState } from "react";
import "../../../Assets/scss/Naamsari.scss";
import { Button } from "antd";
import "../../../Assets/scss/ExcelExport.scss";
import { Divider } from "antd";
import dayjs from "dayjs";
import { ColHeight } from "../../../Common/Form/FormData";
import {
  ExcelSort,
  ExcelTable,
  GETExcelData,
  GETExcelDataUnapproved,
} from "../../../Services/ExportExcel";
import * as XLSX from "xlsx";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { RadioChangeEvent } from "antd/lib/radio";
import { DatePicker } from "antd";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

const ExcelExport = () => {
  const [projects, setProjects] = useState<ExcelTable[]>();

  const [messageApi, contextHolder] = message.useMessage();

  const [radio, setRadio] = useState<ExcelSort>("ALL");
  const [dateRange, setDateRange] = useState<string[]>([]);

  const { disabled } = useStoreGlobal();

  const columns = [
    {
      title: "S.N.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantNameEng",
      key: "applicantNameEng",
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Submitted Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Kitta No",
      dataIndex: "kittaNo",
      key: "kittaNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onSearch = () => {
    console.log(typeof dateRange);

    if (dateRange.length !== 2) {
      messageApi.info("Please select Date!");
    } else if (
      typeof dateRange[0] !== "string" ||
      typeof dateRange[1] !== "string"
    ) {
      messageApi.info("Please select Both Dates!");
    } else {
      if (radio === "UNAPPROVED") {
        GETExcelDataUnapproved(dateRange[0], dateRange[1], messageApi).then(
          (res) => setProjects(res.data)
        );
      } else {
        GETExcelData(dateRange[0], dateRange[1], messageApi, radio).then(
          (res) => setProjects(res.data)
        );
      }
    }
  };

  const onRadioChange = (data: RadioChangeEvent) => {
    setRadio(data.target.value);
  };

  const onDateChange = (values: dayjs.Dayjs | null, type: "start" | "end") => {
    if (type === "start") {
      const initialArray = [...dateRange];
      initialArray[0] = dayjs(values).format("YYYY-MM-DD");
      setDateRange(initialArray);
    } else {
      const initialArray = [...dateRange];
      initialArray[1] = dayjs(values).format("YYYY-MM-DD");
      setDateRange(initialArray);
    }
  };

  const exportToCSV = () => {
    const data2 = projects?.map((proj, index) => ({
      SN: index + 1,
      ProjectId: proj.projectId,
      ApplicantName: proj.applicantNameEng,
      Status: proj.status,
      ProjectType: proj.projectType,
      SubmittedDate: proj.creationDate.substring(0, 10),
      KittaNo: JSON.stringify(
        proj.landDetails.map((land) => land.kittaNo)
      ).replace(/[\[\]"]+/g, ""),
      Address: JSON.stringify(
        proj.landDetails.map(
          (land) => `${land.landWardNo}, ${land.landToleEng}`
        )
      ).replace(/[\[\]"]+/g, ""),
    }));
    const ws = XLSX.utils.json_to_sheet(data2 || []);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    // added later
    XLSX.writeFile(wb, "Projects.xlsx");
    // FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      {contextHolder}
      <PageHeader title="Export Excel" subTitle="Export Project List" />
      <Row justify="center" className="ExcelExportRow">
        <Col {...ColHeight(8)}>
          <div className="ExcelExport">
            {JSON.stringify(dateRange)}
            <h2 style={{ paddingBottom: 20 }}>Export</h2>

            <Radio.Group onChange={onRadioChange} value={radio}>
              <Radio value={"ALL"}>All</Radio>
              <Radio value={"APPROVED"}>Approved</Radio>
              <Radio value={"UNAPPROVED"}>Unapproved</Radio>
            </Radio.Group>
            <Divider />
            <DatePicker
              onChange={(e) => onDateChange(e, "start")}
              placeholder="Start Date"
            />
            <DatePicker
              onChange={(e) => onDateChange(e, "end")}
              placeholder="End Date"
            />
            <Divider />
            <Button type="primary" onClick={onSearch} loading={disabled}>
              Search
            </Button>
          </div>
        </Col>
      </Row>
      <div className="ExportDataTable">
        <Spin spinning={disabled} tip="Loading...">
          <Button
            type="primary"
            onClick={(e) => exportToCSV()}
            disabled={projects ? false : true}
          >
            Export to Excel
          </Button>
          <Divider></Divider>
          <Table
            size="middle"
            columns={columns}
            dataSource={
              projects
                ? projects.map((proj) => ({
                    ...proj,
                    key: proj.projectId,
                    creationDate: proj.creationDate.substr(0, 10),
                    kittaNo: JSON.stringify(
                      proj.landDetails.map((land) => land.kittaNo)
                    ).replace(/[\[\]"]+/g, ""),
                    address: JSON.stringify(
                      proj.landDetails.map(
                        (land) => `${land.landWardNo}, ${land.landToleEng}`
                      )
                    ).replace(/[\[\]"]+/g, ""),
                  }))
                : []
            }
          />
        </Spin>
      </div>
    </>
  );
};

export default ExcelExport;
