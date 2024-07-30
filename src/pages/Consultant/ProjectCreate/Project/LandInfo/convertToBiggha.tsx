import React from "react";

export function convertToBiggha(
  setBiggha: React.Dispatch<
    React.SetStateAction<{ biggha: number; kattha: number; dhur: number }>
  >,
  sqm: number
) {
  const oneBiggha = 6772.575250836121;
  const oneKattha = 20; //  one biggha = 20 kattha
  const oneDhur = 20; //  one aana = 4 paisa

  if (!sqm) {
    setBiggha({ biggha: 0, kattha: 0, dhur: 0 });
  } else {
    const ropaniWithDecimal = sqm / oneBiggha;

    const biggha = Math.trunc(ropaniWithDecimal);

    const leftoverBiggha = ropaniWithDecimal - biggha;

    const aanaWithDecimal = leftoverBiggha * oneKattha;

    const kattha = Math.trunc(aanaWithDecimal);

    const leftoverKattha = aanaWithDecimal - kattha;

    const dhur =
      Math.round((leftoverKattha * oneDhur + Number.EPSILON) * 100) / 100;

    setBiggha({ biggha, kattha, dhur });
  }
}
