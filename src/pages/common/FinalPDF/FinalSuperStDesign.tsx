import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import GovLogo from "../../../Assets/Images/resizednepgov.png";
import { PDFBodyType } from "./PDFtypes";
import { CertificateFooter } from "./FinalPlinthDesign";
import { municipalityDetails } from "../../../constants/constants";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import { Underline } from "./AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { CertificateFooterChandrapur } from "./CertificateFooterChandrapur";
import { CharkillaMap } from "./charkillaMap";

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  };
  pdfData: PDFBodyType;
}

const FinalSuperStDesign = ({ data, pdfData }: Props) => {
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
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadType}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                marginLeft: -10,
              }}
            >
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                marginLeft: -7,
              }}
            >
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          <View style={{ width: 60 }}></View>
        </View>
        <View
          style={{
            marginTop: -20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 40,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: -15,
            paddingLeft: 40,
          }}
        >
          <View>
            <Text style={{ paddingBottom: 0, paddingTop: 20 }}>
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
            <Text style={{ paddingBottom: 0 }}>
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
              display: "flex",
              // justifyContent: "flex-end",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingRight: 40,
            }}
          >
            <Text style={{ paddingBottom: 3 }}>
              मिति : {ConvertToNepali(pdfData.date)}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {pdfData.landOwners.map((owner) => {
                const imgUrl =
                  IMG_GET_URL +
                  `/${imgFolders.person}/${owner.owner.photoFileName}`;
                console.log({ imgUrl });
                return (
                  <>
                    {/* <Text
                    style={{ fontSize: 6 }}
                  >{`${owner.owner.photoFileName}`}</Text> */}
                    <Image
                      key={owner.id}
                      src={{
                        uri: imgUrl,
                        method: "GET",
                        headers: "",
                        body: "",
                      }}
                      style={{
                        width: 60,
                        height: 70,
                        marginRight: 5,
                        border: "1.5px solid black",
                      }}
                    />
                  </>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 5, fontSize: 11 }}>
          <Text
            style={{
              marginLeft: 0,
              marginTop: -10,
              width: 600,
              textAlign: "center",
              color: "red",
              fontSize: 16,
            }}
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            भवन निर्माण स्थायी इजाजतपत्र​
          </Text>
          <Text
            style={{
              marginLeft: 0,
              width: 600,
              textAlign: "center",
            }}
          >
            (Plinth Level माथि Superstructure को लागि)..
          </Text>
        </View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text style={{ lineHeight: 1.4 }}>
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
            <Text style={Underline}>{window.globalConfig.district}</Text>मा
            दर्ता प्रमाणित भएको यस{" "}
            <Text style={Underline}>{window.globalConfig.name}</Text> वडा नं{" "}
            <Text style={Underline}>{ConvertToNepali(pdfData.wardNo)} </Text>,
            साबिक {pdfData.sabik} अन्तर्गत{" "}
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
              {ConvertToNepali(pdfData.landArea)}
            </Text>{" "}
            जग्गामा नक्शा बमोजिम प्लिन्थ लेभल माथि निर्माण कार्य गर्न यस
            नगरपालिकाको नियम कानुन पालना गरि बस्ती विकास, सहरी योजना तथा भवन{" "}
            {/* eslint-disable-next-line no-irregular-whitespace */}
            निर्माण सम्बन्धी आधारभूत निर्माण मापदण्ड, २०७२ र मण्डनदेउपुर
            नगरपालिका सहरी योजना तथा भवन निर्माण सम्बन्धी मापदण्ड, २०७४ ले
            तोकेको मापदण्ड अनुसार बाटोको लागि र अन्य प्रयोजनको लागि छोड्नु पर्ने
            जग्गा छोडी साँध सधियारको जग्गा नघुसाई कोहि कसैलाई बाधा अड्चन
            सन्धि-सर्पन नगर्ने गरि बिजुलीको हाईटेन्सन र लोटेन्सन लाइन मुनि
            नपर्ने गरि स्वीकृत नक्शा बमोजिम निर्माण कार्य गर्न स्थानीय सरकार
            संचालन ऐन २०७४ को परिच्छेद-७ बमोजिम यो भवन निर्माणको स्थाई इजाजत
            पत्र प्रदान गरिएको छ ।
          </Text>
        </View>
        <View style={{ paddingTop: 5 }}>
          <Text
            style={{
              paddingLeft: 50,
              paddingRight: 40,
            }}
          >
            नक्शा पास भन्दा फेर बदल नहुने गरि तथा मापदण्डलाई आंच आउने गरी
            निर्माण कार्य गरेमा सम्पन्न प्रमाण पत्र दिन कार्यालय बध्य हुने छैन ।
            {/* स्वीकृत नक्शा बमोजिम प्लिन्थ लेभल डि.पी.सी सम्म निर्माण कार्यगरि
            सकेपछि सो भन्दा माथिको भवनको निर्माण कार्य गर्न पुर्व भवन निर्माण
            स्थाई इजाजत पत्र आनिवार्य लिनु पर्ने छ । */}
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
          <Text>१ नयाँ घर </Text>
          <Text>
            २ बन्ने घरको (मिटर): लम्बाई {ConvertToNepali(pdfData?.landLength)} ,
            चौडाई {ConvertToNepali(pdfData?.landWidth)}, तल्ला कुल उचाई{" "}
            {ConvertToNepali(pdfData?.landHeight)}
          </Text>
          <Text>
            ३ बन्ने कम्पाउण्ड टहराको लम्बाई
            {/* {pdfData?.landHeight} चौडाई {pdfData?.landHeight} तल्ला कुल उचाई
          {pdfData?.landHeight} */}
          </Text>
          <Text>
            ४ भवनको प्रयोजन{" "}
            <Text style={{ fontSize: 10, ...Underline }}>
              {data.buildingPurpose}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ५ बन्ने घरको किसिम{" "}
            <Text style={{ fontSize: 10, ...Underline }}>
              {pdfData.buildingStructureType}
            </Text>
          </Text>
          <Text>६ चारकिल्ला मापदण्ड </Text>
        </View>
        {CharkillaMap(pdfData)}

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingTop: 10,
          }}
        >
          <Text>७ निर्माणको लागि इजाजत प्रदान गरिएको तल्ला (sq. ft.) </Text>
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
            // console.log({ total, floor });
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
                      width: 100,
                    }}
                  >
                    {floor.name}
                  </Text>
                  <Text
                    style={{
                      width: 90,
                      fontSize: 10,
                      // textDecoration: "underline",
                      // textDecorationStyle: "dotted",
                      // fontFamily: "Noto",
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
              ८ बाटोको सिमानामा कम्पाउण्ड/वाल लगाउँदा नगरपालिकाको मापदण्ड अनुसार
              छोड्न पर्नेछ |
            </Text>
          </View>
        )}

        {municipalityDetails.address1 === "चन्द्रनिगाहपुर – ६, रौतहट" ? (
          <CertificateFooterChandrapur />
        ) : (
          <CertificateFooter number="" />
        )}
      </Page>
    </Document>
  );
};

export default FinalSuperStDesign;
