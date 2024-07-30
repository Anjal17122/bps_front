import React from "react";
import { Button, Col, Form, Input, Popover, Result, Row, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import adbs from "ad-bs-converter";
import { Link } from "react-router-dom";
import {
  ColHeight,
  FormNReq,
  FormProps,
  InputDateValid,
  submitFailedFinal,
} from "../../../../../../Common/Form/FormData";
import { PostPublish } from "../../../OnDeskService/ApprovedService/ApprovedService";
import { CustomMsg } from "../../../../../../Components/Common/CustomMsg/CustomMsg";
import {
  CertType,
  POSTPublishCertBody,
} from "../../../OnDeskService/ApprovedService/types";
import { SubmitBtn } from "../../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { NoticePubVals } from "./types";
import useStoreViewProj from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { useStoreModal } from "../../../../../../Store/StoreModal/StoreModal";
import { addZero } from "../../../../../SuperAdmin/Holidays/Holidays";
import { useQueryClient } from "@tanstack/react-query";
import {
  isDhulikhel,
  isNagarjun,
} from "../../../../../../constants/CommonFunctions";

type Props = {
  type: CertType;
  isTippani?: boolean;
};

export const PlinthPopover = ({ type, isTippani = false }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { currentPid, plinthData } = useStoreViewProj();
  const { plinthPopover } = useStoreModal();

  const queryClient = useQueryClient();

  const handleDownloadFinish = (
    values: NoticePubVals,
    type: CertType,
    projectId: number
  ) => {
    const publishedDateN = values.publishDateNep
      ? adbs.bs2ad(values?.publishDateNep.replace(/-/g, "/"))
      : "";
    const body: POSTPublishCertBody = {
      certificateType: type,
      patraSankhya: values.patraSankhya,
      projectPermaId: projectId,
      publishedDateEng: values.publishDateNep
        ? `${publishedDateN.year}-${addZero(publishedDateN.month)}-${addZero(
            publishedDateN.day
          )}`
        : "",
      publishedDateNep: values.publishDateNep,
      tala: values.tala,
      sarjaminMiti: values.sarjiminMiti,
    };
    if (!isNagarjun()) body.chalaniNum = values.chalaniNum;

    PostPublish(body, messageApi).then((res) => {
      queryClient.invalidateQueries({
        queryKey: ["GetPlinthDatas"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCertLogs"],
      });
      CustomMsg("Published Certificate Successfully", 3, messageApi);
    });
  };

  const getLink = (): string => {
    switch (type) {
      case "PLINTH":
        return `/plinthpdf/${currentPid}/${plinthData?.projectType}/${plinthData?.buildingPurpose}`;
      case "SUPERSTRUCTURE":
        return `/superstructurepdf/${currentPid}/${plinthData?.projectType}/${plinthData?.buildingPurpose}`;
      case "ABHILEKHIKARAN":
        return `/abhilekhikaranpdf/${currentPid}`;
      default:
        return `/buildingcompletepdf/${currentPid}/${plinthData?.projectType}/${plinthData?.buildingPurpose}`;
    }
  };

  const tippaniJsx = (): React.ReactNode | null => {
    if (isDhulikhel()) {
      if (isTippani) {
        if (type === "TIPPANI_PLINTH") {
          return (
            <Form.Item {...FormProps("sarjiminMiti", "Sarjimin Miti")}>
              <Input
                placeholder="Sarjimin Miti"
                // onChange={(e) => setPatraSankhya(e.target.value)}
              />
            </Form.Item>
          );
        }
        if (type === "TIPPANI_SUPERSTRUCTURE") {
          return (
            <Form.Item {...FormProps("sarjiminMiti", "Asthai Miti")}>
              <Input
                placeholder="Asthai Miti"
                // onChange={(e) => setPatraSankhya(e.target.value)}
              />
            </Form.Item>
          );
        }
      }
    }
    return null;
  };
  return (
    <Popover
      content={
        <React.Fragment>
          {plinthPopover ? (
            <React.Fragment>
              <Result
                status="success"
                title="Successfully Submitted Patra Sankhya"
                subTitle="Download Certificate below."
                extra={[
                  <Link
                    key={"link1"}
                    to={getLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary">Download</Button>
                  </Link>,
                ]}
              />
            </React.Fragment>
          ) : (
            <Form
              onFinishFailed={(e) => submitFailedFinal(e, messageApi)}
              size="middle"
              layout="horizontal"
              onFinish={(values) =>
                handleDownloadFinish(values, type, currentPid)
              }
            >
              <Form.Item {...FormProps("patraSankhya", "पत्र संख्या")}>
                <Input
                  placeholder="पत्र संख्या"
                  // onChange={(e) => setPatraSankhya(e.target.value)}
                />
              </Form.Item>
              {isNagarjun() ? null : (
                <Form.Item {...FormProps("chalaniNum", "चलानी नं")}>
                  <Input
                    placeholder="चलानी नं"
                    // onChange={(e) => setChalaniNum(e.target.value)}
                  />
                </Form.Item>
              )}
              <Form.Item
                {...InputDateValid("publishDateNep", "जारी मिति (वि.सं.)")}
              >
                <Input
                  placeholder="YYYY-MM-DD"
                  // onChange={(e) => setPubDate(e.target.value)}
                />
              </Form.Item>
              {type === "SUPERSTRUCTURE" ? (
                <Form.Item initialValue={""} {...FormNReq("tala", "तल्ला")}>
                  <Input placeholder="तल्ला" />
                </Form.Item>
              ) : null}

              {tippaniJsx()}

              <Row gutter={24}>
                <Col {...ColHeight(12)}>
                  <SubmitBtn />
                </Col>
                <Col {...ColHeight(12)}></Col>
              </Row>
            </Form>
          )}
        </React.Fragment>
      }
      trigger={["click"]}
      placement="bottom"
    >
      {contextHolder}
      {isTippani ? (
        <Button style={{ backgroundColor: "yellow" }}>टि</Button>
      ) : (
        <Button icon={<DownloadOutlined />} type="primary" />
      )}
    </Popover>
  );
};
