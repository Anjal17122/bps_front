import { DownloadOutlined } from "@ant-design/icons";
import { Button, Descriptions } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { GetProject } from "../../Services/CreateProjectService";
import { sN } from "../../Services/ProjectService";

interface Props {
  data: GetProject;
  projectId: sN;
}

const PDFproject = ({ data, projectId }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <Button type="primary" onClick={handlePrint}>
        <DownloadOutlined /> PDF
      </Button>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="ProjectPDFs">
          <div style={{ height: "90vh", padding: "40px 80px" }}>
            <div>Project Id: {projectId}</div>
            <h2 style={{ marginBottom: 20 }}>Project Details</h2>
            <Descriptions layout="horizontal" bordered>
              <Descriptions.Item label="Building Purpose:" span={1.5}>
                {data?.buildingPurpose?.name}
              </Descriptions.Item>
              <Descriptions.Item label="NBC Class:" span={1.5}>
                {data?.buildingClass?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Waris:" span={1.5}>
                {JSON.stringify(data?.waris)}
              </Descriptions.Item>
              <Descriptions.Item label="Project Type:" span={1.5}>
                {data?.type}
              </Descriptions.Item>
              <Descriptions.Item label="Designer Mun ID:" span={1.5}>
                {data?.designer?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Designer Name:" span={1.5}>
                {data?.designer?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Supervisor Mun ID:" span={1.5}>
                {data?.supervisor?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Supervisor Name:" span={1.5}>
                {data?.supervisor?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Latitude:" span={1.5}>
                {data?.lat}
              </Descriptions.Item>
              <Descriptions.Item label="Longitude:" span={1.5}>
                {data?.lon}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFproject;
