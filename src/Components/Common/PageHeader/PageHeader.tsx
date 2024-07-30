import React from "react";

type Props = {
  subTitle: string;
  title: string;
};

const PageHeader = ({ title, subTitle }: Props) => {
  return (
    <div className="PageHeaderWrapper">
      <div className="MyPageHeader">
        <div>
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
