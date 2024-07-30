import React, { useContext, useState } from "react";
import { Avatar, Badge, Menu, MenuProps, message } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import NepalFlag from "../../../Assets/gif/flag.webp";
import { MyStore, ActionType } from "../../../Store/ContextApi";
import { useQueryClient } from "@tanstack/react-query";
import { useConNotification } from "./useHeader";

const Cheader = () => {
  const { dispatch } = useContext(MyStore);
  const queryClient = useQueryClient();

  const [messageApi, contextHolder] = message.useMessage();

  const { conNotification } = useConNotification(messageApi);
  const userType = localStorage.getItem("type");

  const [current, setCurrent] = useState<React.Key>("projects");
  const onChangeNav = (e: any) => {
    setCurrent(e.key);
  };

  const history = useNavigate();

  const items = (): MenuProps["items"] => [
    {
      label: <Link to="/user/project/pending">Projects</Link>,
      key: "home",
    },
    {
      label:
        userType == "organization" ? (
          <Link to="/user/org/cons">Our Consultants</Link>
        ) : (
          ""
        ),
      key: "consultants",
    },
    {
      label: <Link to="/user/project/permits">Old Permit</Link>,
      key: "oldPermit",
    },
    {
      label: <Link to="/project/create/project">Create Project</Link>,
      key: "createproject",
    },
    {
      key: "notification",
      label: (
        <Link to="/user/notification/certificates">
          <Badge count={conNotification?.length || 1} size="small">
            <BellOutlined size={24} />
          </Badge>
        </Link>
      ),
    },
    {
      label: <UserOutlined />,
      key: "more",
      children: [
        {
          key: "viewProfile",
          label: (
            <Link to="/view/profile" target={"_blank"}>
              View Profile
            </Link>
          ),
        },
        {
          key: "logout",
          label: "Logout",
          onClick: () => {
            history("/");
            queryClient.invalidateQueries();
            localStorage.clear();
            dispatch({ type: ActionType.resetAll, payload: [] });
          },
        },
      ],
    },
    {
      key: "flag",
      label: (
        <img
          style={{ position: "absolute", top: 8 }}
          src={NepalFlag}
          alt=""
          height="25px"
          width="auto"
        />
      ),
      disabled: true,
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="DashNavAnt">
        <div>
          <Link to="/user/project/pending" style={{ textDecoration: "none" }}>
            <LogoContainer text="CONSULTANT" />
          </Link>
        </div>
        <Menu
          triggerSubMenuAction="click"
          items={items()}
          style={{ width: 600 }}
          onClick={onChangeNav}
          selectedKeys={[current.toString()]}
          mode="horizontal"
        ></Menu>
        {/* <div style={{ position: "absolute", right: 20 }}>
          <img src={NepalFlag} alt="" height="30px" width="auto" />
        </div> */}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Cheader;

// import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import { LogoContainer } from "../../../Common/HomeNav/HomeNav";
// import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// // import NepalFlag from "../../../Assets/gif/Flag_of_Nepal.gif";
// // import MenuIcon from "../../../Assets/Images/menu_icon.png";
// import { Button } from "antd";

// const Cheader = ({ component: Component, ...props }: any) => {
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

// export default withRouter(Cheader);

{
  /* <Menu.Item key="pend">
<Link to="/user/project/pending">Projects</Link>
</Menu.Item>
<Menu.Item key="createp">
<Link
  to="/project/create/project"
  onClick={() => {
    localStorage.setItem("isPerma", "");
    localStorage.setItem("showBothBtns", "true");
  }}
>
</Link>
</Menu.Item>

<SubMenu key="user" icon={<UserOutlined />}>
<Menu.ItemGroup>
  <Menu.Item key="profile">
    <Link to="/view/profile" target={"_blank"}>
      Profile
    </Link>
  </Menu.Item>

  <Menu.Item
    key="logout"
    onClick={() => {
      localStorage.clear();
      dispatch({ type: ActionType.resetAll, payload: [] });
    }}
  >
    <Link to="/public/login">Log Out</Link>
  </Menu.Item>
</Menu.ItemGroup>
</SubMenu>
<SubMenu
key="flag"
disabled
icon={<img src={NepalFlag} alt="" height="30px" width="auto" />}
></SubMenu> */
}
