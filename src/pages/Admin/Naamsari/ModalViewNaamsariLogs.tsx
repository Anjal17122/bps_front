import { Modal, Spin, Table, Image, Row, Col } from "antd";
import React from "react";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import { NaamsariLog } from "../../../Services/NaamSariService";
import "../../../Assets/scss/ModalViewNaamsariLogs.scss";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  type: "owner" | "houseOwner";
  logs: undefined | NaamsariLog[];
}

const ModalViewNaamsariLogs = ({ isOpen, onCancel, logs, type }: Props) => {
  const columns = [
    {
      title: "S.N.",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Land Id",
      dataIndex: "landId",
      key: "landId",
    },
    {
      title: "Owner Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Citizenship No.",
      dataIndex: "citizenshipNo",
      key: "citizenshipNo",
    },

    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },

    {
      title: "Images",
      key: "Images",
      render: (text: { citizenshipImg: string; photo: string }) => (
        <>
          <Image
            width={25}
            src={
              IMG_GET_URL + `/${imgFolders.citizenship}/` + text.citizenshipImg
            }
          />
          {/* <Divider type="vertical" /> */}
          <Image
            width={25}
            src={IMG_GET_URL + `/${imgFolders.person}/` + text.photo}
          />
        </>
      ),
    },
  ];

  const mappedData = logs?.map((log, i) => {
    return {
      key: log.id,
      sn: i + 1,
      landId: log.id,
      name: log[type]?.nameEng,
      citizenshipNo: log[type]?.citizenshipNo,
      updatedBy: `${log.updatedBy?.nameEng}, ${log.updatedAt?.substr(0, 10)}`,
      citizenshipImg: log[type]?.citizenshipFileName,
      photo: log[type]?.photoFileName,
      phone: log[type]?.primaryPhone,
      fathersName: log[type]?.fatherNameEng,
      grandfather: log[type]?.grandfatherNameEng,
      gender: log[type]?.gender,
      maritalStatus: log[type]?.maritalStatus,
      email: log[type]?.email,
    };
  });

  return (
    <Modal
      open={isOpen}
      width={950}
      footer={null}
      onCancel={() => onCancel()}
      title={false}
      centered={true}
    >
      <Spin spinning={!logs ? true : false}>
        <Table
          columns={columns}
          dataSource={mappedData}
          expandable={{
            expandedRowRender: (record) => (
              <div className="tableExpandable" key={record.landId}>
                <Row gutter={0} className="myRow">
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p> Phone:</p>
                    <b>{record.phone}</b>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    className="emailCol"
                  >
                    <p>Email:</p>
                    <b>{record.email}</b>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p> Gender:</p>
                    <b>{record.gender}</b>
                  </Col>
                </Row>
                <Row gutter={0} className="myRow">
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p> Father:</p>
                    <b>{record.fathersName}</b>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p> GrandFather:</p>
                    <b>{record.grandfather}</b>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p> Marital Status:</p>
                    <b>{record.maritalStatus}</b>
                  </Col>
                </Row>
              </div>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      </Spin>
    </Modal>
  );
};

export default ModalViewNaamsariLogs;
