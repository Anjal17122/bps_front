import React, { useState } from "react";
import { UpOutlined } from "@ant-design/icons";
import ContactUs from "./ContactUs";
import "../../../Assets/scss/LandingPage.scss";
import LPimage from "../../../Assets/Images/landingpage.png";
import {
  LandingPageImg,
  municipalityDetails,
} from "../../../constants/constants";
// import { municipalityDetails } from "../../constants/constants";

const LandingPage = () => {
  const [scroll, setScroll] = useState(false);
  const checkScrollTop = () => {
    if (!scroll && window.pageYOffset > 400) {
      setScroll(true);
    } else if (scroll && window.pageYOffset <= 400) {
      setScroll(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div id="BPSlandingWrapper">
      <div
        className="lpimage"
        style={{
          backgroundImage: `url(${LPimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="lpText">
          <img src={LandingPageImg ?? ""} alt="" width={200} height="auto" />
          <b>{municipalityDetails.name}</b> <br />
          <span>भवन निर्माण अनुमतिको लागि अनलाइन प्रणाली</span>
        </div>
      </div>
      <ContactUs />
      <div
        id="goToTop"
        onClick={scrollTop}
        style={{ display: scroll ? "flex" : "none" }}
      >
        <div id="tooltip">Go to Top!</div>
        <UpOutlined style={{ color: "white", fontSize: 16 }} />
      </div>
    </div>
  );
};

export default LandingPage;
