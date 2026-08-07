import { Link } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-neutral-900/90 px-5 py-5 shadow-[0_0_24px_rgba(163,230,53,0.1)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="CryptoMarket logosu"
            className="h-10 w-10 object-contain"
          />

          <div>
            <p className="inline-flex items-center gap-1.5 font-semibold text-neutral-100">
              <span className="relative inline-block text-lime-400">
                Crypto
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-[85%] -translate-x-1/2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.65)]" />
              </span>

              <span>Market</span>
            </p>
            <p className="mt-2.5 text-xs text-neutral-500">
              Kripto piyasasını tek bir panelden takip et.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-neutral-400 transition-colors hover:text-lime-400"
            >
              Dashboard
            </Link>

            <Link
              to="/markets"
              className="text-neutral-400 transition-colors hover:text-lime-400"
            >
              Marketler
            </Link>
          </div>

          <p className="text-xs text-neutral-500">
            © {currentYear} Crypto Market
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
