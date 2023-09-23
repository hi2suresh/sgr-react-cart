export const getTotals = (cart) => {
  let totalAmount = 0;
  let total = 0;

  for (let item of cart.values()) {
    const { amount, price } = item;
    totalAmount += amount;
    total += parseFloat(price) * amount;
  }
  return { totalAmount, total };
};
