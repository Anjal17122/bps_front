import { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import "./FloorCategories.scss";
import { PlusOutlined, CaretRightOutlined } from "@ant-design/icons";
import { MappedAreaCat } from "./FloorRate";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  POSTareaCategoryBody,
  POSTareaCategory,
} from "../../../Services/SuperAdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  OpenAreaAddModal: () => void;
  areaCats: MappedAreaCat[] | undefined;
  onPostAreaCatSuccess: () => void;
}

const AreaCategories = ({
  OpenAreaAddModal,
  areaCats,
  onPostAreaCatSuccess,
}: Props) => {
  const [form] = Form.useForm();

  const [modalOpen, setModalOpen] = useState(false);

  const [currentID, setCurrentID] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (val: any) => {
    const body: POSTareaCategoryBody = {
      level: currentLevel,
      name: val.name,
      parentId: currentID,
    };
    POSTareaCategory(body, messageApi).then(() => onPostAreaCatSuccess());
  };

  return (
    <>
      <Modal
        className="SelectUserModal"
        bodyStyle={{ borderRadius: 16 }}
        open={modalOpen}
        footer={false}
        maskClosable={true}
        onCancel={() => {
          // setCurrentName("");
          setModalOpen(false);
        }}
        destroyOnClose={true}
      >
        {contextHolder}
        <Form
          form={form}
          className="AddAdmin"
          onFinishFailed={submitFailed}
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <b style={{ fontWeight: 500 }}>Add Area Category:</b>{" "}
          <span>For {currentName}</span>
          <Form.Item {...FormProps("name", "Name")}>
            <Input placeholder="Name" />
          </Form.Item>
          <SubmitBtn />
        </Form>
      </Modal>
      <div className="RightTop">
        <Button icon={<PlusOutlined />} onClick={OpenAreaAddModal}></Button>
      </div>
      <ul id="myUL">
        {areaCats?.length &&
          areaCats.map((area) => (
            <li key={area.id}>
              <span className="caret">{area.name}</span> &nbsp; &nbsp;
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setCurrentID(area.id);
                  setCurrentLevel(2);
                  setCurrentName(area.name);
                }}
                size="small"
                type="primary"
                ghost
                icon={<PlusOutlined />}
              ></Button>
              <ul>
                {area.children?.map((kid1) => (
                  <li key={kid1.id}>
                    <CaretRightOutlined /> {kid1.name} &nbsp; &nbsp;
                    <Button
                      onClick={() => {
                        setModalOpen(true);
                        setCurrentID(kid1.id);
                        setCurrentLevel(3);
                        setCurrentName(area.name);
                      }}
                      size="small"
                      type="primary"
                      ghost
                      icon={<PlusOutlined />}
                    ></Button>
                    <ul>
                      {kid1.children?.map((kid2) => (
                        <li key={kid2.id}>
                          <CaretRightOutlined /> {kid2.name} &nbsp; &nbsp;
                          <Button
                            onClick={() => {
                              setModalOpen(true);
                              setCurrentID(kid2.id);
                              setCurrentLevel(4);
                              setCurrentName(kid1.name);
                            }}
                            size="small"
                            type="primary"
                            ghost
                            icon={<PlusOutlined />}
                          ></Button>
                          <ul>
                            {kid2.children?.map((kid3) => (
                              <li key={kid3.id}>
                                <CaretRightOutlined /> {kid3.name} &nbsp; &nbsp;
                                <Button
                                  onClick={() => {
                                    setModalOpen(true);
                                    setCurrentID(kid3.id);
                                    setCurrentLevel(5);
                                    setCurrentName(kid2.name);
                                  }}
                                  size="small"
                                  type="primary"
                                  ghost
                                  icon={<PlusOutlined />}
                                ></Button>
                                <ul>
                                  {kid3.children?.map((kid4) => (
                                    <li key={kid4.id}>
                                      <CaretRightOutlined /> {kid4.name}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default AreaCategories;
