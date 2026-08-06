import { useState } from "react";
import { NavLink } from "react-router";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `flex-1 rounded-xl px-3 py-2 text-center text-sm font-medium transition-colors sm:flex-none sm:px-4 ${
      isActive
        ? "bg-lime-400/10 text-lime-400"
        : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl rounded-2xl bg-neutral-900/90 px-3 py-3 shadow-[0_0_32px_rgba(163,230,53,0.22)] backdrop-blur-md sm:px-5 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo ve marka */}
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

          {/* Masaüstü bağlantıları */}
          <div className="hidden items-center gap-2 sm:flex">
            <NavLink to="/" end className={navLinkClasses}>
              Dashboard
            </NavLink>

            <NavLink to="/markets" className={navLinkClasses}>
              Marketler
            </NavLink>
          </div>

          {/* Mobil burger */}
          <button
            type="button"
            onClick={() => setMenuOpen((previousState) => !previousState)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-neutral-800 sm:hidden"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-lime-400 transition-transform duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />

            <span
              className={`absolute h-0.5 w-6 rounded-full bg-lime-400 transition-transform duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>

        {/* Mobil açılır menü */}
        <div
          className={`grid overflow-hidden transition-all duration-300 sm:hidden ${
            menuOpen ? "max-h-20 pt-3 opacity-100" : "max-h-0 pt-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <NavLink to="/" end className={navLinkClasses} onClick={closeMenu}>
              Dashboard
            </NavLink>

            <NavLink
              to="/markets"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              Marketler
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
