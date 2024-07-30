import {
  Button,
  Cascader,
  message,
  Popover,
  Radio,
  RadioChangeEvent,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { toList } from "../../../Common/Form/FormData";
import { CommonType } from "../../../Services/AddressService";
import { ChangeAdminRole } from "../../../Services/AdminService";
import {
  ChangeDigitalSignStatus,
  DigitalSignStatus,
} from "../../../Services/ChangeDigitalSignatureStatus/ChangeDigitalSignatureStatus";
import { CreateResetPassUrl } from "../../../Services/ForgotPassService";
import { getAdminType } from "../../../Services/SuperAdminService";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

interface ConsultantMapped {
  key: number;
  id: number;
  name: string;
  email: string;
  phone: string;
  approved: boolean;
  emSignerStatus: DigitalSignStatus;
}

interface Props {
  data: ConsultantMapped[] | undefined;
  onClick: (rowData: number) => void;
  type: "unapproved" | "approved" | "disabled";
  onDigitalSignStatusSuccess: (status: DigitalSignStatus, id: number) => void;
}

const ConsultantsListTable = ({
  data,
  onClick,
  type = "unapproved",
  onDigitalSignStatusSuccess,
}: Props) => {
  const [url, setUrl] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [adminTypes, setAdminTypes] = useState<CommonType[]>([]);
  const { disabled } = useStoreGlobal();

  useEffect(() => {
    getAdminType().then((res) => setAdminTypes(res.data));

    return () => {
      setAdminTypes([]);
    };
  }, []);

  const copyText = () => {
    navigator.clipboard.writeText(url ?? "");
  };

  const CreateUrl = (id: number) => {
    CreateResetPassUrl(id, messageApi).then((res: any) => {
      const url =
        (window.globalConfig.myDomain ?? "") +
        "/public/resetpassword/" +
        res.data.replaceAll(".", "+");
      setUrl(url);
    });
  };

  const content = (
    <div style={{ width: 350 }}>
      <p
        style={{
          wordWrap: "break-word",
          fontSize: 11,
          color: "rgba(0, 0, 0, 0.35)",
        }}
      >
        {disabled ? "loading" : url}
      </p>
      <button className="NoStyleBtnSm" onClick={copyText}>
        copy
      </button>
    </div>
  );
  const options = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Disabled", value: "Disabled" },
  ];

  const onChange3 = ({ target: { value } }: RadioChangeEvent, id: number) => {
    if (confirm("Are you sure")) {
      ChangeDigitalSignStatus(value, id, messageApi).then(() => {
        onDigitalSignStatusSuccess(value, id);
      });
    } else {
      message.info("Cancelled");
    }
  };

  const digitalSignatureStatus = (
    id: number,
    emSignerStatus: DigitalSignStatus
  ): JSX.Element => (
    <div style={{ width: 200 }}>
      <Radio.Group
        buttonStyle="solid"
        size="small"
        options={options}
        onChange={(e) => onChange3(e, id)}
        value={emSignerStatus}
        optionType="button"
      />
    </div>
  );

  const columns = [
    {
      title: "Mun No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (rowData: ConsultantMapped) => (
        <Button
          type={"link"}
          size="middle"
          style={{ padding: 0 }}
          onClick={() => onClick(rowData.id)}
        >
          {!rowData.approved ? "View" : "View"}
        </Button>
      ),
    },
  ];

  const colResetPassword = [
    {
      title: "Reset Password",
      key: "action2",
      render: (rowData: ConsultantMapped) => (
        <Popover content={content} title="Password Reset Link" trigger="click">
          <Button
            size="small"
            disabled={disabled}
            onClick={() => CreateUrl(rowData.id)}
          >
            Get Url
          </Button>
        </Popover>
      ),
    },
    {
      title: "Digital Signature",
      key: "action3",
      render: (rowData: ConsultantMapped) => (
        <Popover
          content={digitalSignatureStatus(rowData.id, rowData.emSignerStatus)}
          title="Change Status"
          trigger="click"
        >
          <button className="GreenBorderBtn" style={{ fontSize: 12 }}>
            {rowData.emSignerStatus}
          </button>
        </Popover>
      ),
    },

    // {
    //   title: "Make Admin",
    //   key: "setToAdmin",
    //   render: (rowData: ConsultantMapped) => (
    //     <Cascader
    //       disabled={submitting}
    //       onChange={(vals, arg2) => {
    //         if (confirm("Are you sure?") === true) {
    //           ChangeAdminRole(rowData.id, vals[0], setSubmitting).then(() => {
    //             message.success(`Changed User to ${arg2[0].label}!`);
    //           });
    //         } else {
    //           message.error("Cancelled!");
    //         }
    //       }}
    //       options={toList(adminTypes)}
    //       style={{ width: 80 }}
    //       placeholder="Role"
    //     />
    //   ),
    // },
  ];

  return (
    <div>
      {contextHolder}
      <Table
        dataSource={data}
        columns={
          type === "approved" ? columns.concat(colResetPassword) : columns
        }
        size="small"
      />
    </div>
  );
};

export default ConsultantsListTable;
