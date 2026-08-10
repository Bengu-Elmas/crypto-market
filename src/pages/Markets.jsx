import { useState, useEffect } from "react";
import { Link } from "react-router";

import { getMarketCoins } from "../services/coinGeckoService.js";
import TextType from "../components/TextType.jsx";
import MiniSparkline from "../components/MiniSparkline.jsx";

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
  const [currentPage, setCurrentPage] = useState(1);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteCoins");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [sortConfig, setSortConfig] = useState({
    key: "market_cap",
    direction: "desc",
  });

  const coinsPerPage = 25;

  function toggleFavorite(coinId) {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(coinId)) {
        return previousFavorites.filter((favoriteId) => favoriteId !== coinId);
      }

      return [...previousFavorites, coinId];
    });
  }

  function handleSort(key) {
    setSortConfig((previousSort) => ({
      key,
      direction:
        previousSort.key === key && previousSort.direction === "desc"
          ? "asc"
          : "desc",
    }));
  }

  const filteredCoins = coins.filter((coin) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query);

    const matchesFavorite = !showFavoritesOnly || favorites.includes(coin.id);

    return matchesSearch && matchesFavorite;
  });

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue - bValue;
    }

    return bValue - aValue;
  });

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage);

  const startIndex = (currentPage - 1) * coinsPerPage;

  const endIndex = startIndex + coinsPerPage;

  const paginatedCoins = sortedCoins.slice(startIndex, endIndex);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showFavoritesOnly]);

  useEffect(() => {
    localStorage.setItem("favoriteCoins", JSON.stringify(favorites));
  }, [favorites]);

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

      {/* Arama */}
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

        {/* Favori filtresi */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFavoritesOnly(false)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              !showFavoritesOnly
                ? "bg-lime-400 text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            }`}
          >
            Tümü
          </button>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly(true)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? "bg-lime-400 text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            }`}
          >
            <img
              src="/favorites.svg"
              alt=""
              aria-hidden="true"
              className="h-4 w-4"
            />
            Favoriler
            {favorites.length > 0 && (
              <span
                className={`font-data text-xs ${
                  showFavoritesOnly ? "text-neutral-800" : "text-lime-400"
                }`}
              >
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Piyasa tablosu */}
      <div className="mt-6 rounded-2xl bg-neutral-900 p-4">
        <div className="space-y-2">
          {/* Tablo başlıkları */}
          <div className="grid grid-cols-[minmax(0,1.5fr)_0.7fr_0.8fr] items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 sm:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.8fr] lg:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.9fr_0.8fr] sm:px-5">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0" aria-hidden="true" />
              <span className="h-9 w-9 shrink-0" aria-hidden="true" />
              <span>COIN</span>
            </div>

            <button
              type="button"
              onClick={() => handleSort("current_price")}
              className="justify-self-center font-semibold text-neutral-300 transition-colors hover:text-lime-400"
            >
              FİYAT{" "}
              {sortConfig.key === "current_price" &&
                (sortConfig.direction === "desc" ? "↓" : "↑")}
            </button>

            <span className="hidden justify-self-center lg:block">
              7G TREND
            </span>

            <button
              type="button"
              onClick={() => handleSort("market_cap")}
              className="hidden justify-self-center font-semibold text-neutral-300 transition-colors hover:text-lime-400 sm:block"
            >
              PİYASA DEĞERİ{" "}
              {sortConfig.key === "market_cap" &&
                (sortConfig.direction === "desc" ? "↓" : "↑")}
            </button>

            <button
              type="button"
              onClick={() => handleSort("price_change_percentage_24h")}
              className="justify-self-end font-semibold text-neutral-300 transition-colors hover:text-lime-400"
            >
              <span className="sm:hidden">
                24s{" "}
                {sortConfig.key === "price_change_percentage_24h" &&
                  (sortConfig.direction === "desc" ? "↓" : "↑")}
              </span>

              <span className="hidden sm:inline">
                24s DEĞİŞİM{" "}
                {sortConfig.key === "price_change_percentage_24h" &&
                  (sortConfig.direction === "desc" ? "↓" : "↑")}
              </span>
            </button>
          </div>

          {/* Coin satırları */}
          {paginatedCoins.length > 0 ? (
            paginatedCoins.map((coin) => {
              const isFavorite = favorites.includes(coin.id);

              return (
                <div
                  key={coin.id}
                  className="relative grid grid-cols-[minmax(0,1.5fr)_0.7fr_0.8fr] items-center gap-3 rounded-2xl bg-neutral-950 px-4 py-4 transition-all duration-300 hover:scale-[1.01] hover:bg-neutral-800 hover:shadow-[0_6px_20px_rgba(163,230,53,0.08)] sm:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.8fr] lg:grid-cols-[minmax(0,1.4fr)_0.8fr_0.9fr_0.9fr_0.8fr] sm:px-5"
                >
                  {/* Satırın tamamını Coin Detail'e götüren link */}
                  <Link
                    to={`/coin/${coin.symbol.toLowerCase()}`}
                    aria-label={`${coin.name} detaylarını görüntüle`}
                    className="absolute inset-0 z-10 rounded-2xl"
                  />

                  {/* Coin */}
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(coin.id)}
                      aria-label={
                        isFavorite
                          ? `${coin.name} favorilerden çıkar`
                          : `${coin.name} favorilere ekle`
                      }
                      aria-pressed={isFavorite}
                      className="relative z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-neutral-700"
                    >
                      <img
                        src="/favorites.svg"
                        alt=""
                        aria-hidden="true"
                        className={`h-5 w-5 transition-all duration-200 ${
                          isFavorite
                            ? "scale-110 brightness-125 saturate-150 opacity-100 drop-shadow-[0_0_8px_rgba(163,230,53,0.95)]"
                            : "opacity-50 hover:opacity-75"
                        }`}
                      />
                    </button>

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

                  {/* Fiyat */}
                  <span className="font-data justify-self-center text-sm text-neutral-400">
                    {formatPrice(coin.current_price)}
                  </span>

                  {/* 7 günlük trend */}
                  <div className="hidden justify-self-center lg:block">
                    <MiniSparkline prices={coin.sparkline_in_7d?.price} />
                  </div>

                  {/* Piyasa değeri */}
                  <span className="font-data hidden justify-self-center text-sm text-neutral-400 sm:block">
                    {formatMarketCap(coin.market_cap)}
                  </span>

                  {/* 24 saat değişim */}
                  <span
                    className={`font-data justify-self-end text-sm ${
                      Number(coin.price_change_percentage_24h?.toFixed(2)) > 0
                        ? "text-lime-400"
                        : Number(coin.price_change_percentage_24h?.toFixed(2)) <
                            0
                          ? "text-red-400"
                          : "text-neutral-400"
                    }`}
                  >
                    {Number(coin.price_change_percentage_24h?.toFixed(2)) > 0
                      ? "+"
                      : ""}
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              );
            })
          ) : (
            <p className="rounded-2xl bg-neutral-950 px-5 py-4 text-sm text-neutral-500">
              {showFavoritesOnly
                ? "Henüz favori kripto paran bulunmuyor."
                : "Aradığınız kripto bulunamadı."}
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`h-10 min-w-10 rounded-xl px-3 font-medium transition-colors ${
                    currentPage === pageNumber
                      ? "bg-lime-400 text-neutral-950"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Markets;
