import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollButton";
import WatchList from "./pages/WatchList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";


const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/watch-list" element={<WatchList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);
