import { useState } from "react";
import NepalFlag from "../../Assets/gif/flag.webp";
import { Link, Outlet } from "react-router-dom";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { LogoContainer } from "./LogoContainer";

const MenuBurger = ({
  onClose,
  visible,
}: {
  onClose: () => void;
  visible: boolean;
}) => {
  return (
    <Drawer
      title="Menu"
      width={250}
      placement="right"
      onClose={onClose}
      open={visible}
    >
      <div className="MenuBurger">
        <Link key={1217} to="/public/notice">
          सूचना
        </Link>
        <Link key={12171} to="/public/downloads">
          डाउनलोड
        </Link>
        <Link key={121722} to="/public/faqs">
          सहायता
        </Link>
        <Link key={121733} to="/public/register">
          दर्ता
        </Link>
        <span>
          <Link key={1217} to="/public/login">
            <Button type="primary">Log In</Button>
          </Link>
        </span>
      </div>
    </Drawer>
  );
};

const PublicHeader = ({ component: Component, ...props }: any) => {
  const [menuState, setMenuState] = useState(false);

  const onMenuClick = () => {
    setMenuState(!menuState);
  };
  return (
    <>
      <div className="NavBarMain">
        <div className="flexcontainer">
          <Link key={1217121} to="/" style={{ textDecoration: "none" }}>
            <LogoContainer text="नक्सा पास प्रणाली" />
          </Link>
          <div className="NavBarLinks">
            <Link key={121724} to="/public/notice">
              सूचना
            </Link>
            <Link key={121741} to="/public/downloads">
              डाउनलोड
            </Link>
            <Link key={1217654} to="/public/faqs">
              सहायता
            </Link>
            <Link key={1217564} to="/public/register">
              दर्ता
            </Link>
            <span>
              <Link key={1217234} to="/public/login">
                <Button type="primary">Log In</Button>
              </Link>
            </span>
            <div className="flag" style={{ paddingLeft: "20px" }}>
              <img src={NepalFlag} alt="" height="30px" width="auto" />
            </div>
          </div>
          <MenuBurger
            key={12312}
            onClose={() => setMenuState(!menuState)}
            visible={menuState}
          />
          <div id="BurgerWrapper" onClick={onMenuClick}>
            <div style={{ width: "30px", cursor: "pointer" }}>
              <MenuOutlined style={{ fontSize: 22 }} />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default PublicHeader;

// <>
//   <div id="NavBarMain">
//     <div id="flexcontainer">
//       <LogoContainer
//         text={"Building Permit System"}
//         onClick={() => props.history("/")}
//       />
//       <div id="NavBarLinks">
//         <Link key={1217} to="/register/organization">Download</Link>
//         <Link to="/consultant">Guide</Link>
//         <Link to="/consultant/home">Help</Link>
//         <span>
//           <Link to="/public/login">
//             <Button type="primary">Log In</Button>
//           </Link>
//         </span>
//         <div>
//           <img src={NepalFlag} alt="" height="30px" width="auto" />
//         </div>
//       </div>
//       <div id="BurgerWrapper">
//         <Burgermenu
//           navbarState={props.navbarOpen}
//           handleNavbar={props.handleNavbar}
//         />
//       </div>
//     </div>
//   </div>
//   <CollapseMenu
//     navbarState={props.navbarState}
//     handleNavbar={props.handleNavbar}
//   />
// </>

// const CollapseMenu = (props: any) => {
//   if (props.navbarState === true) {
//     return (
//       <div id="SmallMenu">
//         <ul>
//           <li>
//             <Link to="/register/organization">Download</Link>
//           </li>
//           <li>
//             <Link to="/consultant">Guide</Link>
//           </li>

//           <li>
//             <Link to="/consultant/home">Help</Link>
//           </li>
//           <span>
//             <Link to="/public/login">
//               <Button type="primary" onClick={props.gotoLogin}>
//                 Log In
//               </Button>
//             </Link>
//           </span>
//           {/* <span></span> */}
//         </ul>
//       </div>
//     );
//   } else {
//     return null;
//   }
// };

// const Burgermenu = (props: any) => {
//   return (
//     <div id="BurgerMenu" onClick={props.handleNavbar}>
//       <div style={{ width: "30px" }}>
//         <img src={MenuIcon} width="auto" height="20px" alt="Company Logo" />
//       </div>
//     </div>
//   );
// };
