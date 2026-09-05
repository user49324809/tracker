const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 2,
});

export const formatMoney = (amount) => `${moneyFormatter.format(Number(amount) || 0)} ₽`;
