import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

//import CSS files
import "./css/index.css";
import "./css/Card.css";
import "./css/NavBar.css";
import "./css/Details.css";

//import Pages
import Movies from "./pages/Movies.tsx";
import Series from "./pages/Series.tsx";
import Home from "./pages/Home.tsx";

//import Components
import NavBar from "./components/NavBar.tsx";
import Details from "./pages/Details.tsx";
import Footer from "./components/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Series />} />
        {/* Dynamic route for movie/serie details */}
        <Route path="/:mediaType/:id" element={<Details />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
