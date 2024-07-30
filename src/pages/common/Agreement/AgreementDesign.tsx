import { Page, Document, Font, View, Text } from "@react-pdf/renderer";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import { GetAgreementPdfDataBody } from "../../../Services/AgreementService";
import { underline } from "../FinalPDF/helper";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import {
  convertDirection,
  convertLandscape,
  directionType,
} from "../../../constants/CommonFunctions";
import { extractNum } from "../../../constants/GlobalFunctions";
import { floorTotal } from "../../Consultant/ProjectCreate/Technical/DesignFloor/DesignFloorDatas";

interface Props {
  agreementPdf: GetAgreementPdfDataBody;
  date: string;
}

export const borderPdf = (width = 200) => {
  return {
    width: width,
    border: "1px solid black",
    padding: "3px 4px 0px 3px",
    marginTop: -1,
    marginRight: -1,
  };
};

const AgreementDesign = ({ agreementPdf, date }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const mb2 = {
    marginBottom: 4,
  };

  const center = {
    textAlign: "center",
  };

  const floors: floorTotal[] = JSON.parse(agreementPdf.floor.floorDetail);

  const pageStyle: {
    textAlign: "left" | "right" | "justify" | "center" | undefined;
    fontWeight: number;
    fontFamily: string;
    fontSize: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    lineHeight: number;
  } = {
    fontWeight: 400,
    fontFamily: "Noto",
    fontSize: 12,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 55,
    paddingBottom: 55,
    textAlign: "justify",
    lineHeight: 1.5,
  };
  const datePub = underline(ConvertToNepali(date));

  const kittaNo = underline(ConvertToNepali(agreementPdf.kittaNo));

  const consultantMunNo = underline(
    ConvertToNepali(agreementPdf.consultantMunNo)
  );

  const wardNo = underline(ConvertToNepali(extractNum(agreementPdf.wardNo)));

  const mapSheetNo = underline(
    ConvertToNepali(extractNum(agreementPdf.mapSheetNo))
  );
  const totalArea = (parseFloat(agreementPdf.totalArea) * 10.76).toFixed(2);

  const sabik = underline(ConvertToNepali(agreementPdf.sabik));
  const toleName = underline(agreementPdf.toleName);
  const name = underline(agreementPdf.name);
  const municipality = underline(agreementPdf.municipality);

  const consultantName = underline(agreementPdf.consultantName);

  const buildingPurpose = underline(agreementPdf.buildingPurpose);

  return (
    <Document>
      <Page size="A4" style={pageStyle}>
        <Text style={{ ...mb2, fontFamily: "NotoMedium", fontSize: 16 }}>
          नक्शावाला सुपरिवेक्षक परामर्शदाता बीच भवन निर्माण सुपरिवेक्षण गर्न
          गरिएको त्रिपक्षीय सम्झौता-पत्र
        </Text>
        <Text style={mb2}>
          नागार्जुन नगरपालिका {"("}यसपछि प्रथम पक्ष भनिने{")"},वडा नं {wardNo}{" "}
          स्थित {municipality} बस्ने श्री &nbsp;
          {name} ले कि.नं&nbsp;
          {kittaNo} मा {buildingPurpose} प्रयोजनको लागि भवन निर्माण गर्न प्रथम
          पक्षबाट इजाजत प्राप्त नक्शावाला, {"("}यसपछि दोस्रो पक्ष भनिने{")"} र
          प्रथम पक्षले भवन निर्माण सुपरिवेक्षण कार्यको लागि आह्वान गरिएको आशय
          पत्रमा सहभागी भइ आवश्यक प्रक्रिया पुरा गरि सुचिकृत भएको&nbsp;
          {consultantName} परामर्शदाता (Municipal Code: {consultantMunNo})
          &nbsp;यसपछि तेस्रो पक्ष भनिने का बीचमा भवन निर्माणलाई स्विकृत नक्शा
          तथा प्राप्त इजाजत बमोजिम व्यवस्थित गर्न तपसिलमा उल्लेखित शर्त, बन्देज
          तथा दायित्वहरु वहन गर्ने गरी यो त्रिपक्षिय सम्झौता हस्ताक्षर गरी एक एक
          प्रति लियौं दियौं ।
        </Text>
        <Text style={mb2}>
          १. &nbsp; प्रथम पक्षबाट स्विकृत नक्शा, ड्रईङ्ग तथा डिजाईन अनुसार भवन
          निर्माण गर्नु दोस्रो पक्षको कर्तव्य हुनेछ । दोस्रो पक्षलाई प्रथम
          पक्षबाट स्वीकृत नक्शा तथा इजाजत अनुरुप भवन निर्माण गर्न परामर्श दिने,
          फिल्ड सुपरिवेक्षण गर्ने, प्रतिवेदन पेश गर्ने तथा स्वीकृत नक्शा तथा
          इजाजत विपरित निर्माण नगर्न दोस्रो पक्षलाई सुझाव गर्ने र प्राविधिक
          रुपमा सहयोग गर्ने र अटेर गरेमा निर्माण रोक्का गर्न लगाई सोको जानकारी
          लिखित रुपमा तत्काल प्रथमपक्ष अन्तर्गतको कानुन महाशाखा समक्ष पेश गर्नु
          तेस्रो पक्षको दायित्व हुनेछ ।
        </Text>
        <Text style={mb2}>
          २. &nbsp; तेस्रो पक्षले स्विकृत नक्शा बमोजिम प्लिन्थ लेभलसम्म निर्माण
          भएको छ र छैन निरिक्षण गर्न, स्वीकृत नक्शा बमोजिम नभए सो अनुरुप गर्न
          लगाउने र सो सम्बन्धी प्रतिवेदन प्रथम पक्ष समक्ष पेश गर्ने । प्लिन्थ
          लेभल भन्दा माथिको नक्शा स्वीकृत भएपछि प्रत्येक तल्लाको ढलान पूर्व र
          ढलान पश्चात स्थलगत निरिक्षण गर्ने, आवश्यक प्राविधिक परामर्श उपलब्ध
          गराउने र सो सम्बन्धि यथार्थ प्रतिवेदन पेश गर्ने मुख्य दायित्व तेस्रो
          पक्ष परामर्शदाताको हुनेछ ।
        </Text>
        <Text style={mb2}>
          ३. &nbsp; स्वीकृत नक्शा बमोजिमको प्रस्तावित वेसमेन्ट, जग ढलानको
          निर्माण कार्यको सिलसिलामा सुपरिवेक्षण कार्यको लागि २ {"("}दुई{")"} पटक
          अनुगमन गरी सोको प्रतिवेदन प्रथम पक्ष अन्तर्गतको शहरी विकास विभागमा पेश
          गर्नु तेस्रो पक्षको कर्तव्य हुनेछ ।
        </Text>
        <Text style={mb2}>
          ४. &nbsp; प्लिन्थ लेभलसम्मको निर्माणको स्वीकृति प्रथम पक्षबाट जारी भए
          पश्चात निर्माण कार्यको सिलसिलामा स्वीकृत Structural Design बमोजिमको
          Foundation को Reinforcement Bars को size, number / spacing चेक
          गर्नुपर्नेछ र सोको प्रतिवेदन प्रथम पक्ष अन्तर्गतको शहरी विकास विभागमा
          पेश गर्नु तेस्रो पक्षको कर्तव्य हुनेछ ।
        </Text>
        <Text style={mb2}>
          ५. &nbsp; प्लिन्थ लेभलभन्दा माथि भवन निर्माण गर्न प्रथम पक्षबाट
          स्वीकृति जारी भए पश्चात स्वीकृत नक्शा बमोजिम निर्माण कार्य भएको छ/छैन
          भनी सुपरिवेक्षण गर्न हरेक तल्लाको Slab ढलान गर्नु अघि स्वीकृत
          Structural Design बमोजिमको Slab, Beam र Column को Reinforcement
          Details चेक गर्नु पर्नेछ र सोको प्रतिवेदन प्रथम पक्ष अन्तर्गतको शहरी
          विकास विभागमा पेश गर्नु तेस्रो पक्षको कर्तव्य हुनेछ ।
        </Text>
        <Text style={mb2}>
          ६. &nbsp; निर्माण कार्यको सिलसिलामा सुपरिवेक्षण गरी प्रथम पक्ष समक्ष
          पेश गर्ने हरेक चरणको प्रतिवेदनमा फोटो सहितको विस्तृत विवरण समावेश हुनु
          पर्नेछ ।
        </Text>
        <Text style={mb2}>
          ७. &nbsp; तेस्रो पक्षले गरेका कार्य र विवरण उपर प्रथम पक्षको तर्फबाट
          कुनै पनि समयमा फिल्डमा अनुगमन कार्य हुन सक्नेछ । उक्त समयमा तेस्रो
          पक्षले पेश गरेको विवरण र प्रतिवेदनसंग निर्माण कार्य फरक पर्न गएमा
          तेस्रो पक्ष जिम्मेवार हुने र सो उपर प्रथम पक्षले तेस्रो पक्षलाई
          परामर्श सेवाबाट बञ्चित गर्नेछ, कालो सूचीमा राख्नको लागि सिफारिस गर्ने
          छ। यसरी गलत प्रतिवेदन पेश गरेको कारणबाट हुने क्षतिपूर्तिको रकम समेत
          यकिन गरी तेस्रो पक्षबाट प्रथम पक्षले असुल उपर गर्नेछ ।
        </Text>
        <Text style={mb2}>
          ८. &nbsp; तेस्रो पक्षले दोस्रो पक्षको भवन निर्माण अवधिभर अनुगमन
          सुपरिवेक्षण गरी प्रथम पक्ष समक्ष प्रतिवेदन पेश गरे बापत निम्न वमोजिम
          पारिश्रमिक उपलब्ध गराउने दायित्व प्रथम पक्षको हुनेछ
        </Text>
        <Text style={mb2}>
          क{")"} प्रत्येक पटकको सुपरिवेक्षण गरी तोकिएको ढाँचामा प्रतिवेदन पेश
          गरे वापत रु .............
        </Text>
        <Text style={mb2}>
          ख{")"} स्विकृत नक्शा तथा ईजाजत विपरित निर्माण नगर्न दोस्रो पक्षलाई
          परमर्श दिदा अटेर गरिएमा सोको लिखित व्यहोरा उल्लेखित प्रतिवेदन वापत रु
          ............
        </Text>
        <Text style={mb2}>
          ग{")"} भवन निर्माण सम्पन्न प्रयोजनको लागि पेश हुने प्रतिवेदन वापत रु
          .............
        </Text>
        <Text style={mb2}>
          ९. &nbsp; तेस्रो पक्षलाई यसै सम्झौताका शर्तहरुमा उल्लेखित कार्यहरु
          गर्न सहयोग गर्न तथा निजले मागेका कागजात उपलब्ध गराउनु, निजले दिएको
          परामर्शको यथार्थ परिपालना गर्नु दोस्रो पक्षको कर्तव्य हुनेछ।अन्यथा
          गरेमा प्रथम पक्षले स्थानीय सरकार संचालन ऐन, २०७४ बमोजिम हदै सम्मको
          कारवाही गर्नेछ ।
        </Text>
        <Text style={mb2}>
          १०. &nbsp; प्रथम पक्षबाट स्वीकृत नक्शा बमोजिम भवन निर्माण सम्पन्न
          भएपछि दोस्रो पक्षले निर्माण सम्पन्न प्रमाण पत्र प्राप्त गर्नको लागि
          प्रथम पक्षको कार्यालयमा सिफारिस गर्ने तेस्रो पक्षलाई अनुरोध गर्नु
          पर्नेछ । दोश्रो पक्षको अनुरोध पश्चात तेस्रो पक्षले स्थलगत निरिक्षण गरी
          प्रथम पक्ष समक्ष भवन निर्माणको यथार्थ अवस्था खुलाई फोटो सहितको
          प्रतिवेदन पेश गर्नु पर्नेछ । यस्तो प्रतिवेदन पेश भए पश्चात प्रथम
          पक्षले आवश्यक जाँचबुझ गरी भवन निर्माण सम्पन्नताको प्रमाण पत्र दोस्रो
          पक्षलाई जारी गर्नुपर्नेछ । भवन निर्माण सम्पन्न प्रमाण पत्र नलिएको
          अवस्थामा दोस्रो पक्षलाई प्रथम पक्षको तर्फबाट उपलब्ध गराईने सिफारिस तथा
          अन्य किसिमको सेवा सुविधाहरु रोक्का गर्न सकिनेछ ।
        </Text>
        <Text style={mb2}>
          ११. &nbsp; यो सम्झौता कार्यान्वयनमा कुनै समस्या आईपरे आपसी छलफलबाट
          समाधान गरिनेछ । आपसी छलफलब समाधान हुन नसकेमा प्रचलित कानून बमोजिम
          हुनेछ ।
        </Text>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 35,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ marginBottom: 40 }}>
              प्रथमपक्ष {"("}ना. न. पा.{")"}
            </Text>
            <Text>..............................</Text>
            <Text style={{ width: 180 }}>नामः</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ marginBottom: 40 }}>
              दोश्रो पक्ष {"("}घर धनि{")"}
            </Text>
            <Text>.....................</Text>
            <Text style={{ width: 180 }}>नामः</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ marginBottom: 40 }}>
              तेश्रो पक्ष {"("}परामर्श दाता{")"}
            </Text>
            <Text>.....................</Text>
            <Text style={{ width: 140 }}>नामः</Text>
          </View>
        </View>
        <Text style={{ marginTop: 10 }}>शहरी विकास विभाग</Text>
        <Text>
          ईति सम्बत .......... साल ......... महिना ........... गते.......... रोज
          ........ शुभम् ................
        </Text>
      </Page>
      <Page size="A4" style={pageStyle}>
        <View>
          <Text style={{ fontFamily: "NotoMedium", fontSize: 16, ...mb2 }}>
            निर्माण कार्य गर्दा पालना गर्नुपर्ने शर्तहरू:
          </Text>
          <Text style={mb2}>
            १. &nbsp; स्वीकृत नक्शा अनुसार कुनै पनि संरचना फरक नपारी निर्माण
            कार्य गर्नु पर्नेछ ।
          </Text>
          <Text style={mb2}>
            २. &nbsp; निर्माण सम्बन्धी मापदण्ड २०६४ र संशोधित २०७२ को पूर्णरुपमा
            पालना गर्नु पर्नेछ ।
          </Text>
          <Text style={mb2}>
            ३. &nbsp; विद्युत लाईन नजिक रहेको जमिनहरुमा लो-टेन्शन लाईन भएकोमा
            लाईन देखि २.२५ मिटर र हाइटेन्शन लाईन भएकोमा लाईन देखि २.०० मिटर
            हटाएर मात्र निर्माण कार्य गर्नु पर्नेछ ।
          </Text>
          <Text style={mb2}>
            ४. &nbsp; मनमति खोला ठाउँ खोलाको किनारबाट ६ मिटर र सेटव्याक १ मिटर
            छोडी साथै अन्य खोलाको हकमा खोलाको सिमाबाट ४ मिटर हटाएर मात्र निर्माण
            कार्य गर्नु पर्नेछ ।
          </Text>
          <Text style={mb2}>
            ५. &nbsp; कौशी र छानाको पानी तर्काउन डुंड नराखी निकाससम्म गोलो पाइप
            राख्नु पर्नेछ ।
          </Text>
          <Text style={mb2}>
            ६. &nbsp; अर्कालाई दुर्गन्ध नआउने गरी आफ्नो हकको जग्गामा चर्पी
            राख्नु पर्दछ र सोको लागि सेफ्टीट्याङ्क र आवश्यकता अनुसार सोकपिट
            {"("}Soak-Pit{")"} बनाउनु पर्दछ ।
          </Text>
          <Text style={mb2}>
            ७. &nbsp; सडक, बाटो, ढल, मङ्गाल, गौचर, पाटी पौवा, देवालय, शिवालय,
            नदीनाला, पोखरी आदि सार्वजनिक स्थल र मनाही गरिएको ठाउँ साथै अर्काको
            जग्गा निकास समेत मिच्नु वा वन्द गर्नु हुदैन ।
          </Text>
          <Text style={mb2}>
            ८. &nbsp; यस न.पा. तथा अन्य सम्बन्धित निकायका कर्मचारीहरुले जाँच्न
            आउँदा जुनसुकै वखतमा पनि यो प्रमाण-पत्र, नक्शा र बनिरहेको वा बनिसकेको
            संरचना अनिवार्य रुपमा देखउनु पर्दछ ।
          </Text>
          <Text style={mb2}>
            ९. &nbsp; यो नक्शा पास भएको कारणले मात्र आफ्नो हक नपुग्ने सार्वजनिक
            जग्गा र अरु कसैको जग्गा भनी उजुरी पर्न आएमा सो सम्बन्धी कारवाही
            चलाउन कुनै बाधा पर्नेछैन । सो जग्गामा नक्शावालाको हक कच्चा ठहरिएमा
            यो प्रमाण-पत्र स्वतः निष्कृय हुनेछ ।
          </Text>
          <Text style={mb2}>
            १०. &nbsp; निर्माण कार्य गर्दा सडकमा यातायात तथा मानिसहरु आवत-जावत
            गर्न असुविधा हुने गरी न.पा. को स्वीकृति वेगर माटो, वालुवा, इँट्टा,
            ढुड्गा आदि निर्माण सामाग्री थुपारी राख्नु हुँदैन, अन्यथा न.पा. ले
            उठाई जफत गर्न सक्नेछ ।
          </Text>
          <Text style={mb2}>
            ११. &nbsp; हाल भइरहेको सडक र ड्रेनको लेभल भन्दा माथि उठाई स्ल्याब
            राख्न पाइने छैन । ड्रेनमा स्ल्याब राख्दा सडकमा बग्ने पानी निकासको
            लागि स्ल्याबमा प्वालको व्यवस्था गर्नुपर्नेछ ।
          </Text>
          <Text style={mb2}>
            १२. &nbsp; अस्थाई प्रमाण पत्र जारी भएको मितिले २ दुई वर्षभित्र
            निर्माण कार्य गरिसक्नु पर्नेछ । सो अवधि भित्र निर्माण कार्य पुरा
            नभएमा म्याद सकिएको ३५ {"("}पैतिस{")"} दिन भित्र १५५ थप नक्शा दस्तुर
            तिरी बढीमा अर्को २ {"("}दुई{")"} वर्षसम्मको लागि १ {"("}एक{")"} पटक
            सम्म म्याद थप गर्न सकिनेछ । सो म्याद भित्र पनि निर्माण कार्य पुरा
            नभएमा सो अवस्था सम्म निर्माण भएको संरचनाको “निर्माण सम्पन्न
            प्रमाण-पत्र” लिइसकेपछि अर्को नक्शा पास गरी मात्र निर्माण कार्य गर्नु
            पर्ने छ।
          </Text>
          <Text style={mb2}>
            १३. &nbsp; निर्माण कार्य सम्पन्न भएपछि ३५ पैतीस दिन भित्र निर्माण
            सम्पन्न प्रमाण पत्र” अनिवार्य रुपमा लिनु पर्नेछ । माथि उल्लेखित शर्त
            भित्र रही निर्माण कार्य गर्ने गराउनेछु भनी दस्तखत गर्ने:
          </Text>
        </View>
      </Page>
      <Page size="A4" style={pageStyle}>
        <View
          style={{
            ...center,
            fontSize: 16,
            fontFamily: "NotoMedium",
            paddingBottom: 20,
          }}
        >
          <Text>भवन निर्माण अनुमतिको लागि निवेदन र शपथ पत्र</Text>
        </View>
        <Text>श्री प्रमुख प्रशासकीय अधिकृत ज्यू</Text>
        <Text>नागार्जुन नगरपालिका,</Text>
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Text>मितिः {datePub}</Text>
        </View>
        <Text>महोदय,</Text>
        <Text style={{ fontFamily: "NotoMedium", paddingBottom: 20 }}>
          विषय: भवन निर्माण र विवरण कागजात ठीक / साँचो भएको सम्बन्धमा ।
        </Text>
        <Text style={{ marginBottom: 20 }}>
          मैले / हामीले देहायमा लेखिए बमोजिम भवन निर्माण कार्यको लागि भवनको
          नक्सा र आवश्यक कागजातहरु सहित यो निवेदन पेश गरेको छु/छौं । उक्त नक्सा
          र कागजातहरु जाँच गरी भवन निर्माण कार्य गर्ने अनुमति प्रदान गर्नको लागि
          अनुरोध गर्दछु/छौं । निर्माण कार्यको अनुमति प्राप्त भएपछि
          नगरपालिकाद्वारा स्वीकृत नक्सा र कागजातहरु भित्र रही निर्माण कार्य
          गर्नेछु / छौं । यस दरखास्त फाराममा लेखिएको व्यहोरा सांचो र यसमा पेश
          गरेको सम्पूर्ण कागजातहरु ठीक/साँचो-सक्कल भएको अवगत गराउँदछु । यसमा पेश
          गरेको कुनै पनि विवरण र कागजातहरु, झुटा ठहरे कानुन बमोजिम सहुँला
          बुझाउँला ।
        </Text>
        <Text>१. &nbsp; तल्लाको क्षेत्रफल र उचाइको विवरण</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>तल्ला</Text>
          <Text style={borderPdf(150)}>क्षेत्रफल (वर्ग फिट)</Text>
        </View>
        {floors.map((floor, index) => (
          <View style={{ display: "flex", flexDirection: "row" }} key={index}>
            <Text style={borderPdf(150)}>{floor.name}</Text>
            <Text style={borderPdf(150)}>
              {ConvertToNepali(floor.countable)}
            </Text>
          </View>
        ))}

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>जम्मा</Text>
          <Text style={borderPdf(150)}>
            {ConvertToNepali(
              floors.reduce(
                (accumulator, floor) => accumulator + floor.countable,
                0
              )
            )}
          </Text>
        </View>
        <Text style={{ marginTop: 20 }}>
          २. &nbsp; भवन निर्माण हुने जग्गाको विवरण
        </Text>
        <Text>· जग्गा कित्ता नं. {kittaNo}</Text>
        <Text>· म्याप सीट नं. {mapSheetNo}</Text>
        <Text>
          · क्षेत्रफल {underline(ConvertToNepali(totalArea))} वर्ग फिट
        </Text>
        <Text>· जग्गाको स्वामित्व {}</Text>
        <Text>
          · वडा नं. {wardNo}, साविक {sabik}
        </Text>
        <Text style={{ marginBottom: 15 }}>· टोलको नाम {toleName}</Text>
        <Text>३. &nbsp; जग्गाधनी/घर धनीको विवरण</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>विवरण</Text>
          <Text style={borderPdf(150)}>जग्गाधनी</Text>
          <Text style={borderPdf(150)}>घर धनी/ नक्शावाला</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>नाम:</Text>
          <Text style={borderPdf(150)}>{agreementPdf.landOwnerName}</Text>
          <Text style={borderPdf(150)}>{agreementPdf.houseOwnerName}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>सम्पर्क नं:</Text>
          <Text style={borderPdf(150)}>
            {ConvertToNepali(agreementPdf.landOwnerPhoneNo)}
          </Text>
          <Text style={borderPdf(150)}>
            {ConvertToNepali(agreementPdf.houseOwnerPhoneNo)}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>बुवाको नाम:</Text>
          <Text style={borderPdf(150)}>{agreementPdf.landOwnerFatherName}</Text>
          <Text style={borderPdf(150)}>
            {agreementPdf.houseOwnerFatherName}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(150)}>नागरिकता नं:</Text>
          <Text style={borderPdf(150)}>
            {ConvertToNepali(agreementPdf.landOwnerCitizenshipNo)}
          </Text>
          <Text style={borderPdf(150)}>
            {ConvertToNepali(agreementPdf.houseOwnerCitizenshipNo)}
          </Text>
        </View>
      </Page>
      <Page size="A4" style={pageStyle}>
        <Text>४. &nbsp; चार किल्लाको विवरण</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={borderPdf(80)}>दिशा</Text>
          <Text style={borderPdf(120)}>चारकिल्लाको विवरण</Text>
          <Text style={borderPdf(150)}>संधियारको विवरण</Text>
          <Text style={borderPdf(120)}>कित्ता नं.</Text>
        </View>

        {agreementPdf.charkilla.map((chark) => (
          <View
            style={{ display: "flex", flexDirection: "row" }}
            key={chark.id}
          >
            <Text style={borderPdf(80)}>
              {convertDirection(chark.direction as directionType)}
            </Text>
            <Text style={borderPdf(120)}>
              {convertLandscape(chark.landscapeType)}
            </Text>
            <Text style={borderPdf(150)}>{chark.nameNep}</Text>
            <Text style={borderPdf(120)}>{ConvertToNepali(chark.kittaNo)}</Text>
          </View>
        ))}
        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            // backgroundColor: "pink",
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          <View>
            <Text style={{}}>डिजाइनर</Text>
            <Text>नाम :</Text>
            <Text>NEC No. : </Text>
            <Text>मोबाइल नं :</Text>
          </View>
          <View style={{ width: 180 }}>
            <Text>निवेदक :</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ border: "1px solid black", height: 70, width: 65 }}
              ></Text>
              <Text
                style={{ border: "1px solid black", height: 70, width: 65 }}
              ></Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AgreementDesign;
