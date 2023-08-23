export function calculateTax(amt, per = 3) {
  const tax = ((+amt) / 100) * per;
  return +tax.toFixed(2);
}
export function myParseFloat(num, prec = 2) {
  return +parseFloat(num).toFixed(prec);
}
