import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {
  const navigate = useNavigate();

  function navigateToApiPage() {
    navigate('/api');
  }

  return (
    <div className='home-container'>
      <h1 className='home-title'>智能門窗監控系統</h1>
      <button className='home-button' onClick={navigateToApiPage}>Start</button>
      <button type="button" class="btn btn-outline-success" onClick={navigateToApiPage}>Start</button>
    </div>
  );
}

export default Home;
