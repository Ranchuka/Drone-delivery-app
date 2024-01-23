import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import Chessboard from 'chessboardjsx';
import CustomBoardDrone from './chessboard/CustomBoardDrone.js';
import axios from 'axios';


function App() {
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);
  const [startPosition, setStartPosition] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [deliveryPoint, setDeliveryPoint] = useState('');
  const [routePath, setRoutePath] = useState('');
 
 
  const resetData = () => {
    setStartPosition('');
    setPickupPoint('');
    setDeliveryPoint('');
    setRoutePath('');
    
  };

  const calculateRoute= ()=>{
    setRoutePath('');
    if(!validatePosition(startPosition) || !validatePosition(pickupPoint) || !validatePosition(deliveryPoint) ) {
      alert("Please, insert a valid position (ex: A1, B3, H8).");
      return;
    }
    if( startPosition.length !=2 || pickupPoint.length !=2 || deliveryPoint.length !=2) {
      alert("Please, insert a valid position ( (ex: A1, B3, H8).");
      return;
    }
    axios.post('http://localhost:8000/calculate-route',{
        positions:[startPosition.toUpperCase(), pickupPoint.toUpperCase(), deliveryPoint.toUpperCase()]
      })
      .then(response =>{

       
        setRoutePath(response.data.route);
        addCalculatedRoute({
          route: response.data.route,
          time: response.data.timer,
        });
        
      })
      .catch(error =>{
        console.error('error to make requisition', error);
      });
  }
 
  const addCalculatedRoute = (newRoute) =>{
    setCalculatedRoutes((oldRoutes) => [newRoute, ...oldRoutes].slice(0,10));
  }

  
  return (
    <div className='App'>
      <h1>Drone Delivery Route calculate</h1>
      <div className='container'>
        <div className='chessboard'>
        <CustomBoardDrone  data-testid="chessboard" routePath={routePath} startPos={startPosition} deliveryPos={deliveryPoint} pickupPos={pickupPoint}
         />
        </div>
        <div className='controls'>
          <input 
            type="text" 
            placeholder="Start Position (e.g., A1)"
            value={startPosition}
          onChange={(e) => setStartPosition(e.target.value.toLowerCase())}
          />
          <input 
          type="text" 
          placeholder="Pickup Point (e.g., C3)"
          value={pickupPoint}
          onChange={(e) => setPickupPoint(e.target.value.toLowerCase())}
          />
          <input 
          type="text" 
          placeholder="Delivery Point (e.g., F6)"
          onChange={(e) => setDeliveryPoint(e.target.value.toLowerCase())}
          />
          <button onClick={calculateRoute}>Calculate route</button>
          <div>
             <h3>Last 10 routes calculated</h3>
          </div>
          <TableLastRoutes routes={calculatedRoutes}/>
        </div>
      </div>
    </div>
  );
}

export default App;

function validatePosition(position)
{

  const regex = /^[A-H][1-8]$/i;

  return regex.test(position);

}

function TableLastRoutes({ routes }) {
  return (
    
    <table>
      <thead>
        <tr>
          
          <th>Route</th>
          <th>Time sec</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td className='route-cell'>{route.route}</td>
            <td>{route.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}