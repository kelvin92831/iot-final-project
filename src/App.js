import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  // 定义一个函数用于发送请求
  const fetchData = () => {
    fetch('https://smart-campus.kits.tw/api/api/sensors/ACCELERATION/4c315865-4138-48f8-8513-b527f95621ce?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhY2hlbG9yXzAyIiwidXVpZCI6IjU5ZmJiZWFlLTU0NmEtNGM4My1hNjA1LTNiOTFmZjk0YjdjZiIsIm5hbWUiOiJiYWNoZWxvcl8wMiIsImlhdCI6MTcwNDE5MzI3MCwiZXhwIjoxNzA0Mjc5NjcwfQ.juk-qFzGni9pM-vkwCF0xhbwMz-30zohHElmU8SDTR0&Content-Type=application/json')
      .then(response => response.json())
      .then(data => {
        console.log({data});
        setData(data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  };

  useEffect(() => {
    // 当组件挂载时，立即执行一次请求
    fetchData();
    
    // 设置每10秒执行一次的定时器
    const interval = setInterval(fetchData, 10000);

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []); // 空数组保证 effect 只在挂载和卸载时运行

  return (
    <div>
      <h1>API Response</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
