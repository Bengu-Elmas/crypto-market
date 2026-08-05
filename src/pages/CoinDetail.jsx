import { useParams } from "react-router";

function CoinDetail() {
  const { symbol } = useParams();

  return (
    <section>
      <h1 className="text-3xl font-bold text-neutral-100">
        {symbol.toUpperCase()}/USDT
      </h1>
    </section>
  );
}

export default CoinDetail;
