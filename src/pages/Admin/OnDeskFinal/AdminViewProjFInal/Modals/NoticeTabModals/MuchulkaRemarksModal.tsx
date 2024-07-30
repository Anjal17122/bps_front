import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Switch,
  Table,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import {
  PDF_URL,
  IMG_GET_URL,
  imgFolders,
  IMG_SAVE_URL,
} from "../../../../../../Services/Api";
import { AcModal } from "../../../../../../Store/StoreModal/types";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { RemarksList } from "../../../../../../Services/MuchulkaService";
import {
  AddMuchulkaRemarks,
  GETmuchulkaRemarks,
} from "../../../OnDeskService/NoticeServiceFinal/NoticeServiceFinal";
import {
  FormProps,
  submitFailedFinal,
} from "../../../../../../Common/Form/FormData";
import { SubmitBtn } from "../../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { normFile } from "../../../../../../constants/antdConstants";
import GenerateMuchulkaBtn from "./GenerateMuchulkaBtn";
import GenerateSarjiminMuchulkaBtn from "./GenerateSarjiminMuchulkaBtn";
import { changeApprovedStatus } from "../../../../../../Services/AdminViewProjService/AdminViewProjService";
import { isNagarjun } from "../../../../../../constants/CommonFunctions";

const MuchulkaRemarksModal = () => {
  const { noticeMuchulkaRemarks } = useStoreModal();
  const { currentPid, isMuchulka } = useStoreViewProj();

  const [remarksData, setRemarksData] = useState<RemarksList[]>();
  const [rerender, setRerender] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETmuchulkaRemarks(currentPid, messageApi).then((res) =>
      setRemarksData(res.data)
    );

    return () => {
      setRemarksData(undefined);
    };
  }, [rerender]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "File",
      dataIndex: "remarksFile",
      key: "remarks",
      render: (text: string | undefined) =>
        text ? (
          <a
            href={
              (checkIfPDF(text) ? PDF_URL : IMG_GET_URL) +
              "/" +
              imgFolders.remarks +
              "/" +
              text
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="middle" type="link" style={{ marginLeft: 0 }}>
              <DownloadOutlined />
            </Button>
          </a>
        ) : (
          <div>No Data</div>
        ),
    },
  ];

  const onSubmit = (val: { remarks: string; upload: UploadFile[] }) => {
    AddMuchulkaRemarks(
      currentPid,
      val.remarks,
      val.upload[0].response.message,
      messageApi
    ).then(() => {
      setRerender(true);
      messageApi.success("Remarks added successfully.");
    });
  };

  const changeMuchulkaStatus = (status: boolean) => {
    if (remarksData && remarksData.length < 1)
      return messageApi.error("Upload muchulka first to change status.");

    dispatch({ type: Ac.setIsMuchulka, payload: status });

    changeApprovedStatus(
      currentPid,
      status ? "UPLOADMUCHULKA" : "NOTICEPUBLISH",
      messageApi
    ).catch(() => {
      dispatch({ type: Ac.setIsMuchulka, payload: !status });
    });
  };

  return (
    <Modal
      className="SelectUserModal"
      open={noticeMuchulkaRemarks}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
        dispatchModal({
          type: AcModal.setNoticeMuchulkaRemarks,
          payload: false,
        });
      }}
      destroyOnClose={true}
    >
      {contextHolder}
      {isNagarjun() ? (
        <div style={{ margin: "15px 0" }}>
          <GenerateMuchulkaBtn /> <Divider type="vertical" />{" "}
          <GenerateSarjiminMuchulkaBtn />
        </div>
      ) : null}

      <div style={{ paddingTop: 20 }}>
        <span style={{ fontSize: 16, fontWeight: 600 }}>
          Is muchulka process completed ?
        </span>{" "}
        <span>
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => changeMuchulkaStatus(!isMuchulka)}
          >
            <Switch checked={isMuchulka} />
          </Popconfirm>
        </span>
      </div>
      <Divider type="horizontal" />
      <h2 style={{ marginBottom: 12 }}>मुचुल्का र अन्य कागजपत्र थप्नुहोस</h2>

      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormProps("remarks", "Remarks")}>
          <Input.TextArea rows={3} placeholder="Remarks" />
        </Form.Item>
        <Form.Item
          // rules={[{ required: true, message: "Please upload Remarks File!" }]}
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            action={IMG_SAVE_URL}
            listType="text"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <SubmitBtn />
      </Form>
      <div style={{ paddingTop: 12 }}>
        {remarksData ? (
          <Table
            dataSource={remarksData.map((data) => ({
              key: data.id,
              remarks: data.remarks,
              remarksFile: data.remarksFile,
              date: data.date?.substring(0, 10),
            }))}
            columns={columns}
            size="middle"
          />
        ) : (
          <Spin />
        )}
      </div>
    </Modal>
  );
};

export default MuchulkaRemarksModal;
