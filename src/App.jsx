import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";
import CoinDetail from "./pages/CoinDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Markets from "./pages/Markets.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="markets" element={<Markets />} />
        <Route path="coin/:symbol" element={<CoinDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
