import React from "react";
import { Steps } from "antd";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

interface Props {
  step1: boolean;
  step2: boolean;
}

const StepsByLaws = ({ step1, step2 }: Props) => {
  return (
    <Steps className="stepsTechnical StepsByLaws">
      <Steps.Step
        status={step1 ? "process" : "wait"}
        title="Building Data"
        icon={
          step1 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={step2 ? "process" : "wait"}
        title="Land Data"
        icon={
          step2 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
    </Steps>
  );
};

export default StepsByLaws;
