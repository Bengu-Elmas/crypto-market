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
        {marketStats.map((stat) => (
          <MarketStatCard key={stat.id} title={stat.title} value={stat.value} />
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
            {trendingCoins.map((coin) => (
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
      </div>
    </section>
  );
}

export default Dashboard;
