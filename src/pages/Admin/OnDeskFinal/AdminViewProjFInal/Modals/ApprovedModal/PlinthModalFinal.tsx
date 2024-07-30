import {
  Button,
  Col,
  Modal,
  Row,
  Spin,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  EyeFilled,
  CheckOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CheckCertificateType, PlinthLogType } from "./types";
import {
  GETPlinthDatas,
  GetCertLogs,
  approveNirmansampanna,
  approvePlinth,
  approveSuperSt,
} from "../../../OnDeskService/ApprovedService/ApprovedService";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../../Store/StoreModal/types";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import { PlinthPopover } from "./PlinthPopover";
import {
  GETPublishLogs,
  PlinthDatas,
} from "../../../OnDeskService/ApprovedService/types";
import "./PlinthModalFinal.scss";
import { inDevelopment } from "../../../../../../constants/helper";
import { useQuery } from "@tanstack/react-query";
import { isDhulikhel } from "../../../../../../constants/CommonFunctions";
import { useState } from "react";
import AddMapdandaModal from "../../../../Mapdanda/AddMapdandaModal";
import { checkMapdanda } from "../../../../../../Services/MapdandaService";
import EditMapdandaModal from "../../../../Mapdanda/EditMapdandaModal";
import { IMG_SAVE_URL, PDF_URL } from "../../../../../../Services/Api";

