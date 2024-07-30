import { Fragment, useEffect, useState } from "react";
import { Button, message, Pagination,  } from "antd";
import { Link } from "react-router-dom";
import {
  AdminBody,
  changeAdminAccess,
  changeAdminPass,
  getAdmins,
  getAdminType,
  putAdminPass,
} from "../../../Services/SuperAdminService";
import AdminCard from "./AdminCard";
import "../../../Assets/scss/AdminList.scss";
import ConsultantDetail from "../../Admin/Consultants/ConsultantDetail";
import { UserToVerify } from "../../../Services/UserService";
import { CommonType } from "../../../Services/AddressService";
import { sN } from "../../../Services/ProjectService";
import { DefaultOptionType } from "antd/lib/cascader";
import PageHeaderExtra from "../../../Components/Common/PageHeader/PageHeaderExtra";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

const AdminList = () => {
  const [admins, setAdmins] = useState<AdminBody[]>();
  const [total, setTotal] = useState(0);

  const [adminTypes, setAdminTypes] = useState<CommonType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  useEffect(() => {
    getAdmins(10, messageApi).then((res) => {
      setAdmins(res.data.adminList);
      setTotal(res.data.totalRows);
      getAdminType().then((res) => setAdminTypes(res.data));
    });
    return () => {
      setAdmins(undefined);
      setTotal(0);
      setAdminTypes([]);
    };
  }, []);

  const onChangePassword = (email: string, newp: string) => {
    const body: putAdminPass = { email, newp };
    changeAdminPass(body, messageApi);
  };

  const onChangeAccess = (val: boolean, adminid: number, index: number) => {
    changeAdminAccess(val ? "enabled" : "disabled", adminid, messageApi).then(
      () => {
        const init = [...(admins || [])];
        const row = init[index];
        const newROw = { ...row, userStatus: val ? "enabled" : "disabled" };
        init[index] = newROw as any;
        setAdmins(init);
        messageApi.success("Changed Status Successfully!");
      }
    );
  };

  const onPageChange = (page: number) => {
    getAdmins(10, messageApi, page - 1).then((res) => {
      setAdmins(res.data.adminList);
      setTotal(res.data.totalRows);
    });
  };

  const [adminDetailIsOPen, setAdminDetailIsOPen] = useState(false);

  const [adminDetail, setAdminDetail] = useState<UserToVerify>();
  const onViewAdmin = (id: number) => {
    setAdminDetailIsOPen(true);
    setAdminDetail(
      admins?.filter((admin) => admin.id === id)[0] as UserToVerify
    );
  };

  const onChangeAdminRoleSuccess = (
    adminId: sN,
    roleId: DefaultOptionType[]
  ) => {
    const myindex: number =
      admins?.findIndex((adminsss) => {
        return adminsss.id === adminId;
      }) ?? 0;
    const initArr = [...(admins ?? [])];
    if (myindex >= 0) {
      initArr[myindex ?? 0].personRole.id = parseInt(
        roleId[0]?.value as string
      );
      initArr[myindex ?? 0].personRole.name = roleId[0].label?.toString() ?? "";
    }
    setAdmins(initArr);
  };

  return (
    <>
      {contextHolder}
      <ConsultantDetail
        user={adminDetail}
        isOpen={adminDetailIsOPen}
        onCancel={() => {
          setAdminDetailIsOPen(false);
        }}
        perma={true}
      />
      <PageHeaderExtra
        title="Admins List"
        subTitle="Admin Control Panel"
        extra={[
          <Link key={1} to="/superadmin/addadmin">
            <Button type="primary">Add Admin</Button>
          </Link>,
        ]}
      />

      <div className="AdminList">
        {admins &&
          admins.map((admin, i) => (
            <Fragment key={admin.id}>
              <AdminCard
                emSignerStatus={admin.emSignerStatus}
                onChangeAdminRoleSuccess={onChangeAdminRoleSuccess}
                adminTypes={adminTypes}
                onViewAdmin={onViewAdmin}
                id={admin.id}
                status={admin.userStatus}
                role={admin.personRole.name}
                email={admin.email}
                username={admin.nameEng}
                onChangeAccess={(e) => onChangeAccess(e, admin.id, i)}
                onChangePassword={onChangePassword}
              />
            </Fragment>
          ))}
        <Pagination
          pageSize={10}
          disabled={disabled}
          onChange={onPageChange}
          total={total}
          showSizeChanger={false}
          style={{ background: "white", padding: 10 }}
        />
      </div>
    </>
  );
};

export default AdminList;
