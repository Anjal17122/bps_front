import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { underline } from "../helper";
import { PDFBodyType } from "../PDFtypes";

interface Props {
  data: {
    pid: string;
    chalanino: string;
    patrasankhya: string;
    date: string;
    createddate: string;
    type: "days15" | "days7";
  };
  pdfData: PDFBodyType;
}

const NoticeNagarjung15 = ({ data, pdfData }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const name = underline(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const wardNo = underline(
    ConvertToNepali(pdfData.wardName.replace("Ward ", ""))
  );

  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const area = underline(ConvertToNepali(pdfData.landArea));
  const tole = underline(ConvertToNepali(pdfData.toleNep));

  const eastKittaNo = underline(ConvertToNepali(pdfData.eastKittaNo));
  const westKittaNo = underline(ConvertToNepali(pdfData.westKittaNo));
  const northKittaNo = underline(ConvertToNepali(pdfData.northKittaNo));
  const southKittaNo = underline(ConvertToNepali(pdfData.southKittaNo));

  const eastSetback = underline(ConvertToNepali(pdfData.eastSetback));
  const westSetback = underline(ConvertToNepali(pdfData.westSetback));
  const northSetback = underline(ConvertToNepali(pdfData.northSetback));
  const southSetback = underline(ConvertToNepali(pdfData.southSetback));
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontWeight: 400,
          fontFamily: "Noto",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 11.5,
          paddingLeft: 70,
          paddingRight: 45,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            height: 100,
            width: "100%",
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
              marginTop: -30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "NotoMedium",
              }}
            >
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text
              style={{
                fontFamily: "NotoMedium",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {municipalityDetails.letterheadType}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                marginLeft: -10,
              }}
            >
              वडा नं {wardNo} वडा कार्यालयबाट
            </Text>
          </View>
          <View style={{ width: 60 }}>
            {/* <Image src={DhulikhelLogo} style={{ width: 60, height: 70 }} /> */}
          </View>
        </View>
        <View
          style={{
            marginTop: -20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          <Text> मिति : {ConvertToNepali(data.date)}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -20,
          }}
        >
          <Text style={{ paddingBottom: 4, marginTop: 10 }}>
            पत्र संख्या : {ConvertToNepali(data.patrasankhya)}
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
            चलानी नं : {ConvertToNepali(data.chalanino)}
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
              marginTop: -10,
              fontSize: 14,
              fontFamily: "NotoMedium",
              // textDecoration: "underline",
            }}
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            नक्शा पासको लागि संधियारको नाममा जारी भएको सुचना
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ paddingTop: 10 }}>
            <Text style={{ lineHeight: 1.4, textAlign: "justify" }}>
              श्री {name} को नागार्जुन न.पा. मा वडा नं &nbsp;
              {wardNo} मा तपसिलको विवरण बमोजिमको {underline("भवन")}&nbsp;
              बनाउँदा/नियमित गरी पाउँ भन्ने दरखास्त परेको हुनाले स्थानीय सरकार
              संचालन ऐन, २०७४ को दफा ३१ (क) बमोजिम यो सुचना पठाउने काम भएको छ ।
              सो नक्शा बमोजिमको भवन बनाउँदा/नियमित गर्दा तपाईलाई पीर मर्का सन्धी
              सर्पन पर्ने भए यो सुचना तपाईले पाएको वा तपाइको घर दैलोमा टाँसेको
              मितिले १५ दिनभित्र आफ्नो दाबी खुलेको उजुरी दिन ल्याउनु होला । सो
              म्याद १५ दिन भित्र उजुरी नपरेमा अर्जी पर्न र म्याद थमाई पाउँ भन्ने
              उजुर समेत लाग्ने छैन ।
            </Text>
            <Text
              style={{
                marginTop: 12,
                marginBottom: 5,
                fontSize: 13,
                fontFamily: "NotoMedium",
                textAlign: "center",
                width: "100%",
              }}
            >
              तपशिल
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ border: "1px solid black", width: "50%" }}>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                paddingTop: 2,
                fontFamily: "NotoMedium",
              }}
            >
              आफ्नो हकको व्यहोरा/बनाउने ठाउँमा ४ किल्ला समेतको बयान
            </Text>
            <View style={{ padding: 10, borderTop: "1px solid black" }}>
              <Text style={{ paddingBottom: 3 }}>
                पूर्व कित्ता नं. {eastKittaNo}
              </Text>
              <Text style={{ paddingBottom: 3 }}>
                पश्चिम कित्ता नं. {westKittaNo}
              </Text>
              <Text style={{ paddingBottom: 3 }}>
                उत्तर कित्ता नं. {northKittaNo}
              </Text>
              <Text style={{ paddingBottom: 3 }}>
                दक्षिण कित्ता नं. {southKittaNo}
              </Text>
              <Text
                style={{ paddingTop: 4, lineHeight: 1.5, textAlign: "justify" }}
              >
                यति चार किल्ला भित्र यस गा. पा. वडा नं. {wardNo} साबिक {} को कि.
                नं. {kittaNo} क्षेत्रफल {area} को जग्गा काठमाडौँ कलंकी मलपोत
                कार्यालयमा दर्ता भएको जग्गा पुरैको मंजुरी पाएको/आफ्नै जग्गामा
                ........... मोहडा गरी साईट प्लानमा देखाएको ठाउँमा बनाउनेछु,
                भैराखेको ढल निकास बन्द गर्ने छैन र नयाँ बनाउनपरेमा पनि जग्गा
                छाड्नेछु भन्ने&nbsp; {tole} बस्ने बर्ष ....... का श्री {name} को
                नक्शा दरखास्त/वारिस ......................... को नक्शा दरखास्त
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
              borderRight: "1px solid black",
              padding: 10,
            }}
          >
            <Text style={{ paddingBottom: 3 }}>
              १. मैले नक्शा दरखास्त दिई घर इत्यादी निर्माण गर्दा कसैको ढल निकास
              बन्द गरी प्रति जमिन बाटोघाटा इत्यादी मिची बनाउने छैन, बनाएमा न.
              पा. ले भत्काई दिएमा कुनै कुरामा उजुरी गर्ने छैन । गरे यसै
              सर्तबमोजिम गरि दिन मन्जुर छ ।
            </Text>
            <Text style={{ paddingBottom: 3 }}>
              २. बाटो ......... तर्फबाट गर्नेछु ।
            </Text>
            <Text style={{ paddingBottom: 3 }}>
              ३. सेप्टी ट्यांकी ....... पट्टि बनाउनेछु ।
            </Text>
            <Text style={{ paddingBottom: 3 }}>
              ४. बर्षाको पानी अरुको जग्गामा नपर्ने गरि आफ्नो जग्गामा मात्र
              खसाल्नेछु ।
            </Text>
            <Text style={{ paddingBottom: 3 }}>
              ५. कौशीको निकासा गोल पाइपद्वारा आफ्नै जग्गातर्फ खसाल्नेछु ।
            </Text>
            <Text style={{ paddingBottom: 3 }}>
              ६. कौशीको पर्खाल अर्काको जग्गा तर्फ बनाउँदा कानून बमोजिम बनाउनेछु
              ।
            </Text>
            <Text style={{ paddingBottom: 3, fontFamily: "NotoMedium" }}>
              हाल घर बनाउने घरबाट बाँकि राख्ने जग्गाको नाप
            </Text>
            <Text>पूर्व &nbsp; {eastSetback}</Text>
            <Text>पश्चिम &nbsp; {westSetback}</Text>
            <Text>उत्तर &nbsp; {northSetback}</Text>
            <Text>दक्षिण &nbsp; {southSetback}</Text>
          </View>
        </View>

        <NoticeFooter />
      </Page>
    </Document>
  );
};

export function NoticeFooter() {
  return (
    <View
      style={{
        position: "absolute",
        display: "flex",
        bottom: 35,
        width: "100%",
        flexDirection: "row",
        // right: 0,
      }}
    >
      <View style={{ width: 200 }}>
        <Text>..............................</Text>
        <Text>म्याद टाँस गर्ने कर्मचारीको सही:</Text>
        <Text>नाम, थर:</Text>
        <Text>दर्जा:</Text>
        <Text>मिति:</Text>
      </View>

      <View style={{ flexDirection: "column", width: 200 }}>
        <Text>..............................</Text>
        <Text style={{ fontFamily: "NotoMedium" }}>रहोवर</Text>
        <Text style={{ width: 140 }}>वडा अध्यक्ष</Text>
      </View>
      <View>
        <Text>..............................</Text>
        <Text>नक्शावालाको सहीछाप:</Text>
        <Text>नाम, थर:</Text>
        <Text>मिति:</Text>
      </View>
    </View>
  );
}

export default NoticeNagarjung15;
