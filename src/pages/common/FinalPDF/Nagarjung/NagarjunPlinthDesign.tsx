import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { findHiAndLow, underline } from "../helper";
import { RasidListType } from "../../../../Services/FloorService";
import Npage2 from "../../../../Assets/Images/nagarjun_plinth_page2.jpeg";
import {
  calculateNagarjunRevenue,
  convertToFeet,
} from "../../../../constants/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
}

const NagarjunPlinthDesign = ({ pdfData, rasidList }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const amount = ConvertToNepali(
    rasidList.map((rasid) => rasid.amount).reduce((a, b) => a + b, 0)
  );

  const rasidNo = rasidList.map((rasid) => rasid.rasidNo).join(", ");

  // GETfloorPerma(currentPid, messageApi).then((res) => {
  //   setRevenueData(JSON.parse(res.data.floorDetail));
  // });

  // const date = rasidList.map((rasid) => rasid.date).join(", ");

  const name = underline(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const mapSheetNo = underline(ConvertToNepali(pdfData.mapSheetNo));
  const landArea = underline(ConvertToNepali(pdfData.landArea));
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
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                marginLeft: -7,
                fontFamily: "NotoMedium",
              }}
            >
              (नक्शा शाखा)
            </Text>
          </View>
          <View style={{ width: 50 }}></View>
        </View>
        <View
          style={{
            marginTop: -50,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 40,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          <Text> मिति : {ConvertToNepali(pdfData.date)}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: 10,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 1, marginTop: 0 }}>
            पत्र संख्या : {ConvertToNepali(pdfData.patraSankhya)}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {/* {nepalify.format(data.chalanino, nepalifyOptions)} */}
            </Text>
          </Text>
          <Text>
            चलानी नं : {ConvertToNepali(pdfData.chalaniNo)}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {/* {nepalify.format(data.patrasankhya, nepalifyOptions)} */}
            </Text>
          </Text>
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
          {(pdfData.homeOwners.length
            ? pdfData.homeOwners
            : pdfData.landOwners
          ).map((landowne) => (
            <Image
              key={landowne.id}
              src={{
                uri:
                  IMG_GET_URL +
                  `/${imgFolders.person}/${landowne.owner.photoFileName}`,
                method: "GET",
                headers: "",
                body: "",
              }}
              style={{
                // transform: "rotate",
                // transform: "rotate(90deg)",
                width: 70,
                height: 75,
                marginRight: 10,
                border: "1.5px solid black",
              }}
            />
          ))}
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              marginTop: -35,

              fontFamily: "NotoMedium",
            }}
          >
            &nbsp;भवन निर्माण अस्थायी इजाजत पत्र
          </Text>
          <Text
            style={{
              fontSize: 16,
              paddingTop: -5,

              fontFamily: "NotoMedium",
            }}
          >
            (Plinth Level सम्मको लागि मात्र)
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -15,
            paddingBottom: 5,
          }}
        >
          <Text>
            श्री{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {pdfData.houseOwnersName || pdfData.landOwnersName}
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -5,

            paddingBottom: 5,
          }}
        >
          <Text>
            नागार्जुन न. पा. वडा नं.{" "}
            {underline(ConvertToNepali(pdfData.wardNo))}
          </Text>
        </View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>
            उपरोक्त विषयमा तपाईको नाममा मालपोत कार्यालय कलंकीमा दर्ता प्रमाणित
            भएको यस नागार्जुन न.पा. वडा नं. {ConvertToNepali(pdfData.wardNo)} मा
            पर्ने तपशिलमा उल्लेखित कित्ता जग्गामा नक्शा बमोजिम Plinth Level
            सम्मको निर्माण कार्य गर्न यस न. पा. को सम्पूर्ण नियम कानून पालना
            गर्ने शर्तहरु, वस्ती विकास/सहरी योजना तथा भवन निर्माण सम्बन्धी
            आधारभूत मार्गदर्शन २०७२ र उपत्यका विकास प्राधिकरणले तोकेको मापदण्ड
            अनुसार बाटोको लागि र अन्य प्रयोजनको लागि छाड्नु पर्ने जग्गा छोडी
            साँध सँधयारको जग्गा नघुसाई कोही कसैलाई बाधा अड्चन सन्धि सर्पन नगर्ने
            गरी विजुलीको हाईटेन्सन लाइन मुनी नपर्ने गरि स्वीकृत नक्शा बमोजिम
            निर्माण कार्य गर्न स्थानीय सरकार संचालन ऐन २०७४ को दफा ३३ वमोजिम यो
            भवन निर्माणको अस्थायी इजाजत पत्र प्रदान गरिएको छ।
          </Text>
          <Text style={{ marginTop: 8 }}>
            स्वीकृत नक्शा बमोजिम प्लीन्थ लेभल (डिपिसी) सम्म निर्माण कार्य गरी
            सकेपछि सो भन्दा माथिको भवन (Superstructure) को निर्माण कार्य गर्न
            पुनः &quot;भवन निर्माण स्थायी इजाजत पत्र&quot; अनिवार्य लिनु पर्नेछ
            ।
          </Text>
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            style={{
              fontFamily: "NotoMedium",
              fontSize: 14,
              paddingTop: 5,
              marginLeft: -10,
            }}
          >
            तपशिल
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            paddingTop: 5,
            justifyContent: "flex-start",
            paddingLeft: 60,
            lineHeight: 1.5,
          }}
        >
          <Text>
            साबिक {pdfData.sabik} &nbsp; सि. नं. {mapSheetNo} &nbsp; कि. नं.{" "}
            {kittaNo} &nbsp; क्षे.फ. {landArea} &nbsp; बर्गमिटर, हालको वडा नं.{" "}
            {wardNo}
          </Text>
          <Text>१. नयाँ घर </Text>
          <Text>
            २. बन्ने घरको (फिट): लम्बाई &nbsp;
            {underline(ConvertToNepali(convertToFeet(landLength)))} ,
            &nbsp;&nbsp; चौडाई &nbsp;
            {underline(ConvertToNepali(convertToFeet(landWidth)))} ,
            &nbsp;&nbsp; कुल उचाई &nbsp;
            {underline(ConvertToNepali(convertToFeet(landHeight)))},
            &nbsp;&nbsp; तल्ला {underline(ConvertToNepali(myFloors()))}
          </Text>
          <Text>
            ३. बन्ने कम्पाउण्ड टहराको लम्बाई
            {/* {pdfData?.landHeight} चौडाई {pdfData?.landHeight} तल्ला कुल उचाई
            {pdfData?.landHeight} */}
          </Text>
          <Text>४. बाटोको सिमानाबाट नियमानुसार कम्तिमा छाड्नुपर्ने दुरी </Text>
          <Text style={{ paddingLeft: 15 }}>
            क{")"} हाल भइरहेको बाटो चौडाई &nbsp; {roadWidth} &nbsp; देखिन्छ
          </Text>
          <Text style={{ paddingLeft: 15 }}>
            ख{")"} छोडेको दुरी {roadActualSetback} फीट देखिन्छ
          </Text>
          <Text>
            ५. बाटोको सिमाना कम्पाउण्ड/वाल लगाउँदा जमिनको सतहभन्दा माथि
            कम्पाउण्ड/वाल लगाउँदा ५&apos;-० अनिवर्य छोड्नु पर्नेछ ।
          </Text>
          <Text
            style={{ fontFamily: "NotoMedium", paddingTop: 3, fontSize: 13 }}
          >
            चारकिल्ला
          </Text>
          <Text>
            पूर्व कि.नं. {eastKittaNo} &nbsp; पश्चिम कि.नं. &nbsp;{westKittaNo}{" "}
            &nbsp; उत्तर कि.नं. &nbsp;
            {northKittaNo} &nbsp; दक्षिण कि.नं. &nbsp;{southKittaNo}
          </Text>
          <Text>६. अर्को तर्फ जग्गाको सिमानाबाट छोड्नु पर्ने दुरी</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ marginRight: 40, marginLeft: 13 }}>
              <Text>साबिक टोल</Text>
              <Text>{underline(pdfData.sabik)}</Text>
            </View>
            <View style={{ marginRight: 40 }}>
              <Text>हालको टोल</Text>
              <Text>{underline(pdfData.currentTole)}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text>
                क{")"} झ्याल राख्ने भए ५&apos;-० अनिवर्य छोड्नु पर्नेछ ।
              </Text>
              <Text>
                ख{")"} छोडेको दुरी {landActualSetback} देखिन्छ ।
                {/* {pdfData.pid === 1320 ? "५'" : landActualSetback} देखिन्छ । */}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingBottom: 3,
            marginTop: 6,
          }}
        >
          <Text>७ निर्माणको लागि इजाजत प्रदान गरिएको तल्ला </Text>
        </View>
        <View
          style={{
            paddingLeft: 70,
            height: "auto",
            flexWrap: "wrap",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {pdfData.floors.map((floor, index) => {
            const total =
              floor.ncT +
              floor.countable +
              floor.nCNT +
              floor.other +
              floor.prev;

            return (
              <View key={floor.id} style={{ width: 220, height: "14px" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      width: 10,
                    }}
                  >
                    {ConvertToNepali(index + 1)}.
                  </Text>
                  <Text style={{ fontSize: 10, width: 70 }}>{floor.name}</Text>
                  <Text
                    style={{
                      width: 80,
                      fontSize: 10,
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    {ConvertToNepali(total.toFixed(2))} &nbsp;बर्गफुट
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: "72%",
            flexDirection: "row",
          }}
        >
          <Text style={{ width: 80 }}>जम्मा: </Text>
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          >
            {ConvertToNepali(totalSqFt)}
            &nbsp;बर्गफुट
          </Text>
        </View>

        <View style={{ paddingLeft: 70, paddingRight: 40, marginTop: 5 }}>
          <Text>
            पाश भएको नक्शा विपरित कार्य गरेमा वा यसमा उल्लेखित शर्तहरुको
            बर्खिलाप अन्य कुनै कार्य गरेमा प्रचलित कानुन बमोजिम कारवाही भएमा
            मलाई मान्य हुनेछ भनी सहिछाप गर्ने
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              fontFamily: "NotoMedium",
              textDecoration: "underline",
              marginTop: 5,
            }}
          >
            {municipalityDetails.letterheadTitle} कार्यालयबाट
          </Text>
          <Text>
            यसमा उल्लेखित निवेदक श्री/श्रीमती सुश्री {name} बाट नक्शा पास वापत
            घरको {underline(ConvertToNepali(totalSqFt))} वर्ग फिटको रु{" "}
            {underline(
              ConvertToNepali(
                calculateNagarjunRevenue(
                  parseFloat(totalTaxable ?? "0")
                ).toFixed(2)
              )
            )}{" "}
            &nbsp; र. नं. ........... मिति ...................... बाट स-धन्यवाद
            प्राप्त भयो
          </Text>
        </View>

        <NagarjunFooter />
      </Page>
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
        <View>
          <Image
            src={Npage2}
            style={{
              width: "520px",
              height: "800px",
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default NagarjunPlinthDesign;

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
          <Text style={{ width: 200 }}>फिल्ड निरिक्षण गरी पेश गर्ने</Text>
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
