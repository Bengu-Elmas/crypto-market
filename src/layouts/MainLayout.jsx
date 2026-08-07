import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import SideRays from "../components/SideRays.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none fixed inset-0 z-0">
        <SideRays
          rayColor1="#7ccf00"
          rayColor2="#4c7300"
          origin="top-right"
          speed={2.5}
          intensity={2}
          spread={2}
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default MainLayout;
