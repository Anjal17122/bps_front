import React from "react";

export function convertToRopani(
  setRopani: React.Dispatch<
    React.SetStateAction<{
      ropani: number;
      aana: number;
      paisa: number;
      daam: number;
    }>
  >,
  sqm: number
) {
  const oneRopani = 508.7328130806392;
  const oneAana = 16; //  one ropani = 16 aana
  const onePaisa = 4; //  one aana = 4 paisa
  const oneDaam = 4; //  one paisa = 4 Daam

  if (!sqm) {
    setRopani({ ropani: 0, aana: 0, paisa: 0, daam: 0 });
  } else {
    const ropaniWithDecimal = sqm / oneRopani;

    const ropani = Math.trunc(ropaniWithDecimal);

    const leftoverRopani = ropaniWithDecimal - ropani;

    const aanaWithDecimal = leftoverRopani * oneAana;

    const aana = Math.trunc(aanaWithDecimal);

    const leftoverAana = aanaWithDecimal - aana;

    const paisaWithDecimal = leftoverAana * onePaisa;

    const paisa = Math.trunc(paisaWithDecimal);

    const leftoverPaisa = paisaWithDecimal - paisa;

    const daam =
      Math.round((leftoverPaisa * oneDaam + Number.EPSILON) * 100) / 100;

    setRopani({ ropani, aana, paisa, daam });
  }
}
