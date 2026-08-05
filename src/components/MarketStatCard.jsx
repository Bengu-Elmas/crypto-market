function MarketStatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-[0_8px_24px_rgba(163,230,53,0.08)]">
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="font-data mt-3 text-2xl font-semibold text-neutral-100">
        {value}
      </p>
    </div>
  );
}

export default MarketStatCard;
