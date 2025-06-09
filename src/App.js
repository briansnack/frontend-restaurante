import React from 'react';
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestauranteList from './components/RestauranteList';
import PedidoList from './components/PedidoList';
import CriarPedido from './components/CriarPedido';
import AvaliarPedido from './components/AvaliarPedido';
import PedidosAvaliados from './components/PedidosAvaliados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestauranteList />} />
        <Route path="/restaurante/:id/pedidos" element={<PedidoList />} />
        <Route path="/restaurante/:id/novo-pedido" element={<CriarPedido />} />
        <Route path="/pedido/:id/avaliar" element={<AvaliarPedido />} />
        <Route path="/restaurante/:id/melhores-pedidos" element={<PedidosAvaliados />} />
      </Routes>
    </Router>
  );
}

export default App;