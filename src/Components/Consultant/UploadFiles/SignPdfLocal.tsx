import React from "react";
import { Button } from "antd";

type Props = {};

const SignPdfLocal = (props: Props) => {
  return (
    <div style={{ padding: "15px 20% 5px 20%" }}>
      <Button type="primary">Sign Pdf (Drawings Only)</Button>
    </div>
  );
};

export default SignPdfLocal;
