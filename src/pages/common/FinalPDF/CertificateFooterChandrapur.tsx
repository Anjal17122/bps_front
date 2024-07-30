import { Text, View } from "@react-pdf/renderer";

export function CertificateFooterChandrapur() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
      }}
    >
      {/* <View
              style={{
                width: "100%",
                paddingTop: 5,
                justifyContent: "flex-start",
                paddingLeft: 50,
                paddingRight: 40,
              }}
            >
              <Text>
                पास भएको नक्शा विपरित कार्य गरेमा वा यसमा उल्लेखित शर्तहरुको बिर्खिलाप
                अन्य कुनै कार्य गरेमा प्रचलित कानुन बमोजिम कारवाही भएमा मलाई मान्य
                हुनेछ भनि सहिछाप गर्ने ।
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
            </View> */}
      <View>
        <Text></Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 50,
          paddingRight: 40,
        }}
      >
        <Text>
          {window.globalConfig.name} कार्यालय राजस्व शाखाबाट यसमा उल्लेखित
          निवेदक श्री श्रीमती् सुश्री बाट नक्शा पास धरौटीवापात घरको वर्ग फिटको
          रु र मिति बाट स धन्यवाद प्राप्त भयो ।
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 35,
          paddingLeft: 50,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>..............................</Text>
          <Text style={{ width: 140 }}> सिफारिश गर्ने:</Text>
        </View>
        {/* <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text>.....................</Text>
              <Text style={{ width: 140 }}>चेक गर्ने</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text>.....................</Text>
              <Text style={{ width: 140 }}>सिफारिश गर्ने</Text>
            </View> */}
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>स्वीकृत गर्ने:</Text>
        </View>
      </View>
    </View>
  );
}
