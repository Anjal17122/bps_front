import { useState } from "react";
import "./FloorCategories.scss";

import { Button, Form, Input, Modal, Spin, message } from "antd";
import "./FloorCategories.scss";
import { CaretRightOutlined } from "@ant-design/icons";

import { PlusOutlined } from "@ant-design/icons";

import { MappedAreaCat } from "./FloorRate";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  POSTareaCategoryBody,
  POSTbuildingCategory,
} from "../../../Services/SuperAdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  OpenBuildingCatModal: () => void;
  buildingCats: MappedAreaCat[] | undefined;
  onPostBuildingCatSuccess: () => void;
}

// const BuildingCategories = ({ OpenBuildingCatModal, buildingCats }: Props) => {
//   return (
//     <div className="FloorCategories">
//       <div className="CategoryCard">
//         <div className="RightTop">
//           <Button
//             icon={<PlusOutlined />}
//             onClick={OpenBuildingCatModal}
//           ></Button>
//         </div>
//         <h4>Building Category</h4>
//         <ul>
//           {buildingCats ? (
//             buildingCats.map((floor) => (
//               <li key={floor.id}>
//                 <ForwardFilled style={{ color: "#FF8A00" }} />{" "}
//                 <span style={{ paddingLeft: 20 }}>{floor.name}</span>
//               </li>
//             ))
//           ) : (
//             <Spin />
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

const BuildingCategories = ({
  OpenBuildingCatModal,
  buildingCats,
  onPostBuildingCatSuccess,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (val: { name: string }) => {
    const body: POSTareaCategoryBody = {
      level: currentLevel,
      name: val.name,
      parentId: currentID,
    };
    POSTbuildingCategory(body, messageApi).then(() =>
      onPostBuildingCatSuccess()
    );
  };

  const [form] = Form.useForm();

  return (
    <div>
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
          <b style={{ fontWeight: 500 }}>Add Building Categorysss:</b>{" "}
          <span>For {currentName}</span>
          <Form.Item {...FormProps("name", "Name")}>
            <Input placeholder="Name" />
          </Form.Item>
          <SubmitBtn />
        </Form>
      </Modal>
      <div className="RightTop">
        <Button icon={<PlusOutlined />} onClick={OpenBuildingCatModal}></Button>
      </div>
      <ul id="myUL">
        {buildingCats ? (
          buildingCats.map((area) => (
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
                    />
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
          ))
        ) : (
          <Spin />
        )}
      </ul>
    </div>
  );
};

export default BuildingCategories;
