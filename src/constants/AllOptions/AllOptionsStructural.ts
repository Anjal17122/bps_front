// Structural
// Building Structure Type
// •	Frame Structure
// •	Load Bearing
// •	Other
export const buildingStructureType = [
  {
    value: "Frame Structure",
    label: "Frame Structure",
  },
  {
    value: "Load Bearing",
    label: "Load Bearing",
  },
  {
    value: "Steel Structure",
    label: "Steel Structure",
  },
  {
    value: "Other",
    label: "Other",
  },
];

// Provision for further extension considered or not
// •	Yes
// •	No
export const ProvisionForFurtherExt = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Materials to be used in structure (tick the listed materials that will be used in structural element
// •	Stone Masonry
// •	Structural Aluminum
// •	Brick Masonry
// •	Timber
// •	Structural Steel
// •	RCC (Reinforcement Bar)
export const MaterialsUsed = [
  {
    value: "Stone Masonry",
    label: "Stone Masonry",
  },
  {
    value: "Structural Aluminum",
    label: "Structural Aluminum",
  },
  {
    value: "Brick Masonry",
    label: "Brick Masonry",
  },
  {
    value: "Timber",
    label: "Timber",
  },
  {
    value: "Structural Steel",
    label: "Structural Steel",
  },
  {
    value: "RCC (Reinforcement Bar)",
    label: "RCC (Reinforcement Bar)",
  },
];

// Method adopted for eathquake resistant design
// •	Seismic Coefficient Approach
// •	Response Spectrum Method
// •	Others
export const MethodAdopted = [
  {
    value: "Seismic Coefficient Approach",
    label: "Seismic Coefficient Approach",
  },
  {
    value: "Response Spectrum Method",
    label: "Response Spectrum Method",
  },
  {
    value: "Others",
    label: "Others",
  },
];

// Adopted Code for Seismic Design
// •	NBC 105
// •	IS:1893-2002
// •	Other
export const AdoptedCode = [
  {
    value: "NBC 105",
    label: "NBC 105",
  },
  {
    value: "IS:1893-2002",
    label: "IS:1893-2002",
  },
  {
    value: "Other",
    label: "Other",
  },
];

// Subsoil category
// •	Type I (Hard)
// •	Type II (Medium)
// •	Type III (Soft)
export const Subsoilcategory = [
  {
    value: "Type I (Hard)",
    label: "Type I (Hard)",
  },
  {
    value: "Type II (Medium)",
    label: "Type II (Medium)",
  },
  {
    value: "Type III (Soft)",
    label: "Type III (Soft)",
  },
];

// Snowfall type or condition
// •	Perennial
// •	Occasional
// •	No snowfall
export const Snowfalltype = [
  {
    value: "Perennial",
    label: "Perennial",
  },
  {
    value: "Occasional",
    label: "Occasional",
  },
  {
    value: "No snowfall",
    label: "No snowfall",
  },
];

// Have you considered fire safety requirement?
// •	Yes
// •	No
export const firesafetyreq = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Whether distance of construction site from toe/beginning of downward slope is within 50m?
// •	Yes
// •	No
export const downwardslopeis50m = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Whether distance of construction site from river bank is within 50m?
// •	Yes
// •	No
export const riverbankis50m = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Availability of soil test report
// •	Yes
// •	No
export const soiltestreport = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Are you sure that all safety measures will be fulfilled in the construction site as per this code?
// •	Yes
// •	No
export const safetymeasuresfulfill = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Concrete grade in structure
// •	M20
// •	M25
// •	M30
// •	M35
export const Concretegrade = [
  {
    value: "M20",
    label: "M20",
  },
  {
    value: "M25",
    label: "M25",
  },
  {
    value: "M30",
    label: "M30",
  },
  {
    value: "M35",
    label: "M35",
  },
];

// Reinforcement Steel Grade
// •	Fe-415
// •	Fe-500
// •	Fe-550
export const ReinforcementSteelGrade = [
  {
    value: "Fe-415",
    label: "Fe-415",
  },
  {
    value: "Fe-500",
    label: "Fe-500",
  },
  {
    value: "Fe-550",
    label: "Fe-550",
  },
];

// Boundary Condition of Slab
// •	4 Side Continuous
// •	1 Short-Side Continuous
// •	1 Long-Side Discontinuous
// •	2 Adjacent-Side Continuous
// •	2 Long-Side Continuous
// •	2 Short-Side Continuous
// •	1 Long-Side Continuous
// •	1 Short-Side Continuous
// •	4 Side Discontinuous
export const BoundaryCondition = [
  {
    value: "1 Short-Side Continuous",
    label: "1 Short-Side Continuous",
  },
  {
    value: "1 Long-Side Discontinuous",
    label: "1 Long-Side Discontinuous",
  },
  {
    value: "1 Long-Side Continuous",
    label: "1 Long-Side Continuous",
  },
  {
    value: "2 Adjacent-Side Continuous",
    label: "2 Adjacent-Side Continuous",
  },
  {
    value: "2 Long-Side Continuous",
    label: "2 Long-Side Continuous",
  },
  {
    value: "2 Short-Side Continuous",
    label: "2 Short-Side Continuous",
  },
  {
    value: "4 Side Continuous",
    label: "4 Side Continuous",
  },
  {
    value: "4 Side Discontinuous",
    label: "4 Side Discontinuous",
  },
];

// {
//   value: "1 Short-Side Continuous",
//   label: "1 Short-Side Continuous",
// },
// Support condition
// •	Cantilever
// •	Simply Supported
// •	One Side Continuous
// •	Both Side Continuous
export const Supportcondition = [
  {
    value: "Cantilever",
    label: "Cantilever",
  },
  {
    value: "Simply Supported",
    label: "Simply Supported",
  },
  {
    value: "One Side Continuous",
    label: "One Side Continuous",
  },
  {
    value: "Both Side Continuous",
    label: "Both Side Continuous",
  },
];

// Short column effect considered or not
// •	Yes
// •	No
export const Shortcolumneffect = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Whether sample design calculations of foundations, columns, beams and slabs are submitted
// •	Yes
// •	No
export const sampledesignfoundations = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Type of Foundations
// •	Isolated
// •	Combined
// •	Raft
// •	PILE
// •	Strap
export const TypeofFoundations = [
  {
    value: "Isolated",
    label: "Isolated",
  },
  {
    value: "Combined",
    label: "Combined",
  },
  {
    value: "Raft",
    label: "Raft",
  },
  {
    value: "PILE",
    label: "PILE",
  },
  {
    value: "Strap",
    label: "Strap",
  },
];

// Concrete Grade
// •	M20
// •	M25
// •	M30
// •	M35
export const ConcreteGrade = [
  {
    value: "M20",
    label: "M20",
  },
  {
    value: "M25",
    label: "M25",
  },
  {
    value: "M30",
    label: "M30",
  },
  {
    value: "M35",
    label: "M35",
  },
];

// Does the horizontal distance between any two opening less than 600 mm or 1/2 of height of shorter opening?
// •	Yes
// •	No
export const horizontalbetweenopening = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Does the Vertical distance between two opening less than 600 mm or 1/2 of width of smaller opening?
// •	Yes
// •	No
export const Verticaldistancetwoopening = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// If any of above-mentioned cases do not comply, do you have provision for strengthening around opening?
// •	Yes
// •	No
export const casesdonotcomply = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];
