import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import drone from "../img/drone.png";
import packageImg from "../img/package.png";
import destination from "../img/destination.png";
import { Chess } from "chess.js";
let pickuped ='';

const game = new Chess();
export default function CustomizedBoard(props) {
  const [currentPosition, setCurrentPosition] = useState('');
  const [path, setPath] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [pickupPos, setPickupPos ] = useState('');
  const [deliveryPos, setDeliveryPos ] = useState('');
  const [startPos, setStartPos ] = useState('');
  const [delivered, setDelivered ] = useState('');



  // Quando as props mudam, defina o caminho
  useEffect(() => {
    if (props.routePath) {
      const routeArray = props.routePath.split(',');
      setPath(routeArray);
      setCurrentPosition(routeArray[0]);
      setPathIndex(0);
      setStartPos(routeArray[0]);
      setDelivered(false);
      pickuped=false;
    }
    if (props.pickupPos) setPickupPos(props.pickupPos);
    if (props.startPos) setStartPos(props.startPos);
    if (props.deliveryPos) setDeliveryPos(props.deliveryPos);
    if (props.delivered) setDeliveryPos(props.delivered);
  }, [props.routePath, props.pickupPos,props.startPos, props.deliveryPos,props.delivered]);

  // Efeito para percorrer o caminho
  useEffect(() => {

    if(currentPosition === deliveryPos ){
      setDeliveryPos('');
      setStartPos('');
      setPickupPos('');
      setDelivered(true);
    }
    if (path.length > 0 && pathIndex < path.length) {
      const timer = setTimeout(() => {
        setCurrentPosition(path[pathIndex]);
        setPathIndex(pathIndex + 1);
      }, 1000); 
      return () => clearTimeout(timer); // Limpa o timer
    }

  }, [path, pathIndex,currentPosition]);

  return (
    <Chessboard
      id="standard"
      position= {createPositionObject(currentPosition.toLowerCase(),pickupPos,deliveryPos)}
      draggable={true}
      transitionDuration={100}
      dropOffBoard="trash"
      pieces={{
        wK: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: isDragging ? squareWidth * 1.75 : squareWidth,
              height: isDragging ? squareWidth * 1.75 : squareWidth
            }}
            src={drone}
            alt={"drone"}
          />
        ),
        wQ: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: isDragging ? squareWidth * 1.75 : squareWidth,
              height: isDragging ? squareWidth * 1.75 : squareWidth
            }}
            src={packageImg}
            alt={"package"}
          />
        ),
        bK: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: isDragging ? squareWidth * 1.75 : squareWidth,
              height: isDragging ? squareWidth * 1.75 : squareWidth
            }}
            src={destination}
            alt={"Destination"}
          />
        )
      }}
    />
  );
  function createPositionObject(dronePos,pickupPos,deliveryPos){

    let objeto= {};
    if(!pickuped ){
      objeto = {
        [dronePos]:'wK',
        [deliveryPos]:'bK',
        [pickupPos]:'wQ'
      };
    }
    if(dronePos === pickupPos ){

      pickuped = true;
    }
    if(pickuped ){
       objeto = {
        [dronePos]:'wK',
        [deliveryPos]:'bK'
       };
      
      }
    
   
    return objeto;
  }

}



