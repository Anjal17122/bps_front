import React from "react";
// import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Preeti from "../../../Assets/Fonts/Preeti.otf";
import PreetiBold from "../../../Assets/Fonts/PreetiBold.ttf";
import GovLogo from "../../../Assets/Images/resizednepgov.png";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { NoticePDFdata } from "../../../../Services/PDFService";
import { municipalityDetails } from "../../../../constants/constants";
import { Document, Font, Image, Page, Text, View } from ".././PDFImports";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { extractNum } from "../../../../constants/GlobalFunctions";
import _ from "lodash";

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
  backendData: NoticePDFdata;
}

const FinalNoticePDFDesign = ({ data, backendData }: Props) => {
  // Register font
  Font.register({ family: "Preeti", src: Preeti });
  Font.register({ family: "PreetiBold", src: PreetiBold });
  Font.register({
    family: "Noto",
    src: Noto,
  });

  const chalaniNo = ConvertToNepali(data.chalanino);
  const patraSankhya = ConvertToNepali(data.patrasankhya);
  const pubDate = ConvertToNepali(data.date);
  const landOwners = backendData.lands
    .map((lannnddd) => lannnddd.landOwner)
    .flat();
  const landOwnersName = landOwners
    .map((houseown) => houseown.owner.nameNep)
    .toString()
    .replace(/[\[\]"]+/g, "");
  const houseOwners = backendData.lands
    .map((lannnddd) => lannnddd.houseOwner)
    .flat();
  const houseOwnersName = houseOwners
    .map((houseown) => houseown.owner.nameNep)
    .toString()
    .replace(/[\[\]"]+/g, "");
  const wardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));
  const kittaNo = ConvertToNepali(
    backendData.lands
      .map((land) => land.landParcelNo)
      .toString()
      .replace(/[\[\]"]+/g, "")
  );
  const munName = backendData.applicant?.addresses[0].municipality?.name;
  const toleName = backendData.applicant?.addresses[0].toleNep;
  const area = ConvertToNepali(
    backendData.lands
      .map((land) => land.ropani)
      .toString()
      .replace(/[\[\]"]+/g, "")
  );
  const underline: {
    textDecoration: "underline";
    textDecorationStyle: "dotted";
  } = {
    textDecoration: "underline",
    textDecorationStyle: "dotted",
  };
  // const underline = {
  //   textDecoration: "underline",
  //   textDecorationStyle: "dotted",
  // };
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
              {municipalityDetails.letterheadType}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          <View style={{ width: 80 }}></View>
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
            <Text style={{}}>
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
                textDecoration: "underline",
              }}
            >
              {data.type === "days7" ? "७" : "१५"} दिने सुचना
            </Text>
          </Text>
        </View>
        <View style={{ paddingLeft: 60, paddingRight: 60, fontSize: 13 }}>
          <Text>
            {landOwners?.length
              ? _.get(landOwners[0], "owner.address[0].district.nameNep", "")
              : ""}{" "}
            वडा नं बस्ने <Text style={underline}> {landOwnersName} </Text> को{" "}
            <Text style={underline}> {municipalityDetails.district}</Text>{" "}
            जिल्ला{" "}
            <Text style={underline}>
              {" "}
              {municipalityDetails.letterheadTitle}{" "}
            </Text>{" "}
            , वडा नं {wardNo} मा रहेको कित्ता{" "}
            <Text style={underline}> {kittaNo}</Text> क्षेत्रफल{" "}
            <Text style={underline}>{area}</Text> मा निर्माण गर्न भनि दरखास्त
            परेको हुनाले{" "}
            <Text style={underline}>{municipalityDetails.letterheadTitle}</Text>{" "}
            ऐन अनुसार यो सूचना पठाउने काम भएको छ। सो नक्सा बमोजिमको घर बनाउँदा
            तपाइलाई पिर, मर्का सन्धि सर्पन पर्ने भए यो सूचना तपाइले पाएको वा
            तपाइको घर दैलोमा टासेको मितिले १५ दिन भित्र आफ्नो दाबी खुलेको उजुरी
            दिन ल्आउनु होला। सो १५ दिन भित्र उजुरी नापरेमा अर्जी पर्न र म्याद
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
          <Text style={{ paddingBottom: 10 }}>तपसिल :</Text>
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              marginBottom: 10,
            }}
          >
            चारकिल्ला विवरण
          </Text>
        </View>
        {charkillaMapNotice(backendData)}
        <View
          style={{
            position: "absolute",
            bottom: 100,
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

export const charkillaMapNotice = (data: NoticePDFdata) => {
  const styleHeader: any = {
    width: 80,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
  };

  const Charkillas = data.lands.map((landddd) => landddd.charKillas).flat();

  return (
    <>
      <View
        style={{
          fontSize: 10,
          flexDirection: "row",
          marginLeft: -40,
        }}
      >
        <Text style={styleHeader}>दिशा</Text>
        <Text style={styleHeader}>किसिम</Text>
        <Text
          style={{
            width: 140,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          कित्ता
        </Text>
        <Text style={styleHeader}>छाड्नु पर्ने दुरी:</Text>
        <Text style={styleHeader}>छाडेको दुरी:</Text>
      </View>
      {Charkillas.map((charkill) => (
        <View
          key={charkill.id}
          style={{
            flexDirection: "row",
            marginLeft: -40,
            fontSize: 10,
          }}
        >
          <Text style={{ width: 80 }}>{charkill.direction}</Text>
          <Text style={{ width: 80 }}>{charkill.landscapeType}</Text>
          <Text style={{ width: 120 }}>{charkill.kittaNo ?? "-"}</Text>
          <Text style={{ width: 80 }}>
            {typeof charkill.standardSetBack === "string"
              ? ConvertToNepali(charkill.standardSetBack)
              : "-"}
          </Text>
          <Text style={{ width: 80 }}>
            {typeof charkill.actualSetBack === "string"
              ? ConvertToNepali(charkill.actualSetBack)
              : "-"}
          </Text>
        </View>
      ))}
    </>
  );
};
