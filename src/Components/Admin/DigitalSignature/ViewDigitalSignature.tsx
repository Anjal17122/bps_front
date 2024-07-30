// import React, { useEffect, useState } from "react";
// import { Button, message } from "antd";
// import "./ViewDigitalSignature.scss";
// import CommonHeader from "./CommonHeader";
// import { useParams } from "react-router-dom";
// import { Result, Typography } from "antd";
// import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import Title from "antd/lib/typography/Title";
// import {
//   getDigitalSignatureOne,
//   SignedBy,
// } from "../../../Services/DigitalSignatureService";
// import { SignDocument } from "./DigitalSign";
// import { DigitalSignCertType } from "./DigitalSignatureTable";
// import { BASE_URL, PDF_URL } from "../../../Services/Api";
// import { sN } from "../../../Services/ProjectService";
// import { getCoordinates } from "../../../constants/coordinates";

// const ViewDigitalSignature = () => {
//   const { Paragraph, Text } = Typography;
//   const { pid, type, name }: { pid: string; type: string; name: string } =
//     useParams();

//   const [setSub, setSetSub] = useState(false);
//   const [signedBy, setSignedBy] = useState<SignedBy[]>([]);

//   useEffect(() => {
//     getDigitalSignatureOne({
//       certificateType: type.toUpperCase(),
//       projectPermaId: pid,
//     }).then((res) => setSignedBy(res.data));
//     return () => {
//       setSignedBy([]);
//     };
//   }, []);
//   const getPDFurl = () => {
//     if (type === "plinth") {
//       return PDF_URL + "/plinthpdf" + `/plinth_${pid}.pdf`;
//     } else if (type === "superstructure") {
//       return PDF_URL + "/plinthpdf" + `/superstructure_${pid}.pdf`;
//     } else if (type === "nirman_sampanna") {
//       return PDF_URL + "/plinthpdf" + `/building_complete_${pid}.pdf`;
//     } else return "";
//   };

//   const successCallback = (msg: string, id: sN, setSub: ) => {
//     message.success("Signed PDF! file is replaced in same location and name!");
//   };
//   const onSign = () => {
//     SignDocument(
//       getPDFurl(),
//       getCoordinates("a4", 4) ?? "",
//       pid,
//       "test",
//       type.toUpperCase() as DigitalSignCertType,
//       setSetSub,
//       successCallback
//     );
//   };

//   return (
//     <>
//       <CommonHeader />
//       {JSON.stringify(getPDFurl())}
//       <div className="ViewDigitalSignature">
//         <div className="ViewPdf">
//           <embed
//             style={{
//               width: "100%",
//               height: "630px",
//             }}
//             type="application/pdf"
//             src={getPDFurl()}
//           />
//         </div>
//         <div className="SignData">
//           <div className="TitleWrapper">
//             <div>
//               <span>Project Id: </span>
//               {pid}
//             </div>
//             <Title level={3}>
//               <span>Applicant: </span>
//               {name}
//             </Title>
//           </div>
//           <Result
//             status="error"
//             title="Sign Pdf"
//             subTitle="Please check the information provided below before signing."
//             extra={[
//               <Button
//                 type="primary"
//                 key={1}
//                 onClick={onSign}
//                 style={{ width: 90 }}
//               >
//                 Sign
//               </Button>,
//               // <Button key="buy" type="primary" danger onClick={downloadPDF}>
//               //   Download
//               // </Button>,
//             ]}
//           >
//             <div className="desc">
//               <Paragraph>
//                 <Text
//                   strong
//                   style={{
//                     fontSize: 16,
//                   }}
//                 >
//                   This pdf has been signed by following:
//                 </Text>
//               </Paragraph>
//               {signedBy.length ? (
//                 signedBy.map((signed) => (
//                   <Paragraph key={signed.id}>
//                     <CheckCircleOutlined style={{ color: "#52c41a" }} />{" "}
//                     {signed.nameEng}
//                   </Paragraph>
//                 ))
//               ) : (
//                 <Paragraph>
//                   <CloseCircleOutlined style={{ color: "red" }} /> Nobody has
//                   signed the document
//                 </Paragraph>
//               )}
//             </div>
//           </Result>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewDigitalSignature;
