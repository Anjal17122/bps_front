import { Button, Descriptions } from "antd";
import React, { useState } from "react";
import "./ViewDataEntryDiv.scss";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export function ViewDataEntryDiv({ currentData }: { currentData: GETDocBody }) {
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [openNaamSaari, setOpenNaamSaari] = useState(false);
  const handleOpenStatus = () => setShowStatusChange((prev) => !prev);

  const handleCloseNaamSaari = () => setOpenNaamSaari(false);
  const handleOpenNaamSaari = () => setOpenNaamSaari(true);

  return (
    <div>
      <div className="buttonContainer">
        <Button type="primary" htmlType="button" onClick={handleOpenStatus}>
          Change Status
        </Button>
        <Link to={"/admin/editdata/" + currentData.id}>
          <Button type="primary" ghost>
            <EditOutlined /> Edit
          </Button>
        </Link>
        <NaamSaari
          currentPid={currentData.id ?? 0}
          isVisible={openNaamSaari}
          onClose={handleCloseNaamSaari}
        />
        <button
          style={{
            cursor: "pointer",
            border: "none",
            background: "#00B96B",
            color: "white",
            padding: "6px 20px 5px 16px",
            borderRadius: "3px",
          }}
          onClick={handleOpenNaamSaari}
        >
          नाम सारि
        </button>
      </div>
      {showStatusChange ? (
        <StatusChangeModal currentPid={`${currentData.id}`} />
      ) : null}
      <Descriptions
        title="House Owner Information"
        layout="vertical"
        className="ViewDataModal"
      >
        <Descriptions.Item label="Darta No." span={1}>
          {currentData?.dartaNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Category" span={2}>
          {currentData?.category?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Home Owner" span={1}>
          {currentData?.homeOwnerNameEng}
        </Descriptions.Item>
        <Descriptions.Item label="Home Owner(Nep)" span={1}>
          {currentData?.homeOwnerNameNep}
        </Descriptions.Item>
        <Descriptions.Item label="CitizenShip No" span={1}>
          {currentData?.homeOwnerCitizenshipNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Land Owner" span={1}>
          {currentData?.clientNameEng}
        </Descriptions.Item>
        <Descriptions.Item label="Land Owner(Nep)" span={1}>
          {currentData?.clientNameNep}
        </Descriptions.Item>
        <Descriptions.Item label="CitizenShip No" span={1}>
          {currentData?.clientCitizenshipNumber}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Land and House Information"
        layout="vertical"
        className="ViewDataModal"
      >
        <Descriptions.Item label="Map Sheet No" span={2}>
          {currentData?.mapSheetNo}
        </Descriptions.Item>

        <Descriptions.Item label="Kitta No." span={1}>
          {currentData?.kittaNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Plot Area Sq.ft" span={1}>
          {currentData?.plotArea}
        </Descriptions.Item>
        <Descriptions.Item label="Plinth Area Sq.ft" span={1}>
          {currentData?.plinthArea}
        </Descriptions.Item>
        <Descriptions.Item label="Building Area Sq.ft" span={1}>
          {currentData?.totalArea}
        </Descriptions.Item>
        <Descriptions.Item label="House Type" span={1}>
          {currentData?.houseType?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Building Type" span={1}>
          {currentData?.buildingType?.name}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Address(हाल)" span={2}>
          {currentData?.haalWardString}
        </Descriptions.Item> */}
        <Descriptions.Item label="Address(हाल) Ward No" span={2}>
          {currentData?.ward?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Address (पंचायत)" span={2}>
          {currentData?.panchayatWardString}
        </Descriptions.Item>
        <Descriptions.Item label="Address (साबिक)" span={2}>
          {currentData?.oldWardDto?.name}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Address (पंचायत)" span={2}>
          {currentData?.panchayatWardString}
          </Descriptions.Item>
          <Descriptions.Item label="Address (साबिक)" span={2}>
          {currentData?.oldWardDto?.name}
          </Descriptions.Item> */}
        <Descriptions.Item label="Tole" span={1}>
          {currentData?.tole}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Project Status"
        layout="vertical"
        className="ViewDataModal"
      >
        <Descriptions.Item label="Category" span={2}>
          {currentData?.category?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Darta No." span={2}>
          {currentData?.dartaNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Darta Date" span={1}>
          {currentData?.dartaDateNep}
        </Descriptions.Item>
        <Descriptions.Item label="अस्थाइ Date" span={1}>
          {currentData?.asthaiDateNep}
        </Descriptions.Item>
        <Descriptions.Item label="स्थाइ Date" span={1}>
          {currentData?.sthaiDateNep}
        </Descriptions.Item>
        <Descriptions.Item label="निर्माण सम्पन्न Date" span={1}>
          {currentData?.nirmanSampannaDateNep}
        </Descriptions.Item>
        <Descriptions.Item label="अभिलेखीकरण Date" span={1}>
          {currentData?.abilekhekaranDateNep}
        </Descriptions.Item>
        <Descriptions.Item label="Digi Id/Digitization Id" span={1}>
          {currentData?.uniqueId}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Others" layout="vertical" className="ViewDataModal">
        <Descriptions.Item label="Revenue Amount (NRS)" span={1}>
          {currentData?.revenueAmount}
        </Descriptions.Item>
        <Descriptions.Item label="Phone No" span={1}>
          {currentData?.phoneNo}
        </Descriptions.Item>

        <Descriptions.Item label="Remarks" span={3}>
          {currentData?.remarks}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
