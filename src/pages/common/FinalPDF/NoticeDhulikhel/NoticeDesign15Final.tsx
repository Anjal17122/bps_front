import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { PlinthDataPDF } from "../../../../Services/PDFService";
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { extractNum } from "../../../../constants/GlobalFunctions";
import { LetterHead } from "./LetterHead";
import { TapasilAge } from "./TapasilAge";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";

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
  backendData: PlinthDataPDF;
}

const NoticeDesign15Final = ({ data, backendData }: Props) => {
  // Register font
  Font.register({
    family: "Noto",
    src: Noto,
  });

  const applicantWard = ConvertToNepali(
    backendData.applicant.addresses[0].ward.id
  );
  const applicantName = ConvertToNepali(backendData.applicant.nameNep);

  const applicantTole = backendData.applicant.addresses[0].toleNep;

  const landTole = backendData.lands[0].toleNep;

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
  const landWardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));
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
        <LetterHead />

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
            <Text
              style={{
                fontSize: 14,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              नक्सापासका लागि १५ दिने सूचना टाँस मुचुल्का
              {/* {data.type === "days7" ? "७" : "१५"} दिने सुचना */}
            </Text>
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 60,
            paddingRight: 60,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <Text>
            लिखितम हामी तपसिलका मानिसहरु आगे धु.न.पा.वडा नं{" "}
            <Text style={underline}> {landWardNo} </Text> कित्ता नं{" "}
            <Text style={underline}> {kittaNo} </Text> क्षेत्रफल{" "}
            <Text style={underline}> {area} </Text> टोल{" "}
            <Text style={underline}> {landTole} </Text> को जग्गामा बनाउन पाँउ
            भनि काभे्रपलाञ्चोक जिल्ला धुलिखेल नगरपालिका वडा नं.{" "}
            <Text style={underline}>{applicantWard}</Text> टोल{" "}
            <Text style={underline}> {applicantTole} </Text> बस्ने श्री{" "}
            <Text style={underline}> {applicantName} </Text> को नक्सा दरखास्त
            परेकोले नक्सा बमोजिमको <Text style={underline}> संरचना </Text>{" "}
            बनाउँदा कसैलाई पीर मर्का पर्छ पर्दैन पर्छ भने सबुत प्रमाण सहित १५
            दिन भित्र उजुरी दिन ल्याउनु होला भन्ने ब्यहोराको १५ दिने सूचना
            तपसिलका ठाँउमा तपसिलका मानिस साक्षी राखी टाँसेको हो फरक छैन फरक परी
            लेखि दिएको ठहरे कानुन बमोजिम होस भनि हामीहरुको मनोमान खुसि राजिसँग
            यो सूचना मुचुल्कामा सहीछाप गरी{" "}
            <Text style={underline}> {landWardNo} </Text> नं.वडा कार्यलय मार्फत
            धु.न.पा. नक्सा शाखामा चढायौं ।
          </Text>
        </View>
        <View
          style={{
            paddingTop: "10px",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        ></View>
        {charkillaMapNotice(backendData)}

        <TapasilAge />
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
        <LetterHead />
        <View
          style={{
            marginTop: 40,
            paddingLeft: 60,
            paddingRight: 60,
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          <Text>
            साबिक पं <Text style={underline}> {patraSankhya} </Text>वडा नं.
            <Text style={underline}> {landWardNo} </Text> हाल धुलिखेल न.पा. वडा
            नं. .......... मार्ग/सहायक मार्ग स्थित कि.नं. &nbsp;
            <Text style={underline}> {kittaNo} </Text> क्षेत्रफल{" "}
            <Text style={underline}> {area} </Text> ले चर्चिरहेको जग्गाको
            नाप/नापी नक्शा/फाइल नक्शामा जे जति भए पनि न.पा.मा पेश गरेको नक्शा
            अनुसार लम्बाई ........................... चौडाई
            ......................... को जग्गा उहाँकै हो । उक्त जग्गामा
            मेरो/हाम्रो जग्गा परेको छैन र त्यस जग्गामा न.पा.मा पेश गरेको नक्शा
            अनुसार लम्बाई ............................ चैडाई
            ............................ को घर बनाएमा हामीलाई फरक पर्दैन र यस
            सम्बन्धि पछि कुनै उजुर गर्ने छैनौं तथा सहमती छ भनि हस्ताक्षर गर्ने ।
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

export default NoticeDesign15Final;

export const charkillaMapNotice = (data: PlinthDataPDF, fontSize = 12) => {
  // const styleHeader = {
  //   width: 60,
  //   textDecoration: "underline",
  //   textDecorationStyle: "dotted",
  // };

  const Charkillas = data.lands.map((landddd) => landddd.charKillas).flat();

  const filterByDirection = (
    direction: "East" | "West" | "North" | "South"
  ) => {
    return Charkillas.filter((charkilla) =>
      charkilla.direction.includes(direction)
    )[0];
  };

  const CharkillaForDhulikhel = [
    {
      id: 1,
      direction: "पूर्वः",
      kitta: filterByDirection("East")?.kittaNo,
      name: filterByDirection("East")?.nameNep,
      landscape: filterByDirection("East")?.landscapeType,
    },
    {
      id: 2,
      direction: "पश्चिमः",
      kitta: filterByDirection("West")?.kittaNo,
      name: filterByDirection("West")?.nameNep,
      landscape: filterByDirection("West")?.landscapeType,
    },
    {
      id: 3,
      direction: "उत्तरः",
      kitta: filterByDirection("North")?.kittaNo,
      name: filterByDirection("North")?.nameNep,
      landscape: filterByDirection("North")?.landscapeType,
    },
    {
      id: 4,
      direction: "दक्षिणः",
      kitta: filterByDirection("South")?.kittaNo,
      name: filterByDirection("South")?.nameNep,
      landscape: filterByDirection("South")?.landscapeType,
    },
  ];

  return (
    <>
      <View
        style={{
          fontSize: fontSize,
          flexDirection: "row",
          marginLeft: -20,
          marginBottom: 15,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            width: 50,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          दिशा
        </Text>
        <Text
          style={{
            width: 140,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          कित्ता
        </Text>
        <Text
          style={{
            width: 180,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          नाम
        </Text>
        <Text
          style={{
            width: 50,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        ></Text>
      </View>
      {CharkillaForDhulikhel.map((charkill) => (
        <View
          key={charkill.id}
          style={{
            flexDirection: "row",
            marginLeft: -20,
            fontSize: fontSize,
            marginBottom: 10,
            borderBottom: "1px dotted grey",
          }}
        >
          <Text style={{ width: 50 }}>{charkill.direction}</Text>
          <Text style={{ width: 140 }}>
            {charkill.kitta ?? "-"} (
            {landscape.find((landsca) => landsca.value === charkill.landscape)
              ?.nepali ?? ""}
            )
          </Text>
          <Text style={{ width: 180 }}>{charkill.name}</Text>
          <Text style={{ width: 50 }}></Text>
        </View>
      ))}
    </>
  );
};
