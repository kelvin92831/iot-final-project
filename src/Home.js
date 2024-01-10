import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function navigateToApiPage() {
    navigate('/api');
  }

  return (
    <div>
      <h1>智能門窗監控系統</h1>
      <button onClick={navigateToApiPage}>开始</button>
    </div>
  );
}

export default Home;
