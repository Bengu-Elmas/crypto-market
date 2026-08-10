function MarketMoverCard({ title, coins, type }) {
  const isGainer = type === "gainer";

  return (
    <div className="rounded-2xl bg-neutral-900 p-5">
      <div className="flex items-center gap-3">
        <img
          src={isGainer ? "/high-symbol.svg" : "/low-symbol.svg"}
          alt=""
          aria-hidden="true"
          className="h-7 w-7"
        />

        <h3
          className={`text-lg font-semibold ${
            isGainer ? "text-lime-400" : "text-red-400"
          }`}
        >
          {title}
        </h3>
      </div>

      <div className="mt-4 space-y-3">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex items-center justify-between rounded-xl bg-neutral-950 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={coin.image}
                alt={`${coin.name} logosu`}
                className="h-8 w-8 shrink-0 object-contain"
              />

              <div className="min-w-0">
                <p className="truncate text-sm text-neutral-100">{coin.name}</p>

                <p className="font-data text-xs text-neutral-500">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>

            <span
              className={`font-data text-sm ${
                isGainer ? "text-lime-400" : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_24h > 0 ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketMoverCard;
