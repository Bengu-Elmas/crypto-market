import { NavLink } from "react-router";

function Navbar() {
  const navLinkClasses = ({ isActive }) =>
    `rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-lime-400/10 text-lime-400"
        : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
    }`;

  return (
    <header className="px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-neutral-900/90 px-5 py-4 shadow-[0_0_32px_rgba(163,230,53,0.22)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 font-bold text-lime-400">
            CM
          </div>

          <span className="text-lg font-semibold text-neutral-100">
            CryptoMarket
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClasses}>
            Dashboard
          </NavLink>

          <NavLink to="/markets" className={navLinkClasses}>
            Markets
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
