import { Divider, Result, message } from "antd";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, FormOutlined } from "@ant-design/icons";
import CommonHeader from "./CommonHeader";
import { PDF_URL } from "../../../../Services/Api";
import "./UploadCertificate.scss";
import { Base64toPDFsecond } from "../../../../Services/DigitalSignatureService";
import { SignDocument } from "../../../../Components/Admin/DigitalSignature/DigitalSign";
import { getBase64fromResp } from "../../../../Components/DigitalSignatureLocal/DigitalSignatureLocal";
import { NoticeCoordinates } from "../../../../Components/DigitalSignatureLocal/DigitalSignNoticeLocal";
import { useEffect, useState } from "react";
import {
  dispatchGlobal,
  useStoreGlobal,
} from "../../../../Store/StoreGlobal/StoreGlobal";
import GenerateMuchulkaBtn from "../../OnDeskFinal/AdminViewProjFInal/Modals/NoticeTabModals/GenerateMuchulkaBtn";
import GenerateSarjiminMuchulkaBtn from "../../OnDeskFinal/AdminViewProjFInal/Modals/NoticeTabModals/GenerateSarjiminMuchulkaBtn";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import NewMuchulkaModal from "../../OnDeskFinal/AdminViewProjFInal/Modals/NewMuchulkaModal";
import SarjiminMuchulkaModal from "../../OnDeskFinal/AdminViewProjFInal/Modals/SarjiminMuchulkaModal";
import { AcG } from "../../../../Store/StoreGlobal/types";
import { Ac } from "../../../../Store/StoreViewProject/types";

const SignMuchulka = () => {
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  const { newMuchulka, sarjiminMuchulka } = useStoreViewProj();

  const {
    pid,
    type,
  }: {
    pid?: string;
    type?: string;
  } = useParams();

  useEffect(() => {
    dispatch({
      type: Ac.setCurrentPid,
      payload: parseInt(pid ?? "0"),
    });
    return () => {
      dispatch({
        type: Ac.setCurrentPid,
        payload: 0,
      });
    };
  }, []);

  const myPDFFilename = type + `_${pid}`;
  const signMuchulka = () => {
    const successCallback = (respData: string) => {
      Base64toPDFsecond(
        {
          base64: getBase64fromResp(respData),
          filename: myPDFFilename ?? "",
        },
        "muchulka",
        messageApi
      ).then(() => {
        window.location.reload();
      });
    };
    SignDocument(NoticeCoordinates, "0", setSubmitting, successCallback);
  };

  const myPdfUrl = PDF_URL + `/muchulka/${myPDFFilename}.pdf`;

  return (
    <div>
      {newMuchulka ? <NewMuchulkaModal /> : null}
      {sarjiminMuchulka ? <SarjiminMuchulkaModal /> : null}

      {contextHolder}
      <CommonHeader />
      <div className="ViewDigitalSignature">
        <div className="ViewPdf">
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href={myPdfUrl} target="_blank" rel="noreferrer noopener">
                <Button type="primary">
                  <DownloadOutlined /> PDF
                </Button>
              </a>
              <Divider type="vertical"></Divider>
              {type === "muchulka" ? (
                <GenerateMuchulkaBtn />
              ) : (
                <GenerateSarjiminMuchulkaBtn />
              )}
            </div>
            <embed
              style={{
                width: "100%",
                height: 500,
              }}
              type="application/pdf"
              src={myPdfUrl}
            />
          </>
        </div>
        <div className="SignData">
          <div className="TitleWrapper">
            <div>
              <span>Project Id: </span>
              {pid}
            </div>
            <Title level={3}>
              <span>{type?.toUpperCase()} SIGN</span>
            </Title>
          </div>
          <Result
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign PDF Below"
            subTitle="Sign PDF after downloading with generate new"
            extra={[
              <Button
                key={1}
                onClick={signMuchulka}
                type="primary"
                disabled={disabled || submitting}
              >
                Sign
              </Button>,
            ]}
          ></Result>
        </div>
      </div>
    </div>
  );
};

export default SignMuchulka;
