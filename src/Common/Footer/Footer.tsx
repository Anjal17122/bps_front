import React from "react";
import "../../Assets/scss/Footer.scss";

export const Footer = () => {
  return (
    <div id="Footer">
      Developed by:
      <a
        href="https://www.addon.com.np/"
        target={"_blank"}
        rel="noreferrer noopener"
      >
        <span>Addon Engineering.</span> &nbsp;
        {/* addon.com.np */}
      </a>{" "}
      <span
        style={{
          fontSize: 8,
          color: "#d9d9d9",
          position: "absolute",
          right: 10,
        }}
      >
        v2024.05.06:12.38
      </span>
    </div>
  );
};
