import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  UploadFile,
} from "antd";
import adbs from "ad-bs-converter";
// import type { RadioChangeEvent } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { NoticeTypesTable } from "../../../../ProjectActionsAdmin/NoticeTypes/NoticeTypesTable";

import { IMG_SAVE_URL, imgFolders } from "../../../../../../Services/Api";
import { getToken } from "../../../../../../Services/UserService";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { SubmitBtn } from "../../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import { AcModal } from "../../../../../../Store/StoreModal/types";
import {
  GETnoticePublished,
  POSTnoticePublish,
  uploadMuchulka,
} from "../../../OnDeskService/NoticeServiceFinal/NoticeServiceFinal";
import { NoticePublishValues } from "../../../../ProjectActionsAdmin/NoticeTypes/NoticeTypestypes";
import { POSTnoticePublishBody } from "../../../../../../Services/NoticeTypeService";
import { copyImageFinal } from "../../../OnDeskService/OnDeskService/OnDeskService";
import { GETNoticePublishBody } from "../../../OnDeskService/NoticeServiceFinal/types";
import { normFile } from "../../../../../../constants/antdConstants";
import {
  FormProps,
  InputDateValid,
  submitFailedFinal,
} from "../../../../../../Common/Form/FormData";
import GenerateMuchulkaBtn from "./GenerateMuchulkaBtn";
import GenerateSarjiminMuchulkaBtn from "./GenerateSarjiminMuchulkaBtn";
import { municipalityDetails } from "../../../../../../constants/constants";
import { isNagarjun } from "../../../../../../constants/CommonFunctions";

export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: {
    percent: number;
  };
}

const MuchulkaNoticeModalFinal = () => {
  // const optionsWithDisabled = [
  //   { label: "Yes", value: true },
  //   { label: "No", value: false },
  // ];

  // const [value4, setValue4] = useState(false);
  const [fileName, setFileName] = useState("");

  const { muchulkaNoticeModal } = useStoreModal();
  const { currentPid, disabled } = useStoreViewProj();
  const [noticePublish, setNoticePublish] = useState<GETNoticePublishBody[]>();
  const [messageApi, contextHolder] = message.useMessage();

  // is 21 days?
  const [is21Days, setIs21Days] = useState(false);

  useEffect(() => {
    GETnoticePublished(currentPid, messageApi).then((res) =>
      setNoticePublish(res.data)
    );

    return () => {
      setNoticePublish(undefined);
    };
  }, []);

  // const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
  //   setValue4(value);
  // };

  const props = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
    onChange(info: UploadChangeParam<UploadFile>) {
      // if (info.file.status !== "uploading") {
      // }
      if (info.file.status === "done") {
        setFileName(info.file.response.message),
          messageApi.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleMuchulkaUpload = () => {
    uploadMuchulka(currentPid, fileName, messageApi).then(() =>
      messageApi.success("Muchulka Uploaded Successfully!")
    );
  };

  const [form] = Form.useForm();

  const onSubmit = (values: NoticePublishValues) => {
    const noticeFileName = values.uploadNotice
      ? values.uploadNotice[0].response.message
      : "";
    const body: POSTnoticePublishBody = {
      chalaninum: values.chalaninum,
      dateEng: bsToAd(values.dateNep),
      filename: noticeFileName,
      dateNep: values.dateNep,
      noticeProjectType: values.noticeProjectType[0],
      noticeStatus: "no",
      patrasankhya: values.patrasankhya,
      projectId: currentPid,
    };
    POSTnoticePublish(body, messageApi).then((res) => {
      if (values.noticeProjectType[0] === "days21") {
        copyImageFinal(
          [{ fileName: noticeFileName, dir: imgFolders.notice }],
          messageApi
        );
      }
      setNoticePublish([res.data, ...(noticePublish ?? [])]);
    });
  };
  return (
    <Modal
      title={null}
      width={800}
      open={muchulkaNoticeModal}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
        dispatchModal({ type: AcModal.setMuchulkaNoticeModal, payload: false });
      }}
      destroyOnClose={true}
    >
      {contextHolder}
      {isNagarjun() ? null : (
        <div
          style={{
            display: "flex",
            background: "rgba(255, 208, 0, 0.2)",
            alignItems: "center",
            width: "auto",
            padding: "15px 4px",
            border: "1px solid rgba(255, 208, 0, 0.8)",
            borderRadius: 4,
            marginBottom: 10,
          }}
        >
          <>
            <h2>सर्जिमिन मुचुल्का: (Pid: {currentPid})</h2>
            <div style={{ marginRight: 10 }}>
              <span style={{ marginLeft: 20, marginRight: 10 }}>
                सर्जिमिन मुचुल्का थप्नुहोस:
              </span>
              <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
            <Button
              disabled={disabled}
              type="primary"
              onClick={handleMuchulkaUpload}
            >
              Submit
            </Button>
          </>
        </div>
      )}

      <Divider type="horizontal"></Divider>
      <div className="PurpleCard">
        <h2 style={{ marginBottom: 10 }}>
          थप सुचना प्रकाशन गर्नको लागि तलको फारम प्रयोग गर्नुहोस
        </h2>

        <Form
          form={form}
          onFinishFailed={(errors) => submitFailedFinal(errors, messageApi)}
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Row gutter={18}>
            <Col span={12}>
              <Form.Item {...FormProps("noticeProjectType", "सुचनाको प्रकार")}>
                <Cascader
                  options={noticeTypes}
                  placeholder="सुचनाको प्रकार"
                  onChange={(value) => {
                    if (value[0] === "days21") {
                      setIs21Days(true);
                    } else {
                      setIs21Days(false);
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...FormProps("patrasankhya", "पत्र संख्या")}>
                <Input placeholder="पत्र संख्या" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...FormProps("chalaninum", "चलानी न")}>
                <Input placeholder="चलानी न" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...InputDateValid("dateNep", "मिति (वि.सं.): YYYY-MM-DD")}
              >
                <Input type="text" placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
          {is21Days ? (
            <Form.Item
              label="Upload Notice"
              name="uploadNotice"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              // extra="upload"
            >
              <Upload
                maxCount={1}
                name="file"
                action={IMG_SAVE_URL}
                listType="text"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          ) : null}
          <div style={{ display: "flex" }}>
            <SubmitBtn />
            <Form.Item>
              <Button type="primary" ghost onClick={() => form.resetFields()}>
                Clear Form
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <h2>प्रकाशित सूचना हेर्ने र थप्ने ठाउँ</h2>
      <NoticeTypesTable noticePublish={noticePublish} projectId={currentPid} />
    </Modal>
  );
};

export default MuchulkaNoticeModalFinal;

export const noticeTypes = [
  {
    label: "१५ दिने ",
    value: "days15",
  },
  {
    label: "७ दिने ",
    value: "days7",
  },
  {
    label: "२१ दिने ",
    value: "days21",
  },
];
//  "15days", "7days", "21days",

const addZero = (data: number) => {
  if (data < 10) {
    return `0${data}`;
  } else {
    return data;
  }
};
export const bsToAd = (value: string) => {
  const dateAD = adbs.bs2ad(value.replace(/-/g, "/"));
  return `${dateAD.year}-${addZero(dateAD.month)}-${addZero(dateAD.day)}`;
};
