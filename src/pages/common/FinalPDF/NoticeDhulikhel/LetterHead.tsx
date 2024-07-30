import React from "react";
import { municipalityDetails } from "../../../../constants/constants";
import { Image, Text, View } from "@react-pdf/renderer";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import DhulikhelLogo from "../../../../Assets/Images/dhulikhel_logo_png.png";

export function LetterHead() {
  return (
    <View
      style={{
        width: "100%",
        paddingBottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 25,
        paddingRight: 35,
      }}
    >
      <View>
        <Image
          src={GovLogo}
          style={{
            width: 80,
            height: "auto",
          }}
        />
      </View>
      <View
        style={{
          color: "red",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            width: 350,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {municipalityDetails.letterheadTitle}
        </Text>
        <Text
          style={{
            width: 350,
            textAlign: "center",
            fontSize: 16,
            marginLeft: -5,
          }}
        >
          {municipalityDetails.letterheadType}
        </Text>
        <Text
          style={{
            width: 350,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {municipalityDetails.letterheadAddress1}
        </Text>
        <Text
          style={{
            width: 350,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {municipalityDetails.letterheadAddress2}
        </Text>
      </View>
      <View
        style={{
          width: 80,
        }}
      >
        <Image
          src={municipalityDetails.landingPageImage}
          style={{
            width: 80,
            height: "auto",
          }}
        />
      </View>
      {municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक" ? (
        <View style={{ width: 60, paddingRight: 40, paddingTop: 5 }}>
          <Image src={DhulikhelLogo} style={{ width: 60, height: 70 }} />
        </View>
      ) : null}
    </View>
  );
}
