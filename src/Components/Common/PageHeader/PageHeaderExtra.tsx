import React from "react";

type Props = {
  subTitle: string;
  title: string;
  extra: JSX.Element[];
};

const PageHeaderExtra = ({ title, subTitle, extra }: Props) => {
  return (
    <div className="PageHeaderWrapper">
      <div className="MyPageHeader">
        <div>
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>
        <div>
          {extra.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderExtra;
