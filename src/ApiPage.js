import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col } from 'react-bootstrap';
import './ApiPage.css'
import Button from 'react-bootstrap/Button';

function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  });
}

function ApiPage() {
  const [sensorId, setSensorId] = useState('');
  const [value, setValue] = useState(100.123456);
  const [timestamp, setTimestamp] = useState(100);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://smart-campus.kits.tw/api/api/sensors/ACCELERATION/4c315865-4138-48f8-8513-b527f95621ce?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhY2hlbG9yXzAyIiwidXVpZCI6IjU5ZmJiZWFlLTU0NmEtNGM4My1hNjA1LTNiOTFmZjk0YjdjZiIsIm5hbWUiOiJiYWNoZWxvcl8wMiIsImlhdCI6MTcwNDk1OTgwMiwiZXhwIjoxNzA1MDQ2MjAyfQ.EiN1h97fwpjU10aD3XiY6FCN3TwsqolA8dyvTmui55M&Content-Type=application/json')
        .then(response => response.json())
        .then(data => {
          setSensorId(data.sensorId);

          const formattedValue = data.value.toFixed(2);
          if (Math.abs(value - formattedValue) > 15 && Notification.permission === "granted") {
            new Notification("警告", { body: "有人入侵！！位置：窗戶1" });
          }
          setValue(formattedValue);

          const date = new Date(data.timestamp);
          const formattedDate = date.toLocaleString();
          setTimestamp(formattedDate);


        })
        .catch(error => console.error('Error fetching data: ', error));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderCard = () => (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>前門</Card.Title>
        <Card.Text>
          Sensor ID: {sensorId}<br />
          Value: {value}<br />
          Timestamp: {timestamp}
        </Card.Text>
      </Card.Body>
    </Card>
  );

  const renderCardNone = (sensorname) => (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>{sensorname}</Card.Title>
        <Card.Text>
          Sensor ID: N/A<br />
          Value: N/A<br />
          Timestamp: N/A
        </Card.Text>
      </Card.Body>
    </Card>
  );

  function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }


  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <div>\t</div>
      <Navbar.Brand href="#">智能門窗監控系統</Navbar.Brand>
      <Button variant="dark" onClick={requestNotificationPermission} className='notification-button'>notification</Button> 
      <Nav className="mr-auto">
        <Nav.Link href="#features">history</Nav.Link>
        <Nav.Link href="#pricing">help</Nav.Link>
      </Nav>
    </Navbar>
    <div className='api-container'>
        <Row className='window-sensors'>
          <h3 className='sensorGroup-title'>門</h3>
          <Col>{renderCard()}</Col>
          <Col>{renderCardNone('後門')}</Col>
          <Col>{renderCardNone('側門')}</Col>
        </Row>
      
        <Row className='door-sensors'>
          <h3 className='sensorGroup-title'>窗戶</h3>
          <Col>{renderCardNone('窗戶1')}</Col>
          <Col>{renderCardNone('窗戶2')}</Col>
          <Col>{renderCardNone('窗戶3')}</Col>
        </Row>
      
    </div>
    </>
  );
}

export default ApiPage;
