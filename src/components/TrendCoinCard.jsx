import { Link } from "react-router";

function formatPrice(price) {
  if (price == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
}

function TrendCoinCard({ name, symbol, price, change, image }) {
  const coinSlug =
    symbol?.toLowerCase() ||
    name?.toLowerCase().replace(/\s+/g, "-") ||
    "unknown";

  const formattedChange = Number(change?.toFixed(2));

  return (
    <Link
      to={`/coin/${coinSlug}`}
      className="block rounded-2xl bg-neutral-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-[0_8px_24px_rgba(56,189,248,0.08)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-lime-400">
            {image ? (
              <img
                src={image}
                alt={`${name} logosu`}
                className="h-full w-full object-cover"
              />
            ) : (
              (name?.charAt(0) ?? "?")
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-neutral-100">{name}</p>

            <p className="mt-1 text-sm text-neutral-400">
              {symbol?.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-data font-semibold text-neutral-100">
            {formatPrice(price)}
          </p>

          <p
            className={`font-data mt-1 text-sm font-medium ${
              formattedChange > 0
                ? "text-lime-400"
                : formattedChange < 0
                  ? "text-red-400"
                  : "text-neutral-400"
            }`}
          >
            {formattedChange > 0 ? "+" : ""}
            {formattedChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TrendCoinCard;
