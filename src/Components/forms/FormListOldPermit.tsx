import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Form, Input } from "antd";
import { floorTypes } from "../../pages/Consultant/ProjectCreate/Technical/DesignFloor/DesignFloorDatas";

export default function FormListOldPermit({ name }: { name: string }) {
  return (
    <div className="">
      <Form.List name={name} initialValue={[{ description: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <Form.Item
                  {...restField}
                  label={"Floor Name"}
                  // label={DisabilityNames.trainingName}
                  name={[name, "floorName"]}
                  rules={[{ required: true }]}
                >
                  <Cascader placeholder="Floor Name" options={floorTypes} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={"Floor Area"}
                  name={[name, "floorArea"]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="description" />
                </Form.Item>

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
                ></Button>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
}
