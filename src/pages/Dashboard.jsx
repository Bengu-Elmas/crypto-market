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

  useEffect(() => {
    if (hasLoadedDashboard.current) {
      return;
    }

    hasLoadedDashboard.current = true;

    async function loadDashboardData() {
      console.log("[Dashboard] Veriler yükleniyor.");

      try {
        const globalMarketData = await getGlobalMarketData();

        setGlobalData(globalMarketData);

        console.log("[Dashboard] Global piyasa verileri alındı.");
      } catch (error) {
        console.error(
          "[Dashboard] Global piyasa verileri alınırken hata oluştu:",
          error,
        );
      } finally {
        setIsGlobalLoading(false);
      }

      try {
        const trendingData = await getTrendingCoins();

        setTrendingCoins(trendingData);

        console.log(
          "[Dashboard] Trending coinler alındı:",
          trendingData.length,
        );
      } catch (error) {
        console.error(
          "[Dashboard] Trending coinler alınırken hata oluştu:",
          error,
        );
      } finally {
        setIsTrendingLoading(false);
      }

      try {
        const marketData = await getMarketCoins();

        setMarketCoins(marketData);

        console.log(
          "[Dashboard] Yükselen/düşen coin verileri alındı:",
          marketData.length,
        );
      } catch (error) {
        console.error(
          "[Dashboard] Market coinleri alınırken hata oluştu:",
          error,
        );
      } finally {
        setIsMarketLoading(false);
      }
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
        {isGlobalLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl bg-neutral-900 p-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-4 h-8 w-24" />
              </div>
            ))
          : marketStats.map((stat) => (
              <MarketStatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
              />
            ))}
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
            {isTrendingLoading
              ? Array.from({ length: 6 }).map((_, index) => (
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
              : trendingCoins.map((coin) => (
                  <TrendCoinCard
                    key={coin.id ?? coin.symbol ?? coin.name}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.price}
                    change={coin.change}
                    image={coin.image}
                  />
                ))}
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
