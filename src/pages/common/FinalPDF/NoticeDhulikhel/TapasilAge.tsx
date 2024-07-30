import React from "react";
import { Text, View } from "@react-pdf/renderer";

export function TapasilAge({}) {
  return (
    <View
      style={{
        paddingTop: "10px",
        width: "100%",
        justifyContent: "flex-start",
        paddingLeft: 70,
      }}
    >
      <Text
        style={{
          paddingBottom: 0,
        }}
      >
        तपसिल :
      </Text>
      <Text
        style={{
          paddingTop: 10,
        }}
      >
        १. धु.न.पा ............... बस्ने वर्ष ............ को
        .......................................................................
      </Text>
      <Text
        style={{
          paddingTop: 20,
        }}
      >
        २. धु.न.पा ............... बस्ने वर्ष ............ को
        .......................................................................
      </Text>
      <Text
        style={{
          paddingTop: 20,
        }}
      >
        ३. धु.न.पा ............... बस्ने वर्ष ............ को
        .......................................................................
      </Text>
      <Text
        style={{
          paddingTop: 20,
        }}
      >
        ४. धु.न.पा ............... बस्ने वर्ष ............ को
        .......................................................................
      </Text>
    </View>
  );
}
