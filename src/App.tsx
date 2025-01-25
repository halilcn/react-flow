import "./App.scss";
import Home from "./page/Home";
import Charts from "./page/Charts";
import { Routes, Route } from "react-router";
import { ROUTERS } from "./router";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTERS.HOME} element={<Home />} />
        <Route path={ROUTERS.CHARTS} element={<Charts />} />
      </Route>
    </Routes>
  );
}
