import { OnDeskProjects } from "../Services/ProjectService";

export const inDevelopment = () => {
  alert("Feature:  In Development");
};

export const addZero = (data: number) => {
  if (data < 10) {
    return `0${data}`;
  } else {
    return data;
  }
};

export const revenueViewAllowedDeparts = () => {
  const role = localStorage.getItem("role");

  if (
    role === "ROLE_Engineer" ||
    role === "ROLE_Executive" ||
    role === "ROLE_Sub_Engineer" ||
    role === "ROLE_Revenue" ||
    role === "ROLE_Ward"
  ) {
    return true;
  } else {
    false;
  }
};

export const getRoleOnD = (): keyof OnDeskProjects => {
  if (localStorage.getItem("role") === "ROLE_Ward") {
    return "ward";
  } else if (localStorage.getItem("role") === "ROLE_Registration") {
    return "registration";
  } else if (localStorage.getItem("role") === "ROLE_Technical_Department") {
    return "technicalDepartment";
  } else if (localStorage.getItem("role") === "ROLE_Engineer") {
    return "engineer";
  } else if (localStorage.getItem("role") === "ROLE_Executive") {
    return "executive";
  } else if (localStorage.getItem("role") === "ROLE_Revenue") {
    return "revenue";
  } else if (localStorage.getItem("role") === "ROLE_Ward_Technical") {
    return "wardTechnical";
  } else if (localStorage.getItem("role") === "ROLE_Sub_Engineer") {
    return "subEngineer";
  } else if (localStorage.getItem("role") === "ROLE_BuildingR_LandM") {
    return "buildingR_LandM";
  } else if (localStorage.getItem("role") === "ROLE_Asst_Sub_Engineer") {
    return "asstSubEngineer";
  } else {
    return "napi";
  }
};

export const getApprovedStatus = (project: OnDeskProjects): boolean => {
  return project[getRoleOnD()] as boolean;
};

export const commentSections = [
  { label: "Project Details", value: "Project Details" },
  { label: "Land Details", value: "Land Details" },
  { label: "Charkilla", value: "Charkilla" },
  { label: "Land Owners", value: "Land Owners" },
  { label: "Floor", value: "Floor" },
  { label: "Building By Laws", value: "Building By Laws" },
  { label: "Architectural", value: "Architectural" },
  { label: "Structural", value: "Structural" },
  { label: "Electrical", value: "Electrical" },
  { label: "Sanitation", value: "Sanitation" },
  { label: "Drawings", value: "Drawings" },
  { label: "Plinth", value: "Plinth" },
  { label: "SuperStructure", value: "SuperStructure" },
];
