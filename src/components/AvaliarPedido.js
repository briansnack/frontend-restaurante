import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Voltar from './Voltar';

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
        alert('Este pedido já foi avaliado.');
      } else {
        console.error(error);
        alert('Erro ao enviar avaliação.');
      }
    }
  };

  return (
    <div className="container">
      <Voltar />
      <h2>Avaliar Pedido #{id}</h2>
      <label>Nota (1 a 5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={nota}
        onChange={e => setNota(e.target.value)}
      />
      <label>Comentário:</label>
      <textarea
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        rows={4}
      />
      <button onClick={handleSubmit}>Enviar Avaliação</button>
    </div>
  );
}

export default AvaliarPedido;