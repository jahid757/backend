export function moneyFormatter(x) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
      });

    return formatter.format(x);
}

export function moneyNoFormat(x) {
  return "£" + x;
}

export function remove00ForCurrency(number) {
  if (number.split(".")[1] == "00") {
    console.log(true);
    return number.slice(0, -3);
  }

  return number;
};