import TrendCoinCard from "../components/TrendCoinCard.jsx";
import MarketStatCard from "../components/MarketStatCard.jsx";
import TextType from "../components/TextType.jsx";

const marketStats = [
  {
    id: "market-cap",
    title: "Toplam Piyasa Değeri",
    value: "—",
  },
  {
    id: "volume",
    title: "24 Saatlik İşlem Hacmi",
    value: "—",
  },
  {
    id: "btc-dominance",
    title: "Bitcoin Hakimiyeti",
    value: "—",
  },
  {
    id: "active-coins",
    title: "Aktif Kripto Para",
    value: "—",
  },
];

const trendingCoins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: "—",
    change: 2.4,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: "—",
    change: -1.2,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: "—",
    change: 3.7,
  },
];

function Dashboard() {
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
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.price}
                change={coin.change}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
