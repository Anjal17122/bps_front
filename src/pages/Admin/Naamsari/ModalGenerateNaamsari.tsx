import { Col, Modal, Row, Spin, Table, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStoreViewProj, {
  dispatch,
} from "../../../Store/StoreViewProject/StoreViewProj";
import {
  dispatchModal,
  useStoreModal,
} from "../../../Store/StoreModal/StoreModal";
import { GETPublishLogs } from "../OnDeskFinal/OnDeskService/ApprovedService/types";
import { GetCertLogs } from "../OnDeskFinal/OnDeskService/ApprovedService/ApprovedService";
import { PlinthLogType } from "../OnDeskFinal/AdminViewProjFInal/Modals/ApprovedModal/types";
import { PlinthPopover } from "../OnDeskFinal/AdminViewProjFInal/Modals/ApprovedModal/PlinthPopover";
import { AcModal } from "../../../Store/StoreModal/types";
import { Ac } from "../../../Store/StoreViewProject/types";

const ModalGenerateNaamsari = () => {
  const { currentPid } = useStoreViewProj();

  const { modalGenerateNaamsari } = useStoreModal();

  const [messageApi, contextHolder] = message.useMessage();

  const { data: publishLogsQuery, isLoading } = useQuery<GETPublishLogs[]>({
    queryKey: ["GetCertLogs", currentPid],
    queryFn: () => GetCertLogs(currentPid, messageApi).then((res) => res.data),
  });

  if (isLoading) return <>Loading...</>;
  const publishLogs = publishLogsQuery;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Patra",
      dataIndex: "patraSankhya",
      key: "patraSankhya",
    },
    {
      title: "Chalani",
      dataIndex: "chalaniNum",
      key: "chalaniNum",
    },
    {
      title: "Type",
      dataIndex: "certificateType",
      key: "certificateType",
    },
    {
      title: "Published",
      dataIndex: "publishedDateNep",
      key: "publishedDateNep",
    },

    {
      title: "Create New",
      key: "action",
      render: (text: PlinthLogType) => (
        <>
          <Link
            to={
              text.certificateType === "NAAMSARI"
                ? "/admin/naamsari/generate/" + text.projectPermaId
                : ""
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="NoStyleBtnSm">
              <DownloadOutlined />
            </button>
          </Link>
        </>
      ),
    },
    // {
    //   title: "Sign/View",
    //   key: "signview",
    //   render: (text: PlinthLogType) => (
    //     <>
    //       <Link
    //         to={`/signpdf/${
    //           text.projectPermaId
    //         }/${applicantName}/${text.certificateType.toLowerCase()}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <button className="NoStyleBtnSm">
    //           <EditOutlined />
    //         </button>
    //       </Link>
    //     </>
    //   ),
    // },
  ];

  return (
    <Modal
      className="SelectUserModal"
      open={modalGenerateNaamsari}
      footer={false}
      width={700}
      maskClosable={true}
      onCancel={() => {
        dispatchModal({
          type: AcModal.setModalGenerateNaamsari,
          payload: false,
        });
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
      }}
      destroyOnClose={true}
    >
      {contextHolder}
      <h3>नामसारी प्रमाण-पत्र निकाल्ने ठाउँ:</h3>

      <Row className="FirstRow">
        <Col span="10" className="reportRows">
          <p>नामसारी प्रमाण-पत्र निकाल्नुहोस:</p>
        </Col>
        <Col span="8" className="reportRows">
          <PlinthPopover type="NAAMSARI" />
        </Col>
        <Col span="6" className="reportRows"></Col>
      </Row>

      <div className="PurpleCard">
        <h4>View Logs/ Re-Download</h4>
        {publishLogs ? (
          <Table
            rowKey={"id"}
            className="PlinthLogsTable"
            size="small"
            columns={columns}
            dataSource={publishLogs.filter(
              (plog) => plog.certificateType === "NAAMSARI"
            )}
          />
        ) : (
          <Spin />
        )}
      </div>
    </Modal>
  );
};

export default ModalGenerateNaamsari;
