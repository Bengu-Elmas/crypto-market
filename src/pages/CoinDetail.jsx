import { useState } from "react";
import { useParams } from "react-router";

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

function CoinDetail() {
  const { symbol } = useParams();
  const [selectedInterval, setSelectedInterval] = useState("1m");

  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-400">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Canlı Piyasa
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
            {symbol.toUpperCase()}/USDT
          </h1>

          <p className="mt-3 text-neutral-400">
            Fiyat hareketlerini, emir defterini ve son işlemleri gerçek zamanlı
            olarak takip et.
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-900 px-6 py-4">
          <p className="text-sm text-neutral-400">Güncel Fiyat</p>

          <p className="font-data mt-2 text-2xl font-semibold text-neutral-100">
            —
          </p>
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

        <div className="mt-5 flex min-h-80 items-center justify-center rounded-2xl bg-neutral-950">
          <p className="text-sm text-neutral-500">Grafik verisi bekleniyor</p>
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
          <div className="flex min-h-48 flex-col justify-center">
            <div className="mt-4">
              {sampleSellOrders.map((order) => (
                <div
                  key={order.id}
                  className="font-data grid grid-cols-2 py-2 text-sm"
                >
                  <span className="text-red-400">{order.price}</span>

                  <span className="text-right text-neutral-300">
                    {order.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="font-data my-3 flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-xs text-neutral-400">
            Spread: 0.60 USDT
          </div>

          {/* Alış emirleri */}
          <div className="mt-3">
            {sampleBuyOrders.map((order) => (
              <div
                key={order.id}
                className="font-data grid grid-cols-2 py-2 text-sm"
              >
                <span className="text-lime-400">{order.price}</span>

                <span className="text-right text-neutral-300">
                  {order.amount}
                </span>
              </div>
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

          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-neutral-500">İşlem verisi bekleniyor</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoinDetail;
