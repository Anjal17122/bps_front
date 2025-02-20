import { MessageInstance } from "antd/es/message/interface";
import { ValidateErrorEntity } from "../Common/Form/FormData";
import { getToken } from "../Services/UserService";
import { PDF_URL } from "../Services/Api";

export const Common = "Common";

export const GOOGLE_MAP_API = "AIzaSyAy5-VOmSjCBdyf0RjaEa3asNCuAwnUKFw";

export const AGREEMENT_URL =
  "https://naksapass-nagarjun-api.addon.com.np/images/pdf" +
  "/agreement/agreement paper ३ पक्षीय.pdf";

export type DataEntryRole = "engineer" | "superadmin" | "operator";

export const DataEntryUrl = "/dataentry";

export const getRole = () => {
  const myRole = localStorage.getItem("role");
  return myRole;
};

export type CascaderType = {
  label: string;
  value: number | string;
};

interface Values {}
export const handleSubmitFailed = (
  val: ValidateErrorEntity<Values>,
  messageApi: MessageInstance
) => {
  messageApi.error(val.errorFields[0].errors[0]);
};

export const wards = [
  { value: 1, label: "Ward 1" },
  { value: 2, label: "Ward 2" },
  { value: 3, label: "Ward 3" },
  { value: 4, label: "Ward 4" },
  { value: 5, label: "Ward 5" },
  { value: 6, label: "Ward 6" },
  { value: 7, label: "Ward 7" },
  { value: 8, label: "Ward 8" },
  { value: 9, label: "Ward 9" },
  { value: 10, label: "Ward 10" },
  { value: 11, label: "Ward 11" },
  { value: 12, label: "Ward 12" },
  { value: 13, label: "Ward 13" },
  { value: 14, label: "Ward 14" },
  { value: 15, label: "Ward 15" },
  { value: 16, label: "Ward 16" },
  { value: 17, label: "Ward 17" },
  { value: 18, label: "Ward 18" },
  { value: 19, label: "Ward 19" },
];

export const size = 10;

// emsigneraction=pdfsign
// tbs=C:/emSigner/architectural_2_final.pdf
// outputpath=C:/emSigner/architectural_2_final_signed.pdf
// signaction=1
// certtype=ALL
// expirycheck=true
// issuername=
// signtype=detached
// coordinate=2200,850,2300,880
// pageno=1
// reason=sign
// location=Mandandeupur, Kavrepalanchowk

export const DATA_ENTRY_URL = (type: DataEntryRole) =>
  "http://localhost:3211" + "/gettoken/" + getToken() + "/" + type;

interface munType {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  letterheadTitle: string;
  letterheadType: string;
  letterheadAddress1: string;
  letterheadAddress2: string;
  district: string;
  province: string;
  landingPageImage: string;
  baseUrl: string;
}

export const municipalityDetails: munType = {
  name: window.globalConfig.name || "",
  email: window.globalConfig.email || "",
  phone: window.globalConfig.phone || "",
  address1: window.globalConfig.address1 || "",
  address2: window.globalConfig.address2 || "",
  letterheadTitle: window.globalConfig.letterheadTitle || "",
  letterheadType: window.globalConfig.letterheadType || "",
  letterheadAddress1: window.globalConfig.letterheadAddress1 || "",
  letterheadAddress2: window.globalConfig.letterheadAddress2 || "",
  district: window.globalConfig.district || "",
  province: window.globalConfig.province || "",
  landingPageImage: window.globalConfig.landingPageImage || "",
  baseUrl: window.globalConfig.baseUrl || "",
};

