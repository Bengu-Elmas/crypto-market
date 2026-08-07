import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getMarketCoins } from "../services/coinGeckoService.js";

import TextType from "../components/TextType.jsx";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
}

function formatMarketCap(marketCap) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(marketCap);
}

function Markets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState([]);

  const filteredCoins = coins.filter((coin) => {
    const query = searchTerm.toLowerCase();

    return (
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    async function loadMarketCoins() {
      console.log("[Markets] Coin verileri isteniyor.");

      try {
        const data = await getMarketCoins();

        console.log("[Markets] Coin verileri başarıyla alındı:", data.length);

        setCoins(data);
      } catch (error) {
        console.error("[Markets] Coin verileri alınırken hata oluştu:", error);
      }
    }

    loadMarketCoins();
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      console.log("[Markets] Coin state'i güncellendi:", coins.length, "coin");
    }
  }, [coins]);

  return (
    <section>
      <div>
        <p className="mb-3 text-sm font-medium text-lime-400">
          Kripto Piyasası
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
          <TextType
            text="PİYASALARI KEŞFET"
            as="span"
            typingSpeed={60}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-lime-400"
          />
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-neutral-400">
          Kripto paraları fiyat, günlük değişim ve piyasa değerlerine göre
          incele.
        </p>
      </div>

      <div className="mt-8">
        <div className="relative">
          <img
            src="/search-icon.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 object-contain drop-shadow-[0_0_5px_rgba(163,230,53,0.55)]"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Coin ara... BTC, ETH, SOL"
            className="w-full rounded-2xl bg-neutral-900 py-4 pr-5 pl-16 text-lime-400 caret-lime-300 outline-none placeholder:text-neutral-500 focus:bg-neutral-800 focus:shadow-[0_0_24px_rgba(163,230,53,0.10)]"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-neutral-900 p-4">
        <div className="space-y-2">
          {/* Tablo başlıkları */}
          <div className="grid grid-cols-[minmax(0,1.5fr)_0.7fr_0.8fr] items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider text-neutral-500 sm:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.8fr] sm:px-5">
            <span>COIN</span>

            <span className="justify-self-center">FİYAT</span>

            <span className="hidden justify-self-center sm:block">
              PİYASA DEĞERİ
            </span>

            <span className="justify-self-end">
              <span className="sm:hidden">24s</span>
              <span className="hidden sm:inline">24s DEĞİŞİM</span>
            </span>
          </div>

          {/* Coin satırları */}
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <Link
                key={coin.id}
                to={`/coin/${coin.symbol.toLowerCase()}`}
                className="grid grid-cols-[minmax(0,1.5fr)_0.7fr_0.8fr] items-center gap-3 rounded-2xl bg-neutral-950 px-4 py-4 transition-all duration-300 hover:scale-[1.01] hover:bg-neutral-800 hover:shadow-[0_6px_20px_rgba(163,230,53,0.08)] sm:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.8fr] sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={coin.image}
                    alt={`${coin.name} logosu`}
                    className="h-9 w-9 shrink-0 object-contain"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-neutral-100">{coin.name}</p>

                    <p className="font-data mt-0.5 text-xs text-neutral-500">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>

                <span className="font-data justify-self-center text-sm text-neutral-400">
                  {formatPrice(coin.current_price)}
                </span>

                <span className="font-data hidden justify-self-center text-sm text-neutral-400 sm:block">
                  {formatMarketCap(coin.market_cap)}
                </span>

                <span
                  className={`font-data justify-self-end text-sm ${
                    Number(coin.price_change_percentage_24h?.toFixed(2)) > 0
                      ? "text-lime-400"
                      : Number(coin.price_change_percentage_24h?.toFixed(2)) < 0
                        ? "text-red-400"
                        : "text-neutral-400"
                  }`}
                >
                  {Number(coin.price_change_percentage_24h?.toFixed(2)) > 0
                    ? "+"
                    : ""}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl bg-neutral-950 px-5 py-4 text-sm text-neutral-500">
              Aradığınız kripto bulunamadı.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Markets;
