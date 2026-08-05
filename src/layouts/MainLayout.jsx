import { Outlet } from "react-router";

import Navbar from "../components/Navbar.jsx";

function MainLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
