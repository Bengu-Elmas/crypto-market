import { Link } from "react-router";
function TrendCoinCard({ name, symbol, price, change, image }) {
  return (
    <Link
      to={`/coin/${symbol.toLowerCase()}`}
      className="block rounded-2xl bg-neutral-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-[0_8px_24px_rgba(56,189,248,0.08)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-neutral-800 font-medium text-lime-400">
              {image ? (
                <img
                  src={image}
                  alt={`${name} logosu`}
                  className="h-full w-full object-cover"
                />
              ) : (
                name.charAt(0)
              )}
            </div>

            <div>
              <p className="font-semibold text-neutral-100">{name}</p>
              <p className="mt-1 text-sm text-neutral-400">{symbol}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="font-data font-semibold text-neutral-100">{price}</p>
          <p
            className={`font-data mt-1 text-sm font-medium ${
              change >= 0 ? "text-lime-400" : "text-red-400"
            }`}
          >
            {change}%
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TrendCoinCard;
