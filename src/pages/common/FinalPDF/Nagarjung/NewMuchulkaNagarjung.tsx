import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { municipalityDetails } from "../../../../constants/constants";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { MuchulkaPDFdata } from "../PDFtypes";
import { underline } from "../helper";
import {
  convertDirection,
  convertLandscape,
  getAge,
} from "../../../../constants/CommonFunctions";
import { WitnessGet } from "../../../../Services/NewMuchulkaService";
import React from "react";

interface Props {
  pdfData: MuchulkaPDFdata;
}

const NewMuchulkaNagarjung = ({ pdfData }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });

  Font.register({
    family: "NotoMedium",
    src: NotoMedium,
  });

  const filterByDirection = (
    direction: "East" | "West" | "North" | "South"
  ): string => {
    const selected = pdfData.charkillas.filter((charkil) =>
      charkil.direction.includes(direction)
    );

    if (!selected.length) return "";

    return `${
      selected.length
        ? "कित्ता नं: " +
          ConvertToNepali(
            selected.map((charkill) => charkill.kittaNo)?.toString()
          ) +
          ","
        : ""
    } ${convertLandscape(
      selected.map((charkill) => charkill.landscapeType).toString()
    )}, ${selected
      .map((charkill) => charkill.nameNep)
      .join(", ")},  मापदण्ड: ${ConvertToNepali(
      selected.map((charkill) => charkill.standardSetBack).toString()
    )}, छाडेको: ${ConvertToNepali(
      selected.map((charkill) => charkill.actualSetBack).toString()
    )}`;
  };

  const wardNo = ConvertToNepali(pdfData?.wardNo);

  const name = underline(pdfData?.landOwnersName ?? pdfData.houseOwnersName);

  const mapSheetNo = underline(ConvertToNepali(pdfData.mapSheetNo));
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
                  fontSize: 10.5,
                  marginLeft: -10,
                }}
              >
                वडा नं {wardNo} वडा कार्यालयबाट
              </Text>
            </View>
            <View style={{ width: 60 }}></View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: -25,
                textDecoration: "underline",
              }}
            >
              नक्शा पासको लागि सुचना टास गरेको मुचुल्का
            </Text>
          </View>
          <View>
            <Text style={{ marginTop: -2, fontSize: 13 }}>
              कार्यालय प्रयोजनको लागि मात्र
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
            <View style={{ paddingTop: 15 }}>
              <Text style={{ lineHeight: 1.7, textAlign: "justify" }}>
                लिखितम् हामी तपशिलका मानिसहरु आगे नागार्जुन न. पा. वडा नं.{" "}
                {underline(wardNo ?? "")} सिट नं. {mapSheetNo} कि नं. {kittaNo}{" "}
                को क्षेत्रफल {landArea} वर्गमिटर जग्गामा {underline("भवन")}{" "}
                बनाउन पाउँ भनी {district}, {municipality}, {ward} वडा नं बस्ने
                श्री {name} बाट नक्शा दरखास्त परेकोले नक्शा बमोजिमको{" "}
                {underline("भवन")} बनाउँदा कसैलाई पीर मर्का पर्दैन ? पर्ने भए
                सबुद प्रमाण सहित १५ दिनभित्र उजुरी दरखास्त दिन ल्याउनु होला
                भन्ने व्यहोराको १५ दिने सुचना तपशिलका ठाउँमा तपशिलका मानिस
                साक्षी राखी टाँसेको साँचो हो, फरक छैन फरक परि लेखिएको ठहर भए ऐन
                कानुन बमोजिम होस् भनी हामीहरुको मनोमानी खुशीराजीसँग यो सुचना
                मुचुल्कामा सहिछाप गरी न. पा. कार्यालयमा चढायौ ।
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 5,
                  fontSize: 14,
                  fontFamily: "NotoMedium",
                  width: "100%",
                }}
              >
                तपशिल
              </Text>
              <Text style={{ paddingBottom: 4 }}>
                पूर्व तर्फ : &nbsp; {filterByDirection("East")}
              </Text>
              <Text style={{ paddingBottom: 4 }}>
                पश्चिम तर्फ : &nbsp; {filterByDirection("West")}{" "}
              </Text>
              <Text style={{ paddingBottom: 4 }}>
                उत्तर तर्फ : &nbsp; {filterByDirection("North")}
              </Text>

              <Text style={{ paddingBottom: 4 }}>
                दक्षिण तर्फ : &nbsp; {filterByDirection("South")}
              </Text>

              <Text style={{ fontSize: 14, marginTop: 20 }}>साक्षीहरू:</Text>
              {/* <Text>{JSON.stringify(pdfData.muchulkaWitness)}</Text> */}
              {mapWitness(pdfData.muchulkaWitness, "ward")}
            </View>
          </View>
        </View>

        <View>
          <View>
            <Text style={{ marginBottom: 40, fontFamily: "NotoMedium" }}>
              रहोवर
            </Text>
            <Text style={{ marginBottom: 50 }}>
              वडा अध्यक्ष श्री
              .....................................................................................
              सहि ................................
            </Text>
            <Text style={{ textAlign: "center" }}>न. पा. कार्यालयबाट</Text>
            <Text style={{ marginBottom: 50 }}>
              तामेल गर्नेको नाम:
              ...............................................................................
              सहि ................................
            </Text>
          </View>
          {getCertificateTime(pdfData.muchulkaDate, pdfData.muchulkaTime)}
        </View>
        {/* <View
          style={{
            // backgroundColor: "pink",
            position: "absolute",
            bottom: 80,
            flexDirection: "column",
            alignItems: "flex-end",
            width: "115%",
            justifyContent: "flex-end",
          }}
        >
          <Text>..............................</Text>
          <Text>वडा अध्यक्ष</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default NewMuchulkaNagarjung;

export const mapWitness = (
  witness: WitnessGet[],
  type: "ward" | "direction"
): JSX.Element => {
  return (
    <React.Fragment>
      {witness?.map((w, index) => (
        <Text key={w.name} style={{ marginBottom: 15 }}>
          {ConvertToNepali(index + 1)}.{" "}
          {type === "ward"
            ? "वडा नं: " + ConvertToNepali(w[type])
            : "कित्ता नं: " +
              w.kittaNo +
              " दिशा: " +
              convertDirection(w[type])}{" "}
          &nbsp; बस्ने बर्ष: {underline(ConvertToNepali(getAge(w.dateOfBirth)))}{" "}
          को, श्री {underline(w.name)}
        </Text>
      ))}
    </React.Fragment>
  );
};

export const getCertificateTime = (date: string, time: string) => {
  return (
    <Text>
      इतिसम्बत् &nbsp; {underline(ConvertToNepali(date?.substring(0, 4)))}{" "}
      &nbsp; साल {underline(ConvertToNepali(date?.substring(5, 7)))} &nbsp;
      महिना {underline(ConvertToNepali(date?.substring(8, 10)))} &nbsp; गते रोज{" "}
      {underline(ConvertToNepali(time))} &nbsp; शुभम् ।
    </Text>
  );
};
