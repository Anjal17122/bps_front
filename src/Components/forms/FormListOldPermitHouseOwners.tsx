import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { ft } from "../../pages/common/OldPermit/OldPermitForm";
import { ColHeight } from "../../Common/Form/FormData";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export default function FormListOldPermitHouseOwners({
  name,
}: {
  name: string;
}) {
  const [IsOrg, setIsOrg] = useState(false);

  const handleIsOrg = (event: CheckboxChangeEvent) => {
    setIsOrg(event.target.checked);
  };

  return (
    <div
      style={{
        background: "white",
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
                <Col span={24} style={{ paddingBottom: 4 }}>
                  <Form.Item
                    style={{ paddingBottom: 0, marginBottom: 0 }}
                    {...restField}
                    label={null}
                    name={[name, "isOrg"]}
                  >
                    <Checkbox onChange={handleIsOrg}>is Organization?</Checkbox>
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    {...restField}
                    label={IsOrg ? ft.orgNameEng : ft.homeOwnerNameEng}
                    name={[name, "name"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder={IsOrg ? ft.orgNameEng : ft.homeOwnerNameEng}
                    />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    {...restField}
                    label={IsOrg ? ft.orgNepali : ft.homeOwnerNameNep}
                    name={[name, "nameNep"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder={IsOrg ? ft.orgNepali : ft.homeOwnerNameNep}
                    />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    {...restField}
                    label={IsOrg ? ft.orgRegNo : ft.homeOwnerCitizenshipNumber}
                    name={[name, "citizenshipNo"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder={
                        IsOrg ? ft.orgRegNo : ft.homeOwnerCitizenshipNumber
                      }
                    />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(8)}>
                  <Form.Item
                    {...restField}
                    label={ft.email}
                    name={[name, "email"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={ft.email} />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    {...restField}
                    label={ft.phoneNo}
                    name={[name, "phoneNo"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={ft.phoneNo} />
                  </Form.Item>
                </Col>

                <Col {...ColHeight(8)}>
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
