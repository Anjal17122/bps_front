import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  pdf,
} from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { underline } from "../helper";
import { useEffect, useState } from "react";
import {
  GetNoticePublishDay15,
  GetTippani,
} from "../../../Admin/OnDeskFinal/OnDeskService/ApprovedService/ApprovedService";
import { message } from "antd";
import DhulikhelLogo from "../../../../Assets/Images/dhulikhel_logo_png.png";

interface Props {
  pdfData: PDFBodyType;
}

const SuperStTippaniDesign = ({ pdfData }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  const [messageApi, contextHolder] = message.useMessage();
  const [sarjiminMiti, setSarjiminMiti] = useState(null);
  const [noticePublishDate, setNoticePublishDate] = useState(null);

  Font.register({ family: "NotoMedium", src: NotoMedium });

  useEffect(() => {
    GetTippani(pdfData.pid, "TIPPANI_SUPERSTRUCTURE", messageApi).then(
      (res) => {
        setSarjiminMiti(res.data.sarjaminMiti);
      }
    );

    GetNoticePublishDay15(pdfData.pid, messageApi).then((res) => {
      setNoticePublishDate(res.data.dateNep);
    });
  }, []);

  // const date = rasidList.map((rasid) => rasid.date).join(", ");

  const name = underline(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const landArea = underline(
    ConvertToNepali((Number(pdfData.landAreaSqft) * 10.764).toFixed(2))
  );
  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const wardNo = underline(ConvertToNepali(pdfData.wardNo));

  const sabik = underline(pdfData.sabik);

  console.log({ sarjiminMiti, arko: pdfData.projectCreationDate });
  return (
    <>
      <Document>
        {contextHolder}
        <Page
          size="A4"
          style={{
            fontWeight: 400,
            fontFamily: "Noto",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 11,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              height: 100,
              width: "80%",
              paddingBottom: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ paddingTop: 10 }}>
              <Image src={GovLogo} style={{ width: 60, height: "auto" }} />
            </View>
            <View
              style={{
                width: 400,
                color: "red",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                display: "flex",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                {municipalityDetails.letterheadTitle}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontFamily: "NotoMedium",
                }}
              >
                {municipalityDetails.letterheadType}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  marginLeft: -10,
                  fontFamily: "NotoMedium",
                }}
              >
                {municipalityDetails.letterheadAddress1}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  marginLeft: -7,
                  fontFamily: "NotoMedium",
                }}
              >
                {municipalityDetails.letterheadAddress2}
              </Text>
            </View>
            <View style={{ width: 50 }}></View>

            <View style={{ width: 60, paddingRight: 40, paddingTop: 5 }}>
              <Image src={DhulikhelLogo} style={{ width: 60, height: 70 }} />
            </View>
          </View>
          <View style={{ width: "100%", height: 50 }}></View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginTop: -35,
                fontFamily: "NotoMedium",
              }}
            >
              &nbsp; विषय - भवन निर्माण स्थायी प्रमाण-पत्र सम्बन्धमा ।
            </Text>
            <Text
              style={{
                fontSize: 16,
                paddingTop: -5,
                //   textAlign: "center",
                fontFamily: "NotoMedium",
              }}
            >
              टिप्पणी र आदेश
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 50,
              paddingRight: 40,
              textAlign: "justify",
              marginTop: "15px",
            }}
          >
            <Text>श्रीमान,</Text>
            <Text>
              हाल काभ्रेपलाञ्चोक जिल्ला धुलिखेल नगरपालिकाको वडा नं. {wardNo}{" "}
              बस्ने {name}ले यस कार्यालयमा निवेदन दिए अनुसार साविक {sabik} हाल
              धु.न.पा.- {wardNo} कि.नं. {kittaNo} को क्षे.फ. {landArea} वर्ग फिट
              को जग्गामा घर निर्माण गर्न मिति{" "}
              {underline(ConvertToNepali(pdfData.projectCreationDate))} गते यस
              कार्यालयमा घर नक्सा पेश गरी मिति{" "}
              {sarjiminMiti ? underline(ConvertToNepali(sarjiminMiti)) : ""}{" "}
              गतेमा अस्थायी इजाजत पत्र स्वीकृत भइसकेको देखिन्छ । यसर्थ हाल उक्त
              इजाजत पत्र स्थायी इजाजत पत्र पाउन भनि डिजाइनरको प्रतिवेदन सहितको
              स्थलगत निरीक्षण गर्दा अस्थायी इजाजत अनुसारको घर निर्माण भइसकेकोले
              स्थायी इजाजत अनुसारको घर निर्माण भइसकेकोले प्लिन्थ लेभल भन्दा माथि
              Super Structure को लागि भवन निर्माण स्थायी इजाजत स्वीकृत हुन
              मनासिब देखिएकाले निर्णयार्थ पेश गरेको छु ।
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default SuperStTippaniDesign;

export function NagarjunFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 40,
        }}
      >
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          marginTop: -5,
          justifyContent: "flex-end",
          paddingRight: 80,
        }}
      >
        <Text>..........................................</Text>
        <Text>नक्शावाला/ निजको वारेस</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 35,
          paddingLeft: 80,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>..............................</Text>
          <Text style={{ width: 200 }}>फिल्ड निरिक्षण गरि पेश गर्ने</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <Text style={{ width: 200 }}>सिफारिस गर्ने</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>स्वीकृत गर्ने</Text>
        </View>
      </View>
    </View>
  );
}

export const charkillaMapFinal = (charkillas: CharKilla[], fontSize = 10) => {
  // const styleHeader = {
  //   width: 60,
  //   textDecoration: "underline",
  //   textDecorationStyle: "dotted",
  // };

  const filterByDirection = (
    direction: "East" | "West" | "North" | "South"
  ) => {
    return charkillas.filter((charkilla) =>
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
          marginBottom: 0,
          marginTop: 0,
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
            marginBottom: 2,
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
