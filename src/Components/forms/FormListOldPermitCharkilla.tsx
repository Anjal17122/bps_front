import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Col, Form, Input, Row } from "antd";
import { ColHeight } from "../../Common/Form/FormData";
import {
  direction,
  landscape,
  side,
} from "../../pages/Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";

export default function FormListOldPermitCharkilla({ name }: { name: string }) {
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <Form.List name={name} initialValue={[{ description: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row
                key={key}
                gutter={24}
                style={{
                  padding: "20px 10px 0 10px",
                  marginBottom: 4,
                  marginLeft: 10,
                  marginRight: 20,
                }}
              >
                <Col {...ColHeight(4)}>
                  <Form.Item
                    {...restField}
                    label={"Direction"}
                    name={[name, "direction"]}
                    rules={[{ required: true }]}
                  >
                    <Cascader placeholder="Direction" options={direction} />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(4)}>
                  <Form.Item
                    {...restField}
                    label={"Side"}
                    name={[name, "side"]}
                    rules={[{ required: true }]}
                  >
                    <Cascader placeholder="Side" options={side} />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(5)}>
                  <Form.Item
                    {...restField}
                    label={"Landscape Type"}
                    name={[name, "landscapeType"]}
                    rules={[{ required: true }]}
                  >
                    <Cascader
                      options={landscape}
                      placeholder="Landscape Type"
                    />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(5)}>
                  <Form.Item
                    {...restField}
                    label={"नाम (Nepali)"}
                    name={[name, "nameNep"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="नाम (Nepali)" />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(5)}>
                  <Form.Item
                    {...restField}
                    label={"Name (English)"}
                    name={[name, "nameEng"]}
                  >
                    <Input placeholder="Name (English)" />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(4)}>
                  <Form.Item
                    {...restField}
                    label={"Kitta No"}
                    name={[name, "kittaNo"]}
                  >
                    <Input placeholder="Kitta No" />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(4)}>
                  <Form.Item
                    {...restField}
                    label={"Actual setback"}
                    name={[name, "actualSetBack"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Actual setback" />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(6)}>
                  <Form.Item
                    {...restField}
                    label={"Standard Setback"}
                    name={[name, "standardSetBack"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Standard Setback" />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(4)}>
                  <DeleteOutlined
                    className="myfromdel"
                    style={{
                      color: "red",
                      marginTop: -10,
                      height: 40,
                      width: 40,
                    }}
                    onClick={() => {
                      if (fields.length < 2 || key === 0) return;
                      remove(name);
                    }}
                  />
                  <Button
                    style={{ display: key < 1 ? "block" : "none" }}
                    className="add-training"
                    type="primary"
                    ghost
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
}
