import React from "react";
import { checkIfPDF } from "../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { IMG_GET_URL, PDF_URL } from "../../../Services/Api";
import { Button, Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";

type Props = {
  name: string;
  folderName: string;
  button: string;
};

const ShowPDFandImage = ({ name, folderName, button }: Props) => {
  return (
    <>
      {checkIfPDF(name) ? (
        <a
          href={PDF_URL + `/${folderName}/${name}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Button
            style={{ width: 190 }}
            type="primary"
            ghost
            icon={<EyeOutlined />}
          >
            {button}
          </Button>
        </a>
      ) : (
        <>
          <div>{button}:</div>
          <Image
            style={{ border: "1px solid #bfbfbf" }}
            src={IMG_GET_URL + `/${folderName}/${name}`}
            width={80}
            height={60}
          />
        </>
      )}
    </>
  );
};

export default ShowPDFandImage;
