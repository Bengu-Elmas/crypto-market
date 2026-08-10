# Crypto Market

A responsive cryptocurrency market dashboard built with React, Tailwind CSS, CoinGecko API, and Binance market data.

The application provides a market overview, searchable cryptocurrency listings, favorites, price trends, candlestick charts, live order book data, and real-time trades through a modern dark-themed interface.

🔗 **Live Demo:** https://crypto-market-ruddy-three.vercel.app/

---

## About the Project

Crypto Market is a frontend web application developed to explore real-world API integration, real-time market data, data visualization, responsive interface design, and component-based development with React.

The application combines market data from CoinGecko with real-time Binance REST and WebSocket data.

Users can view an overview of the cryptocurrency market, browse and filter coins, save favorites locally, inspect seven-day price trends, and open detailed coin pages containing live price information, candlestick charts, order book data, and recent trades.

Special attention was given to the visual identity of the project. The Crypto Market logo and all custom SVG icons used throughout the application were designed specifically for this project and are original visual assets created by me.

---

## Features

### Market Dashboard

- Global cryptocurrency market overview
- Total market capitalization
- 24-hour trading volume
- Bitcoin market dominance
- Active cryptocurrency count
- Trending cryptocurrency cards
- Top 24-hour gainers
- Top 24-hour losers
- Responsive dashboard layout
- Loading skeletons for asynchronous market data
- Error states with retry actions

### Markets

- First 50 cryptocurrencies retrieved from CoinGecko
- Cryptocurrency search
- Market data sorting and filtering
- Current price display
- Market capitalization
- 24-hour price change
- Seven-day mini price sparklines
- Responsive market table
- Clickable coin rows leading to detailed market pages

### Favorites

- Add or remove cryptocurrencies from favorites
- Favorites stored with `localStorage`
- Dedicated favorites filter
- Persistent favorites between browser sessions
- Custom favorite icon states

### Coin Detail

Each cryptocurrency has a dedicated market detail page containing:

- Live cryptocurrency price
- 24-hour highest price
- 24-hour lowest price
- 24-hour percentage change
- Interactive candlestick chart
- Multiple chart intervals:
  - 1 minute
  - 5 minutes
  - 15 minutes
  - 1 hour
- Real-time order book
- Live bid and ask data
- Current bid/ask spread
- Real-time recent trades
- Buy and sell trade indicators
- Loading skeletons for individual market sections
- Independent error states
- Retry actions for failed data requests or connections

### Real-Time Market Data

The Coin Detail page uses Binance WebSocket streams to update market information without requiring a page refresh.

Real-time streams are used for:

- Live ticker prices
- Candlestick updates
- Order book depth
- Recent trades

WebSocket connections are cleaned up when the component is unmounted or when the selected cryptocurrency or chart interval changes.

### User Interface

- Fully responsive layout
- Dark cryptocurrency dashboard theme
- Tailwind CSS-based styling
- Lime accent color for primary actions and positive market movement
- Red indicators for negative market movement
- Responsive navigation bar
- Mobile navigation menu
- Animated page headings
- Animated background effects
- Custom typography for headings, interface text, and market values
- Loading skeleton animations
- Error and retry states
- Custom SVG visual assets
- Vercel deployment

---

## Design and Visual Assets

The visual identity of Crypto Market was created specifically for this project.

The following visual assets were designed by **Bengü Elmas**:

- Crypto Market application logo
- Application favicon
- Favorite / watchlist icons
- Top gainer icon
- Top loser icon
- Other custom SVG icons used throughout the interface

These assets were not taken from a ready-made icon package or third-party visual identity set.

The logo and custom icon designs used in Crypto Market belong to **Bengü Elmas**.

---

## Technologies Used

| Technology            | Usage                                                                      |
| --------------------- | -------------------------------------------------------------------------- |
| React                 | Component-based user interface                                             |
| Vite                  | Development and build environment                                          |
| Tailwind CSS          | Responsive styling and interface design                                    |
| React Router          | Page navigation and dynamic coin routes                                    |
| CoinGecko API         | Global market data, cryptocurrency listings, trends, and market statistics |
| Binance REST API      | Historical candlestick and ticker data                                     |
| Binance WebSocket API | Real-time ticker, candlestick, order book, and trade streams               |
| Lightweight Charts    | Interactive candlestick chart                                              |
| React Bits            | Animated interface components                                              |
| OGL                   | Animated background effects                                                |
| Local Storage         | Persistent favorite cryptocurrency data                                    |
| Vercel                | Deployment and hosting                                                     |

---

## Pages

| Page        | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| Dashboard   | Displays global market statistics, trending cryptocurrencies, top gainers, and top losers         |
| Markets     | Displays searchable and filterable cryptocurrency market data with seven-day trends and favorites |
| Coin Detail | Displays detailed and real-time market information for a selected cryptocurrency                  |
| Not Found   | Fallback page for invalid routes                                                                  |

---

## Market Data Flow

```text
CoinGecko API
     │
     ├── Global Market Statistics
     ├── Trending Coins
     ├── Market Coin List
     ├── 24h Market Changes
     └── 7-Day Sparkline Data

Binance
     │
     ├── REST API
     │     ├── Historical Candlesticks
     │     └── 24h Ticker
     │
     └── WebSocket
           ├── Live Ticker
           ├── Live Candlesticks
           ├── Order Book
           └── Recent Trades
```

---

## Loading and Error Handling

Asynchronous sections are handled independently so that a failure in one data source does not prevent the rest of the page from functioning.

Loading states are represented with skeleton components across:

- Dashboard statistics
- Trending coins
- Top gainers and losers
- Markets table
- Coin price summary
- Candlestick chart
- Order book
- Recent trades

Failed requests or WebSocket connections display dedicated error messages and retry actions where appropriate.

---

## Project Structure

```text
crypto-market/
│
├── public/
│   ├── logo.svg
│   ├── favorites.svg
│   ├── high-symbol.svg
│   ├── low-symbol.svg
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── CandlestickChart.jsx
│   │   ├── MarketMoverCard.jsx
│   │   ├── MarketStatCard.jsx
│   │   ├── MiniSparkline.jsx
│   │   ├── OrderBookRow.jsx
│   │   ├── Skeleton.jsx
│   │   ├── TradeRow.jsx
│   │   ├── TrendCoinCard.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Markets.jsx
│   │   ├── CoinDetail.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   ├── coinGeckoService.js
│   │   └── binanceService.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

## Running the Project

```bash
git clone https://github.com/Bengu-Elmas/crypto-market.git
cd crypto-market
npm install
npm run dev
```

---

## Author

**Bengü Elmas**

Frontend development, interface design, application logo, and custom SVG visual assets.
