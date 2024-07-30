import { useState } from "react";
import "../../../Assets/scss/AdminCard.scss";
import {
  Button,
  Cascader,
  Input,
  Menu,
  message,
  Popover,
  Radio,
  RadioChangeEvent,
  Switch,
  Tooltip,
} from "antd";
import { SwapOutlined, MenuOutlined } from "@ant-design/icons";
import { CommonType } from "../../../Services/AddressService";
import { toList } from "../../../Common/Form/FormData";
import { ChangeAdminRole } from "../../../Services/AdminService";
import { sN } from "../../../Services/ProjectService";
import { DefaultOptionType } from "antd/lib/cascader";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";
import {
  ChangeDigitalSignStatus,
  DigitalSignStatus,
} from "../../../Services/ChangeDigitalSignatureStatus/ChangeDigitalSignatureStatus";
import { setWardAdmin } from "../../../Services/SuperAdminService";
import { wards } from "../../../constants/constants";

interface Props {
  username: string;
  email: string;
  onChangePassword: (email: string, newp: string) => void;
  onChangeAccess: (e: boolean) => void;
  role: string;
  id: number;
  status: "enabled" | "disabled";
  onViewAdmin: (id: number) => void;
  adminTypes: CommonType[];
  onChangeAdminRoleSuccess: (adminId: sN, roleId: DefaultOptionType[]) => void;
  emSignerStatus: DigitalSignStatus;
}

const AdminCard = (props: Props) => {
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  const options = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Disabled", value: "Disabled" },
  ];

  const [value3, setDigitalSignStatus] = useState(props.emSignerStatus);

  const onChange3 = ({ target: { value } }: RadioChangeEvent, id: number) => {
    if (confirm("Are you sure")) {
      ChangeDigitalSignStatus(value, id, messageApi).then(() => {
        setDigitalSignStatus(value);
      });
    } else {
      message.info("Cancelled");
    }
  };

  const digitalSignatureStatus = (id: number): JSX.Element => (
    <div style={{ width: 200 }}>
      <Radio.Group
        buttonStyle="solid"
        size="small"
        options={options}
        onChange={(e) => onChange3(e, id)}
        value={value3}
        optionType="button"
      />
    </div>
  );

  return (
    <div className="AdminCard">
      {contextHolder}
      <div className="icon">A</div>
      <div className="name">
        {props.username}
        &nbsp;&nbsp;&nbsp;
        <span style={{ fontSize: 12, color: "#808080c6" }}>{props.role}</span>
        <br />
        <span>Email: {props.email}</span>
      </div>
      <div className="switch">
        <div className="items">
          <Popover
            content={
              <div>
                <Input
                  style={{ width: 100 }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  loading={disabled}
                  type="primary"
                  onClick={() => props.onChangePassword(props.email, password)}
                >
                  Submit
                </Button>
              </div>
            }
            title="Change Admin Password"
            trigger="click"
          >
            <Tooltip title="Change Password">
              <Button className="changepw">
                <SwapOutlined style={{ color: "#ffba0a" }} />
              </Button>
            </Tooltip>
          </Popover>
        </div>
        <div className="items">
          <Switch
            disabled={disabled}
            size="small"
            checked={props.status === "enabled" ? true : false}
            onChange={(e) => props.onChangeAccess(e)}
          />
        </div>
        <div className="items">
          <Popover
            content={
              <Menu
                items={[
                  {
                    key: "viewAdmin",
                    label: "View Admin",
                    onClick: () => props.onViewAdmin(props.id),
                  },
                  {
                    key: "digiStatus",
                    label: (
                      <Popover
                        content={digitalSignatureStatus(props.id)}
                        title="Change Status"
                        trigger="click"
                      >
                        Digital Sign Status
                      </Popover>
                    ),
                  },
                  {
                    key: "changeRole",
                    label: (
                      <Cascader
                        disabled={disabled}
                        onChange={(vals, arg2) => {
                          if (confirm("Are you sure?") == true) {
                            ChangeAdminRole(props.id, vals[0], messageApi).then(
                              () => {
                                messageApi.success("Success!");
                                props.onChangeAdminRoleSuccess(props.id, arg2);
                              }
                            );
                          } else {
                            messageApi.error("Cancelled!");
                          }
                        }}
                        options={toList(props.adminTypes)}
                        style={{ width: 140 }}
                        placeholder="Change Role"
                      />
                    ),
                  },
                  {
                    key: "setWard",
                    label: (
                      <Cascader
                        disabled={disabled}
                        onChange={(vals, arg2) => {
                          if (confirm("Are you sure?") == true) {
                            setWardAdmin(
                              { personId: props.id, wardId: vals[0] },
                              messageApi
                            ).then(() => {
                              // messageApi.success("Success!");
                            });
                          } else {
                            messageApi.error("Cancelled!");
                          }
                        }}
                        options={wards}
                        style={{ width: 140 }}
                        placeholder="Set Ward"
                      />
                    ),
                  },
                ]}
              ></Menu>
            }
            trigger="click"
          >
            <Button className="morebtn">
              <MenuOutlined style={{ fontSize: 18, color: "grey" }} />
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
