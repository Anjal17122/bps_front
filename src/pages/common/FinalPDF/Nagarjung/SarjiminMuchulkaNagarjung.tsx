import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { MuchulkaPDFdata } from "../PDFtypes";
import { underline } from "../helper";
import { getCertificateTime, mapWitness } from "./NewMuchulkaNagarjung";

interface Props {
  pdfData: MuchulkaPDFdata;
}

const SarjiminMuchulkaNagarjung = ({ pdfData }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });
  Font.register({
    family: "NotoMedium",
    src: NotoMedium,
  });

  const name = underline(pdfData?.landOwnersName ?? pdfData.houseOwnersName);
  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const landArea = underline(ConvertToNepali(pdfData.landArea));
  const district = underline(pdfData.applicantDistrict);
  const ward = underline(ConvertToNepali(pdfData.applicantWard));
  const municipality = underline(pdfData.applicantMunicipality);

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontWeight: 400,
          fontFamily: "Noto",
          justifyContent: "space-between",
          fontSize: 12,
          paddingLeft: 70,
          paddingRight: 50,
          paddingTop: 10,
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
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
                  fontSize: 20,
                  fontFamily: "NotoMedium",
                }}
              >
                {municipalityDetails.letterheadTitle}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 13.5 }}>
                {municipalityDetails.letterheadType}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  marginTop: 0,
                }}
              >
                वडा नं {ward} वडा कार्यालयबाट
              </Text>
            </View>
            <View style={{ width: 60 }}></View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          ></View>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              marginTop: -20,
            }}
          ></View>
          <View>
            <Text
              style={{
                marginTop: -10,
                fontSize: 18,
                fontFamily: "NotoMedium",
              }}
            >
              सर्जमिन मुचुल्का
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: -0,
                fontSize: 13,
              }}
            >
              (कार्यालय प्रयोजनको लागि मात्र)
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
                लिखितम् हामी तपशिलका मानिसहरु आगे नागार्जुन न. पा. वडा नं.{" "}
                {ward} वडा अन्तर्गत {district}, {municipality}, {ward} वडा नं
                बस्ने श्री {name} को नाममा रहेको कित्ता नं. {kittaNo} छेत्रफल{" "}
                {landArea} जग्गामा आवेदनसाथ संलग्न नक्शा बमोजिमको{" "}
                {underline("भवन")} बनाउन पाउँ भनी दरखास्त परेको १५ दिनको सुचना
                तपसिलका मानिसहरुसँग सोधनी गरिन्छ कि माथी लेखे बमोजिमको{" "}
                {underline("भवन")} बनाउँदा तपाईहरुलाई सन्धी सर्पन पीर मर्का पर्छ
                पर्दैन भए आफ्नो भएको व्यहोरा तपसिलमा खोली लेखी दिनुस् भनी
                नागार्जुन न. पा. कार्यालय नक्शा शाखाबाट खटि आउनुभएका
                कर्मचारीहरुले सोधनी गर्दा हामीहरुको चित्त बुझ्यो, हामीहरुको
                व्यहोरा तपसिलमा खोली लेखी दिएका छौं फरक छैन फरक परे ऐन कानुन
                बमोजिम सहुँला बुझाउंला भनी सर्जमिन मुचुल्का लेखी नक्शा शाखा
                मार्फत नागार्जुन न. पा. कार्यालयमा चढायौं ।
              </Text>
              <Text
                style={{
                  marginTop: 18,
                  marginBottom: 5,
                  fontSize: 14,
                  width: "100%",
                }}
              >
                तपशिल
              </Text>
              <Text>
                यसमा माथि लेखिए बमोजिमको घर बनाउने ठाउँमा स्थलगत निरीक्षण गर्दा
                रोहवरमा सहीछाप गर्ने
              </Text>

              <Text
                style={{
                  marginTop: 18,
                  marginBottom: 5,
                  fontSize: 14,
                }}
              >
                सँधियारहरू
              </Text>
              {mapWitness(pdfData.muchulkaWitness, "direction")}
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
          }}
        >
          {getCertificateTime(pdfData.muchulkaDate, pdfData.muchulkaTime)}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            left: 70,
            flexDirection: "column",
            // alignItems: "flex-end",
            // width: "115%",
            // justifyContent: "flex-end",
          }}
        >
          <Text style={{ marginBottom: 20 }}>
            पेश भएका अनुसार जग्गा/भवनको नाप दिनु साँचो छ पछि फरक पर्न गएमा
            स्वयम् जिम्मेवार हुनेछु भनी सहिछाप गर्ने नक्शावालाको
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={{ marginBottom: 20, fontFamily: "NotoMedium" }}>
                रहोवर
              </Text>
              <Text style={{ marginBottom: 50 }}>वडा अध्यक्ष :-</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 20,
                marginTop: -20,
              }}
            >
              <View>
                <View
                  style={{ width: 70, height: 80, border: "1px solid grey" }}
                ></View>
                <Text style={{ paddingLeft: 25, paddingTop: 3 }}>दायाँ</Text>
              </View>
              <View>
                <View
                  style={{ width: 70, height: 80, border: "1px solid grey" }}
                ></View>
                <Text style={{ paddingLeft: 25, paddingTop: 3 }}>बायाँ</Text>
              </View>
            </View>
          </View>
          <Text style={{ marginBottom: 20, marginTop: 20 }}>
            श्री
            ................................................................................................
            सहि ................................
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SarjiminMuchulkaNagarjung;
