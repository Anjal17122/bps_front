import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/Api";

const VideoPlayer = () => {
  const params = useParams();

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        height: "100vh",
        textAlign: "center",
        // overflow: "hidden",
      }}
    >
      <video controls style={{ width: "80%", height: "80vh" }}>
        <source
          src={BASE_URL + `/images/temp/` + params.video + ".mp4"}
          type="video/mp4"
        />
      </video>
      <div style={{ color: "white", fontSize: 18, marginTop: 20 }}>
        {params.video?.replaceAll("_", " ")}
      </div>
    </div>
  );
};

export default VideoPlayer;
