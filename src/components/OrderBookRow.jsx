function OrderBookRow({ price, amount, type }) {
  const priceColor = type === "buy" ? "text-lime-400" : "text-red-400";

  return (
    <div className="font-data grid grid-cols-2 py-2 text-sm">
      <span className={priceColor}>{price}</span>

      <span className="text-right text-neutral-300">{amount}</span>
    </div>
  );
}

export default OrderBookRow;
