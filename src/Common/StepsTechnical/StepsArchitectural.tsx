import React from "react";
import { Steps } from "antd";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

export interface FiveSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
}

const StepsArchitectural = (steps: FiveSteps) => {
  return (
    <Steps className="stepsTechnical StepsArchitectural ">
      <Steps.Step
        status={steps.step1 ? "process" : "wait"}
        title="Staircase"
        icon={
          steps.step1 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step2 ? "process" : "wait"}
        title="Exit"
        icon={
          steps.step2 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step3 ? "process" : "wait"}
        title="Ventilation"
        icon={
          steps.step3 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step4 ? "process" : "wait"}
        title="Lifts"
        icon={
          steps.step4 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step5 ? "process" : "wait"}
        title="Other"
        icon={
          steps.step5 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
    </Steps>
  );
};

export default StepsArchitectural;
