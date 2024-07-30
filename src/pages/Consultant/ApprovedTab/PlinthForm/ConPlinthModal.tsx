import { Button, Col, Modal, Row, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import {
  EyeFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Plinth } from "../../../../Services/ProjectService";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  pid: number;
  plinthData: Plinth | undefined;
  superstData: Plinth | undefined;
}

const ConPlinthModal = ({
  pid,
  isVisible,
  onClose,
  plinthData,
  superstData,
}: Props) => {
  const [loading] = useState(false);
  const unapproved = (
    <Tag icon={<ClockCircleOutlined />} color="warning">
      unapproved
    </Tag>
  );
  const approved = (
    <Tag icon={<CheckCircleOutlined />} color="success">
      approved
    </Tag>
  );
  const correction = (
    <Tag icon={<ClockCircleOutlined />} color="warning">
      correction
    </Tag>
  );
  // function onDownload(pid: number) {
  //   getPlinthCert(pid, setLoading).then((res) => {
  //     setPlinthCert(res.data);
  //   });
  // }

  const onViewCorrections = (type: "Plinth" | "Superstructure") => {};

  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      closable={false}
      destroyOnClose={true}
      width={700}
    >
      <h3>Plinth and SuperStructure Reportingg:</h3>
      <Row className="FirstRow">
        <Col span="10" className="reportRows">
          <p>Upto Plinth Level:</p>
        </Col>
        <Col span="8" className="ColFirst reportRows">
          {plinthData?.status === "VERIFIED" ? null : (
            <Link to={`/user/addplinthdata/${pid}`}>
              <Tooltip title="Submit Plinth data to municipality">
                <Button
                  icon={<UploadOutlined style={{ color: "white" }} />}
                  type="primary"
                />
              </Tooltip>
            </Link>
          )}
          {plinthData ? (
            <>
              <Link to={"/user/viewplinth/" + pid}>
                <Tooltip title="View Submitted Plinth Data">
                  <Button
                    icon={<EyeFilled style={{ color: "white" }} />}
                    className="yellowButton"
                  />
                </Tooltip>
              </Link>
              <Tooltip title="View Corrections">
                <Link to={`/user/viewcorrection/plinth/` + pid}>
                  <Button icon={<MessageOutlined />} />
                </Link>
              </Tooltip>
              {plinthData?.status === "VERIFIED" ? null : (
                <Link to={`/user/editplinth/${pid}`}>
                  <Tooltip title="Edit Plinth Data">
                    <Button
                      className="greenButton"
                      loading={loading}
                      icon={<EditOutlined style={{ color: "white" }} />}
                    />
                  </Tooltip>
                </Link>
              )}
              {/* <Link to={`/user/viewplinthdata/${pid}`}>
                <Tooltip
                  title="सुपरिवेक्षकको प्रतिवेदन"
                >
                  <Button
                    style={{ background: "purple" }}
                    loading={loading}
                    icon={<FileOutlined style={{ color: "white" }} />}
                  />
                </Tooltip>
              </Link> */}
            </>
          ) : (
            <span style={{ padding: "0 10px", fontSize: 12 }}>No Data.</span>
          )}
        </Col>
        <Col span="6" className="reportRows">
          {plinthData?.status === "VERIFIED"
            ? approved
            : plinthData?.status === "UNVERIFIED"
            ? unapproved
            : correction}
        </Col>
      </Row>
      <Row className="FirstRow">
        <Col span="10" className="reportRows">
          <p>Upto SuperStructure:</p>
        </Col>
        <Col span="8" className="ColFirst reportRows">
          {superstData?.status === "VERIFIED" ? null : (
            <Tooltip title="Submit superstructure data to municipality">
              <Link to={`/user/addsuperst/${pid}`}>
                <Button
                  icon={<UploadOutlined style={{ color: "white" }} />}
                  type="primary"
                />
              </Link>
            </Tooltip>
          )}

          <Tooltip title="View Corrections">
            <Link to={`/user/viewcorrection/superstructure/` + pid}>
              <Button icon={<MessageOutlined />} />
            </Link>
          </Tooltip>

          {superstData ? (
            <>
              <Tooltip title="View Submitted superstructure Data">
                <Link to={`/user/viewsuperst/${pid}`}>
                  <Button
                    icon={<EyeFilled style={{ color: "white" }} />}
                    className="yellowButton"
                  />
                </Link>
              </Tooltip>

              {superstData?.status === "VERIFIED" ? null : (
                <Tooltip title="Edit superstructure Data">
                  <Link to={`/user/editsuperst/${pid}/${superstData?.id}`}>
                    <Button
                      className="greenButton"
                      loading={loading}
                      icon={<EditOutlined style={{ color: "white" }} />}
                    />
                  </Link>
                </Tooltip>
              )}
            </>
          ) : (
            <span style={{ padding: "0 10px", fontSize: 12 }}>No Data.</span>
          )}
          {/* <Link to={`/editsuperst/${pid}`}></Link>
          <Tooltip
            title="सुपरिवेक्षकको प्रतिवेदन"
          >
            <Button
              style={{ background: "purple" }}
              loading={loading}
              icon={<FileOutlined style={{ color: "white" }} />}
            />
          </Tooltip>
          <Link to={`/user/viewsuperstdata/${pid}`}></Link> */}
        </Col>
        <Col span="6" className="reportRows">
          {superstData?.status === "VERIFIED"
            ? approved
            : superstData?.status === "UNVERIFIED"
            ? unapproved
            : correction}
        </Col>
      </Row>
      {/* <Row className="FirstRow">
        <Col span="10" className="reportRows">
          <p>Building Complete:</p>
        </Col>
        <Col span="8" className="reportRows">
          <Button
            type="primary"
            onClick={inDevelopment}
            icon={<DownloadOutlined />}
          />
        </Col>
        <Col span="6" className="reportRows">
          {unapproved}
        </Col>
      </Row> */}
    </Modal>
  );
};

export default ConPlinthModal;
