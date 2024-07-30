import React from "react";
import Rolling from "../../Assets/gif/Disk.gif";

interface Props {
  height?: string;
  background?: string;
}

const RollingLoading = ({ background = "white", height = "80vh" }: Props) => {
  return (
    <div id="rollingGif" style={{ height, background }}>
      <img src={Rolling} alt="" width="70px" height="auto" />
    </div>
  );
};

export default RollingLoading;
