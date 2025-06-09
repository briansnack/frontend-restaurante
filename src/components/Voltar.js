import React from 'react';
import { useNavigate } from 'react-router-dom';

function Voltar() {
  const navigate = useNavigate();
  return (
    <button className="voltar-btn" onClick={() => navigate(-1)}>
      ← Voltar
    </button>
  );
}

export default Voltar;