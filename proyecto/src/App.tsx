import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Informativa from "./Informativa";
import Original from "./Original";
import Usuario from "./Usuario";
import Home from "./Home";
import Favoritos from "./Favoritos";
import Anime from "./Anime"; 

import "./App.css";

function App() {
  return (
    <Router>
      <br></br>
      <nav className="c-menu">
        <Link to="/">
          <p>Home</p>
        </Link>

        <Link to="/favoritos">
          <p>Favoritos</p>
        </Link>

        <Link to="/original">
          <p>Mas Populares</p>
        </Link>

        <Link to="/informativa">
          <p>Informacion</p>
        </Link>

        <Link to="/usuario">
          <p>Usuario</p>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/anime/:anime" element={<Anime />} />
      </Routes>
    </Router>
  );
}

export default App;