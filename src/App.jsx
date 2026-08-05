function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
          CryptoMarket
        </span>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Gerçek zamanlı kripto piyasası
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-400">
          Binance ve CoinGecko verileriyle geliştirilen kripto piyasa takip
          uygulaması.
        </p>
      </section>
    </main>
  );
}

export default App;
