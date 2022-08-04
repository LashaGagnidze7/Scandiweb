import React from "react";
import "./App.css";
import ProductList from "./Components/ProductList/ProductList";
import AddProduct from "./Components/AddProduct/AddProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
    <Router>
          <Routes>
            <Route path="/" index element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
      </Router>
    );
}

export default App;
