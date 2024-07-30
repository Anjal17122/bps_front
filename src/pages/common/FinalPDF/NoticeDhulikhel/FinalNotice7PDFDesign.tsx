import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { PlinthDataPDF } from "../../../../Services/PDFService";
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { extractNum } from "../../../../constants/GlobalFunctions";
import { LetterHead } from "./LetterHead";
import { TapasilAge } from "./TapasilAge";
import { addSlash } from "../AbhilekhikaranPDFDesign/AbhilekhikaranHelper";
import { PDFBodyType } from "../PDFtypes";
import { underline } from "../helper";
import { municipalityDetails } from "../../../../constants/constants";

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
  backendData: PDFBodyType;
}

const FinalNotice7PDFDesign = ({ data, backendData }: Props) => {
  // Register font
  Font.register({
    family: "Noto",
    src: Noto,
  });

  const chalaniNo = ConvertToNepali(data.chalanino);
  const patraSankhya = ConvertToNepali(addSlash(data.patrasankhya));
  const pubDate = ConvertToNepali(data.date);

  const name = underline(
    backendData.houseOwnersName ?? backendData.landOwnersName
  );
  const address = underline(
    municipalityDetails.district + ", " + ConvertToNepali(backendData.wardNo)
  );
  const landWardNo = underline(ConvertToNepali(backendData.wardNo));
  const kittaNo = underline(ConvertToNepali(backendData.kittaNo));
  const sabik = underline(backendData.sabik);
  const area = underline(ConvertToNepali(backendData.landArea));
  // const getPermanentAdd = () =>
  //   backendData.applicant.addresses?.filter(
  //     (address) => address.type === "PERMANENT"
  //   )[0];

  // const applicantAddress: string =
  //   getPermanentAdd().district.name +
  //   ", " +
  //   ConvertToNepali(getPermanentAdd().ward.name) +
  //   `, ${getPermanentAdd().toleNep}`;
  // const kittaNo = ConvertToNepali(
  //   backendData.lands
  //     .map((land) => land.landParcelNo)
  //     .toString()
  //     .replace(/[\[\]"]+/g, "")
  // );

  // const landOwners = backendData.lands
  //   .map((lannnddd) => lannnddd.landOwner)
  //   .flat();
  // const houseOwners = backendData.lands
  //   .map((lannnddd) => lannnddd.houseOwner)
  //   .flat();
  // const landWardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));
  // const landOwnersName = landOwners
  //   .map((houseown) => houseown.owner.nameNep)
  //   .toString()
  //   .replace(/[\[\]"]+/g, "");
  // const houseOwnersName = houseOwners
  //   .map((houseown) => houseown.owner.nameNep)
  //   .toString()
  //   .replace(/[\[\]"]+/g, "");

  // const wardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));

  // const munName = backendData.applicant?.addresses[0].municipality?.name;
  // const toleName = backendData.applicant?.addresses[0].toleNep;
  // const area = ConvertToNepali(
  //   backendData.lands
  //     .map((land) => land.ropani)
  //     .toString()
  //     .replace(/[\[\]"]+/g, "")
  // );

  // const underline = {
  //   textDecoration: "underline",
  //   textDecorationStyle: "dotted",
  // };
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
          <Text style={{ paddingBottom: 4 }}>पत्र संख्या : {patraSankhya}</Text>
          <Text style={{ paddingBottom: 4 }}>चलानी नं : {chalaniNo}</Text>
        </View>
        <View>
          <Text
            style={{ paddingBottom: 10, paddingTop: -10, paddingLeft: -10 }}
          >
            बिषय:{" "}
            <Text
              style={{
                fontSize: 14,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              नक्सा पास सम्बन्धी सात दिने सूचना
            </Text>
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 60,
            paddingRight: 60,
            fontSize: 13,
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            उपर्युक्त सम्बन्धमा {address} बस्ने {name} ले का.प.जि. धुलिखेल न.पा.
            वडा न. {landWardNo} मा पर्ने साविक {sabik} कि.नं {kittaNo} क्षेत्रफल{" "}
            {area} भएको जग्गामा {underline("संरचना")} निर्माण गर्न नक्सा पास
            भएको निर्माण स्विकृति लिन यस निवेदन दिएकोले स्थानीय स्वायत्त शासन
            नियमावली २०५५ को दफा १५३ को देहाय &quot;क&quot; बमोजिम १५ दिने सूचना
            टाँस भई मुचुल्का हुँदा उक्त उल्लेखित जग्गाको पूर्व / पश्चिम / उत्तर
            / दक्षिण तर्फका सँधियार तपाई अनुपस्थित रहेकाले यो सात दिने सूचना
            टाँस गरिएको छ । उल्लेखित बमोजिम जग्गामा {underline("संरचना")}{" "}
            निर्माण गर्दा तपाइलाई कुनै बाधा अबरोध पर्ने भए यो सूचना टाँस भएको
            मितिले सात दिन भित्र यस नगरपालिकामा स–पमाण लिखित जानकारी गराउन हुन
            सूचित गरिन्छ । अन्यथा नियमानुसार नक्सा पास भई जाने ब्यहोरा समेत अवगत
            गराइन्छ ।
          </Text>
        </View>
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
      {/* <Page
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
      </Page> */}
    </Document>
  );
};

export default FinalNotice7PDFDesign;
