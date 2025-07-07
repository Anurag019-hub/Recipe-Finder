import { useState, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";

import Navbar from "./Navbar.jsx";
import Herosection from "./herosection.jsx";
import Search from "./Search.jsx";
import IngredientDetails from "./Ingredents.jsx";
import Bestrecipe from "./Bestrecipe.jsx";

function App() {
  const navigate = useNavigate();
  const navigated = useRef(false);

  useLenis(() => {});

  return (
    <>
      <ReactLenis root />
      <Navbar />
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipe/:id" element={<IngredientDetails />} />
        <Route path="/bestrecipe" element={<Bestrecipe />} />
      </Routes>
    </>
  );
}

export default App;
