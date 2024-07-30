import { DownloadOutlined } from "@ant-design/icons";
import { Button, Descriptions } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { IMG_GET_URL, imgFolders } from "../../Services/Api";
import { sN } from "../../Services/ProjectService";
import { Address, getUserTyp } from "../../Services/UserService";

interface Props {
  data: getUserTyp;
  projectId: sN;
}

const PDFapplicant = ({ data, projectId }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const sortAddressbyType = (type: "CURRENT" | "PERMANENT"): Address[] => {
    return data?.addresses.length
      ? data?.addresses.filter((addres) => addres.type === type)
      : ([
          {
            id: "",
            province: { id: 0, name: "", nameNep: "" },
            district: { id: 0, name: "", nameNep: "" },
            municipality: {
              id: "",
              name: "",
              nameNep: "",
            },
            ward: { id: "", name: "", nameNep: "" },
            type: "",
            toleNep: "",
            toleEng: "",
          },
        ] as any);
  };

  const imgUrl =
    IMG_GET_URL + "/" + imgFolders.person + "/" + data?.photoFileName;
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
              <div>
                <img
                  src={imgUrl}
                  alt=""
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div>
              <Descriptions
                size="middle"
                title="Applicant Details"
                layout="horizontal"
                bordered
              >
                <Descriptions.Item label="Applicant's Name:" span={1.5}>
                  {data?.nameEng}
                </Descriptions.Item>
                <Descriptions.Item label="निबेदकको नाम:" span={1.5}>
                  {data?.nameNep}
                </Descriptions.Item>
                <Descriptions.Item label="Phone:" span={1.5}>
                  {data?.primaryPhone}
                </Descriptions.Item>
                <Descriptions.Item label="Email:" span={1.5}>
                  {data?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Citizenship No:" span={1.5}>
                  {data?.citizenshipNo}
                </Descriptions.Item>
                <Descriptions.Item label="Issue Date:" span={1.5}>
                  {data?.citizenIssueDate}
                </Descriptions.Item>
                <Descriptions.Item label="Issue district:" span={3}>
                  {data?.citizenIssueDist}
                </Descriptions.Item>
                <Descriptions.Item label="Marital Status:" span={1.5}>
                  {data?.maritalStatus}
                </Descriptions.Item>
                <Descriptions.Item label="Gender:" span={1.5}>
                  {data?.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Father's Name::" span={1.5}>
                  {data?.fatherNameEng}
                </Descriptions.Item>
                <Descriptions.Item label="बुवाको नाम:" span={1.5}>
                  {data?.fatherNameNep}
                </Descriptions.Item>
                <Descriptions.Item label="Grand Father's Name::" span={1.5}>
                  {data?.grandfatherNameEng}
                </Descriptions.Item>
                <Descriptions.Item label="हजुर बुवाको नाम:" span={1.5}>
                  {data?.grandfatherNameNep}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="Permanent Address" className="PurpleCard">
                <Descriptions.Item label="Province:">
                  {sortAddressbyType("PERMANENT")[0]?.province?.name}
                </Descriptions.Item>
                <Descriptions.Item label="District:">
                  {sortAddressbyType("PERMANENT")[0]?.district?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Municipality:">
                  {sortAddressbyType("PERMANENT")[0]?.municipality?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Ward:">
                  {sortAddressbyType("PERMANENT")[0]?.ward?.name}
                </Descriptions.Item>
                <Descriptions.Item label="टोल​:">
                  {sortAddressbyType("PERMANENT")[0]?.toleNep}
                </Descriptions.Item>
                <Descriptions.Item label="Tole:">
                  {sortAddressbyType("PERMANENT")[0]?.toleEng}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="Temporary Address" className="PurpleCard">
                <Descriptions.Item label="Province:">
                  {sortAddressbyType("CURRENT")[0]?.province?.name}
                </Descriptions.Item>
                <Descriptions.Item label="District:">
                  {sortAddressbyType("CURRENT")[0]?.district?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Municipality:">
                  {sortAddressbyType("CURRENT")[0]?.municipality?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Ward:">
                  {sortAddressbyType("CURRENT")[0]?.ward?.name}
                </Descriptions.Item>
                <Descriptions.Item label="टोल​:">
                  {sortAddressbyType("CURRENT")[0]?.toleNep}
                </Descriptions.Item>
                <Descriptions.Item label="Tole:">
                  {sortAddressbyType("CURRENT")[0]?.toleEng}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFapplicant;
