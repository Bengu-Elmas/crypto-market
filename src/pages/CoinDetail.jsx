import { useState, useEffect } from "react";
import { useParams } from "react-router";
import TradeRow from "../components/TradeRow.jsx";
import OrderBookRow from "../components/OrderBookRow.jsx";
import TextType from "../components/TextType.jsx";
import CandlestickChart from "../components/CandlestickChart.jsx";
import {
  getKlines,
  get24hTicker,
  connectTickerStream,
  connectKlineStream,
} from "../services/binanceService.js";

const sampleSellOrders = [
  {
    id: 1,
    price: "67,245.20",
    amount: "0.0284",
  },
  {
    id: 2,
    price: "67,244.80",
    amount: "0.0412",
  },
  {
    id: 3,
    price: "67,243.50",
    amount: "0.0157",
  },
];

const sampleBuyOrders = [
  {
    id: 1,
    price: "67,242.90",
    amount: "0.0361",
  },
  {
    id: 2,
    price: "67,241.60",
    amount: "0.0528",
  },
  {
    id: 3,
    price: "67,240.10",
    amount: "0.0193",
  },
];
const sampleTrades = [
  {
    id: 1,
    price: "67,243.20",
    amount: "0.0124",
    time: "10:07:24",
    side: "buy",
  },
  {
    id: 2,
    price: "67,242.80",
    amount: "0.0361",
    time: "10:07:19",
    side: "sell",
  },
  {
    id: 3,
    price: "67,243.60",
    amount: "0.0087",
    time: "10:07:12",
    side: "buy",
  },
];

