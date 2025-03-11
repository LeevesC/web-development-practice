export async function convertCurrency(from, to, amount) {
  const res = await fetch(
    `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
  );
  const data = await res.json();
  const convertedAmount = (amount * data.rates[to]).toFixed(2);
  return convertedAmount;
}
