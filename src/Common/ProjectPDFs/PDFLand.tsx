import { DownloadOutlined } from "@ant-design/icons";
import { Button, Descriptions } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { MyLands } from "../../Services/CreateProjectService";
import { sN } from "../../Services/ProjectService";
import "./PDFland.scss";

interface Props {
  data: MyLands[];
  projectId: sN;
}

const PDFland = ({ data, projectId }: Props) => {
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Project Id: {projectId}</div>
            </div>
            <div>
              {data.map((item) => {
                return (
                  <Descriptions
                    className="PDFlandDiv"
                    size="small"
                    title="Land Details"
                    layout="horizontal"
                    bordered
                    key={item.id}
                  >
                    <Descriptions.Item label="ID" span={1}>
                      {item?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Map Sheet" span={1}>
                      {item?.mapSheetNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="Land Parcel" span={1}>
                      {item?.landParcelNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="Area Sqm" span={3}>
                      {item?.ropani}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Address ID" span={1}>
                      {item?.address.id}
                    </Descriptions.Item> */}

                    <Descriptions.Item label="Ward" span={1}>
                      {item.address?.ward?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tole" span={1}>
                      {item.address?.toleNep}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tole" span={1}>
                      {item.address?.toleEng}
                    </Descriptions.Item>
                    <Descriptions.Item label="Remarks:" span={3}>
                      {item?.remarks}
                    </Descriptions.Item>
                    <Descriptions.Item label="Land Image" span={3}>
                      {item?.landImageName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trace Naksa" span={3}>
                      {item?.traceNaksa}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tiro Rasid" span={3}>
                      {item?.tiroRasid}
                    </Descriptions.Item>
                    <Descriptions.Item label="Charkilla Letter" span={3}>
                      {item?.charkillaLetter}
                    </Descriptions.Item>
                  </Descriptions>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFland;
