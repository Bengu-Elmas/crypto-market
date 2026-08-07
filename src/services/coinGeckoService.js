const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export async function getMarketCoins() {
  console.log("[CoinGecko] getMarketCoins çağrıldı.");

  const response = await fetch(
    `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true`,
  );

  console.log("[CoinGecko] API cevabı geldi:", response.status);

  if (!response.ok) {
    console.error("[CoinGecko] Coin verileri alınamadı:", response.status);

    throw new Error("Coin verileri alınamadı.");
  }

  const data = await response.json();

  console.log("[CoinGecko] Coin verileri:", data);
  console.table(data.slice(0, 5));

  return data;
}
