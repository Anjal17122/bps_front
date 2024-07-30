import { Button, Descriptions } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { GETLandWithOwner, Owner2 } from "../../Services/CreateProjectService";
import { sN } from "../../Services/ProjectService";
import { DownloadOutlined } from "@ant-design/icons";

interface Props {
  landOwners: GETLandWithOwner[];
  projectId: sN;
}

const PDFlandowner = ({ landOwners, projectId }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <Button type="primary" onClick={handlePrint} icon={<DownloadOutlined />}>
        Pdf
      </Button>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="ProjectPDFs">
          {landOwners.map((land) => (
            <div key={land.id}>
              {/* <div style={{ height: "90vh", padding: "40px 80px" }} key={land.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Project Id: {projectId}</div>
                <div> */}
              {/* <img
                  src={imgUrl}
                  alt=""
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                /> */}
              {/* </div>
              </div> */}
              <div key={land.id}>
                {land?.landOwner?.map((landOwner: Owner2) => (
                  <PDFlandownerDiv
                    landId={land.id}
                    landOwner={landOwner}
                    key={landOwner.id}
                    projectId={projectId}
                  />
                ))}
                {land?.houseOwner?.map((houseOwner: Owner2) => (
                  <PDFlandownerDiv
                    landId={land.id}
                    projectId={projectId}
                    landOwner={houseOwner}
                    type="House Owner"
                    key={houseOwner.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFlandowner;

function PermaAddress(landOwner: Owner2) {
  const data = landOwner.owner?.address.filter(
    (addre) => addre.type === "PERMANENT"
  );
  return data ? data[0] : null;
}

function TempAddress(landOwner: Owner2) {
  const data = landOwner.owner?.address.filter(
    (addre) => addre.type === "CURRENT"
  );
  return data ? data[0] : null;
}

type Props2 = {
  landOwner: Owner2;
  projectId: sN;
  landId: sN;
  type?: "Land Owner" | "House Owner";
};

const PDFlandownerDiv = ({
  landOwner,
  projectId,
  landId,
  type = "Land Owner",
}: Props2) => {
  return (
    <div key={landOwner.id} style={{ height: "100vh", padding: "40px 80px" }}>
      <h4>Land Id: {landId}</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Project Id: {projectId}</div>
      </div>

      <Descriptions
        size="middle"
        title={type + " Details"}
        layout="horizontal"
        bordered
      >
        <Descriptions.Item label={type + "'s Name:"} span={1.5}>
          {landOwner?.owner?.nameEng}
        </Descriptions.Item>
        <Descriptions.Item label="निबेदकको नाम:" span={1.5}>
          {landOwner?.owner?.nameNep}
        </Descriptions.Item>
        <Descriptions.Item label="Phone:" span={1.5}>
          {landOwner?.owner?.primaryPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Email:" span={1.5}>
          {landOwner?.owner?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Citizenship No:" span={1.5}>
          {landOwner?.owner?.citizenshipNo}
        </Descriptions.Item>
        <Descriptions.Item label="Issue Date:" span={1.5}>
          {landOwner?.owner?.citizenIssueDate}
        </Descriptions.Item>
        <Descriptions.Item label="Issue district:" span={3}>
          {landOwner?.owner?.citizenIssueDist}
        </Descriptions.Item>
        <Descriptions.Item label="Marital Status:" span={1.5}>
          {landOwner?.owner?.maritalStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Gender:" span={1.5}>
          {landOwner?.owner?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Father's Name::" span={1.5}>
          {landOwner?.owner?.fatherNameEng}
        </Descriptions.Item>
        <Descriptions.Item label="बुवाको नाम:" span={1.5}>
          {landOwner?.owner?.fatherNameNep}
        </Descriptions.Item>
        <Descriptions.Item label="Grand Father's Name::" span={1.5}>
          {landOwner?.owner?.grandfatherNameEng}
        </Descriptions.Item>
        <Descriptions.Item label="हजुर बुवाको नाम:" span={1.5}>
          {landOwner?.owner?.grandfatherNameNep}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Permanent Address" className="PurpleCard">
        <Descriptions.Item label="Province:">
          {PermaAddress(landOwner)?.province?.name}
        </Descriptions.Item>
        <Descriptions.Item label="District:">
          {PermaAddress(landOwner)?.district?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Municipality:">
          {PermaAddress(landOwner)?.municipality?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ward:">
          {PermaAddress(landOwner)?.ward?.name}
        </Descriptions.Item>
        <Descriptions.Item label="टोल​:">
          {PermaAddress(landOwner)?.toleNep}
        </Descriptions.Item>
        <Descriptions.Item label="Tole:">
          {PermaAddress(landOwner)?.toleEng}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Temporary Address" className="PurpleCard">
        <Descriptions.Item label="Province:">
          {TempAddress(landOwner)?.province?.name}
        </Descriptions.Item>
        <Descriptions.Item label="District:">
          {TempAddress(landOwner)?.district?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Municipality:">
          {TempAddress(landOwner)?.municipality?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ward:">
          {TempAddress(landOwner)?.ward?.name}
        </Descriptions.Item>
        <Descriptions.Item label="टोल​:">
          {TempAddress(landOwner)?.toleNep}
        </Descriptions.Item>
        <Descriptions.Item label="Tole:">
          {TempAddress(landOwner)?.toleEng}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
