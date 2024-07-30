import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import { Dropdown, MenuProps } from "antd";
import NepalFlag from "../../../Assets/gif/flag.webp";
import {
  OrderedListOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  EyeFilled,
  MenuOutlined,
  SwapOutlined,
  TeamOutlined,
  FileOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
  DownloadOutlined,
  ExportOutlined,
  BuildOutlined,
  AimOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "../../../Assets/scss/AdminHeader.scss";
import { MyStore, ActionType } from "../../../Store/ContextApi";
import { DATA_ENTRY_URL } from "../../../constants/constants";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useQueryClient } from "@tanstack/react-query";
import { getToken } from "../../../Services/UserService";

const AdminHeader = () => {
  const { dispatch } = useContext(MyStore);
  const queryClient = useQueryClient();

  let HeaderTitle = "";

  const role = localStorage.getItem("role");
  const wardId = localStorage.getItem("wardId");

  if (role === "ROLE_Ward") {
    HeaderTitle = `Ward-${wardId} Office`;
  } else if (role === "ROLE_Registration") {
    HeaderTitle = "Registration Department";
  } else if (role === "ROLE_Technical_Department") {
    HeaderTitle = "Technical Committee";
  } else if (role === "ROLE_Engineer") {
    HeaderTitle = "Engineer Department";
  } else if (role === "ROLE_Executive") {
    HeaderTitle = "Executive Department";
  } else if (role === "ROLE_Revenue") {
    HeaderTitle = "Revenue Department";
  } else if (role === "ROLE_Napi") {
    HeaderTitle = "Napi Department";
  } else if (role === "ROLE_Ward_Technical") {
    HeaderTitle = "Ward Technical";
  } else if (role === "ROLE_Sub_Engineer") {
    HeaderTitle = "Sub Engineer";
  } else if (role === "ROLE_BuildingR_LandM") {
    HeaderTitle = "Building Regulation and Land Management";
  } else if (role === "ROLE_Asst_Sub_Engineer") {
    HeaderTitle = "Asst Sub Engineer";
  }

  const menu2 = (): ItemType[] => {
    return [
      {
        key: 1,
        label: (
          <Link to="/view/profile" target={"_blank"}>
            <EyeFilled /> &nbsp; View Profile
          </Link>
        ),
      },
      {
        key: 2,
        label: (
          <Link to="/public/login">
            <LogoutOutlined /> &nbsp; Log Out
          </Link>
        ),
        onClick: () => {
          queryClient.invalidateQueries();
          localStorage.clear();
          queryClient.invalidateQueries();
          dispatch({ type: ActionType.resetAll, payload: [] });
        },
      },
    ];
  };

  const menu1 = (): ItemType[] => {
    return [
      {
        key: 1,
        label: (
          <Link to="/admin/stamp">
            <AimOutlined /> &nbsp;
            <span>Stamp Pdf</span>
          </Link>
        ),
      },
      {
        key: 2,
        label: (
          <Link to="/superadmin/floordata">
            <BuildOutlined /> &nbsp;
            <span>Floor Rate</span>
          </Link>
        ),
      },
      {
        key: 3,
        label: (
          <a
            href={DATA_ENTRY_URL("engineer")}
            target="_blank"
            rel="noreferrer noopener"
          >
            <OrderedListOutlined /> &nbsp;
            <span>Old Data</span>
          </a>
        ),
      },

      {
        key: 4,
        label: (
          <Link to="/admin/technicalmembers">
            <UsergroupAddOutlined /> &nbsp;
            <span>Technical Members</span>
          </Link>
        ),
      },
      {
        key: 5,
        label: (
          <Link to="/admin/consultantchange">
            <SwapOutlined /> &nbsp;
            <span>Change Consultant</span>
          </Link>
        ),
      },
      {
        key: 6,
        label: (
          <Link to="/admin/exportdata">
            <ExportOutlined /> &nbsp;
            <span>Export</span>
          </Link>
        ),
      },
      {
        key: 7,
        label: (
          <Link to="/admin/messages">
            <MailOutlined /> &nbsp;
            <span>Messages</span>
          </Link>
        ),
      },
      {
        key: 8,
        label: (
          <Link to="/admin/users">
            <TeamOutlined /> &nbsp;
            <span>Users</span>
          </Link>
        ),
      },
      {
        key: 9,
        label: (
          <Link to="/admin/notice">
            <FileOutlined /> &nbsp;
            <span>Notice</span>
          </Link>
        ),
      },
      {
        key: 10,
        label: (
          <Link to="/admin/faq">
            <QuestionCircleOutlined /> &nbsp;
            <span>FAQs</span>
          </Link>
        ),
      },
      {
        key: 11,
        label: (
          <Link to="/admin/downloads">
            <DownloadOutlined /> &nbsp;
            <span>Downloads</span>
          </Link>
        ),
      },
    ];
  };

  const tutorials: MenuProps["items"] = [
    {
      label: (
        <Link
          to="/tutorial/notice_publish"
          target="_blank"
          rel="noreferrer noopener"
        >
          Notice Published Video
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          to="/tutorial/notice_muchulka"
          target="_blank"
          rel="noreferrer noopener"
        >
          Notice Muchulka Published
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          to="/tutorial/sarjamin_muchulka"
          target="_blank"
          rel="noreferrer noopener"
        >
          Sarjimin Muchulka Published
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          to="/tutorial/drawing_signature"
          target="_blank"
          rel="noreferrer noopener"
        >
          Drawing Signature
        </Link>
      ),
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          to="/tutorial/certificate_signature"
          target="_blank"
          rel="noreferrer noopener"
        >
          Certificate Signature
        </Link>
      ),
      key: "4",
    },
  ];

  return (
    <>
      <div className="NavBarMain">
        <div className="flexcontainer">
          <Link
            style={{ textDecoration: "none" }}
            to={
              localStorage.getItem("role") === "ROLE_Technical" ||
              localStorage.getItem("role") === "ROLE_Ward" ||
              localStorage.getItem("role") === "ROLE_Engineer" ||
              localStorage.getItem("role") === "ROLE_Sub_Engineer" ||
              localStorage.getItem("role") === "ROLE_Executive"
                ? "/admin/adminpanel/technical"
                : "/admin/adminpanel/ondesk"
            }
          >
            <LogoContainer text={HeaderTitle} />
          </Link>

          <div className="NavBarLinks">
            <Dropdown menu={{ items: tutorials }} trigger={["click"]}>
              <span style={{ color: "rgb(56, 146, 182)" }}>
                Tutorials&nbsp;
                <DownOutlined style={{ fontSize: 12 }} />
              </span>
            </Dropdown>
            <Link
              to={
                localStorage.getItem("role") === "ROLE_Technical" ||
                localStorage.getItem("role") === "ROLE_Ward" ||
                localStorage.getItem("role") === "ROLE_Engineer" ||
                localStorage.getItem("role") === "ROLE_Sub_Engineer" ||
                localStorage.getItem("role") === "ROLE_Executive"
                  ? "/admin/adminpanel/technical"
                  : "/admin/adminpanel/ondesk"
              }
            >
              Projects
            </Link>
            <a
              href={
                "https://naksadata-nagarjun.navya.com.np/set/a" +
                `/${getToken()}`
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              Permits{" "}
            </a>
            {!(
              localStorage.getItem("role") === "ROLE_Engineer" ||
              localStorage.getItem("role") === "ROLE_Executive"
            ) ? (
              ""
            ) : (
              <Link to="/admin/naamsari">Naam Sari</Link>
            )}

            {!(
              localStorage.getItem("role") === "ROLE_Engineer" ||
              localStorage.getItem("role") === "ROLE_BuildingR_LandM" ||
              localStorage.getItem("role") === "ROLE_Executive"
            ) ? (
              ""
            ) : (
              <div className="iconNav">
                <Dropdown
                  menu={{ items: menu1() }}
                  trigger={["click"]}
                  placement="bottom"
                >
                  <MenuOutlined style={{ fontSize: 12 }} />
                </Dropdown>
              </div>
            )}
            <div className="iconNav">
              <Dropdown
                menu={{ items: menu2() }}
                placement="bottom"
                trigger={["click"]}
              >
                <UserOutlined style={{ color: "#3892b6", fontSize: 16 }} />
              </Dropdown>
            </div>
            <div className="flag" style={{ paddingLeft: "20px" }}>
              <img src={NepalFlag} alt="" height="30px" width="auto" />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminHeader;
