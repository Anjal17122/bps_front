import { Button, Col, Modal, Row, Tag, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
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
import { PlinthDatas } from "../../../../Services/PlinthService";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { GETPlinthDatas } from "../../../Admin/OnDeskFinal/OnDeskService/ApprovedService/ApprovedService";
import { Ac } from "../../../../Store/StoreViewProject/types";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { getBuildingCompletionReportDataByProjectId } from "../../../common/FinalPDF/DhulikhelBuildingCompletionReport/BuildingCompletionReportService";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  pid: number;
  plinthData: Plinth | undefined;
  superstData: Plinth | undefined;
}

const PlinthModalCon = () => {
  const { currentPid, disabled } = useStoreViewProj();
  const { plinthModalCon } = useStoreModalCon();
  const [certificateData, setCertificateData] = useState<PlinthDatas>();
  const [nirmanSampannaSubmitted, setNirmanSampannaSubmitted] =
    useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETPlinthDatas(currentPid, messageApi).then((res) => {
      localStorage.setItem("plinth", JSON.stringify(res.data.plinth));
      localStorage.setItem("superst", JSON.stringify(res.data.superStructure));
      setCertificateData(res.data);
    });
    getBuildingCompletionReportDataByProjectId(currentPid, messageApi).then(
      (res) => {
        if (res.data != undefined) {
          setNirmanSampannaSubmitted(true);
        }
      }
    );
    return () => {
      setCertificateData(undefined);
    };
  }, []);

  const nirmanSamppanUpload = () => {};

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

  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={plinthModalCon}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        dispatchModalCon({ type: AcMCon.setplinthModalCon, payload: false });
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
      }}
      closable={false}
      destroyOnClose={true}
      width={700}
    >
      {contextHolder}
      <h3>Plinth, SuperStructure, BuildingCompletion Reporting:</h3>
      <Row className="FirstRow">
        <Col span="10" className="reportRows">
          <p>Upto Plinth Level:</p>
        </Col>
        <Col span="8" className="ColFirst reportRows">
          {certificateData?.plinth?.status === "VERIFIED" ? null : (
            <Link to={`/user/addplinthdata/${currentPid}`}>
              <Tooltip title="Submit Plinth data to municipality">
                <Button
                  icon={<UploadOutlined style={{ color: "white" }} />}
                  type="primary"
                />
              </Tooltip>
            </Link>
          )}
          {certificateData?.plinth ? (
            <>
              <Link to={"/user/viewplinth/" + currentPid}>
                <Tooltip title="View Submitted Plinth Data">
                  <Button
                    icon={<EyeFilled style={{ color: "white" }} />}
                    className="yellowButton"
                  />
                </Tooltip>
              </Link>
              <Tooltip title="View Corrections">
                <Link to={`/user/viewcorrection/plinth/` + currentPid}>
                  <Button icon={<MessageOutlined />} />
                </Link>
              </Tooltip>
              {certificateData?.plinth?.status === "VERIFIED" ? null : (
                <Link to={`/user/editplinth/${currentPid}`}>
                  <Tooltip title="Edit Plinth Data">
                    <Button
                      className="greenButton"
                      loading={disabled}
                      icon={<EditOutlined style={{ color: "white" }} />}
                    />
                  </Tooltip>
                </Link>
              )}
            </>
          ) : (
            <span style={{ padding: "0 10px", fontSize: 12 }}>No Data.</span>
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
          <p>Upto SuperStructure:</p>
        </Col>
        <Col span="8" className="ColFirst reportRows">
          {certificateData?.superStructure?.status === "VERIFIED" ? null : (
            <Tooltip title="Submit superstructure data to municipality">
              <Link to={`/user/addsuperst/${currentPid}`}>
                <Button
                  icon={<UploadOutlined style={{ color: "white" }} />}
                  type="primary"
                />
              </Link>
            </Tooltip>
          )}

          <Tooltip title="View Corrections">
            <Link to={`/user/viewcorrection/superstructure/` + currentPid}>
              <Button icon={<MessageOutlined />} />
            </Link>
          </Tooltip>

          {certificateData?.superStructure ? (
            <>
              <Tooltip title="View Submitted superstructure Data">
                <Link to={`/user/viewsuperst/${currentPid}`}>
                  <Button
                    icon={<EyeFilled style={{ color: "white" }} />}
                    className="yellowButton"
                  />
                </Link>
              </Tooltip>

              {certificateData?.superStructure?.status === "VERIFIED" ? null : (
                <Tooltip title="Edit superstructure Data">
                  <Link
                    to={`/user/editsuperst/${currentPid}/${certificateData?.superStructure?.id}`}
                  >
                    <Button
                      className="greenButton"
                      loading={disabled}
                      icon={<EditOutlined style={{ color: "white" }} />}
                    />
                  </Link>
                </Tooltip>
              )}
            </>
          ) : (
            <span style={{ padding: "0 10px", fontSize: 12 }}>No Data.</span>
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
          <p>Nirmansampanna: </p>
        </Col>
        <Col span="8" className="ColFirst reportRows">
          {!nirmanSampannaSubmitted ? (
            <Tooltip title="Fill Building Completion Report">
              <Link
                to={`/buildingreport/save/${currentPid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  icon={<UploadOutlined style={{ color: "white" }} />}
                  type="primary"
                />
              </Link>
            </Tooltip>
          ) : (
            <div>
              <Tooltip title="Manage Building Report">
                <Link to={`/user/upload/Nirmsampanna/${currentPid}`}>
                  <Button
                    icon={<UploadOutlined style={{ color: "white" }} />}
                    type="primary"
                  />
                </Link>
              </Tooltip>
            </div>
          )}

          <Tooltip title="View Corrections">
            <Link to={`/user/viewcorrection/superstructure/` + currentPid}>
              <Button icon={<MessageOutlined />} />
            </Link>
          </Tooltip>

          {certificateData?.superStructure ? (
            <>
              <Tooltip title="View Submitted superstructure Data">
                <Link to={`/user/viewsuperst/${currentPid}`}>
                  <Button
                    icon={<EyeFilled style={{ color: "white" }} />}
                    className="yellowButton"
                  />
                </Link>
              </Tooltip>

              {certificateData?.superStructure?.status === "VERIFIED" ? null : (
                <Tooltip title="Edit superstructure Data">
                  <Link
                    to={`/user/editsuperst/${currentPid}/${certificateData?.superStructure?.id}`}
                  >
                    <Button
                      className="greenButton"
                      loading={disabled}
                      icon={<EditOutlined style={{ color: "white" }} />}
                    />
                  </Link>
                </Tooltip>
              )}
            </>
          ) : (
            <span style={{ padding: "0 10px", fontSize: 12 }}>No Data.</span>
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
    </Modal>
  );
};

export default PlinthModalCon;
