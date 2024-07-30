import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Form, Input } from "antd";
import { direction } from "../../pages/Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";

export default function FormListSarjim() {
  return (
    <div className="full-width">
      <Form.List
        name={"witnesses"}
        initialValue={[{ name: "", dateOfBirth: "" }]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <Form.Item
                  {...restField}
                  label={key < 1 ? "दिशा" : null}
                  name={[name, "direction"]}
                  // rules={[{ required: true, message: "Required!" }]}
                >
                  <Cascader placeholder="" options={direction} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={key < 1 ? "कित्ता नं" : null}
                  name={[name, "kittaNo"]}
                  // rules={[{ required: true, message: "Required!" }]}
                >
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  label={key < 1 ? "नाम" : null}
                  name={[name, "name"]}
                  // rules={[{ required: true, message: "Required!" }]}
                >
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  label={key < 1 ? "जन्म मिति (B.S)" : null}
                  name={[name, "dateOfBirth"]}
                  // rules={[{ required: true, message: "Required!" }]}
                >
                  <Input placeholder="YYYY-MM-DD" />
                </Form.Item>

                {/* <Form.Item
                  label="Citizenship"
                  name={[name, "citizenshipPhoto"]}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="file"
                    action={IMG_SAVE_URL}
                    listType="text"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item> */}

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
                <Form.Item>
                  <Button
                    style={{ display: key < 1 ? "block" : "none" }}
                    className="add-training"
                    type="primary"
                    ghost
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  ></Button>
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
}
