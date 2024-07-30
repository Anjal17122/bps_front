import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import GovLogo from "../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../Services/Api";
import { municipalityDetails } from "../../../constants/constants";
import { PDFBodyType } from "./PDFtypes";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import { Underline } from "./AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { CertificateFooterChandrapur } from "./CertificateFooterChandrapur";
import { landscape } from "../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../Services/PDFService";

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  };
  pdfData: PDFBodyType;
}

const FinalPlinthDesign = ({ data, pdfData }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontWeight: 400,
          fontFamily: "Noto",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 10.5,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            height: 100,
            width: "80%",
            paddingBottom: 4,
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
            <Text style={{ textAlign: "center", fontSize: 22 }}>
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              {municipalityDetails.letterheadType}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginLeft: -10,
              }}
            >
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginLeft: -7,
              }}
            >
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          {/* <View style={{ width: 70 }}>
            <Image
              src={{
                uri: IMG_GET_URL + `/${imgFolders.person}/${""}`,
                method: "GET",
                headers: "",
                body: "",
              }}
              style={{ width: 70, height: 50 }}
            />
          </View> */}
        </View>
        <View
          style={{
            marginTop: -20,
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
            marginTop: 0,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4, marginTop: 10 }}>
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
          <Text style={{ paddingBottom: 4 }}>
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -40,
            paddingRight: 30,
            paddingBottom: 10,
          }}
        >
          {pdfData.landOwners.map((landowne) => (
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
              fontSize: 12,
              textDecoration: "underline",
              paddingTop: -5,
              paddingBottom: 4,
            }}
          >
            बिषय: प्लिन्थ लेभलसम्म निर्माण कार्यको इजाजत पत्र
          </Text>
        </View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>
            उपरोक्त विषयमा{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {pdfData.landOwnersName}
            </Text>{" "}
            को नाममा मालपोत कार्यालय{" "}
            <Text style={Underline}>{window.globalConfig.district}</Text> मा
            दर्ता प्रमाणित भएको यस{" "}
            <Text style={Underline}>{window.globalConfig.name}</Text> वडा नं{" "}
            &nbsp;
            <Text style={Underline}>
              {ConvertToNepali(pdfData.wardNo)}{" "}
            </Text>{" "}
            अन्तर्गत{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {pdfData.toleNep}
            </Text>{" "}
            टोलमा रहेको कित्ता नं{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {" "}
              {ConvertToNepali(pdfData.kittaNo)}
            </Text>{" "}
            क्षेत्रफल{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {ConvertToNepali(pdfData.landArea)}{" "}
              <Text style={{ fontSize: 9 }}>Sq.m</Text>
            </Text>{" "}
            जग्गामा नक्शा बमोजिम प्लिन्थ लेभल सम्मको निर्माण कार्य गर्न यस
            नगरपालिकाको नियम कानुन पालना गरि बस्ती विकास, सहरी योजना तथा
            मण्डनदेउपुर नगरपालिका सहरी योजना तथा भवन निर्माण सम्बन्धी मापदण्ड
            २०७४
            {/* भवन प्रमाणीकरण कार्यविधि २०७५ */}
            ले तोकेको मापदण्ड अनुसार बाटोको लागि र अन्य प्रयोजनको लागि छोड्नु
            पर्ने जग्गा छोडी साँध सधियारको जग्गा नघुसाई कोहि कसैलाई बाधा अड्चन
            सन्धि-सर्पन नगर्ने गरि बिजुलीको हाईटेन्सन र लोटेन्सन लाइन मुनि
            नपर्ने गरि स्वीकृत नक्शा बमोजिम निर्माण कार्य गर्न स्थानीय स्वायत्त
            शासन ऐन २०५५ को दफा १५५ बमोजिम यो भवन निर्माणको अस्थाई इजाजत पत्र
            प्रदान गरिएको छ ।
          </Text>
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            style={{
              paddingLeft: 50,
              paddingRight: 40,
            }}
          >
            स्वीकृत नक्शा बमोजिम प्लिन्थ लेभल डि.पी.सी सम्म निर्माण कार्य गरी
            सकेपछि सो भन्दा माथिको भवनको निर्माण कार्य गर्न पुर्व भवन निर्माण
            स्थाई इजाजत पत्र आनिवार्य लिनु पर्ने छ ।
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            paddingTop: 5,
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          <Text style={{ paddingBottom: 4 }}>१ नयाँ घर </Text>
          <Text style={{ paddingBottom: 4 }}>
            २ बन्ने घरको (मिटर): लम्बाई {ConvertToNepali(pdfData?.landLength)} ,
            चौडाई {ConvertToNepali(pdfData?.landWidth)}, तल्ला कुल उचाई{" "}
            {ConvertToNepali(pdfData?.landHeight)}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ३ बन्ने कम्पाउण्ड टहराको लम्बाई
            {/* {pdfData?.landHeight} चौडाई {pdfData?.landHeight} तल्ला कुल उचाई
            {pdfData?.landHeight} */}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ४ भवनको प्रयोजन{" "}
            <Text style={{ fontSize: 9, ...Underline }}>
              {data.buildingPurpose}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ५ बन्ने घरको किसिम{" "}
            <Text style={{ fontSize: 9, ...Underline }}>
              {pdfData.buildingStructureType}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ६ जमिन कभरेज:{" "}
            <Text style={Underline}>
              {ConvertToNepali(pdfData.coveragePercent)} %
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>७ चारकिल्ला मापदण्ड: </Text>
        </View>
        {charkillaMapFinal(pdfData.charkillas)}

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingBottom: 8,
            marginTop: 6,
          }}
        >
          <Text>८ निर्माणको लागि इजाजत प्रदान गरिएको तल्ला (sq. ft.)</Text>
        </View>
        <View
          style={{
            height: pdfData.floors.length > 3 ? 56 : "auto",
            flexWrap: "wrap",
          }}
        >
          {pdfData.floors.map((floor) => {
            const total =
              floor.ncT +
              floor.countable +
              floor.nCNT +
              floor.other +
              floor.prev;
            return (
              <View
                key={floor.id}
                style={{
                  flexDirection: "column",

                  height: "14px",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      width: 120,
                    }}
                  >
                    {floor.name}
                  </Text>
                  <Text
                    style={{
                      width: 80,
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    {ConvertToNepali(total)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: 200,
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: -50,
            paddingLeft: 50,
            borderTop: "1px dotted black",
          }}
        >
          <Text style={{ width: 80 }}>जम्मा: </Text>
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          >
            {ConvertToNepali(
              pdfData.floors
                .reduce(
                  (a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev,
                  0
                )
                .toFixed(2)
            )}{" "}
          </Text>
        </View>
        {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? null : (
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              paddingTop: 0,
              justifyContent: "flex-start",
              paddingLeft: 60,
              paddingBottom: 4,
            }}
          >
            <Text>
              ९ बाटोको सिमानामा कम्पाउण्ड/वाल लगाउँदा नगरपालिकाको मापदण्ड अनुसार
              छोड्न पर्नेछ |
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            paddingTop: 0,
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          {/* <View
        style={{
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 20,
        }}
      > */}
          {/* <Text>
            १० पास भएको नक्शा विपरित कार्य गरेमा वा यसमा उल्लेखित शर्तहरुको
            बिर्खिलाप अन्य कुनै कार्य गरेमा प्रचलित कानुन बमोजिम कारवाही भएमा
            मलाई मान्य हुनेछ ।
          </Text> */}
          {/* </View> */}
          {/* <Text>१० कैफियत</Text> */}
        </View>

        {municipalityDetails.address1 === "चन्द्रनिगाहपुर – ६, रौतहट" ? (
          <CertificateFooterChandrapur />
        ) : (
          <CertificateFooter number="" />
        )}
      </Page>
    </Document>
  );
};

export default FinalPlinthDesign;

// जग्गामा नक्शा बमोजिम प्लिन्थ लेभल सम्मको निर्माण कार्य गर्न यस
// नगरपालिकाको नियम कानुन पालना गरि बस्ती विकास, सहरी योजना तथा भवन
// निर्माण सम्बन्धी आधारभूत निर्माण मापदण्ड, २०७२ र उपत्यका विकास​
// प्राधिकरणले तोकेको मापदण्ड अनुसार बाटोको लागि र अन्य प्रयोजनको लागि
// छोड्नु पर्ने जग्गा छोडी साँध सधियारको जग्गा नघुसाई कोहि कसैलाई बाधा
// अड्चन सन्धि-सर्पन नगर्ने गरि बिजुलीको हाईटेन्सन र लोटेन्सन लाइन मुनि
// नपर्ने गरि स्वीकृत नक्शा बमोजिम निर्माण कार्य गर्न स्थानीय स्वायत्त
// शासन ऐन २०५५ को दफा १५५ बमोजिम यो भवन निर्माणको अस्थाई इजाजत पत्र
// प्रदान गरिएको छ ।

export function CertificateFooter({ number = "१०" }: { number?: string }) {
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
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 20,
        }}
      >
        <Text>
          {/* {number} पास भएको नक्शा विपरित कार्य गरेमा वा यसमा उल्लेखित शर्तहरुको
          बिर्खिलाप अन्य कुनै कार्य गरेमा प्रचलित कानुन बमोजिम कारवाही भएमा मलाई
          मान्य हुनेछ । */}
          स्विकृत भएको नक्सा बमोजिम निर्माण कार्य गरी सकेपछी यस साथ संलग्न शर्त
          तथा कार्यबिधी पुरा गरी निर्माण सम्पन्न प्रमाण-पत्र अनिवर्य लिनु पर्ने
          छ । पास भएको विपरित कार्य गरेमा वा यस्मा उल्लेखित सर्तहरुको बर्खिलाप
          अन्य कुनै कार्य गरेमा कानुन बमोजिम स्वत: कारवही हुनेछ ।
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          paddingTop: 10,
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
          <Text style={{ width: 140 }}>अमिन/सर्वेक्षक</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>सब-इन्जिनियर</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <Text style={{ width: 140 }}>इन्जिनियर​</Text>
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
