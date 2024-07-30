import { Link, Outlet } from "react-router-dom";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import { Dropdown } from "antd";
import {
  UsergroupAddOutlined,
  MenuOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../../Assets/scss/AdminHeader.scss";
import { useState } from "react";
import { DATA_ENTRY_URL } from "../../../constants/constants";
import UploadFloorRate from "../../../pages/SuperAdmin/FloorRate/UploadFloorRate";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const SuperAdminWrapper = () => {
  // upload floor rate
  const openUploadFloorRateModal = () => {
    setModalOpen(true);
  };

  const menu1 = (): ItemType[] => {
    return [
      {
        key: 1,
        label: (
          <Link to="/view/profile" target={"_blank"}>
            <UserOutlined /> &nbsp;
            <span>Profile</span>
          </Link>
        ),
      },
      {
        key: 2,
        label: (
          <a
            href={DATA_ENTRY_URL("superadmin")}
            target="_blank"
            rel="noreferrer noopener"
          >
            <OrderedListOutlined /> &nbsp;
            <span>Old Data</span>
          </a>
        ),
      },
      {
        key: 3,
        label: (
          <Link to="/superadmin/digitalsigners">
            <UsergroupAddOutlined /> &nbsp;
            <span>Digital Signers</span>
          </Link>
        ),
      },
      {
        key: 4,
        label: (
          <Link to="/superadmin/drawing/signers" target={"_blank"}>
            <UsergroupAddOutlined /> &nbsp;
            <span>Drawings Signers</span>
          </Link>
        ),
      },

      {
        key: 5,
        label: (
          <Link to="/superadmin/transfersetting">
            <UserOutlined /> &nbsp;
            <span>Transfer Setting</span>
          </Link>
        ),
      },

      {
        key: 6,
        label: (
          <Link to="/superadmin/technicalmembers">
            <UsergroupAddOutlined /> &nbsp;
            <span>Technical Members</span>
          </Link>
        ),
      },
      {
        key: 7,
        label: (
          <>
            <UsergroupAddOutlined /> &nbsp;
            <span>Floor Rate</span>
          </>
        ),
        onClick: openUploadFloorRateModal,
      },
      {
        key: 8,
        label: (
          <Link to="/superadmin/holidays">
            <UsergroupAddOutlined /> &nbsp;
            <span>Holidays</span>
          </Link>
        ),
      },
      {
        key: 9,
        label: (
          <Link to="/public/login">
            <LogoutOutlined /> &nbsp;
            <span>Logout</span>
          </Link>
        ),
        onClick: () => localStorage.removeItem("token"),
      },
    ];
  };

  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <UploadFloorRate isVisible={modalOpen} onClose={onModalClose} />
      <div className="NavBarMain">
        <div className="flexcontainer">
          <Link to="/superadmin/home" style={{ textDecoration: "none" }}>
            <LogoContainer text={"Super Admin"} />
          </Link>
          <div className="NavBarLinks">
            <Link to="/superadmin/projects">Projects</Link>
            <Link to="/superadmin/home">Admins</Link>

            <Link to="/superadmin/users">Users</Link>
            <Link to="/superadmin/floordata">Floor Data</Link>

            <div className="iconNav">
              <Dropdown
                menu={{ items: menu1() }}
                trigger={["click"]}
                placement="bottom"
              >
                <MenuOutlined style={{ fontSize: 12 }} />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default SuperAdminWrapper;
