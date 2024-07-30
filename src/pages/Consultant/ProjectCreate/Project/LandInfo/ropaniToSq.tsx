export function ropaniToSq(
  ropani: number,
  aana: number,
  paisa: number,
  daam: number
) {
  const oneRopani = 508.7328130806392;
  const oneAana = 31.79580081753995; //  one biggha = 20 kattha
  const onePaisa = 7.94871794871795; //  one aana = 4 paisa
  const oneDaam = 1.9871794871794874;

  const sqmFrmRop = ropani * oneRopani;
  const sqmFrmAana = aana * oneAana;
  const sqmFrmPaisa = paisa * onePaisa;
  const sqmFrmDaam = daam * oneDaam;
  const total = sqmFrmRop + sqmFrmAana + sqmFrmPaisa + sqmFrmDaam;

  return Math.round((total + Number.EPSILON) * 100) / 100;
}
