// /* Converting English number to Devangari (js) */
// var amount_np = amount.toString().replace(/[0123456789]/g, function (s) {
//   return devanagariDigits[s];
// });

// // console.log(amount_np); // Output: ९८५७

// /* Converting Devanagari number to English (js) */
// var amount_en = amount_np.replace(/[०१२३४५६७८९]/g, function (s) {
//   return englishDigits[s];
// });

// console.log(amount_en);

const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/* Converting English number to Devangari (js) */

const ConvertToNepali = (number) => {
  const amount_np = number.toString().replace(/[0123456789]/g, function (s) {
    return devanagariDigits[parseInt(s)];
  });

  return amount_np;
};

console.log(ConvertToNepali(1212321312323432));
