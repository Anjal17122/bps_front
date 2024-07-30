import { Link } from "react-router-dom";
import MyCard from "../../../Common/MyCard/MyCard";
import "../../../Assets/scss/Consultant.scss";
import { Dropdown } from "antd";
import "../../../Assets/scss/MoreMenu.scss";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { isNagarjun } from "../../../constants/CommonFunctions";

export const ProjectType = {
  a: "Vacant Land",
  b: "Old & Demolish Building",
  c: "Plinth Extension",
  d: "Boundary Wall & Construction",
  e: "Storey Addition",
  f: "Facade Change",
  g: "Roof Change",
  h: "Super Structure Permit",
  i: "Application for Complition",
  j: "Already Build Building",
  k: "Already Build Building(Regular)",
  l: "DPC Renew",
  m: "Building Complete Permit",
};

export const setStoreyInLocal = () =>
  localStorage.setItem("ProjectType", ProjectType.e);

const setNotStoreyInLocal = () => localStorage.setItem("ProjectType", "");
const storeyMenu = (): ItemType[] => {
  return [
    {
      key: 1,
      label: (
        <Link
          to="/project/create/search/storeyaddition"
          onClick={setStoreyInLocal}
        >
          Existing <i>(from our system)</i>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link to="/project/create/project/e" onClick={setStoreyInLocal}>
          New Project
        </Link>
      ),
    },
  ];
};

const SelectProjectType = () => {
  return (
    <div className="paddBot50">
      <div className="HeadBar" style={{ justifyContent: "center" }}>
        <h1 style={{ fontWeight: "bold" }}>Select Project Type:</h1>
      </div>
      <div className="CMenu">
        <Link to="/project/create/project/a" onClick={setNotStoreyInLocal}>
          <MyCard text="Vacant Land" nepaliText="नयाँ भवन" />
        </Link>
        <Link to="/project/create/project/j" onClick={setNotStoreyInLocal}>
          <MyCard text="Already Build Building" nepaliText="अभिलेखीकरण" />
        </Link>
        <Link to="/project/create/project/k">
          <MyCard
            text="Already Build Building (Regular)"
            nepaliText="नियमित भवन"
          />
        </Link>

        <Dropdown
          menu={{ items: storeyMenu() }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="MyCard flexCenter" style={{ fontSize: 20 }}>
            <div className="flexCenter">
              <p
                style={{
                  width: "100%",
                  color: "#E8E8E8",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                तला थप
              </p>
              Storey Addition
            </div>
          </div>
        </Dropdown>
        {isNagarjun() ? (
          <>
            <Link to="/project/create/permit/h">
              <MyCard text="Super Structure Permit" nepaliText="स्थायी परमिट" />
            </Link>
            <Link to="/project/create/permit/m">
              <MyCard
                text="Building Complete Permit"
                nepaliText="निर्माण सम्पन्न"
              />
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SelectProjectType;

// <Link to="/project/create/project/b">
//   <MyCard text="Old & Demolish Building" />
// </Link>
// <Link to="/project/create/project/c">
//   <MyCard text="Plinth Extension" />
// </Link>
// <Link to="/project/create/project/d">
//   <MyCard text="Boundary Wall & Construction" />
// </Link>

// <Link to="/project/create/project/f">
//   <MyCard text="Facade Change" />
// </Link>
// <Link to="/project/create/project/g">
//   <MyCard text="Roof Change" />
// </Link>
// <Link to="/project/create/project/h">
//   <MyCard text="Super Structure Permit" />
// </Link>
// <Link to="/project/create/project/i">
//   <MyCard text="Application for Complition" />
// </Link>
// <Link to="/project/create/project/k">
//   <MyCard text="DPC Renew" />
// </Link>
