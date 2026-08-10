function MiniSparkline({ prices }) {
  if (!prices || prices.length < 2) {
    return <span className="text-neutral-600">—</span>;
  }

  const width = 120;
  const height = 36;
  const padding = 2;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const priceRange = maxPrice - minPrice || 1;

  const points = prices
    .map((price, index) => {
      const x = padding + (index / (prices.length - 1)) * (width - padding * 2);

      const y =
        height -
        padding -
        ((price - minPrice) / priceRange) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const isPositive = prices[prices.length - 1] >= prices[0];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-9 w-28"
      aria-label="7 günlük fiyat trendi"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isPositive ? "text-lime-400" : "text-red-400"}
      />
    </svg>
  );
}

export default MiniSparkline;
