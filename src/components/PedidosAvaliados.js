import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function PedidosAvaliados() {
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get(`/restaurante/${id}/pedidos-melhor-avaliados?top=5`)
      .then(res => setPedidos(res.data));
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pedidos mais bem avaliados do Restaurante #{id}</h2>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #aaa', marginBottom: '1rem', padding: '1rem' }}>
          <p><strong>Valor Total:</strong> R$ {p.valorTotal}</p>
          <p><strong>Nota:</strong> {p.avaliacao?.nota} ⭐</p>
          <p><strong>Comentário:</strong> "{p.avaliacao?.comentario}"</p>
        </div>
      ))}
    </div>
  );
}

export default PedidosAvaliados;