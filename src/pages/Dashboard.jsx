import TrendCoinCard from "../components/TrendCoinCard.jsx";
import MarketStatCard from "../components/MarketStatCard.jsx";
import TextType from "../components/TextType.jsx";
import { useEffect, useState, useRef } from "react";
import {
  getGlobalMarketData,
  getTrendingCoins,
  getMarketCoins,
} from "../services/coinGeckoService.js";
import MarketMoverCard from "../components/MarketMoverCard.jsx";
import Skeleton from "../components/Skeleton.jsx";

function formatCompactCurrency(value) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function Dashboard() {
  const [globalData, setGlobalData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [marketCoins, setMarketCoins] = useState([]);
  const hasLoadedDashboard = useRef(false);

  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isMarketLoading, setIsMarketLoading] = useState(true);

  const [globalError, setGlobalError] = useState(null);
  const [trendingError, setTrendingError] = useState(null);
  const [marketError, setMarketError] = useState(null);

  const marketStats = [
    {
      id: "market-cap",
      title: "Toplam Piyasa Değeri",
      value: formatCompactCurrency(globalData?.total_market_cap?.usd),
    },
    {
      id: "volume",
      title: "24 Saatlik İşlem Hacmi",
      value: formatCompactCurrency(globalData?.total_volume?.usd),
    },
    {
      id: "btc-dominance",
      title: "Bitcoin Hakimiyeti",
      value:
        globalData?.market_cap_percentage?.btc != null
          ? `${globalData.market_cap_percentage.btc.toFixed(2)}%`
          : "—",
    },
    {
      id: "active-coins",
      title: "Aktif Kripto Para",
      value: formatNumber(globalData?.active_cryptocurrencies),
    },
  ];

  async function loadGlobalData() {
    console.log("[Dashboard] Global piyasa verileri isteniyor.");

    setIsGlobalLoading(true);
    setGlobalError(null);

    try {
      const data = await getGlobalMarketData();

      setGlobalData(data);

      console.log("[Dashboard] Global piyasa verileri alındı.");
    } catch (error) {
      console.error(
        "[Dashboard] Global piyasa verileri alınırken hata oluştu:",
        error,
      );

      setGlobalError("Genel piyasa verileri şu anda alınamıyor.");
    } finally {
      setIsGlobalLoading(false);
    }
  }

  async function loadTrendingData() {
    console.log("[Dashboard] Trending coinler isteniyor.");

    setIsTrendingLoading(true);
    setTrendingError(null);

    try {
      const data = await getTrendingCoins();

      setTrendingCoins(data);

      console.log("[Dashboard] Trending coinler alındı:", data.length);
    } catch (error) {
      console.error(
        "[Dashboard] Trending coinler alınırken hata oluştu:",
        error,
      );

      setTrendingError("Trend coinler şu anda alınamıyor.");
    } finally {
      setIsTrendingLoading(false);
    }
  }

  async function loadMarketMovers() {
    console.log("[Dashboard] Yükselen/düşen coin verileri isteniyor.");

    setIsMarketLoading(true);
    setMarketError(null);

    try {
      const data = await getMarketCoins();

      setMarketCoins(data);

      console.log(
        "[Dashboard] Yükselen/düşen coin verileri alındı:",
        data.length,
      );
    } catch (error) {
      console.error(
        "[Dashboard] Market coinleri alınırken hata oluştu:",
        error,
      );

      setMarketError("Yükselen ve düşen coinler şu anda alınamıyor.");
    } finally {
      setIsMarketLoading(false);
    }
  }

  useEffect(() => {
    if (hasLoadedDashboard.current) {
      return;
    }

    hasLoadedDashboard.current = true;

    async function loadDashboardData() {
      console.log("[Dashboard] Veriler yükleniyor.");

      await loadGlobalData();
      await loadTrendingData();
      await loadMarketMovers();
    }

    loadDashboardData();
  }, []);

  const coinsWithChange = marketCoins.filter(
    (coin) => coin.price_change_percentage_24h != null,
  );

  const topGainers = [...coinsWithChange]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
    )
    .slice(0, 3);

  const topLosers = [...coinsWithChange]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    )
    .slice(0, 3);

  return (
    <section>
      <div>
        <p className="mb-3 text-sm font-medium text-lime-400">Piyasa Özeti</p>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
          <TextType
            text="KRİPTO PİYASASINI TEK BAKIŞTA GÖRÜN"
            as="span"
            typingSpeed={60}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-lime-400"
          />
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-neutral-400">
          Genel piyasa durumunu, Bitcoin hakimiyetini ve trend olan kripto
          paraları tek bir panel üzerinden incele.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isGlobalLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-neutral-900 p-5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-4 h-8 w-24" />
            </div>
          ))
        ) : globalError ? (
          <div className="col-span-full rounded-2xl bg-neutral-900 px-6 py-8 text-center">
            <p className="text-neutral-300">{globalError}</p>

            <button
              type="button"
              onClick={loadGlobalData}
              className="mt-4 rounded-xl bg-lime-400 px-5 py-2.5 font-medium text-neutral-950 transition-transform hover:scale-105"
            >
              Tekrar Dene
            </button>
          </div>
        ) : (
          marketStats.map((stat) => (
            <MarketStatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
            />
          ))
        )}
      </div>

      <div className="mt-10">
        <div>
          <p className="text-sm font-medium text-lime-400">Gündemde</p>

          <h2 className="mt-2 text-2xl font-semibold text-neutral-100">
            Trend Coinler
          </h2>
          <p className="mt-2 text-neutral-400">
            Son dönemde kullanıcıların en çok ilgi gösterdiği kripto paralar.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isTrendingLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-2xl bg-neutral-900 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />

                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="mt-2 h-3 w-12" />
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="mt-2 h-3 w-14" />
                    </div>
                  </div>
                </div>
              ))
            ) : trendingError ? (
              <div className="col-span-full rounded-2xl bg-neutral-900 px-6 py-8 text-center">
                <p className="text-neutral-300">{trendingError}</p>

                <button
                  type="button"
                  onClick={loadTrendingData}
                  className="mt-4 rounded-xl bg-lime-400 px-5 py-2.5 font-medium text-neutral-950 transition-transform hover:scale-105"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : (
              trendingCoins.map((coin) => (
                <TrendCoinCard
                  key={coin.id ?? coin.symbol ?? coin.name}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.price}
                  change={coin.change}
                  image={coin.image}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {isMarketLoading ? (
          <>
            {Array.from({ length: 2 }).map((_, cardIndex) => (
              <div key={cardIndex} className="rounded-2xl bg-neutral-900 p-5">
                {/* Başlık */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-7" />
                  <Skeleton className="h-5 w-40" />
                </div>

                {/* Coin satırları */}
                <div className="mt-4 space-y-3">
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex items-center justify-between rounded-xl bg-neutral-950 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />

                        <div>
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="mt-2 h-3 w-12" />
                        </div>
                      </div>

                      <Skeleton className="h-4 w-14" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : marketError ? (
          <div className="rounded-2xl bg-neutral-900 px-6 py-8 text-center lg:col-span-2">
            <p className="text-neutral-300">{marketError}</p>

            <button
              type="button"
              onClick={loadMarketMovers}
              className="mt-4 rounded-xl bg-lime-400 px-5 py-2.5 font-medium text-neutral-950 transition-transform hover:scale-105"
            >
              Tekrar Dene
            </button>
          </div>
        ) : (
          <>
            <MarketMoverCard
              title="En Çok Yükselenler"
              coins={topGainers}
              type="gainer"
            />

            <MarketMoverCard
              title="En Çok Düşenler"
              coins={topLosers}
              type="loser"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
