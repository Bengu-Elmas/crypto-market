import { useState } from "react";
import { useParams } from "react-router";

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
    </section>
  );
}

export default CoinDetail;