function formatPrice(price) {
  if (price == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function CoinDetail() {
  const { symbol } = useParams();
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [candles, setCandles] = useState([]);
  const [ticker24h, setTicker24h] = useState(null);
  const [livePrice, setLivePrice] = useState(null);

  const currentPrice =
    livePrice ?? (ticker24h ? Number(ticker24h.lastPrice) : null);

  const high24h = ticker24h ? Number(ticker24h.highPrice) : null;
  const low24h = ticker24h ? Number(ticker24h.lowPrice) : null;
  const change24h = ticker24h ? Number(ticker24h.priceChangePercent) : null;
  const [liveCandle, setLiveCandle] = useState(null);

  useEffect(() => {
    async function loadKlines() {
      console.log("[CoinDetail] Mum verileri isteniyor.");

      try {
        const data = await getKlines(
          `${symbol.toUpperCase()}USDT`,
          selectedInterval,
        );

        setCandles(data);

        console.log("[CoinDetail] Mum verileri başarıyla alındı:", data.length);
      } catch (error) {
        console.error(
          "[CoinDetail] Mum verileri alınırken hata oluştu:",
          error,
        );
      }
    }

    loadKlines();
  }, [symbol, selectedInterval]);

  useEffect(() => {
    if (candles.length > 0) {
      console.log(
        "[CoinDetail] Candle state'i güncellendi:",
        candles.length,
        "mum",
      );
    }
  }, [candles]);

  useEffect(() => {
    async function load24hTicker() {
      console.log("[CoinDetail] 24 saatlik ticker verisi isteniyor.");

      try {
        const data = await get24hTicker(`${symbol.toUpperCase()}USDT`);

        console.log(
          "[CoinDetail] 24 saatlik ticker verisi başarıyla alındı:",
          data,
        );

        setTicker24h(data);
      } catch (error) {
        console.error(
          "[CoinDetail] 24 saatlik ticker verisi alınırken hata oluştu:",
          error,
        );
      }
    }

    load24hTicker();
  }, [symbol]);

  useEffect(() => {
    const ws = connectTickerStream(`${symbol.toUpperCase()}USDT`, (data) => {
      const price = Number(data.c);

      console.log("[CoinDetail] Canlı fiyat:", price);

      setLivePrice(price);

      setTicker24h((previousTicker) => ({
        ...previousTicker,
        highPrice: data.h,
        lowPrice: data.l,
        priceChangePercent: data.P,
      }));
    });

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }

      if (ws.readyState === WebSocket.CONNECTING) {
        ws.addEventListener(
          "open",
          () => {
            ws.close();
          },
          { once: true },
        );
      }
    };
  }, [symbol]);

  useEffect(() => {
    const ws = connectKlineStream(
      `${symbol.toUpperCase()}USDT`,
      selectedInterval,
      (data) => {
        const kline = data.k;

        const formattedCandle = {
          time: Math.floor(kline.t / 1000),
          open: Number(kline.o),
          high: Number(kline.h),
          low: Number(kline.l),
          close: Number(kline.c),
          volume: Number(kline.v),
        };

        console.log("[CoinDetail] Düzenlenmiş canlı mum:", formattedCandle);

        setLiveCandle(formattedCandle);
      },
    );

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbol, selectedInterval]);

  return (
    <section>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] xl:items-end">
        <div className="min-w-0">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-400">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Canlı Piyasa
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
            <TextType
              text={`${symbol.toUpperCase()}/USDT`}
              as="span"
              typingSpeed={60}
              loop={false}
              showCursor
              cursorCharacter="_"
              cursorClassName="text-lime-400"
            />
          </h1>

          <p className="mt-3 max-w-xl text-neutral-400">
            Fiyat hareketlerini, emir defterini ve son işlemleri gerçek zamanlı
            olarak takip et.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl bg-neutral-900 px-5 py-4">
            <p className="text-sm text-neutral-400">Güncel Fiyat</p>

            <p className="font-data mt-2 whitespace-nowrap text-xl font-semibold text-neutral-100">
              {currentPrice ? formatPrice(currentPrice) : "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-900 px-5 py-4">
            <p className="text-sm text-neutral-400">24s En Yüksek</p>

            <p className="font-data mt-2 whitespace-nowrap text-xl font-semibold text-lime-400">
              {high24h ? formatPrice(high24h) : "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-900 px-5 py-4">
            <p className="text-sm text-neutral-400">24s En Düşük</p>

            <p className="font-data mt-2 whitespace-nowrap text-xl font-semibold text-red-400">
              {low24h ? formatPrice(low24h) : "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-900 px-5 py-4">
            <p className="text-sm text-neutral-400">24s Değişim</p>

            <p
              className={`font-data mt-2 whitespace-nowrap text-xl font-semibold ${
                change24h > 0
                  ? "text-lime-400"
                  : change24h < 0
                    ? "text-red-400"
                    : "text-neutral-400"
              }`}
            >
              {change24h != null
                ? `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-neutral-900 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-100">
              Fiyat Grafiği
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Mum grafiği burada gösterilecek.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["1m", "5m", "15m", "1h"].map((interval) => (
              <button
                key={interval}
                type="button"
                onClick={() => setSelectedInterval(interval)}
                className={`font-data rounded-lg px-3 py-2 text-xs transition-colors ${
                  selectedInterval === interval
                    ? "bg-lime-400/15 text-lime-400"
                    : "bg-neutral-800 text-neutral-400 hover:bg-lime-400/10 hover:text-lime-400"
                }`}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 min-h-80 rounded-2xl bg-neutral-950">
          <CandlestickChart candles={candles} liveCandle={liveCandle} />
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-neutral-900 p-5">
        <div>
          <h2 className="text-xl font-bold text-neutral-100">Emir Defteri</h2>

          <p className="mt-1 text-sm text-neutral-400">
            Canlı alış ve satış emirleri burada gösterilecek.
          </p>
        </div>

        <div className="mt-5 rounded-2xl bg-neutral-950 p-4">
          <div className="grid grid-cols-2 text-xs text-neutral-500">
            <span>Fiyat (USDT)</span>
            <span className="text-right">Miktar ({symbol.toUpperCase()})</span>
          </div>

          {/* Satış emirleri */}
          <div className="mt-4">
            {sampleSellOrders.map((order) => (
              <OrderBookRow
                key={order.id}
                price={order.price}
                amount={order.amount}
                type="sell"
              />
            ))}
          </div>

          <div className="font-data my-3 flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-xs text-neutral-400">
            Spread: 0.60 USDT
          </div>

          {/* Alış emirleri */}
          <div className="mt-3">
            {sampleBuyOrders.map((order) => (
              <OrderBookRow
                key={order.id}
                price={order.price}
                amount={order.amount}
                type="buy"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-neutral-900 p-5">
        <div>
          <h2 className="text-xl font-bold text-neutral-100">Son İşlemler</h2>

          <p className="mt-1 text-sm text-neutral-400">
            Gerçekleşen alış ve satış işlemleri burada canlı olarak
            gösterilecek.
          </p>
        </div>

        <div className="mt-5 rounded-2xl bg-neutral-950 p-4">
          <div className="grid grid-cols-3 text-xs text-neutral-500">
            <span className="text-left">Fiyat (USDT)</span>

            <span className="text-center">Miktar ({symbol.toUpperCase()})</span>

            <span className="text-right">Saat</span>
          </div>
          <div className="mt-4">
            {sampleTrades.map((trade) => (
              <TradeRow
                key={trade.id}
                price={trade.price}
                amount={trade.amount}
                time={trade.time}
                side={trade.side}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoinDetail;
