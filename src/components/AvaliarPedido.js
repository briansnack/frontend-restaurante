import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function AvaliarPedido() {
  const { id } = useParams();
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/avaliacao', {
        pedidoId: parseInt(id),
        nota,
        comentario
      });
      alert('Avaliação enviada com sucesso!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Este pedido já foi avaliado. Só é possível enviar uma avaliação por pedido.');
      } else {
        console.error(error);
        alert('Ocorreu um erro ao enviar a avaliação. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Avaliar Pedido #{id}</h2>
      <label>Nota (1 a 5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={nota}
        onChange={e => setNota(e.target.value)}
        style={{ marginBottom: '1rem', display: 'block' }}
      />
      <label>Comentário:</label>
      <textarea
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit}>Enviar Avaliação</button>
    </div>
  );
}

export default AvaliarPedido;