export const isUnicode = (str: string) => {
  // Regular expression to match Unicode and special characters
  let unicodeRegex = /^[\u0900-\u097F\p{S} '",-/]+$/u;
  return unicodeRegex.test(str);
};

// export const municipalityDetails: munType = {
//   name: "BARDIBAS MUNICIPALITY",
//   email: "bardibasmunicipality@gmail.com",
//   phone: "+977 044-550675, 044-520675",
//   address1: "Bardibas Municipality,",
//   address2: "Province-2, Nepal",
//   letterheadTitle: "बर्दिबास नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "बर्दिबास, महोत्तरी",
//   letterheadAddress2: "प्रदेश नं. २",
// };

// export const municipalityDetails: munType = {
//   name: "GOKARNESHWOR MUNICIPALITY",
//   email: "gokarneshwormun@gmail.com",
//   phone: "+97714914114, +97714914115",
//   address1: "Gokarneshwor Municipality,",
//   address2: "Kathmandu, Bagmati Pradesh, Nepal",
//   letterheadTitle: "गोकर्णेश्वर नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "जोरपाटी, काठमाडौं",
//   letterheadAddress2: "बागमती प्रदेश",
// district: "काठमाण्डौं",
// };

// export const municipalityDetails: munType = {
//   name: "Dhulikhel Municipality",
//   email: "info.dhulikhel@gmail.com ",
//   phone: "011-490324, 490724, 490330",
//   address1: "Dhulikhel, Kathmandu",
//   address2: "Kathmandu, Bagmati Pradesh, Nepal",
//   letterheadTitle: "धुलिखेल नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "धुलिखेल, काठमाडौं",
//   letterheadAddress2: "बागमती प्रदेश",
//   district: "काभ्रेपलाञ्चोक",
// };

// export const municipalityDetails: munType = {
//   name: "Mandandeupur Municipality",
//   email: "mandandeupurmu@gmail.com",
//   phone: "011-412113, 412114",
//   address1: "Mandandeupur, Kavrepalanchok",
//   address2: "Bagmati Pradesh, Nepal",
//   letterheadTitle: "मण्डनदेउपुर नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "मण्डनदेउपुर, काभ्रेपलाञ्चोक",
//   letterheadAddress2: "बागमती प्रदेश, नेपाल",
//   district: "काभ्रेपलाञ्चोक",
// };

// export const municipalityDetails: munType = {
//   name: "********* Municipality",
//   email: "********@gmail.com",
//   phone: "011-412113, 412114",
//   address1: "*******, *********",
//   address2: "Bagmati Pradesh, Nepal",
//   letterheadTitle: "******* नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "*******, *********",
//   letterheadAddress2: "बागमती प्रदेश",
// };

// export const municipalityDetails: munType = {
//   name: "Dhangadhimai Municipality",
//   email: "ito.dhangadhimaimun@gmail.com",
//   phone: "033-545238, 033-545271",
//   address1: "धनगढी, सिरहा",
//   address2: "मधेश प्रदेश, नेपाल",
//   letterheadTitle: "धनगढीमाई नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "धनगढी, सिरहा",
//   letterheadAddress2: "मधेश प्रदेश, नेपाल",
// };
// export const municipalityDetails: munType = {
//   name: "Shahidlakhan Rural Municipality",
//   name: "Panauti Municipality",
//   email: "info@panautimun.gov.np",
//   phone: "011-440136, 011-440138 ",
//   address1: "पनौती-४, काभ्रेपलान्चोक",
//   address2: "बागमती प्रदेश, नेपाल",
//   letterheadTitle: "पनौती नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "पनौती-४, काभ्रेपलान्चोक",
//   letterheadAddress2: "बागमती प्रदेश, नेपाल",
//   district: "काभ्रेपलान्चोक",
// };
// export const municipalityDetails: munType = {
//   name: "शहिद लखन गाउँपालिका",
//   email: "sahidlakhanrm@gmail.com",
//   phone: "9856010533",
//   address1: "पिपलछाप, घैरुङ्ग, गोरखा जिल्ला",
//   address2: "गण्डकी प्रदेश, नेपाल",
//   letterheadTitle: "शहिद लखन गाउँपालिका",
//   letterheadType: "गाउँ कार्यपालिकाको कार्यालय",
//   letterheadAddress1: "पिपलछाप, घैरुङ्ग, गोरखा जिल्ला",
//   letterheadAddress2: "गण्डकी प्रदेश, नेपाल",
//   district: "गोरखा",
// };

// export const municipalityDetails: munType = {
//   name: "Chandrapur Municipality",
//   email: "chandrapurmun@gmail.com",
//   phone: "055-540200, 9855041115",
//   address1: "Chandranigahpur, Rautahat",
//   address2: "Madhesh Province, Nepal",
//   letterheadTitle: "चन्द्रपुर नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यालय",
//   letterheadAddress1: "चन्द्रनिगाहपुर – ६, रौतहट",
//   letterheadAddress2: "मधेश प्रदेश, नेपाल ",
//   district: "रौतहट",
// };

// export const municipalityDetails: munType = {
//   name: "Shahidlakhan Rural Municipality",
//   email: "sahidlakhanrm@gmail.com",
//   phone: "9856010533",
//   address1: "पिपलछाप, घैरुङ्ग, गोरखा जिल्ला",
//   address2: "गण्डकी प्रदेश, नेपाल",
//   letterheadTitle: "शहिद लखन गाउँपालिका",
//   letterheadType: "गाउँ कार्यपालिकाको कार्यालय",
//   letterheadAddress1: "पिपलछाप, घैरुङ्ग, गोरखा जिल्ला",
//   letterheadAddress2: "गण्डकी प्रदेश, नेपाल",
//   district: "गोरखा",
// };

// export const municipalityDetails: munType = {
//   name: "इच्छाकामना गाउँपालिका",
//   email: "info@ichchhakamanamun.gov.np",
//   phone: "०५६-४१०१११, ०५६-४१०१२२",
//   address1: "कुरिनटार, चितवन",
//   address2: "बागमती प्रदेश, नेपाल",
//   letterheadTitle: "इच्छाकामना गाउँपालिका",
//   letterheadType: "गाउँ कार्यपालिकाको कार्यालय",
//   letterheadAddress1: "कुरिनटार, चितवन",
//   letterheadAddress2: "बागमती प्रदेश, नेपाल",
//   district: "चितवन",
// };

// export const municipalityDetails: munType = {
//   name: "Dhunibeshi Municipality",
//   email: "dhunibeshimun@gmail.com",
//   phone: "010401197, 010401186",
//   address1: "धुनिवेशी नगरपालिका वडा नं. ८",
//   address2: "खानीखोला धादिङ",
//   letterheadTitle: "धुनिवेशी नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "खानीखोला, धादिङ",
//   letterheadAddress2: "प्रदेश नं. ३, नेपाल",
// };

// export const municipalityDetails: munType = {
//   name: "नागार्जुन नगरपालिका",
//   email: "info@nagarjunmun.gov.np",
//   phone: "०१-४६७१७१६,४६७१७१७​",
//   address1: "नागार्जुन नगरपालिका",
//   address2: "प्रदेश नं. ३, नेपाल",
//   letterheadTitle: "नागार्जुन नगरपालिका",
//   letterheadType: "नगर कार्यपालिकाको कार्यलय",
//   letterheadAddress1: "हरिसिद्धि सीतापाईला, नागार्जुन",
//   letterheadAddress2: "बागमती प्रदेश, नेपाल",
//   district: "काठमाण्डौं",
// };

export const StandardRiverSetbackGokarna = `
              खोला/नदी किनारबाट सेटब्याकः
              <p>
              ∙ वाग्मती नदी किनार बाट दुबै तर्फ २०/२० मि र
              त्यसपछि आवश्यक सेटब्याक छोडेर मात्र निर्माण कार्य
              पाइनेछ ।
              </p>
              <p>
              ∙ वाग्मती नदी बाहेक सहायक खोलाहरुको हकमा
              खोलाको किनारबाट ४/४ मि हुनेछ ।
              </p>
              <p>
              ∙ राजकुलो अधिकारक्षेत्र(Right of Way) केन्द्रबाट
              ४/४ मि हुनेछ ।
              </p>
              <p>
              ∙ राजकुलो /कुलोको अधिकारक्षेत्र भित्र पर्नेगरी कुनै पनि
              संरचना निर्माण गर्न पाईने छैन ।
              </p>
              <p>
              ∙ पोखरी जलाशयको डिलबाट भवन निर्माण गर्नुपर्दा ५
              मी सेटव्याक छोडेरमात्र भवन निर्माण गर्न पाइनेछ ।
              </p>
              <p>
              ∙ कुवा, ढुङ्गे धाराको सिमाबाट ४ मि. छाडेरमात्र भवन
              निर्माण गर्न पाईनेछ ।
              </p>
              <p>
              ∙ सार्वजनिक पानीकोमुहान र निकासलाई असर
              पर्नेगरी कुनै संरचना निर्माण गर्न दिईने छैन ।
              </p>
              <p>
              ∙ नदी उकासबाट आएको जमिनमा सार्वजनिक
              सडक, ढल र उद्यान बाहेक कुनै संरचना निर्माण गर्न
              दिईने छैन । 
              </p>
              `;

export const StandardFARsetback = `<p>
              FAR सम्बन्धी व्यवस्थाः नयाँ निर्माण हुने भवनहरूको हकमा देहाय
              बमोजिम FAR कायम गरिनेछ । 
              </p>
              <p style={{fontWeight:"bold"}} >
              + ३५.१. बौद्ध–जोरपाटी–साँखु सडक खण्ड, जोरपाटी सुन्दरीजल र वागमती कोरिडोर सडकसँग जोडिएको दायाँ 
              वायाँका कित्ताहरु व्यापारिक क्षेत्र मानिनेछ । ती क्षेत्रहरुमा  फार ३.५० सम्म दिइनेछ । व्यापारिक भवन निर्माण गर्दा
              निर्माणकर्ताले पार्किङ्गको व्यवस्था आफ्नै जग्गामा गरेको हुनुपर्नेछ । 
              </p>
              <p style={{fontWeight:"bold"}} >
              + ३५.२. उपर्युक्त बमोजिम बुँदा नं.३५.१ मा उल्लेखित सडकहरु बाहेक अन्य सडकको हकमा सडकको दायाँ बायाँको कित्ताहरुमा फार २.७५ सम्म दिइनेछ । 
              </p>
              <p style={{fontWeight:"bold"}} >
              + ३५.३. माथि उल्लेखित बुँदा नं.३५.१ र ३५.२ मा
              उल्लेख भए बमोजिम घर निर्माण गर्दा कुल जग्गाको
              क्षेत्रफलको ३० प्रतिशत भू(भाग अनिवार्य रुपमा छाडिनु
              पर्नेछ । 
              </p>
              `;

export const StandardBuildingSetback = `
              आवाशिय, सहर विस्तार क्षेत्रमा १० मि. उचाई सम्मका
              भवनहरुको न्यूनतम्सेटब्याक १.५ मिटर, व्यापारिक र
              १० मिटर भन्दा माथि १७ मिटर सम्म उचाई भएका
              भवनहरुको न्यूनतम् २ मि. तर संस्थागत तथा
              व्यवसायिक प्रयोजनका भवनहरुमा न्युनतम्सेटब्याक ३
              मि. र १७ मिटर भन्दा अग्ला भवनहरुको मोहोडामा पर्ने 
              संस्थागत तथा व्यवसायिक प्रयोजनका घरहरुमा न्यूनतम्
              सेटब्याक ६ मिटर कायम गरि नक्सा पास गर्नुपर्नेछ ।`;

// बर्दिबास नगरपालिका
// बर्दिबास, महोत्तरी
// प्रदेश नं २

// floor Rate Details Ichhakamana
// औधोगिक तथा ब्याब्सायिक प्रयोजन तर्फ​

// फ्रेस स्टकचर तर्फ​

// जमिनतला

// प्रथमतला

// दोस्रोतला सो भन्दा माथि

// लोडबेअरिङ स्टकचर तर्फ

// जमिनतला

// इट्टालाई सिमेन्ट वा माटोको जोडाई गरी बनेको जस्ताको छाना भएको घर​

// आवाशिय प्रयोजन तर्फ​

// राजमार्गको दायाँ बायाँ प्रति वर्गफुट लाग्ने दस्तुर रु मा

// शाखा पिच सडकको दायाँ बायाँ प्रति वर्गफुट लाग्ने दस्तुर रु मा

// अन्य सडकको दायाँ बायाँ तथा अन्य स्थानमा प्रति वर्गफुट लाग्ने दस्तुर रु मा

export const ImageNotFound =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAEUCAMAAABUNq4iAAAC1lBMVEXm5uYAAAD/tgD/lgD/lwD/lgD/lwD/lwD/lgD/lgD/lgD/lwD/mAD/mwD/vwD/lgD/lwD/lgD/mQD/lwD/lwD/mgD/lwD/lwD/qgD/lwD//wD/lgD/nQD/lgD/lgD/lwD/lwD/lwD/lwD/lgD/lgD/lwD/lgD/lwD/lwD/lgD/lwD/qgD/lgD/lwD/mQD/qgD/lgD/nQD/mAD/lwD/mgD/lwD/ogD/oQD/lwD/lwD/mQD/lwD/lgD/mQD/mAD/lwD/lgD/mAD/lgD/mAD/lgD/lwD/lwD/lwD/lwD/pAD/lgD/lwD/lgD/lgD/lwD/lwD/mAD/lwD/lgD/mQD/lwD/lwD/mQD/mQD/nwD/lgD/lwD/lgD/mgD/lgD/lwD/lwD/lgD/nwD/ngD/lgD/lwD/lgD/lwD/lgD//wD/lgD/lgD/mAD/mQD/qgD/lgD/mwD/mAD/mgD/mQD/lwD/lgD/lwD/mQD/lwD/lwD/mAD/lgD/nAD/lwD/mwD/lwD/mAD/lgD/lgD/lgD/lwD/lwD/mQD/lgD/lwD/lwD/lwD/lwD/lgD/mQD/mAD/lwD/nAD/lgD/lwD/mAD/mwD/lwD/lwD/mAD/lgD/lwD/lgD/lgD/lwD/lwD/mgD/ngD/mAD/mQD/mAD/mQD/lwD/mAD/lgD/lwD/mAD/lwD/lwD/lwD/lgD/lwD/lwD/lwD/lwD/mgD/lgD/lgD/lwD/mAD/lwD/lwD/lgD/lwD/lgD/lwD/mAD/lwD/lgD/lwD/lwD/mAD/mAD/lwD/lwD/lgD/lwD/mAD/lgD/lgD/lgD/lgD/lgD/mAD/nwD/lwD/lwD/lwD/lwD/lwD/lgD/lwD/lwD/lwD/mwD/lwD/lwD/lgD/mAD/lwD/lgD/lgD/lgD/lwD/lgD/mAD/lwD/lwD/lwD/mAD/nAD/lwD/mAD/lgD/lwD/mQD/mAD/lwD/lgD/lgD/lwB92HTLAAAA8nRSTlP/AAdJmMzm/P/23cF+LgRmwjgezpM16bwMsAF8GpfuQnaQ8qqSldH+pvt4CTPJQQa7DXmpMJELE9BHMrXIBWG68y/UTREbYOGsDrKATvH5iUhA7yjY4y0jEFWF6j/ibn+hCB09W/1dcAKGz1dGA4spKitQnbRYN8vVWWQSFhezXvjZJ72OD0Sf64QgIjxSViSZZXQcZ1NPqKJ6vr+aJhU0CiUU1z7l32P3oO3gUZbk0zrFt/VqjNp1Yq9sVMaN3MSDXHM7rWlo3sD0o9tvGDGCNky41qul8CH6p1+Ksbl3WnvDOejHLG0ffZTnzUtKpOyeh1ZAATMAAAkrSURBVHgB7NDFAYIAAABAW7rB3n9NJ6B56d0ItwOAX7Rnc3r16kWvXr3o1asXvXr16tWrF7169aJXr1706tWLXr3o1asXvXr1olevXvTq1atXr1706tWLXr160atXL3r1olevXvTq1YtevXrRq1evXr160atXL3r16kWvXr38U+/heDpfrsFUYRQnqd6JsvwSzFeUeqeo6mCZJtM7qu2CpW53vSOqLlju8dQ7KKuDNV56B+XBKuFb74DDJVjno3fAlz17YO4jiMM4Pr/wGdS2G9u2bdtG3bB2+5LDa3Yuk70/djPK830Jn7t1KAy7f568+sJg2gPy6guHaQ/Jqy8Cpj0ir75IuHv85Omz51EIoGjy6oOrmNg42Ss+Af73RPyLvDGJclhSMnnt88bK/1Kuk9c27+M4OSqVvLZ500SVTl7bvBmiyiSvbd5nosqyzUvebFHl2OYlb1SuHJVnm5e8yC8Qp0JY5yUvilIc3WLyWgnurqeWZGbl5AHktRICqbSsvKKy6nR4yVsdInvV1J4GL3mrz8tBt+uiyOtngek61TeY8ZK3sam5JbXVratqazfhJW9Hp+x1N/xkXTUBk9c7jW6XHNQdfrKumoDJ65leV/m6dd0TMHk90+o6lYdrdEW6eg66RF59Wl31/7p0y8Uo8ipdx7dX6UpvX78YRN6BLtHXC8QMktf/huqO5UN3r+ER8pqm1wXCR8lr3Ni4RhcwnoDJO1Y8ManRBWKmpslrpgu4fGfgajZ1rof7XhNdl28vXyvs6rp8e0Fea80Xw2niguy1sAjyBtXS8vFWVl9EQfXy1evCN/Aojbz67sO0MPLqewvThsir7xZMe0defe9hWMwaefWtx8CsZCGvR89gVj95vdp4DJM2hbyerUYh+KrWyeujhwi61nQhr6+2thFcHz4KeX2X/glBtP35i5DXr75++47AKv3xU4S8/rbw6/efv/5WFr/B14qzEHnJS15GXvKSl5GXvORl5LUfecnLyEte8jLykpe8jLzkJS8jL3kZeclLXkZe8pKXkZe85GX/pqamunbZtQcgOfIFjuP1i+a7mtuKVXHS2bNj27Y9Z3N5iG0s3xpn27ZtG2XX6+7/6+XM7F0482q/hbY+Y0QIb/KOHTt26qi3y97t7qrRZf90G689Ovz2AvsihLc5sF9HvUTggNzigLNUt20HD66ss43XWNVTA6/VPyxvGhxq4D18XjL/PW+z/5X1/8mb3VxOZ5y6KSAnM5V9bY6qdUqumawsNTcvGC8Ta/P6Z/+nfVjeQapZfqtxCttZrfqoqsDs5pHJu6ygoKBwcREUlygnLQZKyzrKrX+7VUD5hLYyXdwiCSom3mZv4F5Z29vvAN+dg4PwzvTX4L3r7lLodk+2pJEFBUPhXnsf94XmXXb/IrAeeDAgu2x73YdkN8Ie2SItc6ZbneaD4itlSn14KDR75NEI5M0DHsPt8Sdwm+Q46MokTBXJsgtcYOG06kkgVdK5N2E6kFeHl0eq8Qae8uF270lSPl5LQvLOHo4pc5SkBOBB2T0N9JM54QzcnpHTs81wGx6hvLVr2l7KngxMHwPwnOyex8vwnn8HwGSArrV4M2HD2ireF6js9H/Ce8qLeL0Ugtfr5d2S1i7AK0J5X5l6cW+AV187t8uLwHZpB1jbpNefA5ZL+Z3AuvSK5H7DMbwXAD1S228fD0mX1+R9wwdTKnlzOkHMnlFz3rSgYJB/xYrr4aYVK1Y0D8W7ETjzreTOBcDqELwDL97+9quYR8njwC3Xzn3rnUjlfVd2TYG3JV0JzJPm3F9e5j7jAVPNNXeQXWq5y3tWBrwnu+R74X3VpGoCGZs83vnAo5IZSZc0EJrWeb7eYOoltZ0MfS+RlP8BvBic1/pQUjrQUlr7ERT4Jfn7RijvRtntghjnqhqVwkmyO2WtPTFiJrBGGg/Tz5dTb5c3F9h7vtNVMLwWb8ok+NjwulvGtpddcgZcGoLXa5bUH/hETp8CbYPyJspuOfCZ9BZwn5yeiUxec7csgUly6oThVfPFn8fg9IX0ADwpt/td3pVUKyNQk1dfgPWW4XW2bCe3mZBWP++XwLlyugY4NSjvDjlNgjQzu1BOj0YT7+Vn4rTI8H4EH1fn/Yrq1X4ebVQMXyca3o+gidwyYXgo3keed1std8+vy2kh8GgY3g8gzayfLae9UcR77mQg5rOSPoZ3EWRW5x0M3DLW6/VavLoIKDW8i+A9ud0JZ4biHSSvh4ArKrmerZd3J/BN1N17D8HLg/OkZYa3DXzrl1OZy3sX8Kjc/MGo7sbtLHfLO+XUaCj0lPQdzAzDuwXYK6evgBx9D3wlu8XBeTtXPlf/EEW80+Eq2X1oeHuCeUY+f5bL28eC3gbhlrVBqK61DK/ZcoXsdgKvSfoMrD6heVOAW2TnHwOdpHygTHZXB+ddDnwnp8wo4i2HOwdJKQMM72wfxNy4TD++g8urq4BdATWfAHcuD0L1vsc7OwmKVrT3PzoUOuVLagk0nbIkFK/OAXqOU2oa8KakbpDx0+xtYwnOq3uArLlaeztRxOswxjzWNwPDq58BPmoNGN6UD4B7nwCwJgahal6K4VVXgA9iAJ733kmDFZJ398uA9S1AxSmS9mMKxXuqBVi/WEQTb0IGpm8N78hETBWGV293wuR7RMGoNnq8a88EU1lATpnheXXRUEy/bJFd9ke4xYbg1U9GlmZRxKsVvwJMX9zT8CrQIQa495P7MbxafqYF8NizCsrb9hcMr9ov7uZi7ZXpkh/ixvjC8GrzSxbg695Hbm85sFx1bShe/dYasNJaRRBv/bW/+e3RhY6Plz/h6W8GqQcknSEj+Ozgfdv1Dwpkb9v3o/5Faws/uTZPXv7vb/g9R+HaPK/xyOj+pbjPVQboHShQlBX5vL/9wq+nSHrWB+818B7t9gOd3vvpj48gKbeB92j3egVeT6mB96iXOgS3P3cGGniPRQnxfz33d3pyw3/M/tsOHRMBAAAgEOrf2g6OfxAB9OrVi1696NWrF7169aJXr1706tWrV69e9OrVi169etGrVy969aJXr1706tWLXr160av3oRe9evWiV69e9OpFr1696NWrF7169aJXL3r16kWvXr3o1asXvXr1AkDIAJeoFje3HAjXAAAAAElFTkSuQmCC";

export const LandingPageImg: string | undefined =
  window.globalConfig.landingPageImage;

// export const LandingPageImg: string | null =
//   "data:image/webp;base64,UklGRqZMAABXRUJQVlA4WAoAAAAQAAAAzAEAxAEAQUxQSJseAAAB8If9//ql/f/dALFFZ8zZ3T27A2d3t7NrxsLOWZutmzWTpaJOFzLF7lYMwsAgxRYQQer6B8/b4/nkeY/Hg/f7ExExAWROs5aq167PiK/mLVu/0/vfI2cu+/kHBPhdPX/in71eG1fO+3pUv/b1SntQRmemYs2Hzt165E40nDMuwHfLguGexd0zHNwqd5m0Ys+VKIgZ5XdgzeQu1bNlCLh9OmbzlSRI8dbGsfXdLbxcTSdtOhUNub4/v2FSy/yWm2udsZsvx0PaflvGN3S3zMqM+eMp5P/qwLgK1lexfmsuQZ23Nw0ubmGV/+rkBzh34uuQAL9Lp4/7HvLxOXzszOVbQSGvE50p7ZmZNawo13ZLLyTCCVPf3T+xa8OCSYM6Na1eIndmV7LfJbNH8WqN2w2aMG/d76fuxTkBgJvft81qKRUYvDMC6R0f9M+6Kb0bFc9Ezu1SrE6vyasPBCSkD4DXu0cWsoraeL9H+kafWPl5rZwkdq6aAxcfep0eAOL3dXe1fuqvuId0TH6079t+FdxIlq7le8zZHeI4AHdXNbd0co29hnQM2DCkKMm4WJ81txwGIGhqXqum1dYXcHTi+dW9S5PMy/ZZdjreQcCLbZ1crZfK3wbBwaln5n3mQSrM1Xre0RSHAAhfUdlaabAPDn69b1heUmmu/gcSHALgz1aWSZbBR+DYu+t7epB6c3VeE+AQ4OyYHFaI+9QncOjrtU1dSdnN1r9wBPBwah6ro+jsB3Bk1KbuOUjtmdutC3cAELmkgpXReMcHODByc2tX0kE3z7VP7QOwvaFVUfpnODD1yuCspI/ZBp51AOBdw4qotgkOjFzVkHSz5tIo+4BfqlkNudfDgbeHZiUdzT7iun1I3lTCSsgzMwx2J+7q7Era6rkzwR4gemlRqyDfvKew+8HXhUhvC0/ztweImZ/XEuj9BHYHjclK+usy+IY9wLMR5q+FD+w+2c+d9NhlwCl7gNOdzN3HW2G3fx/S6XZX7QE25TZxQ0Jg77l+pNudz9iDF5PcTFrH87Az9XBr0vHP9tsBBPQzY3m2w947XUnXW1y0A9iew3R1fwg7/Ue7k8aPCbYDYUPMVV4v2Jm0PAfpfaa5H4wB+4ubqH73YecvVUn/S220A0/7mqUSB2Dn3jpkDuv+bQz4u4op6hYJ46+GkXnsFW4M74abH4/1qTCcuKYwmUmPBUmGgN/ympxG92H8Wn0ym438jSGwrqkZ8x6GPyzJRuYz6+wEQ0iebl7KHoDxfZXInBb/2RBw+lOT0vY5DL8aSuZ15HtDSGhnSuamwvDhCmRmK/1lCMlzXE2HixcMJ80lszspyQhwIJvJqHkGhq+1IvNb+5ohBDQ2FaNjYDRxvjuZYff5H4wgebiJWAnDr7qTWfaMMAKsNAuZt8Lwv+XIPBfZYwj7cpqCImdhNOV7VzLVKw3hVB4TUN4PRl/1JbPdP8oI7jXQvs4vYPR0dTLfJXyMIGmw5o1MgdEtmciUrzACzNC6aakwGP8lmfWvDWGmxq2C0egOZN7bvTaCddr2PYw+bElmvs4tI9jhpmUee2F0bz4y9zl+MYKzhTUs838wusmdTP9WI7iWQ7sKnYTRuWQFzjeCU3k0K9tpGJ1O1uBYI7iRX6uyHoDB+DFkFY4zgnP5NarweRh860nWYatIA7hfVZtynYXBmLZkJdZ9aQD38mlSgZMwGNaUrMWqAQZwMpce+cLgs9pkNZaPNIAzWXXoJxgMqk7WY+0QA/g7k/a4/waDgeXIiix+0QCOZNedNTD4rDpZk0WDDGCP5syHwXvVyaosdt0A5mvNuFQDr2uTdVk2ygDGa4xnAvjIBmRlNo02kNJTW+q/AP+8HlmbtSM4JHbRlNLPYLAHWZ3NDCCxjpZkPw4+9XPSzEF+47WDOidwCMqnI/th8GvSzK4AtmoHDTOAXRqyGAa/I80cg7RnPtINWmEAi7RjIAyuIs3cDNuRlXWDfjSAyZpRJc7AYRfN2A0+sbJu0H4DqS21osht8LdLkVa6+MDo20q6UeA6h2cVdeIP8FFVSC93w3hoTs2g4pEcjmnETPDJfUgvvWHv4wKaQZ8lc5ihDQNTueTRpJd/w/6H+TWDJhhI6aMJRZ6CX0V6uQuODHLTDNrAIbGKHniDP5NDL9bCscd1w9WXwyk3HfgGfFxN0sphcPQGzaASLzis0YAWSVxqX9JKTzh+vmaQZzKHnsor4A9+JmlhcaYF0nMBk9VDD2i0gRfFVbcX/AFXLdifWsOGW2i6oJutRyGF9YD+5rBbcaPB385HOrgJWJPG5RTSuX6apsB5TSj9lMMwpRV4bqA96eB4ANfTrEF6306zAsDfekCeBhIrqmwr+I2kg52QlogaI/1nEdFlAFitB7SIwz8KGwX+Yg4dKPzOxjiiW06A4pQNNkfoAflwmKOssu+42Mqkg76weZZGwRmP0Ze2UFEPCkRxaKiq3eAnkQ5OA1vzjVOg933mflYtoAEGfBU1EPwh0sF64GPgnPHgf9IDOshhsJKKRXAhJbXAz4CALfSgahz3JLeKfgXfj3RwC0R+9ZEWUG8OexXUHLwP6WA7iL1dD+hXDr3Vc4xLrKUFNwVDWT0oF835Z1bNePDTSQdHQ3RvPaBhHBYrpsQL7qSLDriFCYdaekAHudRaavECm1yPdHA9xL+uCeWTGPgopQX470kHy0KGI/SAvufQViXXuDvZtOB3KdzRhPyh3CmFjAY/gHSwKOTYWw+oH4chysgUyJ1xUVqbH2z9KokAW30XKI58uAgPVUwB35xUXjkO89JUgCxHp6mTjKWKq5bEYJkicoRwO0np+4FoNyJaL42LaQ4B7/Oojb7j4ouoYSHYV8WUVhcAfiOix9JAcaLOAPCL4nIFM9imhOJx3BxS+uk0aEm1Ic8l5PI8DQqrjSZwqKuClWBD8ymtDWzeotUSuUGbYNNLcdkfc14KqJLI9SOln7MF70CJYDnYHGqjYRxqyO83sCdJ6TUg98WKowBuq/RqJ3I91Pa75EJV14lLqSi7LWCvuSjNJUVyGKo4OsbAS3JFkrjhpPTFkH2Q6jpzqCq3JWBvuCgte5z00E1xdJDbKrXsz7mupPQpkP8/qqvDpZaQ2WywZ0nt5xUAN8XRPgYbJJbzGTdIbbmgwq9V15ZLLS6vUWADsyhp96/MXCX4M8N966qJbjCYLa8bXH9S8SFgka0AJaC2DU/g7adqGsqFZpJVN7A3ScVzACR4pCkNNX5r4yKAq2rKGsmgh6yOcZNUVBxpf0kzXhFH0gxF2glKoq+4/ZKqBzYxv4oO2EAzItqriJdElOW5jddqyvKSQTk5reV2kII9YftZPqKHikAVoj2wvVhJtIxbJ6Ucz7hGCnJ5wsCXCkOV02g2+DpKKsslF5JRf7AnScFTYXD5ZGUcaQSDl5RE3gwmy+gA11NFD43grTLsrKGkhtxFCZVIYYJdFNQb6t+pJDrPoJ58FoJdSAq+rAEJaprEbZVOjldcGQU1hQ6OVlLeBCalmGx6g91HCt6sBceVRN4MxsnmV66DigK1AGrqw/lKJlcsc5cUXAR62F9JWV4xKCCX4WCXqmiCJvypJFrJDZfLOa6miv7RhJdqKs8dkkolsIGk4khNQGkl0XEmpYhMvuGWqqgMdHGSmqYw+FImZ7hPVTRRGw6pqSTnJ5EiYP1Ixb9pw0s10SEG1eQxnJummnZpbmgDihJR1QrKGcx9JY9fudKK2Yi1RPRBH4YQtcGjrKrJnsQcloZLBHOO1FoGwFiqDX3cRFXigIWqob+ZhNyy6Ax2pmK2AcDcGRrh1z4FQKByRjIYLYutXAPFRKZBtEaw5VVTkvORRTgTRmr1hK5uUA3dYJJyy6E+2HWK8dKWEOWsYtBJDl9znop5rC2opJru3Hdy+JeJJLVWgb5+o5q8ScxlOcQwvytmssbsVw35MKkfycAT7ATF/KwxAcqZwKC9DJZytRRzVmOgnDLcfBlcZZ66KOaJzjRWDQUwhyVQCuweUmyKzsxXzgYmwV28Htx0xRSEznorZygDT/EWcq0U46k155VThftWvINMUm7FjNKaB8qhKOaseCHMGVLsHK15rp49THx20cqDna+atVoTp57RDJqK1otrpZotWhOvnircONHmM6keqtmqNbHqoQhmg2h/MtdJtT9qTZSCfJjzogUxO5UzW2vuKeh75pWLWPnATlZOV605q6B+DCqJ1ZZro5xCWrNXQTW47mJN54qpZPZGIiKtWUNEX+9Sizv3jVh/MOGkULf3uF2f6L3OTCbaCnRSCgUxP4l1h/FRSS0A+IZe6kyPzEcAzFLLPuaUULkTmG9V0i4N/BJ05vfXAPCjWhYyL4SqCbaPSjra0GEvtQxlUEik7lwVlXhq029qacp5ijSZScyhkhra9LtaCnMTRFrJ3COV5tembWqhSGaNSPuZg0pxS9WlxYo5wRwT6RqzUSn0VJeGKOYn5plI4cxMtVzUpYqKmcEguzi5wQ5Ryy+aFEaK7ceVE6cS56mWYZp0QDUNuGbitOYqqiVTvB4NVk1hboA4A7msaqFjWpSYTTVuMcxkcaYwMaTYaVp0mpT7gFkkzmImUDUFtGiaes4xm8XZxJxWDf2nQakF1LOf2SfOPmaPcupr0M+k3k3MaXFOMluUQ3f1p4qCljCB4txglikmF9Fa7QkgcsmkmqnMU3GeMLPVsvD9yVEdtOfnz4++v6SaUUx0ZmGimYlqWQddvquavsyHj4QBO0QtE7XpjGo6MKklRMnL9VBLfW3aoZpmDKqJUpxrqxZ6p0uDVFObayhKVa65Yo5qUkpu1VTi2ohSh6ujmC806RCptiTXVZQWXHXFuL7Ro+7KKcj1E6UtV1ExtEeLIkm5HinMcFE6cWVU01mLNqknWyIzRpTuXAlFlB8yqqkNuqJDBW2UGzGpvTLcEpiJovTkCqug3KYIAEj17UZEbTXoOyIqu+U50p7poQaKY6aI0kclS2HwSHmiw9oTQUTrYPBgTqV8I0pfhZyA4eShVFt7JlGVBzD8prIG9VLHSdi7gXw154V7v1TY+aaUQr4UpSdXTHabYP+xGpqzYC7sD1FAPDNFlK5cSck1hyNv7Nea2J/gyLXSc//AfCFKe66s5I44RMdfSy9HMjNalNZcRclFmwRUl11esENFacLVlJsLzGJ/2RXi+ohSm6snN3prFtrIrhTXRZTKXDPJ/cEl6d0bkn1VzlOUQlx7yeUMtHGtDc1P1K9fspf610ZyP+nV4+qJkp3rLTnyWH/8vFdDIqLMv2pWUA0iotxTD/p+n4Wk35KrKAqlMp/LznjdQxoVNZuU2oVJLSzMC+YLlRD1feqQOMW9c8waUuxA5oOHMPeZWWohWpRi3785n6mtwFoHeOUj1Y5l3rgJc4VZqRraYo9fJ6JTSksgquJtzwNS7ywmlIT1ZbYoZxX3PvrB8XXNiIjOKy2ZiKjgV/8ERydzNxW0nLkhzi5mv3K+YaaQwRdM7WbtevQfPm7yJqndWDx76sQxQ/t2vWkLHxOfmzmhoG3MEXE2MGeV04J5ZGAQbN8jtqXUthL7E/OHgRXMDgX9zewS51vmgXIoyRZWM7VjmR3cCKl5c58xGMm0BTtKQZeY9eKMY+LVc5TB7rxpJsaBrcLtkNpNjqIYbMyZZjp4dwWFM3PF6cUgr3JGc8B/q/+IBO9HfLDU4M6t4xB7YOWu1+D/JfXmSGTGidOEq64cumfAzv5cI8h9KZf/PWdvAwWVAttDnLJcO/V87aDjxJ+RXEoRhhY46BgpuBnXUJxs75lh6jnvmLBS3EbIPrQMQ/scg0IKGsKVFofuM98qZy8cGvAx2a58FfJ/24uhnx3zsJB6FjIprgKdZLYrpsBFONTXg2wvhBo3MLTAIYhvr5zfmPsk8E7mlFIyzY+BI19NItv9A6HKR0NsUesbjgAO1lPMVeZvkRYzYepw67/rNRx5bSrZ9rwOlfr3tEHU7WiqA4BTk8spxDWGWSbSeAb5VFEmDPbG7BszYEDzbGS751Wo9t4kG0T0ad/+g3eE2wFggjpKgR0pUluugSpow43IOC7muld/FzJYeGU4VBy/q5EN281+vBBt4P2DA3XV0ZZrIFJ5brgy0pap1bBxveofkZ2l90HdlzsasJm5fJ3GTRpUK0JKHc95iJQpmlmjFEdm/vIM1P5kaxNDal7JPCKhrzCnlNZobwI08PG8HGr7lzks1lbmpauqCn3x9zNo442FlRUWwqwTaxyDSkpqvi0YuvlsTw9F5QU7XqyGXC/1uH19B3r6dHkeFTXhWovlnsjMUU2zPxOgsSeHqmc0V1Qsus54q6XYX9Dd+wNVs455SoJ7MUEqqfMPdDh8ulpOM0dE+5pBEWXUPQFdfvuNQrLGMctEa8P1VER2L+h0aEdlNAY7RLRPuNVqmPMKmu1bRRHTuOqi0QPmpgrK+kHDp6jhEJNAwu9lUFB6rt9Bz8/XVoBbLHNYvKlcN9l1fARt3yC/hmC/FK8Ft0Ryq6Hzd/LIbjJXXbxc75jjUsvrA72P/kxyvzPPSYJHmdisEmvyAto/Q26RzAEZzGLQSF6TYQa9XSVWE+x0GVTnZkprH8zhw5Lyms81lAE9Znxl5Quz+K68tK4yCZml4MV8yCKlT67DRPaRVAmwh0mKYxh0l1H2IJjKAXIayM2RQxXOS0LF78FkfiWlLVwLOdA1Ji67dIpGwnROlVE4E0WSXMignWzcAmBCh8inNtjtsqjDrRCuRusuHZuV5grcgSkdaKB0/Sa18klgGtdFFnSXuSNS2UUn34D1/71fmiswqbWIqPH6c69h++HB6aXEOs7EuUljA4OaolRcHwJ7329rcBlmNa7j9PuwN+zXduJ8AnYPSbMTt1aMNsdhBd6dKso0bqg83N8xr7KI4A2rMLCYGLe4QvIgbwbtnM/1HKzD961EqA32EEl0FLfe+bbBSnybTYA53HCZFEtmwpzvuaWAEQJcY97mkgl5M2jjdMethZrO1wzsDpJqd26z0xW8YCGEeZLzb+f6yiVzCPM0i7MRjTz00hJ4/t9EEjBvMhOfVS60gUF/5yOiwt2+WfPLwfMfzNnjk3/+NKNzLhJzJNjdJNn23Akh2KInTFhgBxL6MDdQNnSHQUOBiH41XbeykdDlwUZlls5X3FqhyM9sVSGxZ3ErSLp5opmX2YXqaLK8SPA7XGX50A4Go4Wqa7J+FKwTWF+ScAfOX6hDJuuFYEe5YTKiIAa9BBoAs71SqGZgw9yltIg7KNAD04WCIm3l5pGUK3CpZYWZCvPtK9Anycz7AnKivQzmiZIt3oShgzhLwe4gSTfmwtwEWQEzflGYvO+5VrKifxnMEsM93pShrygzwV4maffmonML8QPM+UNRnnAT5OUSwGCSCHlSTBrGitEH7Ktc8qLRXJAI38Gs3xLjFDeXJO4SwGCkACGmDQ1F6AT2hYfM6AvuxUdONxTmfa8Amfy5+ST1bLEMpjrdGRMHAYaC/VBYbrSMe5zJycrAzC9zvqvccpJ8KQ4jnMzL1MU63XCwsR6yo7XcnSxOlR/mfoST5QzllpH0PSIYLHSqZSbvvJMtABtfQH40m0su6UwPTR4qOlW+d9xaUmDeZwx+cKKWMPs7nWou2KRyKqAJXGoN5/nP9KW4OdHHsdwSUqMfAx+n+Rjmf4QT7QAb4qGIXhw+d5aFFsBh5+kEfhyp8hJ3P7OTXLEAkp3nHHeHlNmTwyTnyAwrcKCzTALfTh30H/c8r1MMsQT+cpIyH7g9pNBq8Qx+cYp9lkCsk2wDX1slNJdDP2d4bQmgg1O0Bf8DKTVbCBeQPf3qwhr81SkucDGF1ELdOGxIv40WQbgzzAQ/jlTrzeGzdAu2CFA3/eqAP0HKrZbCXcyUTkVhFS5Kv/8MtFQPzecwJ52mWQan0+1b8PNJwdkCucRa6XPQMohJr+bgb5CSW3K4kj1dnloGKJlOZw20VxOt57A4PQrAOpyQPl+B30WKLniPS2ydDiMshF/SpWYcF1tGVdQ4kcHzCo7bayHcS4/Cd8F3I3Uv4fCX4x5YCHBJh+3gfyKFZ73NYbijssNK7Oa44eAfFlQZdTLwsryDOlsKOx1WEwY9Se2rOJzzcMxPlsJ9h50wsIxU/w8HL8fctxSQ30GrwJ/JrLyK7zh844icsBYHOWYIDDYi9fdL4VI6OKCPxbDBIQ3eG5hMOriWw+O89m22GM45Insg+D9IC3Nf4+DtYtdVi+GdA1z/BB9cRA+oXgyHzXbFWwyob98G8K8qkS4OSOUw1Y7ysBqX2TUIBgeTPq42EN/V2FTL4Yo99RMM7CCNdD/OIb6uoUOWQ6odJV6Bv5VLJ6hwAAe/vEZeWA6oYyjbKfDhlUgvP43hcDQHVxHW4xwjHifAp7Qi3RyTwuFPN2aiBbHXyB8wOIL0c4UB/MB4WxC3DcyGwe9IR70NYIGtAAsC3FgYPEFaWvCcAUy2EW9FNLA1FAaDi+sJ5TpnAEOJqAKsyIU2RsBgcAnS1bKvDaA70URL4nCafjCYUpf0tesHA+hBeyyJKCJqnmwgsSPp7LAUAykdHloSIKr1EgaHkd5ONWBZNmsYCYPLSHenpFodR2NhcCnp71yrw/B60uHtlsk20uM/LZJfSJPd9lgiPm66RC7bLRDvzKTRmyyP3aTVLr9ZHL9k0ity32dpbCftLmxl/Ez6PcbCCCIN97YwXurYfQsDuTUMVuYg/WpgaWzUr3mWxmX92m9pxOrXXUsDWbUL1mZH3apmcSzVrSkWxyHd2mVxhOnWHYsDuTQr1eroplflYXVu0asZlsc9vfKxPKBXz62PRjpVENbnDJ0aaoHs0qmdFsgtnbpugUCn3lkhzfWpDKzQ7/RpiiVyXp+OWCLQp3fWSFNdqg5rdJECJsyTwmyL5JAUuv6QJR3cfPDBTQbHLJLnUjiD0NoOy3IBwJcyiLdIUFcCOQF8aOYgt8sAcFECn8IqXSuByQCQXN8x/8HmR+Kttkz8JXAhDaKLOWI2bH8hXqBlAg/hCsH2RQe0S2FOCFcW1ulK4WYx2GlXrSTwxUTztlBihLvF4Rt7TsHgFsE+gpU6WrBGMBj7ibHpMPyRWN9bKrcFO2EEpwyVTTa2QayXlgpaC9UcxkcbOQDjCR4iLYC16i/UKTseZuJawd7fBaoOq3W+QINh7wLusF3oIM5xyyUpmzCu4XY9c7NVFfZHFxBlMKxXb2H2wv5Ftg46AGcFyffOgsEoQebAgfHZ0lSAQ72F+DgYlmxHIQbBoTPSrHMM/nFxvuxBsGg7CDAFjg1IE+Ag7He6QuGwbLs53Wg4uhZRRTj8SjnnqvMSFu5o53L5EQ7fRDTHcYjv60yDk2Hp/uRMJa7A8feIzqUD8F9ZZynlC6v3cVdncVmLdC3tFpcuwD+NnKHCPljBFz5zhk9WvUX6jm+CdPfxTK/Ku2EVn++ZXp9sRLp7fZV+wONf+jmu7Pd+sJLDvNo4rskaPzjhlZ3OAODD8e89s9iVp++O+7Ce43xm1LCv2tf7X8BJzzuJzeiA43u3rl22dNnabftPP0yBhR11zef3TauXL1+zZffRO2/gzBHO9P/9bzg6Y+l2xtIfGUoPZ2YoHW2cobTc7V1GUg+6kIGUlI8WZiBdJaqYgfQtEd3OMEotSUQ/ZhhdIiJqkGE0Lw3dzCgqaWNcBtERsv0oY6gJszpD6DKxJRMzgsZwtD8DKCKTgdopGT+LyOiaDJ8H7obcgzN62pLxIRk8e8hOl10ZOpH57aGstzNwUlqT/VVfZ9yMJEf2yrDZSI4dnpgx40WOHpIhs5Ec3/FZxssCSs9iFzJYIjwpnVdlqBz5hNL9sysZJmHjySnHxmaMrM5ETlpodVSGR9yuWuTErgNPZmhcnZKdnL3cmvAMiuhf65OYDVfcTMloCN7RhUR27+Z1NzWj4Ol/XxQhCWZuOH6zr/8LCy8h5PK+RT1LkGRLtBrw9ZLNu/49cfFm0IMnYZHPXrxM++L5s6jI8PDQkEcPg+/dDQr0v33z5o3r169dvXr16pWr12/cvHnr9u07d/wDAgLTBvj7BwQF37l55eLFS5euXL95JzDoblBgQEBAQODdBw8fh4aFR0REPo2MCA996H896O6jkPCIyKhnz1+8ePX6bXRsXFx8fEJiYlJiUnJKcqqxlMSE+KTkVACpKcnJqanJyckpSR8S4t/Hxb179y4mJiYmOjomNiY2NjY2Jjo6Ovrt6zevX718Ex397n1ickpqckpSUlJSYmJS4ocP8e/j4t7FxsbGRL998+b1q5cvXzyLjAgLfRzs7+d3M/B+cPDDx4+fPAl5EhISEhoaGhoSEhLy5MnjR48eBgffvxfo7x/gf+9hcNDta5cvXb567Yaf383bt+/4BwQGBd29d+/+g+Dgh8EPHz16/PhJSEhoaFh4REREZOTTp0+joqKinj6NjAgPefTg7p1r54/+8/uPC7/o0zAr/T97AwBWUDgg5C0AALAUAZ0BKs0BxQE/aarKXbOsv6SpFCtz8C0JTd+K7vsYd8zE/qbJh9ZHJPvrPD63djiIQb/vn/N51PULuMOdLfSv5b/bf8N6ZPn/7//x9rHvP3G/mxP32S/u3F4vp3CmEHhF/F9CPf2/lOiK+vX0zfsH/o/fX29PTV/////+BfoyHYKF9QCqQF9hrH4Atdf0uKQU8NhIymSaR6IbUvs14KktCexy9urekZmcT5Ltg9gn+crF/U4vuzJAF92ZGtUGyOv5NO4Rnvunc7/9CtKF0sEjcux2tNglGBxMo0v9cO31/3U6SqxM9MHsOlwwi7bVaoulFSJfwzcwO8uOp32TsWPYaO5Zvz02k3qxCYMMRW3/vBFMwvVgpL8VhIkNTMtF6d78jDExspwdfRmSdvTkJysbNFSJjZVRQ9os4nU2FPev5NsDyTowhz0FJEdQBJYFtlHCvtRIP88attvp6V5tOnvQMTfn4UH99Tuf8kXf4EaOK55EjVynsdxyieYd1+3nNNJ8LCEarvqRHJmJwzMOpewqKR9pRRur6/AWldbarVAFqzuutuX5IHf+QBGpIjp4kDipkwF6zHFpElzD4BWxkkQjkYyyZWCJwcn7wJBkBTmQdkzV3u2EpuvdItMKz2m+KtqNHK/RZHdMoLkpCKII5UDb1G1RarrnTZfVxX7fAh4RbquoJq1BS91PjtptM9P2pYJnSxjRUO11fJAF77r9GlkTqNI8dfi9z2lByUQpObX4+fw82JkZQX3HxAKehnLwD0DWRVn0jPREKpsopM/wIkBtBK8sGPoBWxddnw1LpOLp7CveCYrYSA2xb7LBu5j0FbhGSb4uzDSkWsA/PCnA9QXY226+75uysYHy2i1peuDnQeDYcusbN7BKTZL4PlImDnFROq+NPBjGjFrJivQLCk1udhBV3eBVSWpVfMEz5rEVVTGmHAHPvGuEhdOQmC5V0ILC6MUWNkE0Cys66KWVqmx8vJ6eL3rGf3inNqlvQpVv/bVaJmNRirffjdi3VYtI535bmP7TGzROCWdpXNiUsdA7zL/X1GZN9/O+iYrjQVBnDLr4l2k4aEkmlx0NrNJubgTK93dzlpDmYZud9/KFJZ5cxYZfmZZTFMJyCu4jB4Dw/u+I9PeNcD95WMcNfRFrUw8MJTlHrL3Lip3cr47ZAG+qFi6JwRER92K+BF/cp6Ef21PyBjfnKZI1j54UcCTdWFosOaJpH8rjuEDuYCtMc1NmDrqGqRujeUpw3NGiJcSQhnO0BT61RTxC35u9s3Ie+Uxq5yORIlq0Xmg0FNwIFvIGgF46QmZkEcUTtaY5ieDo1ZJAGsGbLJ97mrj7PGqjs6eGPnoejVbQvLSggQcDNsN5czVMdwZR/dO3D2MtLFVBNNq2fmLr+GcENEzwaSEZFjS3Nwgk+zMlEf9Rb7PYmbjIEdeqis4eS4DHuMaTzGqVqf/6GCith3S+rlB3Gwl15DDVbAkjQw9xnCJ44N9KCd3s/O7XLnUWcb5i//vPEFvVIIlmWeFEzgWRw5T5Uee7fpmIYzomOzxj8bvjxfsYUFSGzyI3Gdk2fqowJfwAs9Vgqmgzv9627mE/0uJcbQ+X8DLIhVdhE5WtOc9nePfKbLaB89xe+s0NvMs6lCVu/UCteZRfw77V0pZ/luLqb+TyQLUDONqvkK9rEQ1+hG+sEeMFhOu9FCenvE3hsJyN6KFFdvPk4JRjnCRlJwe9HnyVMBxLcooiQY3Klq0OjhDE9QqYzElSGn2NXi15ZeNBFfJgdCC6msEYK7regjOrQmmPuXzBKB9SUEBNBuc5fXzkKSk9nMc22f/JRdK+Tr40a57HseIxt1ptCDaUxFLZWyod/CDsbW+O8q4uswuYN2hl65OVI1gKeFMD2uJSVg/SspkZ0EMHkJs/+RdyI0O9tWTN+cnGAN+et2ZG/Atu00lw82EwhskitroIHYGfE920KX0G+zopAeMRS7donERYUMNDTpMpg3jSoI239Y3ebq/xkjJWoExaAjUCUHEcuB1tTYRlBvKW+RygLvVPVeAqXjwQXq8QnYKqi+GzQamtTAyojhCJ7GfwoKwmBf+kDEvoMQ53q0gpbKbrTH4NbJfA4fDHUOz2Qb+ppQG3YFXN1q0sXAHTHuT9hUeC4vO/i4og0qMzQpZrXkPIMYqqY63i4eApLQDOecIYdr2g9NfimaMavLobWnbiFmlnk5oua3NFSJg3qllwvn7TnyzFBZrygz+j7qbRfLU/aJLeNPRcy/CIqWH8Yv5JiC1r8ok+O7qKODpqHKdnTKJt8zGVRsMHrQllAKe68on+wG4f91yMlL19u2i/CVoQ5F9/P8TEKubfrZWYGLZReIRnVJru89KCVZR1JIAW7pfyfCtrXamUYnto94G1DRyX6+of0kR/S4hHxv3XjH1yMSxC6HuyoeYSaOhOif2hOXOIu7SpJ80BH6CoMajpNOyRLvJZeSuQwKlzBRrkqcClkr99mS6WDxDT/IjhqvW0J/ohW4QKCiYwuwODRKk3WRUc+brJT8si8rOxIX+zCTC02G35OiQbwnkKAb38XDWXBoJxeEf+zGFO+WGXYZmkjHY/n9Cs3ontcXgxnKyhRgwnS5bpIrM/euaT5mMHkhO5UDSNIVYRmO0lXEusCcSbger4kVAgot1ivGTNqARq1p2+tftuVmGJGNXOPoPsK5duEwqfcrei73uK2wJAn4vh0mb50DkR+0wBYWVZ0mxSdQECdCpSIHhZxMjElvNSZ9jUY8F/s2lnF9TrddncyyFY4c2SVHnkvbn/TUpaQcNpLj723HPwPAPl3WTUMxi2g2+S3TvcP+Jin+rrsClVDjY6IXjJ07CCNkQp5llYKQRW+3JBk//2ddeuB8QZeMTP9e2So+orFb++kdQRHj4hrPaA28Wx7x5kjqq+6Fd5/fXO9uNImJdNGu48l3BXLE+grlifQVyxP87UcsGN7YBwAP68zS4FEhHrzhjUyLVQGJxw3yjtQmoqQ1oXz0BL21LBroGkftUNkXVMN03oKy7nbobU0rZAtmS6DmCVzEwZLwPaNKMcGXC7DONNyiVKupC019oEVkpq0OauWmo2AGRKvK47k+rOQVoCNxkF47dMK0WlmyZ/B4WNgqbVsE4hHtNqy3ccY2jVv4qUvBfKrdD6K0CZicLBpWMpizHV7D/fI0WjQ+L/fcMzmywHyAUUPbRhG6qwQPaQg083ses/90zKpUfM0Lx+6x7Mq1gYOMi51HvPh+SSaWNa7Ezb9rwWs9Ni4pCZnw49D5xTux4svFM6Pfw0RSxyca3SKu7BeFuzsdsM8vh6/YX98MhFdaR3mPWOPjAAnzHxy+SC9k+TQYbh03gRAd8fxvPlfhzM7NWItYgASqN/i9PEmWAAsGShQ80ixh2hFsSY2eXNI5e26Q+6GYUfIGPKyUF8N1c+3WUzpgBDxdbpV8NrnhB0EGlTFJ/CkxebnvrcCGHAAFg04y4rJgAS0r2rA3g/69j4Ok88WxvNfWuE0DBKBHE4zKhjU8fW8ekTIyNZNuU8hLLPJtIuXa1XvPLMaZJ3aQRQUuHDz4HBwIXlBS/K+hoK4W9IUWn8s2Sxgpedc0q6WAAAWFUBxikqG4xKtTYi9lb7V7JEToNFXzgtipuaaAy7RwTIVgHguRn/n5ZdxM6QvdW/vd8vERz+rntVXI93s8FKqgmoG7TLtYJjferXpQ29CQRNntXDmexgAAi6jAcIiObPIuZvrQnlzCqEruUrrKfbGntTfL/3LEOIqli72AssvrGlgeACICT6TkTWUU5siJUAgFeaotFiQAB+Jx7IwzAIXdp10JtUcVrmmWm8e5a3GOS+YsE7RF8cfZQ2Ua36pvAp8972I1HKXznMT+LuokeJjytb6f5PlUaCr/+Pf4A//5uc4+qzALQ4JHnX0+niP2npKa/WXpLlErAVZC1gRQsawAnDiOJ4FWr/fwLDOSMvRw4n5tnDUMFhg00iABpyIgfu6io/xICs8f6TGCgTCgAGFrzap0eYYG9S+D8oKOfD4uVxYLC3NzytYYckHUtLKwXD445DCC3uH0WWn6PB12k7lPuV2uoKEB07ASH3cBpaOvn93sKdJ+uTheJ+3QmjRJaETvd1egVtPURuccoMDeX2LC9/H8GyLsg8y4ACwjRRq8ExyAIvNuvRwJ4DEXQSvHxNcGFru9mxQBvFxafO+9jLg2XITDIu0NN+0pcKFaoLHTEbh2ABkkyy9icexfpCnNZ4W1It4uCHdXz6SEJaauDZcmVTD04N1S3bCNrvwMdAH3IDAI3bxn16PrY4ZPpj63SHjnax8MykDZGqnNv0jK76q914P9Qb8H3SdOJJ9SRolWOyt+fpljwHSBdvLLo6iA3I8FAQhqEXTAs1XgAimfONgPCI1jLJmatiRU3U2ZpKwsGWFsVI5xBAcpBtWgh6fmgzjbeIFy/ykF8qOIONm4ACIUkwiZrriMLLaFXhw0C/aZWn39Z29c8D6nKg7bs/zD0cRDRTqr7V8HWXjm8nj7sxwFvskPb0m4Gjw1Btj1c2mwZoUEM9q+QBDoKCqdMP+LfuFMw8apJ+K6r1gRzLklSA6G8/QO1sriuwY2kvv+LO4guuv9Q9sQtTXPbIN2rpk6i1Xg42WdV8xu9rIUDNdjAbrVqRzpG7SN+7sxjitdH0VkTXTckkUT2tQU8trvVizvsnp9Vi8uCg/VAIBGsiu1jh0urp4pxTBxyBYFFysDlSjksE7esCncw1NfDCdtsli/eK/HuUjUT9IiQff88QXFLuTWtdTNyntfEFRmoFXutDskHbOegBn4yL83NFkI7oA2/SFwu8goy/OLHa0p18zbJZ8M+RRbt56DDL2Wp73TRSR8HZHxzAqqUaiDnT4GDSD9owS3rlcmtcN0ejZq/SjB+GCNoMFeJefAwBGB9NGLqt93/UILPmiwZOzzNPx+NxqIIFCJ+l9z651Qat3pq3PS8hW7zpFC3z7nRHdJ3b4zr2MTMlFQIviUmuqlEYDx+HLLgTiWywRqf/004eHxQpy8bEuJaT1LRcH8gnZqrVJ3mNRtciYlVGRWTkgR0geqVfBsPRVKLDW/eQqoVXRoxXZq5tp3/5UAeBEKXsI5ozXEv939ZFM0AMGRpp05M4+F9i2fYsQjb1XUTgZ/kEgegQBQIcsdXjBjeWyJ9RAyaty1KsDR5IR3keLoeyy/wFMc9dsF5ACfjUETS7r+09bSxAU87VwNTXSH1E6yV5P4KLnSIHs/5xclVHgcJyi9AdX1RVY+S79TzCNwgRTHyrbiD0OEY31rT4Q/In0XKv6y8iMt3a5wIbjDNh62IkRCYPp3VmafrzgKNFCSkioRbe65MiQUzWpubCBeHNF8WI247wOevwaPnMqB7Gb/O98YkgLpOOlL2UiWOvafZjTYPjQnHNbH2jqdetax9lRkGQW950AyhpHFelp918XDvygUfbyrXYJc6oQA3+cBCMmcdz+/AKfgJ3m76jQY+djHN23dc6JrROOs6aroaWuYZeqnTfTnDtbggkQJT304V/xRdjyQ7AsJL8An6gka/9+7IqeR6/LABxEcoswnuYACZx1iDWE907mzohOD15g2Vnzu+2c9DvuazGgd+ruAhvxyqK/smLe5OF8zm4aYqIHGxwPmXhN5UfjFN8APYt7cRDB18+uOGQaPV7KUG0rqgb3jUNXD32vyVqYvp1xp7OGEN9VdlUDiZ/U94xEcKxRmsAtODOyKwoOvMB0mYA9AGgyYau+OdLertfA45pcR7i9OoX429NV2260b9nF2xrik37IGDgkBILZSUxP6tW6C+fddI0KVqudBrNl/xihF/gZQQBHdZVWlXRXYr1wRkUH2XcI9INgdF7NEDoPvcv5lRmK1Fy473Gezdb9FZVhuzUREDcRrGQc19ISjvXBetGxj2ut3EBEx2DyfMy2IcBFM/Xje3Z5srar11HRGft+vO64Nvs6iPVLBy/q2lPo93V5MCtzAstgEBMIrPTmbm/Uqqdk8ERcwoYIFUXSJd2UpvLVsRtVKTkOAe82jwVc7++CQeZwzmvwOz0KoWiADTjraYqwavQmpLy4WYIidMm3D7zOV4c7SLWYa4eP/etpbQfezywh2urcp/DEPNtqm0OITt2ywndkqynJdQOmq9TXKOgsLCVUQ8pHhCUzVrQcju7gDpLdcnJltIghPVDaiLj0iaJOoATZfj6r9C1k1HiBpbcLSBAT1zZPw8F1jRASwdWeJnG1+F4UzvWOM+jurK4tnvlP59IlPt08mvEw0o1zLPXXGtLjib1mX5gBP2U3SqVetL1JqkWLaVNHUwf3EBt1OVR9OxiOejwJPoyOxwgLgqVlCIYf8nVszu+A/aQtOB0FWmSHCm+xj/VewqZwQBbp6AfTsGhkTTd1Gx6I6lrDlHeamPbakTcggxczses2wORQljDxT2ADmBLxMOzg8IshkM+gHCAHBRUuSRaGPpR/z6LUNFh5zdp1piszEOhMffPhiMPAbUWggMHBTGlC57xgB4dl5Zbnx4Nl6itX5sNGW9BtU07/UPp5V+7uUSZQe6Ra4Zfy69t4HrzkaHmbF4ZtaDFDhOvStoHZaOX9str9VQSGDIHMMgf00c9PqkFUlRPsgItXkgm7z9fgsM+owNSDmIL/dwW/xhbJQOACXzPHuxUhYq4++TxhfdWWNNCRhsi9jO97nfn09JMGWBbnjsUxzwnhmfrybJbhwr6sGl5BS4rNWhAmMviAVdIk/e9N2pTFMJIaexeYS210GBN690mAk5RIl5LFTvBZSqeqn/Dk4nbydn52aCGXExut2tXvAt+nZnrP5LI7MYVSzDEOBMBdamQNimBkmExd6lQhg2urAaar7ANZSCtVDOBu7VthCF4wsfY3gDLZPaDbXch8TkGh91qa3z3MVP43BUHXlrkgUNgAELlypNVE5ZTCapgTVtUQ0QmBIZ5XRwzyLTiZ+DcEBBpgACe70bdw2sLWi+EGUjUQKCpv9Pvn3GLzzffvvun/dXcdg3qQhal+EryjIrw/NsYGJ2na1bsWyPEbqsF3jqjk2wlYgFH/I0QhLouwpZseVJPydbGGtVglF/DRNSiLZo7BpM0KrQa9Q2lteMJH7Mv9hB0xPLdpZ71Rlf3RVkn2IhKq3QZdaIWfJSoT95cdSVHkHzd94P2IQ1mjK/dEoOh+5A8bKoqGMvPYAuvvtcvWyobI0W9ItR8hNDPk6fuWkB4HoZjc6ihaJnmDaVN51YdivgfyyFbWhe48gR0VsR4eSb+n97CTCQ0RPK3LKzWcSQmHt56hPhRSoalzTxQ1BXnRum+yV9trNsuFhcQDxd9KkoUCcTo8dwlD9JI902u8R3igGSH/n4gvhUKjcDOLP/Cm8ljJk2EJElnX+1eLLnrIVGouXo7HvL19hb3iMD/LezzP3XzpENvSjrZloIaCyEQ9Zx8mn6X8K5z88iLYJCwbEF25clIT40/3XkZcqPVZdjZH5PJIG9T3CHwj5qinyoc2ev4QiJfLYbTD+v4Z0AEKHUiwVii3w9rLgbNz9tRggwKysjsxPX1YaHprhF9MHhyxL0Bkgv3tZRzvqX6T4RdAV/mZLS0ZquyI3Sk/mtrdvRC7RxvZpUL37iof8/7nXbNIWzkqmhMlWK4zTp8TmDrnei+cvyWeTnUN1G2YXmxZyJsQTeRO3HByDFW6H87VBXmfDKkqbyWOPJuFj5IxX1madyrJddowLvrUehItzS41VlQTQiskGLjuOoq5XG4fNL9xxg+8dCdztyKCGodxI3WQda2lsW468mTxA3wq0bDAPnOXqiyTNNbrZ5CpBXQftSTPZFY02D2hWdqaPYpN0WjM7dqOng6x6shW0Z7u3xrVORzmqVNpMECcixLrSbgjy1KwizNN/AB7URRTJeznKoS7zSdssHMz1J9wGwm4W3c2XuAjhKedWe3hE5ODCxNqXkzskiSoXognNyf48L2/VMJQK/XRX/0QGu+y23jdrdUs4nqapZv1b7noP9FpQb2fBXdwkM0SqhTSMFJZ6RnO2DZOd/DYqhGsVyl+nK2R6SI6o7WZe+5kIpoNp2d8fzQ+u+YURqDJBoP/5BnZDvDn1DjGrOjPY12bzU+A/ZCzfEmHL3gAqcDPgPDjGiwEPl1Ve/sF3wlsIQcoa+ZRpt6F3vWnzsD9ysi5DU/XBGAehqZoVH6t2Ho1EBgV54AAuLWSVZRs67BXF2eKjgBhFm3avTbX9ct4WIzOxkMJTnogbk4wQAXfGNfRIGlCpITMVrJZ4WMaVobfJdgjDWRzcvbTLAiGRgzoPsqcHlUZhjiw05sXW2l0fTKCFF8fRX7/Q+cs9nmVK/c+LuQjyRSfNpUegFKyulz9iRr37X2QzG2WVF6mpn09nEj0qcFRaKIYC7RJOC9tyQ8yHcNPkKkLA+R5td5mTBLxpa4abl526wKDNIh0NJrApyTNstNWbN/cZyZrQS+BxigbrShaLBtJfj669c+e4+UJ3UQTZJipOtxxQxLBLvqM7pCog8qYd4+VGKqKJtMDBPOoW1N+nDxZWkfhRts+uCf47rmQ1gKZvxKdEsNXoFoQbRhy87jlsl/jxsnVm5A4FKLbHhymu6eVmsd5r1zd6C4+c+TGFf9u/MKhhWBaXTaO5RkNdmWUVi2O1YWsmna1vSUNDZoZzCC8qCfzHJCw7fjlvqYrS965Q3nfhxMjfIZbjoDRHUkLL4ctyoz0ZiY5kQ+6jXl4LVF+SBpeYOXnSZuN5xw2AO0IRN0zPDw8/ipeuNAHdjmzvEKgvayerZgGT4L13H7VFULpSTm1SQs6WbCfxMklOXKnYgxjmO+byqnyE/5nFOvb2OCWtrX2CZWY5TByIv6w7q6jaqE2PX88mlWISnade65M1w5FnvKUogJHTdtY/zhgczjN5tXOH2bPsn8D7MES0xFrDM4k25O/oaTMCmAFGvHqo79WGNgdRQXcuqtiC0bIN1rzovSLOvJOAOw/rSopDS5xZNQmTtwlNjzYVJL1ePTMTPFrIXNTSx1gx1sxpeDyVuwJQ3UQNQqVgBZMGIOBsvGU4qWunXoelGP8kX4lLmiru/JaHIA05pwnKkc+/wtQRL3fiSikNx07ANtaZYEE77FgTuHcMaGXEka7OD+CGHy6nF0fp8/dIJD0g7Fa3eHE2I0sVjcaWk/aKwLuqWxckceJY8Idbm5Rpss7fAHuzppTL6IK+F5wmyOD75LK+S1p1n4LwupVwnENztzUUjfpcSrSeaHcGOW6YglPu+/QGWPZLwye+9cToRg+b7wqgd+l/mb2xljT2fZNh53jDDK/ScrTrc3ilRL70iyrP0sPliqLG5D9lZZaSXSKyI8Cq90cI5W3QtVv/v+/FFCULPjLL9FAg/Q2cwJG/6j2xGn0v/ofqs2qSGlYj1/J3ocquGMk1NYg1xJD/VMd9g2ANsDpTkxivLm00wcslLSHl1B6ZGPl95oEzX6aqSATbs6pd8h72yTeZrHoYG4QvzA71rGOe0ecoCzGrAQa6ZaudTKYAGG3UPT877sa0PPBkXVc1k7IhCgRxKA/53jFfZTGwMwxHtjoW+00A7QU/SgK1aPgnPe+l2tUvNl6jfylVRh7XjRiZWslgk5NP/2bQkaysvpthekZFgkNfteUdyZ1is4tP4YnhpXMqEwOImvWj/ZFDx4kErLzopePzHpIgHLq8hQ2MLQfEQTVnpZZa6hWS/qD47AjHm7esp5KFVM3tjS9vKxsEnvP5DCEfNsavshYz0AwmL/eqbnFsS4FL4lmzuxmaP71eXKIsHYwwyeO/4N5AS6ug2IR75Gy6sp3eNaKnQqpefcJlj1yq9nDA9ZUqMnuJSzsZuRmTIheFNBdACkTP59ytMWj2rpn6BAKdSoT1Wm/RQIhX3gsWBVsyOBczXD4aeZatPerOf46PsK9H/QAWdqziF/k/5vyFUMUkDFr2rPBhbP2X3wtgrJqFhbYH+OxuZv4EA+ZM88ape17j52w8RZuZvbPKNO+A23KJmUufpLarkECM0q7aDjTR8kkOl/UujpFyqCpPYcyKEa7O66tQQLRdQ14rm8eEfyqM/Tigb45hVKEl3M0SyRF8xemfPjWW9/rSEEFfFbUv02PBtaJ3Cruka+qzC78b3yjEA+DxXERFwK6m1ppCti/bb4hrPRdIAt3rH5vTEq3rgQTPM29UCmf34nnWuuIUbhKWgmZcZZM4RC9HCiwlKa17Olyq0Q9e+kEjom33Yog47E3LNUTnT117i2YbC5KM+nE9fA4zgvcL4oFKeTPfKBeOWGjBEHOkCQO2gmaaKWnj4rM49kchR1l/Gza1VnQkmN6lDFIh8QPs9lsqfrUx05zeU2wrAx38Xv7IaIURlTXUTGbSl80UZZEkyJaBdAZ7WYY1D8mjYgN8fletlhx7+cORG3TVE+asWlp8uR90/NlHjRVNmWwciNyr49NlmMhrn5jlVav4EC00FW3qJ70RIEE6o5c2fjvBAJW0CsoDme8jwqAFzuysrwYVhsIdLeb0aX15cAisDtpqlZ9kQMYXPa3vxJAXXMo2DLCeR4B1ba4FeOPaP5cPARwUb8LSaKGm2gF8XCjMSD/j1z1nzP84cFsxFwglrYyBEFOyABvwh3dMAloY39o3d0PAIcJlbovmXYhL/zi7nPmTAZgV3Nf/eaXgJKVWNuYXWVD37KOOkuFxRwAz6gjHN8yD6oJNOvtQoYK6Bzy5behq33JIkqweweX1VrMoHir0g8fyArULKm1NZehoxChzcFZF6pYE5XbkwmshoD3XJBZwAcgot3npn00Ru3W1zYxy9Gg+88GC8Bubzm/jNZgM1NXm1B1tfqoUHk6Pat6oxTCz7IGObXnuIgW/Q9h/ToTuTD6eKeP04+qPgkXiFG11YGrPxQtP6s0sSyHMoxwfXZg4OWXTlbrMoWeOUZeCWW82vgHP7tjPOR42p+Ej9Tc1rs19PZunnIi30e9t7yglrjFz5lYtqilccCHxNDUlWxMRZejmF/DxdYAkJytgnDwT5zdqN/PSp4kiTTaG72Juq1/kUYJ6i8mGlkewEvFHlJbtGBeX/5uwqNBVZ0ErQ+qND/MnJ+dbkS4rM9GwUZaEa16q8DhiBt8tW1c2HEGY+9ZOcLMrAwoRGL3O+VoYPyfybIFJTWKs1JXcGJELR9+NcEsafSyY7LxyX8yGjxE/M2Ukp5If2K0sLZEInxI6vGvWAsB8Ld/32Fs2XGZ9JlaY1HjUuyAbKTadtncn7AzoM49IcuEiUgufCQywhqPfCpCc4PbHtJjrVCGCPsy9SF4g/BszCgeXnboxePyggNmh9hqKEJBKzLmo/kNCtguBBD9PhMFdApaVobkQFHNIRcn3OKNRFYh04mbRz7rEA7ZY4mlLaftgx5hr4GbSrQds93w39wnAa5IiL+EOb2xUm9s89TsMOZhDW6Pc2LWZ94O1IWFwZelkFjHXqqEmbEVzUqZE32gpbOQpuuK+wfW/c1GYbt/YHfLWMm06ATsDSuIR6R8hfG/xOGCipyEdQjVWOtiWCACt+NrC7P3KWQAwi8Ohx4H5qF7b6dRQuefiLdKYUbUu9ti1mc/YIsKOdWgRoeCTYcq0VNy0VLiiGaaHKni+2r13FhFVQaZqHHQZfschwyLtXmCZ+Y4OC5HDv3znsVZ1oFScAICAB72YMQ9AFMcFt2ZpI6xSRDuGgI0CBlZdAiv4MlMBaYkn0iIp5nd0P/mJLdaPOiH97+t0ym+R3KXSaV1dqAZlfPCzq14CV30xBJzLyTnD81nXFukyIy1OwyT7cHm0AdnyV2xiODS7S5dhR6m+cnZXynkgbqiEhsAgKYqQbyp1CnHrbFezQqqrEw5q2VMn6lVGdJ/ZiAtr6Ntj38Wt1/B8xPYoM9wWGA+NcuivFXN5wtdq8qPbSLoNN+QLt/twzs2499kffkdtgerENDbmIKNp7WdEKCZOQ8sSCxJJfcYYz09zX4rBDlqvVsilyegUESQNnOZTmRf9mGCyWeDaOj5jrxujsaAhmZAWlQCzWy6fbUWz/lsvvxuQilsFVORSs2Hv9nWiA5G5ARRk+V8VVjdzSCbCAHOh/wEKbbxd+MGDrTGyuCBrp+fSpuKfw8+p48l8XKSxZFVmt82+1yC+/w2bgOONcUtYSwUo7Dho6DVC7u+k14+amirE4asvpI3eJbfVoqd4NePNwnZ4/9YASUvb7xQfdkT4Y2/IYCu7sZiChlPz1mQcpQg8SDJM017iLuIHRZU9TzZqmMW1DnfKjhXR7Q4XPkVNrZcgcdwGOsGt8vzKCxFXbVYDfbGMnVH+WncHM9AGqEJmz5jbJOqAVMO5J37zONoCcQgpgF3vr6KLKdJGL86su9phMD4S0mjoYdIPxynwQADPIMU2sVyRySbOJuzZFSymVlaIktxtDH6SVN7SKXNDWM9pSaLb1Gun+Ux8nCtGV/w4WCozUY4BovFu4XJlLHox8xriFM5gz+Gmc/GJ4pCvhu0rzIZnBcx60lvkw11Yk23jf6pHiMsJNgL66hJGlLWFf73JI/Pyrn+nrIrlca+qL/QQkeb64MVi1DuKwbblKY7+qJbcac5sbXL/Vuv2O6zeqvOcXhbaifGDATBvKjL276NCZ4BuNMBlgn6nt3BLdWNaA5JipN/t+R8MJ/6mVHcFAck3EWnDslqB+2tPByAE1YASGMAAV72Q+BUM5bItGXOWC3wDSAUU87R0y8Dv1MpJSx1CsLBhUaLwdVYPfRG6bQVMxJb+r2BvGLxF9kHeVqSbnee0GmPkkRKxgoV2/egAJfugoNgQNtWQgEje7ILG020gkNUjzN8UGbi10kodKxDh92R0FbQz0h7zW9PdV6bLl/2btpAKWj2/PC4VklHKPQflnUG7nfwyuRd+xVJcE37vKAZuP3kEBkl/U0k6rxu3HvsdZ/3Z3GZtUjvG0o3zrTQVdNOEdVrxQ4onFzeUUu8v8C3RVEmAqQCZ1kqLpPXTh3K4GPhY1jXP9esoZFO/zViuzqm2gODOBFg02I9Kye3MjlLkHKmMfK5tfeTHVoQ41fea0+JLUU1sG3HieFM+W+PHLxbwS2/dxrNMkNwxFY/uWK12JOd+qMARzEyjvWiinG0RiNbDyjAJD1x33yp2993XlB3DL5y9xmrngKPH4vUWExznYaPeMqUlAkcmE0vLlKikDZhysg5V2oD9h/oy2z8eoZCySIOczitCX9bHEfDsjT1SU8nPRbyMzC6wk3GlChlmSSpSpy7lxD1n33LWcodEcxCMA0jBWlxJwwjb6HpGMnjlDzb7xY8Uj7SzcrggrsVYPhT3Y0HzRLqISimFWaweXLNcFppPHmwqNmOMz4+AWBfn4G+3ww9O/WiosWo+Y6+4mHmA/6eeNjzlxajFjm3QR+v0jMLmnWdWyrUz/Ehnt3zgeq0SERdWY9VVkyzw4tpIly82eH+pvjBvYBO7JpwlO8Y9FtzSHiAGYUrikssSb8xYM4vBb9S35F/LuvxtKbEIxqhNjtk7Dt5pI57RSBvyKv/8iKLogHctl+XoRuup14V2yJFVNdr3GSkrVRUCRL/VX7GK2hN8UxfhSgwAbYUABCuT39IhfGd1aax1hE77AZz0UCNwsSK12S3MgczwJB0f1eQK2wwJkNLgrCXiDgj0mGrFTPXq14PIfd7a2oLOviSTroCcF5b2gCzpDqpCoxU4SZkGmadHgfejw8d/x7TVgJKKdtWCq0KphT0XeklMEBBBqEYQjlo3O9W0pVzGgtng9cuN6DEMIn3gJLZK3PIlnZsy8LU/CN9nK/L8n2EfDf/gRHhl/wgYrhFyafNgR6paxiYgUCSpLGAhZNGRYTDxWqlOGZ5gSjGDz2zEohdeL2yTMaax8MA0/S8k8OkO+C1FOVdqn2LD5HgHVgsWIRchNnDPKfR1lGpl38b6JJg5JZMJMtQyiZm8XWZ9F1OlsYFFfGZ3LRUgT9y3rU7th7jc/h/eL7bdV1YrqPL7e6DMnGz5hr2KvrQDZguKD0c2089x0DNG0Jq6Qz/04/512JTk69iJj1W8AfTX13KfjKmTRpc8wODlmv7l0nt4gVyXFFYqROTkPqFwQ0JeWLFUb2TamOdKETbNLMuf66rsfzEjSQZ1ytoopED/9HzkhP+YHknkQrTSsUFVhdGNLo4rm2kIKr8IzN2sFk8t1dAkJLqTrA8ZGrE4pd0h7HNFoN4foGnhaGqaoyQYx9STrsYjSj5B6BQ81D6Cm6y95PTA/mh78ZvKyHEBqctLlnfuFUQn0Mi98JxMDq0fBplzbmAYE/bZ1yWOukKAwZQbjSLPYaZ0cDGVC5T+fhyxRp+P4NUhozfZJh2jrCof2OAboHkID96rztikrvzhxu8QebPIbD5qPUglXyZCu80g37nGpPk02gHSkqDQ1MxCMQEuLHBxQI8aBZqvfAcThEIPoWLgRP94wRZizGckcEoEScxxs4s8n9SSYSXFqVKwcC7Rz0gQEaQfmyrTvtCtO/tM+I3Po4FpmtHH6v1O0cLnJwo+iltNQDJjl2QBG+fEhswFbGzWQEMPpvbWEBqjT1DH786F5UoqcBivj0VTiSJiNB3pbnLrL+pIqOsdAmlig+vNmE6bVlbOHZfUytkCdAQzssxvEHppWhwE5EfRZEZ8rEWsVWlASqjmS4r6dn8//8ftkSNT8+RS9m8AR0ySxWonW1PoEWDPexKi9xQqbq3wzy/4LRUOnMCBU6uOEMuI0Q8vmPVZrkXsvHq3Yzxx2bUMru4Khwy1FssIqv0Db9neepGm8K/mBEmC+ihd9ur+nTcb5KqB5vcKJbCQD/U5KZR3R7iV5u4Kwplud+HxJll3qVCKsp0Z7JY7YqsMnEk5Odj8iNNfmEB06kCj8cUJoJL92dxWJJdirAA/V6SMcBUnPBrF6rRmvSOyTzMtf4qMLa88oblGE90pSNdcDn7CUhsRQkdiGtzVV4T9U+eLbiFZqoJR8PNPnvsyN5uwxTPJaDdAFEX9QTPACucLnNnWFd7cV1bIVYgpJog4gw/7pS1tP0EQf1Bj/Y9jfKeMv76lR6QC3XqkFy7AaaR7xv72ife3Eo9isVuSGCpHs8321i/WgVJFK8iM2cmxUpe5CK9nFu2WjrHma84vR8ki6j2oKDq/sceNAvco2kalYj1440XF9tyWQLBYVPx1Td+FCn6y17h5VSn5AAcP1aoVFk9u1UL+2rH/MFb1uRcSnPn1UJwEE2loCFeYI8lVagoFpoNvZbmOnlRcUbjfSefFNIs1+zXix1PHFezuPLgJYIW6VffWp07CME6yPwgl3qYSCHwBfDg6ynP72KTL8+uuu03uA234MJhkIKM0RPz1GO1s/o4eug/Hy7/N1n4bBiaTDGalEsLwjza2lYthMNIL4qWX54sXKbc2VpTjKHg8wHDWb5QWsjQbQvdU1PLgt29lmT79SelQc7ULmx9pyVIWRKw7ygHeGXbbH0FzuS+ExjSp3yp0FNlMFNyCOOuvhUOv11u6jrISd3mBEaFbOKOYPz8Nh3WkghBPKfLbmcYsXJ6peblSytiloB9bwVjE6RLGpFQ706+yTqQqixZH3EMfplztnOvAMQYZj6ZYbqTbTkuZ0wjGAicDIa3zGvwCBsD+83tDeugRqqEGRABJOk4hwjSdTY4mvUE1E4r5UrG9+bMkkcHGbXADKANGsKCkS3xO9FvAAAAAAAAAAw6gAAAA==";
