import React, { useState, useEffect } from 'react';

function ApiPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch('您的API地址')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data: ', error));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>API Response</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default ApiPage;
