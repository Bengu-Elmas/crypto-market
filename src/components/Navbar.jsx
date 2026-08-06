import { NavLink } from "react-router";

function Navbar() {
  const navLinkClasses = ({ isActive }) =>
    `rounded-xl px-3 py-2 sm:px-4 text-sm font-medium transition-colors ${
      isActive
        ? "bg-lime-400/10 text-lime-400"
        : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
    }`;

  return (
    <header className="px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-neutral-900/90 px-3 py-3 shadow-[0_0_32px_rgba(163,230,53,0.22)] backdrop-blur-md sm:px-5 sm:py-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="CryptoMarket logosu"
            className="h-10 w-10 object-contain"
          />

          <span className="inline-flex items-center gap-1.5 text-base font-semibold sm:text-lg">
            <span className="relative inline-block text-lime-400">
              Crypto
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-[85%] -translate-x-1/2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.65)]" />
            </span>

            <span className="text-neutral-100">Market</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClasses}>
            Dashboard
          </NavLink>

          <NavLink to="/markets" className={navLinkClasses}>
            Marketler
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
