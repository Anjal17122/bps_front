import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  Form,
  Input,
  Upload,
  message,
  notification,
} from "antd";
import { normFile } from "../../constants/antdConstants";
import { IMG_SAVE_URL } from "../../Services/Api";
import { wards } from "../../Common/Constants";

export default function FormList() {
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
                key={key + name}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <Form.Item
                  style={{ width: 90 }}
                  {...restField}
                  label={key < 1 ? "वडा" : null}
                  name={[name, "ward"]}
                  // rules={[{ required: true, message: "Required!" }]}
                >
                  <Cascader placeholder="वडा" options={wards} />
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
                  label={key < 1 ? "जन्म मिति (BS)" : null}
                  name={[name, "dateOfBirth"]}
                >
                  <Input
                    placeholder="YYYY-MM-DD"
                    onBlur={(e) => {
                      const val = e.target.value;
                      const regex = /^\d{4}-\d{2}-\d{2}$/;
                      if (!regex.test(val)) {
                        return notification.error({
                          message:
                            "Invalid date format. YYYY-MM-DD is required!",
                        });
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
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
                {/* <Form.Item> */}
                <Button
                  style={{ display: key < 1 ? "block" : "none" }}
                  className="add-training"
                  type="primary"
                  ghost
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                ></Button>
                {/* </Form.Item> */}
              </div>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
}
