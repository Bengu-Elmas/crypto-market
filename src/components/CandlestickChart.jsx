import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";

function CandlestickChart({ candles, liveCandle }) {
  const chartContainerRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || candles.length === 0) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 320,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0a0a0a",
        },
        textColor: "#a3a3a3",
      },

      grid: {
        vertLines: {
          color: "#262626",
        },
        horzLines: {
          color: "#262626",
        },
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#a3e635",
      downColor: "#f87171",
      borderVisible: false,
      wickUpColor: "#a3e635",
      wickDownColor: "#f87171",
    });
    candlestickSeriesRef.current = candlestickSeries;

    candlestickSeries.setData(candles);

    const resizeObserver = new ResizeObserver(() => {
      if (!chartContainerRef.current) {
        return;
      }

      chart.resize(chartContainerRef.current.clientWidth, 320);
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      candlestickSeriesRef.current = null;
      chart.remove();
    };
  }, [candles]);

  useEffect(() => {
    if (!liveCandle || !candlestickSeriesRef.current) {
      return;
    }

    candlestickSeriesRef.current.update(liveCandle);
  }, [liveCandle]);

  return (
    <div ref={chartContainerRef} className="h-[320px] w-full overflow-hidden" />
  );
}

export default CandlestickChart;
