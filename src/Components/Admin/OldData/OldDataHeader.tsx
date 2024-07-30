import React, { useState } from "react";
import { Menu } from "antd";
import { FilePptOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import NepalFlag from "../../../Assets/gif/flag.webp";
import OldDataSteps from "./OldDataSteps";

const OldDataHeader = () => {
  const { SubMenu } = Menu;
  const [current, setCurrent] = useState<React.Key>("projects");
  const onChangeNav = (e: { key: React.Key }) => {
    setCurrent(e.key);
  };

  return (
    <>
      <div className="DashNavAnt">
        <div>
          <Link to="/admin/olddata">
            <LogoContainer text="Data Entry" />
          </Link>
        </div>
        <Menu
          style={{ width: 270 }}
          onClick={onChangeNav}
          selectedKeys={[current.toString()]}
          mode="horizontal"
        >
          <SubMenu key="projects" icon={<FilePptOutlined />} title="Projects">
            <Menu.ItemGroup>
              <Menu.ItemGroup title="Create Projects">
                <Menu.Item key="create">
                  <Link
                    to="/admin/addolddata"
                    onClick={() => {
                      localStorage.setItem("isPerma", "");
                      localStorage.setItem("showBothBtns", "false");
                    }}
                  >
                    Enter Old Data
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu key="user" icon={<UserOutlined />} title="Account">
            <Menu.ItemGroup>
              <Menu.Item key="profile">Profile</Menu.Item>
              <Menu.Item key="logout">
                <Link to="/public/login">Log Out</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            key="flag"
            disabled
            icon={<img src={NepalFlag} alt="" height="30px" width="auto" />}
          ></SubMenu>
        </Menu>
      </div>
      <div>
        <OldDataSteps />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default OldDataHeader;

// import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import { LogoContainer } from "../../../Common/HomeNav/HomeNav";
// import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// // import NepalFlag from "../../../Assets/gif/Flag_of_Nepal.gif";
// // import MenuIcon from "../../../Assets/Images/menu_icon.png";
// import { Button } from "antd";

// const OldDataHeader = ({ component: Component, ...props }: any) => {
//   return (
//     <>
//       <div id="NavBarMain">
//         <div id="flexcontainer">

//           <Link to="/consultant/home">
//             <LogoContainer text="Consultant" />
//           </Link>
//           <div id="NavBarLinks">
//             <Link to="/consultant/home">Home</Link>
//             {/* <span> */}
//             <Link to="/public/login">
//               <Button type="primary">Log Out</Button>
//             </Link>
//             {/* </span> */}
//             {/* <div>
//             <img src={NepalFlag} alt="" height="30px" width="auto" />
//           </div> */}
//           </div>
//           {/* <div id="BurgerWrapper">
//             <div style={{ width: "30px" }}>
//               <img
//                 src={MenuIcon}
//                 width="auto"
//                 height="20px"
//                 alt="Company Logo"
//               />
//             </div>
//           </div> */}
//         </div>
//       </div>
//       <Component {...props} />
//     </>
//   );
// };

// export default withRouter(OldDataHeader);
