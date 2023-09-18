export default function formatCurrency(numericValue: number) {
  if (!isNaN(numericValue)) {
    const formattedValue = numericValue.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formattedValue;
  } else {
    return numericValue;
  }
}