const PlinthModalFinal = () => {
  const { currentPid, plinthData, disabled, applicantName } =
    useStoreViewProj();
  const { approvedPlinthModal } = useStoreModal();

  const [messageApi, contextHolder] = message.useMessage();

  const [openAddMapdanda, setOpenAddMapdanda] = useState(false);
  const [openEditMapdanda, setOpenEditMapdanda] = useState(false);
  const {
    data: certificateDataQuery,
    refetch: refetchCertificate,
    isLoading: isLoading1,
  } = useQuery<PlinthDatas>({
    queryKey: ["GetPlinthDatas", currentPid],
    queryFn: () =>
      GETPlinthDatas(currentPid, messageApi).then((res) => {
        localStorage.setItem("plinth", JSON.stringify(res.data.plinth));
        localStorage.setItem(
          "superst",
          JSON.stringify(res.data.superStructure)
        );
        return res.data;
      }),
  });

  const {
    data: publishLogsQuery,
    refetch: refetchPublish,
    isLoading,
  } = useQuery<GETPublishLogs[]>({
    queryKey: ["GetCertLogs", currentPid],
    queryFn: () => GetCertLogs(currentPid, messageApi).then((res) => res.data),
  });

  if (isLoading) return <>Loading...</>;
  if (isLoading1) return <>Loading...</>;
  const certificateData = certificateDataQuery;
  const publishLogs = publishLogsQuery;

  const approvePlinthPr = (
    status: "VERIFIED" | "UNVERIFIED",
    Plinthtype: "plinth" | "superstructure" | "nirmansampanna"
  ) => {
    if (Plinthtype === "plinth") {
      approvePlinth(status, currentPid, messageApi).then(() => {
        refetchCertificate();
        refetchPublish();
      });
    }

    if (Plinthtype === "superstructure") {
      approveSuperSt(status, currentPid, messageApi).then(() => {
        refetchCertificate();
        refetchPublish();
      });
    }

    if (Plinthtype === "nirmansampanna") {
      approveNirmansampanna(status, currentPid, messageApi).then(() => {
        refetchCertificate();
        refetchPublish();
      });
    }
  };

  const unapproved = (
    <Tag icon={<ClockCircleOutlined />} color="warning">
      unapproved
    </Tag>
  );
  const correction = (
    <Tag icon={<ClockCircleOutlined />} color="warning">
      correction
    </Tag>
  );
  const approved = (
    <Tag
      icon={<CheckCircleOutlined />}
      color="success"
      // onClick={() => approvePlinthPr("UNVERIFIED")}
    >
      approved
    </Tag>
  );

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
      title: "Tala",
      dataIndex: "tala",
      key: "tala",
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
      title: "New",
      key: "action",
      render: (text: PlinthLogType) => (
        <>
          {text.certificateType === "TIPPANI_PLINTH" ? (
            <Link
              to={"/tippani/plinth/" + text.projectPermaId}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="NoStyleBtnSm">
                <DownloadOutlined />
              </button>
            </Link>
          ) : text.certificateType === "TIPPANI_SUPERSTRUCTURE" ? (
            <Link
              to={"/tippani/superstructure/" + text.projectPermaId}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="NoStyleBtnSm">
                <DownloadOutlined />
              </button>
            </Link>
          ) : text.certificateType == "TIPPANI_NIRMAN_SAMPANNA" ? (
            <Link
              to={"/tippani/nirman_sampanna/" + text.projectPermaId}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="NoStyleBtnSm">
                <DownloadOutlined />
              </button>
            </Link>
          ) : (
            <Link
              to={
                text.certificateType === "ABHILEKHIKARAN"
                  ? "/abhilekhikaranpdf/" + text.projectPermaId
                  : text.certificateType.includes("REGULAR")
                  ? "/regularpdf/" + text.projectPermaId
                  : CheckCertificateType(text.certificateType) +
                    `/${text.projectPermaId}/${plinthData?.projectType}/${plinthData?.buildingPurpose}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="NoStyleBtnSm">
                <DownloadOutlined />
              </button>
            </Link>
          )}
        </>
      ),
    },

    {
      title: "Sign/View",
      key: "signview",
      render: (text: PlinthLogType) => (
        <>
          <Link
            to={`/signpdf/${text.projectPermaId}/${
              text.id
            }/${applicantName}/${text.certificateType.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="NoStyleBtnSm">
              <EditOutlined />
            </button>
          </Link>
        </>
      ),
    },
  ];

  if (isDhulikhel()) {
    const newItem = {
      title: "मापदण्ड",
      key: "mapdanda",
      render: (text: PlinthLogType) => (
        <span>
          <button
            className="NoStyleBtnSm"
            onClick={() => {
              checkMapdanda(text.projectPermaId, messageApi).then((res) => {
                if (res.data) return setOpenEditMapdanda(true);

                setOpenAddMapdanda(true);
              });
            }}
          >
            Edit
          </button>
        </span>
      ),
    };
    columns.splice(columns.length - 1, 0, newItem);
  }

  return (
    <Modal
      className="SelectUserModal"
      open={approvedPlinthModal}
      footer={false}
      width={700}
      maskClosable={true}
      onCancel={() => {
        dispatchModal({ type: AcModal.setApprovedPlinthModal, payload: false });
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
      }}
      destroyOnClose={true}
    >
      {openAddMapdanda ? (
        <AddMapdandaModal
          pid={currentPid}
          onClose={() => setOpenAddMapdanda(false)}
        />
      ) : null}
      {openEditMapdanda ? (
        <EditMapdandaModal
          pid={currentPid}
          onClose={() => setOpenEditMapdanda(false)}
        />
      ) : null}
      {contextHolder}
      <h3>अस्थायी, स्थायी र निर्माण सम्पन्न प्रमाण-पत्र निकाल्ने ठाउँ:</h3>

      {plinthData?.projectType.includes("Regular") ? (
        <>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>नियमित पत्र :</p>
            </Col>
            <Col span="8" className="reportRows">
              <PlinthPopover type="REGULAR" />

              {certificateData?.superStructure ? (
                <>
                  <Tooltip title="View Submitted Regular Data by Consultant">
                    <Link to={"/admin/viewsuperst/" + currentPid}>
                      <Button
                        className="yellowButton"
                        onClick={inDevelopment}
                        icon={<EyeFilled style={{ color: "white" }} />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    title={
                      certificateData?.superStructure?.status === "VERIFIED"
                        ? "UnApprove Submitted SuperStructure Data"
                        : "Approve Submitted SuperStructure Data"
                    }
                  >
                    <Button
                      className={
                        certificateData?.superStructure?.status === "VERIFIED"
                          ? "redButton"
                          : "greenButton"
                      }
                      onClick={
                        certificateData?.superStructure?.status === "VERIFIED"
                          ? () =>
                              approvePlinthPr("UNVERIFIED", "superstructure")
                          : () => approvePlinthPr("VERIFIED", "superstructure")
                      }
                      loading={disabled}
                      icon={
                        certificateData?.superStructure?.status ===
                        "VERIFIED" ? (
                          <CloseOutlined style={{ color: "white" }} />
                        ) : (
                          <CheckOutlined style={{ color: "white" }} />
                        )
                      }
                    />
                  </Tooltip>
                </>
              ) : (
                <span style={{ padding: "0 10px", fontSize: 12 }}>
                  No Data.
                </span>
              )}
            </Col>
          </Row>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>निर्माण सम्पन्न निकाल्नुहोस:</p>
            </Col>
            <Col span="8" className="reportRows">
              {isDhulikhel() ? (
                <PlinthPopover
                  type="TIPPANI_NIRMAN_SAMPANNA"
                  isTippani={true}
                />
              ) : null}
              <PlinthPopover type="NIRMAN_SAMPANNA" />
            </Col>
            <Col span="6" className="reportRows"></Col>
          </Row>
        </>
      ) : null}
      {plinthData?.projectType === "Already Build Building" ? (
        <>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>अभिलेखिकरण पत्र :</p>
            </Col>
            <Col span="8" className="reportRows">
              <PlinthPopover type="ABHILEKHIKARAN" />
            </Col>
            <Col span="6" className="reportRows"></Col>
          </Row>
        </>
      ) : plinthData?.projectType.includes("Regular") ? null : (
        <>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>अस्थायी प्रमाण-पत्र निकाल्नुहोस:</p>
            </Col>
            <Col span="8" className="ColFirst reportRows">
              {isDhulikhel() ? (
                <PlinthPopover type="TIPPANI_PLINTH" isTippani={true} />
              ) : null}
              <PlinthPopover type="PLINTH" />
              {certificateData?.plinth ? (
                <>
                  <Link to={"/admin/viewplinth/" + currentPid}>
                    <Tooltip title="View Submitted Plinth Data by Consultant">
                      <Button
                        icon={<EyeFilled style={{ color: "white" }} />}
                        className="yellowButton"
                      />
                    </Tooltip>
                  </Link>
                  <Tooltip
                    title={
                      certificateData?.plinth?.status === "VERIFIED"
                        ? "UnApprove Submitted Plinth Data"
                        : "Approve Submitted Plinth Data"
                    }
                  >
                    <Button
                      className={
                        certificateData?.plinth?.status === "VERIFIED"
                          ? "redButton"
                          : "greenButton"
                      }
                      onClick={
                        certificateData?.plinth?.status === "VERIFIED"
                          ? () => approvePlinthPr("UNVERIFIED", "plinth")
                          : () => approvePlinthPr("VERIFIED", "plinth")
                      }
                      loading={disabled}
                      icon={
                        certificateData?.plinth?.status === "VERIFIED" ? (
                          <CloseOutlined style={{ color: "white" }} />
                        ) : (
                          <CheckOutlined style={{ color: "white" }} />
                        )
                      }
                    />
                  </Tooltip>
                </>
              ) : (
                <span style={{ padding: "0 10px", fontSize: 12 }}>
                  No Data.
                </span>
              )}
            </Col>
            <Col span="6" className="reportRows">
              {certificateData?.plinth?.status === "VERIFIED"
                ? approved
                : certificateData?.plinth?.status === "UNVERIFIED"
                ? unapproved
                : correction}
            </Col>
          </Row>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>स्थायी प्रमाण-पत्र निकाल्नुहोस:</p>
            </Col>
            <Col span="8" className="ColFirst reportRows">
              {isDhulikhel() ? (
                <PlinthPopover type="TIPPANI_SUPERSTRUCTURE" isTippani={true} />
              ) : null}
              <PlinthPopover type="SUPERSTRUCTURE" />

              {certificateData?.superStructure ? (
                <>
                  <Tooltip title="View Submitted Super Structure Data by Consultant">
                    <Link to={"/admin/viewsuperst/" + currentPid}>
                      <Button
                        className="yellowButton"
                        onClick={inDevelopment}
                        icon={<EyeFilled style={{ color: "white" }} />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    title={
                      certificateData?.superStructure?.status === "VERIFIED"
                        ? "UnApprove Submitted SuperStructure Data"
                        : "Approve Submitted SuperStructure Data"
                    }
                  >
                    <Button
                      className={
                        certificateData?.superStructure?.status === "VERIFIED"
                          ? "redButton"
                          : "greenButton"
                      }
                      onClick={
                        certificateData?.superStructure?.status === "VERIFIED"
                          ? () =>
                              approvePlinthPr("UNVERIFIED", "superstructure")
                          : () => approvePlinthPr("VERIFIED", "superstructure")
                      }
                      loading={disabled}
                      icon={
                        certificateData?.superStructure?.status ===
                        "VERIFIED" ? (
                          <CloseOutlined style={{ color: "white" }} />
                        ) : (
                          <CheckOutlined style={{ color: "white" }} />
                        )
                      }
                    />
                  </Tooltip>
                </>
              ) : (
                <span style={{ padding: "0 10px", fontSize: 12 }}>
                  No Data.
                </span>
              )}
            </Col>
            <Col span="6" className="reportRows">
              {certificateData?.superStructure?.status === "VERIFIED"
                ? approved
                : certificateData?.superStructure?.status === "UNVERIFIED"
                ? unapproved
                : correction}
            </Col>
          </Row>
          <Row className="FirstRow">
            <Col span="10" className="reportRows">
              <p>निर्माण सम्पन्न निकाल्नुहोस:</p>
            </Col>
            <Col span="8" className="reportRows">
              {isDhulikhel() ? (
                <PlinthPopover
                  type="TIPPANI_NIRMAN_SAMPANNA"
                  isTippani={true}
                />
              ) : null}
              <PlinthPopover type="NIRMAN_SAMPANNA" />
              {certificateData?.nirmanSampanna ? (
                <>
                  <Link
                    to={
                      PDF_URL +
                      "/superstructure/" +
                      certificateData.nirmanSampanna.imageName
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Tooltip title="View Submitted Nirmansampanna Pdf by Consultant">
                      <Button
                        icon={<EyeFilled style={{ color: "white" }} />}
                        className="yellowButton"
                      />
                    </Tooltip>
                  </Link>
                  <Tooltip
                    title={
                      certificateData?.nirmanSampanna?.status === "VERIFIED"
                        ? "UnApprove Submitted Nirmansampanna Data"
                        : "Approve Submitted Nirmansampanna Data"
                    }
                  >
                    <Button
                      className={
                        certificateData?.nirmanSampanna?.status === "VERIFIED"
                          ? "redButton"
                          : "greenButton"
                      }
                      onClick={
                        certificateData?.nirmanSampanna?.status === "VERIFIED"
                          ? () =>
                              approvePlinthPr("UNVERIFIED", "nirmansampanna")
                          : () => approvePlinthPr("VERIFIED", "nirmansampanna")
                      }
                      loading={disabled}
                      icon={
                        certificateData?.nirmanSampanna?.status ===
                        "VERIFIED" ? (
                          <CloseOutlined style={{ color: "white" }} />
                        ) : (
                          <CheckOutlined style={{ color: "white" }} />
                        )
                      }
                    />
                  </Tooltip>
                </>
              ) : (
                <span style={{ padding: "0 10px", fontSize: 12 }}>
                  No Data.
                </span>
              )}
            </Col>
            <Col span="6" className="reportRows"></Col>
          </Row>
        </>
      )}
      <div className="PurpleCard">
        <h4>View Logs/ Re-Download</h4>
        {publishLogs ? (
          <Table
            rowKey={"id"}
            className="PlinthLogsTable"
            size="small"
            columns={columns}
            dataSource={publishLogs}
          />
        ) : (
          <Spin />
        )}
      </div>
    </Modal>
  );
};

export default PlinthModalFinal;
