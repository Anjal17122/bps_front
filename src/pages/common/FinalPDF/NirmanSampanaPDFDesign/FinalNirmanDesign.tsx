import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { extractNum } from "../../../../constants/GlobalFunctions";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { PDFBodyType } from "../PDFtypes";
import { CertificateFooter } from "../FinalPlinthDesign";
import { CharkillaMap } from "../charkillaMap";
import { Underline } from "../AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { CertificateFooterChandrapur } from "../CertificateFooterChandrapur";

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  };

  pdfData: PDFBodyType;
}

const FinalNirmanDesign = ({ data, pdfData }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });

  const WardNo = ConvertToNepali(extractNum(pdfData.wardName));
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
          <View style={{ width: 60 }}>
            <Image
              src={{
                uri: IMG_GET_URL + `/${imgFolders.person}/${""}`,
                method: "GET",
                headers: "",
                body: "",
              }}
              style={{ width: 60, height: "auto" }}
            />
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
          <Text> मिति : {ConvertToNepali(pdfData.date)}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -20,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4 }}>
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
        <View>
          <Text
            style={{
              fontSize: 12,
              textDecoration: "underline",
              paddingTop: 2,
              paddingBottom: 6,
            }}
          >
            विषय: भवन निर्माण सम्पन्नाता प्रमाण-पत्र
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
              {pdfData.houseOwnersName}
            </Text>{" "}
            को नाममा मालपोत कार्यालय कलंकीमा दर्ता प्रमाणित भएको यस चन्द्रागिरी
            नं पा. वडा नं अन्तर्गत{" "}
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
            {municipalityDetails.district} जिल्ला{" "}
            {municipalityDetails.letterheadTitle} वडा नं {WardNo} बस्ने
            {/* श्री श्रीमती सुश्री */}
            {pdfData.landOwnersName} ले मिति {ConvertToNepali(pdfData.date)} मा
            निर्माण गर्न स्थायी इजाजत पत्र/ निर्माण नियमित प्रमाण पत्र/ नामसारी
            प्रमाण पत्र प्राप्त गरि मिति {ConvertToNepali(pdfData.date)} मा
            निर्माण कार्य सम्पन्न गर्नु भएकोमा भएको सो को निर्माण सम्पन्न प्रमाण
            पत्र माग गर्नु भएकाले तपसिल बमोजिम यो निर्माण सम्पन्न प्रमाण पत्र
            प्रदान गरिएको छ ।
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
          <Text style={{ paddingBottom: 4 }}>
            १ जग्गा धनीको नाम, थर:{" "}
            {pdfData.landOwners
              .map((landOwne) => landOwne.owner.nameNep)
              .toString()
              .replace(/[\]"]+/g, "")}{" "}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            २ जग्गाको विवरण : {municipalityDetails.letterheadTitle} वडा नं :{" "}
            {WardNo} किता नं : {ConvertToNepali(pdfData.kittaNo)}{" "}
            {/* {ConvertToNepali(parseInt(pdfData?.landLength))} , चौडाई{" "}
            {ConvertToNepali(parseInt(pdfData?.landWidth))}, तल्ला कुल उचाई{" "}
            {ConvertToNepali(parseInt(pdfData?.landHeight))} */}
          </Text>

          <Text style={{ paddingBottom: 4 }}>
            ३ भवनको प्रयोजन {data.buildingPurpose}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ४ बन्ने घरको किसिम{" "}
            <Text style={{ fontSize: 10, ...Underline }}>
              {pdfData.buildingStructureType}
            </Text>{" "}
            कभरेज : {ConvertToNepali(pdfData.coverage)} फार :{" "}
            {ConvertToNepali(pdfData.far)}{" "}
          </Text>
          <Text style={{ paddingBottom: 4 }}>५ चारकिल्ला मापदण्ड </Text>
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
          <Text> ६ निर्माणको लागि इजाजत प्रदान गरिएको तल्ला (sq. ft.) </Text>
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
        <View
          style={{
            flexDirection: "column",

            width: "100%",
            paddingTop: 5,
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingBottom: 4,
          }}
        >
          <Text>
            ७ बाटोको सिमानामा कम्पाउण्ड/वाल लगाउँदा नगरपालिकाको मापदण्ड अनुसार
            छोड्न पर्नेछ |
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: "column",

            width: "100%",
            paddingTop: 0,
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          <Text>७ कैफियत</Text>
        </View> */}
        {municipalityDetails.address1 === "चन्द्रनिगाहपुर – ६, रौतहट" ? (
          <CertificateFooterChandrapur />
        ) : (
          <CertificateFooter number="" />
        )}
      </Page>
    </Document>
  );
};

export default FinalNirmanDesign;
