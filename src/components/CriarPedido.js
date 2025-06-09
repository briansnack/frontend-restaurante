import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Voltar from './Voltar';

function CriarPedido() {
  const { id } = useParams();
  const [itens, setItens] = useState([{ nomePrato: '', quantidade: 1, precoUnitario: 0 }]);
  const navigate = useNavigate();

  const adicionarItem = () => {
    setItens([...itens, { nomePrato: '', quantidade: 1, precoUnitario: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const novosItens = [...itens];
    novosItens[index][field] = value;
    setItens(novosItens);
  };

  const handleSubmit = async () => {
    const pedido = {
      restauranteId: parseInt(id),
      itens
    };
    await api.post('/pedido', pedido);
    navigate(`/restaurante/${id}/pedidos`);
  };

  return (
    <div className="container">
      <Voltar />
      <h2>Novo Pedido</h2>
      {itens.map((item, idx) => (
        <div key={idx} className="box">
          <input placeholder="Prato" value={item.nomePrato} onChange={e => handleChange(idx, 'nomePrato', e.target.value)} />
          <input type="number" placeholder="Qtd" value={item.quantidade} onChange={e => handleChange(idx, 'quantidade', e.target.value)} />
          <input type="number" placeholder="Preço" value={item.precoUnitario} onChange={e => handleChange(idx, 'precoUnitario', e.target.value)} />
        </div>
      ))}
      <button onClick={adicionarItem}>Adicionar item</button>
      <br /><br />
      <button onClick={handleSubmit}>Salvar Pedido</button>
    </div>
  );
}

export default CriarPedido;