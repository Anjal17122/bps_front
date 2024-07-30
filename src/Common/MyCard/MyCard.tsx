import React from "react";
import "../../Assets/scss/MyCard.scss";

interface Props {
  text: string;
  nepaliText: string;
  font?: string;
}

const MyCard = ({ text, nepaliText, font = "20px" }: Props) => {
  return (
    <div className="MyCard flexCenter" style={{ fontSize: font }}>
      <div className="flexCenter">
        <p
          style={{
            width: "100%",
            color: "#E8E8E8",
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          {nepaliText}
        </p>
        {text}
      </div>
    </div>
  );
};

export default MyCard;
