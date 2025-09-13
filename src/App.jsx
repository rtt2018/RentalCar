import { Routes, Route } from "react-router";
import Hero from "./pages/Hero/Hero";
import Catalog from "./pages/Catalog/Catalog";
import CarDetail from "./pages/CarDetail/CarDetail";
import Main from "./components/Main/Main";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Hero />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<CarDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
