export default function formatMoney(value) {
  const options = {
    // style: 'currency',
    // currency: currencyCode,
    minimumFractionDigits: 0,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (value % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('es', options);
  const formatted = formatter.format(value);
  return `$${formatted}`;
}
