
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './componentes/Header';
import Nav from './componentes/Nav';
import Footer from './componentes/Footer';
import Home from './paginas/Home';
import NovedadesPage from './paginas/NovedadesPage';
import Comprar from './paginas/Comprar';
import Vender from './paginas/Vender';
import ContactoPage from './paginas/ContactoPage'


function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/comprar" element={<Comprar />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />


    </div>
  );
}

export default App;
