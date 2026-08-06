function TradeRow({ price, amount, time, side }) {
  const priceColor = side === "buy" ? "text-lime-400" : "text-red-400";

  return (
    <div className="font-data grid grid-cols-3 py-2 text-sm">
      <span className={priceColor}>{price}</span>
      <span className="text-center text-neutral-100">{amount}</span>
      <span className="text-right text-neutral-100">{time}</span>
    </div>
  );
}

export default TradeRow;
