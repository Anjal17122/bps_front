import { DownloadOutlined } from "@ant-design/icons";
import { Button, Descriptions } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { LandsWithOwner } from "../../Services/CreateProjectService";
import { sN } from "../../Services/ProjectService";

interface Props {
  data: LandsWithOwner[];
  projectId: sN;
}

const PDFlands = ({ data, projectId }: Props) => {
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
          {data.map((landata) => (
            <div
              style={{ height: "90vh", padding: "40px 80px" }}
              key={landata.id}
            >
              <div>
                Project Id: {projectId} <br />
                Land Information
              </div>
              <Descriptions size="small" title="User Info" bordered>
                <Descriptions.Item span={2} label="Map Sheet no:">
                  {landata.mapSheetNo}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Parcel Kitta No:">
                  {landata.landParcelNo}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Ward:">
                  {landata.wardName}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="टोल:">
                  {landata.toleNep}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Tole:">
                  {landata.toleEng}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Square Meter:">
                  {landata.ropani}
                </Descriptions.Item>
              </Descriptions>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFlands;
