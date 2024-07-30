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

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { copyImageFinal } from "../../../../Services/AddressService";
import {
  IMG_GET_URL,
  IMG_SAVE_URL,
  PDF_URL,
  imgFolders,
} from "../../../../Services/Api";
import {
  ColHeight,
  toList,
  FormProps,
  submitFailedFinal,
} from "../../../../Common/Form/FormData";
import { AutocadVal } from "../../../../Common/UploadAutoCad/UploadAutocadTypes";
import {
  AutocadFileTBody,
  AutocadFilesBody,
  GetAutocadTypes,
  GetAutocadFiles,
  POSTautocadBody,
  POSTautocadFinal,
  DelAutocadFileFinal,
} from "../../../../Services/AutoCadService";
import { sN } from "../../../../Services/ProjectService";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";

import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { normFile } from "../../../../constants/antdConstants";

const UploadAutoCad = () => {
  const { uploadAutoCad } = useStoreModalCon();
  const { currentPid, disabled } = useStoreViewProj();
  const [fileType, setFileType] = useState<AutocadFileTBody[]>([]);

  const [autoCadList, setAutoCadList] = useState<AutocadFilesBody[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GetAutocadTypes().then((res) => setFileType(res.data));
    GetAutocadFiles(currentPid).then((res) => setAutoCadList(res.data));
    return () => {
      setAutoCadList([]);
      setFileType([]);
    };
  }, []);

  const deleteAutocad = (id: sN) => {
    DelAutocadFileFinal(id, messageApi).then(() => {
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
      projectId: currentPid,
      removeStatus: "Unchecked",
      status: "Unchecked",
    };
    copyImageFinal(
      [{ dir: imgFolders.autocad, fileName: filename }],
      messageApi
    ).then(() => {
      POSTautocadFinal(body, messageApi).then((res) => {
        setAutoCadList((prev) => [...prev, res.data]);
        form.resetFields();
      });
    });
  };

  return (
    <Modal
      width={700}
      bodyStyle={{ borderRadius: 16 }}
      open={uploadAutoCad}
      footer={false}
      maskClosable={false}
      onCancel={() => {
        dispatch({
          type: Ac.setCurrentPid,
          payload: 0,
        });
        dispatchModalCon({
          type: AcMCon.setuploadAutoCad,
          payload: false,
        });
      }}
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
            <Button type="primary" htmlType="submit" loading={disabled}>
              Submit
            </Button>
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
