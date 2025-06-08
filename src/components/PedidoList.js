import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function PedidoList() {
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/pedido').then(response => {
      const pedidosRest = response.data.filter(p => p.restauranteId === parseInt(id));
      setPedidos(pedidosRest);
    });
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pedidos do Restaurante {id}</h2>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #aaa', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Valor Total:</strong> R$ {p.valorTotal.toFixed(2)}</p>
          <h4>Itens:</h4>
          <ul>
            {p.itens.map(i => (
              <li key={i.id}>{i.nomePrato} - {i.quantidade} x R$ {i.precoUnitario}</li>
            ))}
          </ul>
          {p.avaliacao ? (
            <p>Avaliação: {p.avaliacao.nota} ⭐ — "{p.avaliacao.comentario}"</p>
          ) : (
            <button onClick={() => navigate(`/pedido/${p.id}/avaliar`)}>Avaliar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default PedidoList;