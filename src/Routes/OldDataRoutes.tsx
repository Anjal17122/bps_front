import React from "react";

const OldDataRoutes = () => {
  return <div>OldDataRoutes</div>;
};

export default OldDataRoutes;

// import { Routes, Route } from "react-router-dom";
// import ModalWrapper from "../Common/Wrapper/ModalWrapper";
// import OldDataHeader from "../Components/Admin/OldData/OldDataHeader";

//

// const OldDataRoutes = (props: Props) => {
// const withModal = (
//   props: any,
//   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
// ) => <ModalWrapper element={component} {...props} />;

// const withOldData = (
//   props: any,
//   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
// ) => <OldDataHeader element={component} {...props} />;
//CreateProject
// const ProjectType = lazy(
//   () => import("../pages/Consultant/ProjectCreate/SelectProjectType")
// );

// const Create = lazy(
//   () => import("../Components/Consultant/Project/Create/Create")
// );
// const EditCreate = lazy(
//   () => import("../Components/Consultant/Project/Create/EditCreate")
// );

// const ViewCreate = lazy(
//   () => import("../Components/Consultant/Project/Create/ViewCreate")
// );
// const Applicant = lazy(
//   () => import("../pages/Consultant/ProjectCreate/Applicant/Applicant")
// );
// const ViewApplicant = lazy(
//   () => import("../pages/Consultant/ProjectCreate/Applicant/ViewApplicant")
// );
// const LandInfo = lazy(
//   () => import("../Components/Consultant/Project/LandInfo/LandInfo")
// );
// const AddLandInfo = lazy(
//   () => import("../Components/Consultant/Project/LandInfo/AddLandInfo")
// );

// const EditLandInfo = lazy(
//   () => import("../Components/Consultant/Project/LandInfo/EditLand")
// );
// const Charkilla = lazy(
//   () => import("../Components/Consultant/Project/Charkilla/Charkilla")
// );
// const AddCharkilla = lazy(
//   () => import("../Components/Consultant/Project/Charkilla/AddCharkilla")
// );
// const LandOwners = lazy(
//   () => import("../Components/Consultant/Project/LandOwner/LandOwners")
// );
// const AddLandOwner = lazy(
//   () => import("../Components/Consultant/Project/LandOwner/AddLandOwner")
// );
// const AddHomeOwner = lazy(
//   () => import("../Components/Consultant/Project/LandOwner/AddHomeOwner")
// );

//   return (
//     <Routes>
//       <Route path="/" element={<OldDataHeader />}>
//         <Route path="/olddata/create/project/:type" element={<Create />} />

//         <Route path="/olddata/create/project" element={<ProjectType />} />
//         <Route path="/olddata/edit/project/:pid" element={<EditCreate />} />
//         <Route
//           path="/olddata/view/project/:pid"
//           element={(props: any) =>
//             withOldData({ oldData: true, ...props }, ViewCreate)
//           }
//         />
//         <Route
//           path="/olddata/view/project/:pid/:tempId"
//           element={<ViewCreate />}
//         />
//         <Route
//           path="/olddata/create/applicant/:pid"
//           element={<ViewApplicant />}
//         />

//         {/* <Route path="/olddata/add/applicant/:pid" element={Applicant} /> */}
//         <Route path="/olddata/create/landinfo/:pid" element={<LandInfo />} />
//         <Route
//           path="/olddata/edit/landinfo/:pid/:tempId/:landid"
//           element={<EditLandInfo />}
//         />
//         <Route
//           path="/olddata/create/charkilla/:pid/:tempId"
//           element={<Charkilla />}
//         />

//         <Route
//           path="/olddata/edit/landinfo/:pid/:landid"
//           element={<EditLandInfo />}
//         />
//         <Route path="/olddata/create/charkilla/:pid" element={<Charkilla />} />

//         <Route
//           path="/olddata/create/landowners/:pid"
//           element={<LandOwners />}
//         />

//         <Route path="/olddata/create/project/:type" element={<Create />} />

//         <Route path="/olddata/create/project" element={<ProjectType />} />
//         <Route
//           path="/olddata/edit/project/:pid/:tempId"
//           element={<EditCreate />}
//         />
//         <Route
//           path="/olddata/view/project/:pid/:tempId"
//           element={(props: any) =>
//             withOldData({ oldData: true, ...props }, ViewCreate)
//           }
//         />
//         <Route
//           path="/olddata/view/project/:pid/:tempId"
//           element={<ViewCreate />}
//         />
//         <Route
//           path="/olddata/create/applicant/:pid/:tempId"
//           element={<ViewApplicant />}
//         />
//       </Route>

//       <Route
//         path="/olddata/create/addlandowner/:pid"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Land Owner", width: "1200px" },
//             AddLandOwner
//           )
//         }
//       />
//       <Route
//         path="/olddata/create/addhomeowner/:pid"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Home Owner", width: "1200px" },
//             AddHomeOwner
//           )
//         }
//       />
//       <Route
//         path="/olddata/create/addlandinfo/:pid"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Land Information", width: "800px" },
//             AddLandInfo
//           )
//         }
//       />
//       <Route
//         path="/olddata/add/applicant/:pid/:tempId"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Applicant", width: "1200px" },
//             Applicant
//           )
//         }
//       />
//       {/* <Route path="/olddata/add/applicant/:pid/:tempId" element={Applicant} /> */}
//       <Route
//         path="/olddata/create/landinfo/:pid/:tempId"
//         element={<LandInfo />}
//       />
//       <Route
//         path="/olddata/create/addcharkilla/:pid"
//         element={(props: any) =>
//           withModal({ ...props, title: "Add Charkilla" }, AddCharkilla)
//         }
//       />
//       <Route
//         path="/olddata/create/addlandinfo/:pid/:tempId"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Land Information", width: "800px" },
//             AddLandInfo
//           )
//         }
//       />

//       <Route
//         path="/olddata/create/addcharkilla/:pid/:tempId"
//         element={(props: any) =>
//           withModal({ ...props, title: "Add Charkilla" }, AddCharkilla)
//         }
//       />
//       <Route
//         path="/olddata/create/landowners/:pid/:tempId"
//         element={<LandOwners />}
//       />
//       <Route
//         path="/olddata/create/addlandowner/:pid/:tempId"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Land Owner", width: "1200px" },
//             AddLandOwner
//           )
//         }
//       />
//       <Route
//         path="/olddata/create/addhomeowner/:pid/:tempId"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Home Owner", width: "1200px" },
//             AddHomeOwner
//           )
//         }
//       />
//       <Route
//         path="/olddata/add/applicant/:pid"
//         element={(props: any) =>
//           withModal(
//             { ...props, title: "Add Applicant", width: "1200px" },
//             Applicant
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default OldDataRoutes;
