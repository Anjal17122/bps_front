import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { findHiAndLow, underline } from "../helper";
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

const PlinthTippaniPdf = ({ pdfData }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  const [messageApi, contextHolder] = message.useMessage();
  const [sarjiminMiti, setSarjiminMiti] = useState(null);
  const [noticePublishDate, setNoticePublishDate] = useState(null);

  Font.register({ family: "NotoMedium", src: NotoMedium });

  useEffect(() => {
    GetTippani(pdfData.pid, "TIPPANI_PLINTH", messageApi).then((res) => {
      setSarjiminMiti(res.data.sarjaminMiti);
    });

    GetNoticePublishDay15(pdfData.pid, messageApi).then((res) => {
      setNoticePublishDate(res.data.dateNep);
    });
  }, []);

  // const date = rasidList.map((rasid) => rasid.date).join(", ");

  const name = underline(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const mapSheetNo = underline(ConvertToNepali(pdfData.mapSheetNo));
  const landArea = underline(
    ConvertToNepali((Number(pdfData.landAreaSqft) * 10.764).toFixed(2))
  );
  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const wardNo = underline(ConvertToNepali(pdfData.wardNo));
  const roadWidth = underline(ConvertToNepali(pdfData.roadWidth));
  const roadActualSetback = underline(
    ConvertToNepali(pdfData.roadActualSetback)
  );
  const landActualSetback = underline(
    ConvertToNepali(pdfData.landActualSetback)
  );

  const eastKittaNo = underline(ConvertToNepali(pdfData.eastKittaNo));
  const westKittaNo = underline(ConvertToNepali(pdfData.westKittaNo));
  const northKittaNo = underline(ConvertToNepali(pdfData.northKittaNo));
  const southKittaNo = underline(ConvertToNepali(pdfData.southKittaNo));

  const totalSqFt = pdfData.floors
    .reduce((a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev, 0)
    .toFixed(2);

  const totalTaxable = pdfData.floors
    .reduce((a, b) => a + b.ncT + b.countable, 0)
    .toFixed(2);
  const landLength: number = parseFloat(pdfData?.landLength ?? 0);

  const landWidth = parseFloat(pdfData?.landWidth ?? 0);
  const landHeight = parseFloat(pdfData?.landHeight ?? 0);

  const myFloors = () => {
    const floors = pdfData.floors.length - 1;
    const { highest, lowest } = findHiAndLow(pdfData.floors);
    if (highest || lowest) {
      if (lowest / highest < 0.8) {
        return floors + 0.5;
      } else {
        return floors + 1;
      }
    } else {
      return 0;
    }
  };

  return (
    <Document>
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
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              DHULIKHEL MUNICIPALITY
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
          {/* <View style={{ width: 50 }}></View> */}
          <View style={{ width: 60, paddingRight: 40, paddingTop: 5 }}>
            <Image src={DhulikhelLogo} style={{ width: 60, height: 70 }} />
          </View>
        </View>
        {pdfData.landOwners.length < 1 && pdfData.homeOwners.length < 1 ? (
          <View style={{ width: "100%", height: 50 }}></View>
        ) : null}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -40,
            paddingRight: 20,
            paddingBottom: 10,
          }}
        >
          <span style={{ width: 70, height: 75 }}></span>
          {/* {(pdfData.landOwners.length
            ? pdfData.landOwners
            : pdfData.homeOwners
          ).map((landowne) => (
            <Image
              key={landowne.id}
              src={""}
              style={{
                // transform: "rotate",
                // transform: "rotate(90deg)",
                width: 70,
                height: 75,
                marginRight: 10,
                // border: "1.5px solid black",
              }}
            />
          ))} */}
        </View>
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
            &nbsp;विषय: निर्माण स्वीकृति सम्बन्धमा
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
          <Text>
            का.प.जी {underline(municipalityDetails.name)} बस्ने{" "}
            {underline(pdfData.houseOwnersName || pdfData.landOwnersName)}
            ले साबिक {underline(pdfData.sabik)} कि.नं. {kittaNo} क्षेत्रफल{" "}
            {landArea} वर्ग फिट हाल धुलिखेल न.पा. वडा नं{" "}
            {underline(ConvertToNepali(pdfData.wardNo))} मा नक्सापास गर्न मिति{" "}
            {underline(ConvertToNepali(pdfData.date))} नक्सा सहित दरखास्‍त दिएको
            सिलसिलामा मिति{" "}
            {underline(
              noticePublishDate != null
                ? ConvertToNepali(noticePublishDate)
                : ""
            )}{" "}
            मा १५ दिने सूचना टाँस गरिएकोमा स्‍थानिय सरकार सन्चालन ऐन २०७४
            परिक्षेद ७ अनुसार मिति{" "}
            {underline(
              sarjiminMiti != null ? ConvertToNepali(sarjiminMiti) : ""
            )}{" "}
            मा गरिएको सर्जमिन र दफा १५४ को सब-इन्जिनियर को प्रतिबेदनको आधारमा
            नीज ले दिएको नक्सा सहितको दरखास्‍तमा कुनै उजुर नपेरकोले प्लिन्थ लेभल
            सम्मको निर्माण स्वीकृत दिनुपर्ने मनासिब भएकोले निर्णयार्थ श्रीमानमा
            यो टिप्पणी पेश गर्दछु । श्रीमानको जो आदेश ।
          </Text>
          <Text style={{ marginTop: 8 }}>
            {/* स्वीकृत नक्शा बमोजिम प्लीन्थ लेभल (डिपिसी) सम्म निर्माण कार्य गरी
            सकेपछि सो भन्दा माथिको भवन (Superstructure) को निर्माण कार्य गर्न
            पुनः &quot;भवन निर्माण स्थायी इजाजत पत्र&quot; अनिवार्य लिनु पर्नेछ
            । */}
            पुनश्च: नक्शा पास बिना/ विपरीत कुनै निर्माण कार्य भएको भए सोको
            विवरण:
          </Text>
        </View>

        {/* <CertificateFooter /> */}
      </Page>
    </Document>
  );
};

export default PlinthTippaniPdf;

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
