import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function RestauranteList() {
  const [restaurantes, setRestaurantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/restaurante').then(response => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Restaurantes</h2>
      {restaurantes.map(rest => (
        <div key={rest.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
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