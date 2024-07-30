import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { LogoContainer } from "../HomeNav/LogoContainer";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import UserIcon from "../../Assets/Images/usericon.png";
import { useQueryClient } from "@tanstack/react-query";

const MyAccount = () => {
  const location = useLocation();
  const profile = location.pathname.replace(/[^/]*$/, "myprofile");
  const queryClient = useQueryClient();

  const history = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <Link to={profile}>
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            queryClient.invalidateQueries();

            localStorage.clear();
            history("/public/login");
          }}
          style={{ color: "#1890ff" }}
        >
          <LogoutOutlined style={{ color: "#1890ff" }} /> Log Out
        </div>
      ),
    },
  ];
  // );

  // (
  //   <div className="AccountMenu">
  //     <div>
  //       <Link to={profile}>
  //         <UserOutlined /> Profile
  //       </Link>
  //     </div>
  //
  //   </div>

  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        className="hoverOnPoint"
        placement="bottom"
      >
        <div>
          <img src={UserIcon} alt="" width="auto" height="25px" />
        </div>
      </Dropdown>
    </div>
  );
};

const AccountMenu = MyAccount;

const Navbar = () => {
  return (
    <>
      <div id="NavBarMain">
        <div id="flexcontainer">
          <LogoContainer onClick={() => {}} />
          <div>
            <h4>Test Name</h4>
          </div>
          <div id="NavBarLinks">
            <AccountMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
