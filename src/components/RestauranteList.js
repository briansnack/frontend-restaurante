import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Voltar from './Voltar';

function RestauranteList() {
  const [restaurantes, setRestaurantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/restaurante').then(response => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Voltar />
      <h2>Restaurantes</h2>
      {restaurantes.map(rest => (
        <div key={rest.id} className="box">
          <h3>{rest.nome}</h3>
          <p>Categoria: {rest.categoria}</p>
          <p>Localização: {rest.localizacao}</p>
          <button onClick={() => navigate(`/restaurante/${rest.id}/pedidos`)}>Ver Pedidos</button>
          <button onClick={() => navigate(`/restaurante/${rest.id}/novo-pedido`)}>Novo Pedido</button>
          <button onClick={() => navigate(`/restaurante/${rest.id}/melhores-pedidos`)}>Melhores Pedidos</button>
        </div>
      ))}
    </div>
  );
}

export default RestauranteList;