import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import axios from "axios";
import { useState } from "react";

type Props = {
  error: unknown;
  resetErrorBoundary: () => void;
};

const ErrorBoundaryUI = ({ error, resetErrorBoundary }: Props) => {
  const handleReset = () => {
    resetErrorBoundary();
  };

  let loading = false;

  const errorMessage =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : "unknown error";

  const handleReport = () => {
    loading = true;
    axios
      .post(
        "https://hooks.slack.com/services/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",
        JSON.stringify({
          text: `url: ${window.location.href}, error: ${errorMessage}`,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then(() => {
        alert("Reported Successfully!");
        loading = false;
      })
      .catch(() => (loading = false));
  };
  return (
    <div>
      <Result
        status="500"
        title="Server Error! Please Click Report."
        subTitle={errorMessage}
        extra={[
          <Button
            onClick={handleReport}
            key={1}
            type="primary"
            danger
            loading={loading}
          >
            <ExclamationCircleOutlined /> Report Error
          </Button>,
          <Button onClick={handleReset} key={2} type="primary">
            <SyncOutlined />
            Retry/ Refresh
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorBoundaryUI;
