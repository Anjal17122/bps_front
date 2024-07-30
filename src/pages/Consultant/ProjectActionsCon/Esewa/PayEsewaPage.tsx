import { Result } from "antd";
// import EsewaButton from "./EsewaButton";

const PayEsewaPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status={"info"}
        title="Click Below to pay through Esewa"
        // extra={<EsewaButton />}
      />
    </div>
  );
};

export default PayEsewaPage;
