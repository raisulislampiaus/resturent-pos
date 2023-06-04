import logo from "./logo.svg";
import "antd/dist/antd.css";
import { Button } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import CartPage from "./pages/CartPage";

import Customers from "./pages/Customers";
import Bills from "./pages/Bills";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/customers" element={<Customers />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


