import "./App.css";
import { Routes, Route } from "react-router";
import ListProducts from "./components/ListProducts";
import Navbar from "./components/Navbar";
import FormuUI from "./components/FormuUI";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex items-start justify-start pt-4">
        <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/products" element={<ListProducts />} />
          <Route path="/aggproducts" element={<FormuUI />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
