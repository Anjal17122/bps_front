import {
  Col,
  Modal,
  Cascader,
  Row,
  Upload,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
} from "antd";
import { useEffect, useState } from "react";
import {
  imgFolders,
  IMG_GET_URL,
  IMG_SAVE_URL,
  PDF_URL,
} from "../../Services/Api";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  ColHeight,
  FormProps,
  submitFailedFinal,
  toList,
} from "../Form/FormData";
import {
  AutocadFilesBody,
  AutocadFileTBody,
  DelAutocadFile,
  GetAutocadFiles,
  GetAutocadTypes,
  POSTautocad,
  POSTautocadBody,
} from "../../Services/AutoCadService";
import { sN } from "../../Services/ProjectService";
import { AutocadVal } from "./UploadAutocadTypes";
import { checkIfPDF } from "../../pages/Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { normFile } from "../../constants/antdConstants";
import { copyImageFinal } from "../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../Components/Common/SubmitBtn/SubmitBtn";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  projectId: sN;
};

const UploadAutoCad = ({ isVisible, onClose, projectId }: Props) => {
  const [fileType, setFileType] = useState<AutocadFileTBody[]>([]);

  const [autoCadList, setAutoCadList] = useState<AutocadFilesBody[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GetAutocadTypes().then((res) => setFileType(res.data));
    GetAutocadFiles(projectId).then((res) => setAutoCadList(res.data));
    return () => {
      setAutoCadList([]);
      setFileType([]);
    };
  }, []);

  const deleteAutocad = (id: sN) => {
    DelAutocadFile(id, messageApi).then(() => {
      setAutoCadList((prev) => prev.filter((prevvv) => prevvv.id !== id));
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "filename",
      render: (text: AutocadFilesBody) => (
        <a
          href={
            (checkIfPDF(text.filename) ? PDF_URL : IMG_GET_URL) +
            `/${imgFolders.autocad}/${text.filename}`
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          {text.filename}
        </a>
      ),
    },
    {
      title: "File Type",
      key: "fileTypeId",
      render: (text: AutocadFilesBody) => (
        <span>
          {fileType.filter((filety) => filety.id === text.fileTypeId)[0].name}
        </span>
      ),
    },
    {
      title: "Project Id",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text: AutocadFilesBody) => (
        <div>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deleteAutocad(text.id)}
            okText="Yes"
            cancelText="No"
            onCancel={() => messageApi.info("Cancelled!")}
          >
            <Button type="primary" danger size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();
  const handleSubmit = (values: AutocadVal) => {
    const filename = values.upload[0].response.message;
    const body: POSTautocadBody = {
      filename: filename,
      fileTypeId: values.fileTypeId[0],
      projectId: projectId,
      removeStatus: "Unchecked",
      status: "Unchecked",
    };
    copyImageFinal(
      [{ dir: imgFolders.autocad, fileName: filename }],
      messageApi
    ).then(() => {
      POSTautocad(body, messageApi).then((res) => {
        setAutoCadList((prev) => [...prev, res.data]);
        form.resetFields();
      });
    });
  };

  return (
    <Modal
      width={700}
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={false}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <h1 style={{ paddingBottom: 5, fontSize: 18 }}>Autocad Uploader</h1>
      {contextHolder}
      <Form
        form={form}
        onFinishFailed={(e) => submitFailedFinal(e, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={10}>
          <Col {...ColHeight(10)}>
            <Form.Item {...FormProps("fileTypeId", "Category")}>
              <Cascader placeholder="Category" options={toList(fileType)} />
            </Form.Item>
          </Col>
          <Col {...ColHeight(10)}>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload files!" }]}
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
          </Col>
          <Col {...ColHeight(4)}>
            <SubmitBtn />
          </Col>
        </Row>
      </Form>
      <Table
        rowKey={"id"}
        size="small"
        columns={columns}
        dataSource={autoCadList}
      ></Table>
    </Modal>
  );
};

export default UploadAutoCad;
