import { Skeleton } from "antd";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import "./FallbackLoader.css";
import NepalFlag from "../../../Assets/gif/flag.webp";
import PageHeader from "../PageHeader/PageHeader";

export function FallbackLoader() {
  return (
    <div className="loader-line-wrapper">
      <div className="NavBarMain">
        <div className="flexcontainer">
          <div style={{ display: "flex", width: 300 }}>
            <LogoContainer text={""} />{" "}
            <Skeleton.Input active size={"large"} block />
          </div>
          <div className="NavBarLinks">
            <div
              className="flag"
              style={{ paddingLeft: "20px", display: "flex" }}
            >
              <Skeleton.Input active size={"large"} block />
              <img
                style={{ marginLeft: 10 }}
                src={NepalFlag}
                alt=""
                height="30px"
                width="auto"
              />
            </div>
          </div>
        </div>
      </div>
      <PageHeader title="Loading" subTitle="Loading Screen" />

      <div className="loader-line"></div>
    </div>
  );
}
