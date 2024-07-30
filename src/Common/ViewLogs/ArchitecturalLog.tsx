import React from "react";
import { Tabs, TabsProps } from "antd";

import {
  Staircase,
  Exit,
  LightVent,
  Lift,
  ArchitecturalOther,
} from "../../Services/ArchitecturalService";
import StaircaseEdit from "../../pages/Consultant/ProjectCreate/Technical/Architectural/StaircaseEdit";
import ExitEdit from "../../pages/Consultant/ProjectCreate/Technical/Architectural/ExitEdit";
import LightAndVentEdit from "../../pages/Consultant/ProjectCreate/Technical/Architectural/LightAndVentEdit";
import LiftsEdit from "../../pages/Consultant/ProjectCreate/Technical/Architectural/LiftsEdit";
import OtherEdit from "../../pages/Consultant/ProjectCreate/Technical/Architectural/OtherEdit";

interface Props {
  staircase: Staircase;
  exit: Exit;
  light: LightVent;
  lifts: Lift;
  other: ArchitecturalOther;
}

const ArchitecturalLog = ({ staircase, exit, light, lifts, other }: Props) => {
  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `Staircase`,
      children: (
        <StaircaseEdit data={staircase} onSubmit={() => {}} edit={false} />
      ),
    },
    {
      key: "2",
      label: `Exit`,
      children: <ExitEdit data={exit} onSubmit={() => {}} edit={false} />,
    },
    {
      key: "3",
      label: `Light and Ventilation`,
      children: (
        <LightAndVentEdit data={light} onSubmit={() => {}} edit={false} />
      ),
    },
    {
      key: "4",
      label: `Lifts`,
      children: <LiftsEdit data={lifts} onSubmit={() => {}} edit={false} />,
    },
    {
      key: "5",
      label: `Other`,
      children: <OtherEdit data={other} onSubmit={() => {}} edit={false} />,
    },
  ];

  return (
    <div className="ArchitecturalLog">
      <Tabs type="card" items={items()} defaultActiveKey="1"></Tabs>
    </div>
  );
};

export default ArchitecturalLog;
