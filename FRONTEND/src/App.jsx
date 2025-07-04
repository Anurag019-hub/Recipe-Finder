import { useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Herosection from "./herosection.jsx";
import Search from "./Search.jsx";
import Ingredent from "./ingredents.jsx";
import Bestrecipe from "./Bestrecipe.jsx";

function App() {
  const navigate = useNavigate();
  const navigated = useRef(false);

  useLenis((lenis) => {

  });
  return (
    <>
      <ReactLenis root />
      <Navbar />
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/search" element={<Search />} />
        <Route path="/created/ingredents/:id" element={<Ingredent />} />
        <Route path="/bestrecipe" element={<Bestrecipe />} />
      </Routes>
    </>
  );
}

export default App;
