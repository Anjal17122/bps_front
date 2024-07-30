import React from "react";
import { Steps } from "antd";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

export interface FiveSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
  step6: boolean;
  step7: boolean;
  step8: boolean;
  step9: boolean;
}

const StepsStructural = (steps: FiveSteps) => {
  return (
    <Steps className="stepsTechnical StepsStructural">
      <Steps.Step
        status={steps.step1 ? "process" : "wait"}
        title="General"
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
        title="NBC 101-104"
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
        title="NBC 105"
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
        title="NBC 106-114"
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
        title="Slab Design"
        icon={
          steps.step5 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step6 ? "process" : "wait"}
        title="Critical Beam"
        icon={
          steps.step6 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step7 ? "process" : "wait"}
        title="Foundation"
        icon={
          steps.step7 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step8 ? "process" : "wait"}
        title="Floor"
        icon={
          steps.step8 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
      <Steps.Step
        status={steps.step9 ? "process" : "wait"}
        title="Opening Details"
        icon={
          steps.step9 ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18 }} />
          )
        }
      />
    </Steps>
  );
};

export default StepsStructural;
