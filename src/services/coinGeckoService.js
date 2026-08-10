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

export async function getGlobalMarketData() {
  console.log("[CoinGecko] getGlobalMarketData çağrıldı.");

  const response = await fetch(`${COINGECKO_BASE_URL}/global`);

  console.log("[CoinGecko] Global piyasa API cevabı geldi:", response.status);

  if (!response.ok) {
    console.error(
      "[CoinGecko] Global piyasa verileri alınamadı:",
      response.status,
    );

    throw new Error("Global piyasa verileri alınamadı.");
  }

  const data = await response.json();

  console.log("[CoinGecko] Global piyasa verileri:", data);

  return data.data;
}

export async function getTrendingCoins() {
  console.log("[CoinGecko] getTrendingCoins çağrıldı.");

  const response = await fetch(`${COINGECKO_BASE_URL}/search/trending`);

  console.log("[CoinGecko] Trending API cevabı geldi:", response.status);

  if (!response.ok) {
    console.error("[CoinGecko] Trending coinler alınamadı:", response.status);

    throw new Error("Trending coinler alınamadı.");
  }

  const data = await response.json();

  const formattedCoins = data.coins.map((coin) => ({
    id: coin.item.id,
    name: coin.item.name,
    symbol: coin.item.symbol,
    image: coin.item.small || coin.item.thumb,
    price: coin.item.data?.price,
    change: coin.item.data?.price_change_percentage_24h?.usd ?? 0,
  }));

  console.log("[CoinGecko] Düzenlenmiş trending coinler:", formattedCoins);
  console.table(
    formattedCoins.slice(0, 5).map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      change: coin.change,
    })),
  );

  return formattedCoins.slice(0, 6);
}
