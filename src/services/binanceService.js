const BINANCE_BASE_URL = "https://api.binance.com/api/v3";

const BINANCE_WS_BASE_URL = "wss://stream.binance.com:9443/ws";

export async function getKlines(symbol, interval) {
  const url = `${BINANCE_BASE_URL}/klines?symbol=${symbol}&interval=${interval}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Binance API'den veri alınamadı.");
  }
  const data = await response.json();
  const formattedData = data.map((candle) => ({
    time: Math.floor(candle[0] / 1000),
    open: Number(candle[1]),
    high: Number(candle[2]),
    low: Number(candle[3]),
    close: Number(candle[4]),
    volume: Number(candle[5]),
  }));
  console.log("[Binance] Mum verileri:", formattedData);
  console.table(formattedData.slice(0, 5));

  return formattedData;
}

export async function get24hTicker(symbol) {
  const url = `${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Binance API'den veri alınamadı.");
  }
  const data = await response.json();
  console.log("[Binance] 24 saatlik ticker verileri:", data);
  return data;
}

export function connectTickerStream(symbol, onMessage) {
  const ws = new WebSocket(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@ticker`,
  );

  ws.onopen = () => {
    console.log(`[Binance WebSocket] ${symbol} ticker bağlantısı açıldı.`);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("[Binance WebSocket] Canlı ticker verisi:", data);

    onMessage(data);
  };

  return ws;
}

export function connectKlineStream(symbol, interval, onMessage) {
  const ws = new WebSocket(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@kline_${interval}`,
  );

  ws.onopen = () => {
    console.log(`[Binance WebSocket] ${symbol} kline bağlantısı açıldı.`);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("[Binance WebSocket] Canlı kline verisi:", data);

    onMessage(data);
  };

  return ws;
}
