import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import DhulikhelLogo from "../../../../Assets/Images/dhulikhel_logo_png.png";

import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { municipalityDetails } from "../../../../constants/constants";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
// import { charkillaMapNotice } from "./NoticeDesignHelper";
import { PDFBodyType } from "../PDFtypes";
import { charkillaMapNotice } from "./NoticeDesignHelper";
import { Underline } from "../AbhilekhikaranPDFDesign/DhulikhelAbhilekhikaran";
import { underline } from "../helper";

export const nepalifyOptions = {
  layout: "traditional",
};

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    date: string;
    createddate: string;
    type: "days15" | "days7";
  };
  backendData: PDFBodyType;
}

const FinalNoticePDFDesign = ({ data, backendData }: Props) => {
  // Register font
  Font.register({
    family: "Noto",
    src: Noto,
  });

  const sabik = backendData.sabik;
  const chalaniNo = ConvertToNepali(data.chalanino);
  const patraSankhya = ConvertToNepali(data.patrasankhya);
  const pubDate = ConvertToNepali(data.date);
  const wardNo = underline(ConvertToNepali(backendData.wardNo));
  const kittaNo = ConvertToNepali(backendData.kittaNo);
  const area = ConvertToNepali(backendData.landArea);

  // const buildingByLaws: LandareaTyp = JSON.parse(backendData.byLaws.landData);

  const buildingLength = ConvertToNepali(backendData.buildingLength);
  const buildingWidth = ConvertToNepali(backendData.buildingWidth ?? "0");
  const buildingHeight = ConvertToNepali(backendData.buildingHeight ?? "0");

  const name = backendData.houseOwnersName ?? backendData.landOwnersName;

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Noto",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingBottom: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 25,
            paddingRight: 35,
          }}
        >
          <View>
            <Image src={GovLogo} style={{ width: 80, height: "auto" }} />
          </View>
          <View
            style={{
              color: "red",

              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ width: 350, textAlign: "center", fontSize: 20 }}>
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text
              style={{
                width: 350,
                textAlign: "center",
                fontSize: 16,
                marginLeft: -5,
              }}
            >
              {municipalityDetails.letterheadType}, वडा नं: {wardNo}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          <View style={{ width: 80, paddingRight: 40 }}>
            {municipalityDetails.name === "धुलिखेल नगरपालिका" ? (
              <Image src={DhulikhelLogo} style={{ width: 80, height: 90 }} />
            ) : null}
          </View>
        </View>

        <View
          style={{
            paddingTop: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 40,
          }}
        >
          <Text> मिति : {pubDate}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -30,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4 }}>
            पत्र संख्या : {patraSankhya}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {/* {nepalify.format(data.chalanino, nepalifyOptions)} */}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            चलानी नं : {chalaniNo}
            <Text>
              {/* {nepalify.format(data.patrasankhya, nepalifyOptions)} */}
            </Text>
          </Text>
        </View>
        <View>
          <Text
            style={{ paddingBottom: 10, paddingTop: -10, paddingLeft: -10 }}
          >
            बिषय:{" "}
            <Text
              style={{
                fontSize: 14,
              }}
            >
              {data.type === "days7" ? "७" : "१५"} दिने सुचना
            </Text>
          </Text>
        </View>
        <View style={{ paddingLeft: 60, paddingRight: 60, fontSize: 13 }}>
          {/* 15 दिने सूचनामा
            वडा नं छुटेको
            ल्याउनु होला सच्चाउने
            नापरेमा लाई नपरेमा बनाउने */}
          <Text>
            {sabik ? "साबिकको " + sabik : null} {municipalityDetails.district},
            वडा नं {wardNo} बस्ने <Text style={Underline}> {name} </Text> को{" "}
            <Text style={Underline}> {municipalityDetails.district}</Text>{" "}
            जिल्ला{" "}
            <Text style={Underline}>
              {" "}
              {municipalityDetails.letterheadTitle}{" "}
            </Text>{" "}
            , वडा नं {wardNo} मा रहेको कित्ता{" "}
            <Text style={Underline}> {kittaNo} </Text> क्षेत्रफल{" "}
            <Text style={Underline}> {area} sq.m.</Text> मा रहेको लम्बाई{" "}
            <Text style={Underline}> {buildingLength} </Text> चौडाई{" "}
            <Text style={Underline}> {buildingWidth} </Text> र उचाई
            <Text style={Underline}> {buildingHeight} </Text> भएको भवनको निर्माण
            गर्न भनि दरखास्त परेको हुनाले{" "}
            <Text style={Underline}>{municipalityDetails.letterheadTitle}</Text>{" "}
            ऐन अनुसार यो सूचना पठाउने काम भएको छ। सो नक्सा बमोजिमको घर बनाउँदा
            तपाइलाई पिर, मर्का सन्धि सर्पन पर्ने भए यो सूचना तपाइले पाएको वा
            तपाइको घर दैलोमा टासेको मितिले १५ दिन भित्र आफ्नो दाबी खुलेको उजुरी
            दिन ल्याउनु होला। सो १५ दिन भित्र उजुरी नपरेमा अर्जी पर्न र म्याद
            पाउ भन्ने उजुरी समेत लाग्ने छैन।
          </Text>
        </View>
        <View
          style={{
            paddingTop: "10px",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          {/* <Text style={{ paddingBottom: 10 }}>तपसिल :</Text> */}
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              marginBottom: 0,
            }}
          >
            चारकिल्ला विवरण
          </Text>
        </View>
        {charkillaMapNotice(backendData.charkillas)}
        <View
          style={{
            position: "absolute",
            bottom: 70,
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
            paddingTop: 30,
            justifyContent: "flex-end",
            paddingRight: 60,
          }}
        >
          <Text>..............................</Text>
          <Text>वडा अध्यक्ष</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FinalNoticePDFDesign;

// export const charkillaMapNotice = (data: PlinthDataPDF) => {
//   const styleHeader: any = {
//     width: 80,
//     textDecoration: "underline",
//     textDecorationStyle: "dotted",
//   };

//   const Charkillas = data.lands.map((landddd) => landddd.charKillas).flat();

//   return (
//     <>
//       <View
//         style={{
//           fontSize: 10,
//           flexDirection: "row",
//           marginLeft: 0,
//         }}
//       >
//         <Text style={styleHeader}>दिशा</Text>
//         <Text style={styleHeader}>किसिम</Text>
//         <Text
//           style={{
//             width: 120,
//             textDecoration: "underline",
//             textDecorationStyle: "dotted",
//           }}
//         >
//           कित्ता
//         </Text>
//         <Text style={styleHeader}>छाड्नु पर्ने दुरी:</Text>
//         <Text style={styleHeader}>छाडेको दुरी:</Text>
//       </View>
//       {Charkillas.map((charkill) => (
//         <View
//           key={charkill.id}
//           style={{
//             flexDirection: "row",
//             marginLeft: 0,
//             fontSize: 10,
//           }}
//         >
//           <Text style={{ width: 80 }}>{charkill.direction}</Text>
//           <Text style={{ width: 80 }}>{charkill.landscapeType}</Text>
//           <Text style={{ width: 120 }}>{charkill.kittaNo ?? "-"}</Text>
//           <Text style={{ width: 80 }}>
//             {typeof charkill.standardSetBack === "string"
//               ? ConvertToNepali(charkill.standardSetBack)
//               : "-"}
//           </Text>
//           <Text style={{ width: 80 }}>
//             {typeof charkill.actualSetBack === "string"
//               ? ConvertToNepali(charkill.actualSetBack)
//               : "-"}
//           </Text>
//         </View>
//       ))}
//     </>
//   );
// };
