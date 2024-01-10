import React, { useState, useEffect } from 'react';

function ApiPage() {
  const [sensorId, setSensorId] = useState('');
  const [value, setValue] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://smart-campus.kits.tw/api/api/sensors/ACCELERATION/4c315865-4138-48f8-8513-b527f95621ce?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhY2hlbG9yXzAyIiwidXVpZCI6IjU5ZmJiZWFlLTU0NmEtNGM4My1hNjA1LTNiOTFmZjk0YjdjZiIsIm5hbWUiOiJiYWNoZWxvcl8wMiIsImlhdCI6MTcwNDg3MzE5MiwiZXhwIjoxNzA0OTU5NTkyfQ.QNCH9OpVIv0LuLnVLR9wmjjbmk6T7EomyxoU__Ieazo&Content-Type=application/json')
        .then(response => response.json())
        .then(data => {
          setSensorId(data.sensorId);
          setValue(data.value);
          setTimestamp(data.timestamp);
        })
        .catch(error => console.error('Error fetching data: ', error));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>API Response</h1>
      <p>Sensor ID: {sensorId}</p>
      <p>Value: {value}</p>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
}

export default ApiPage;
