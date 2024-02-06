import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import drone from "../img/drone.png";
import packageImg from "../img/package.png";
import destination from "../img/destination.png";



export default function CustomizedBoard(props) {
  const [currentPosition, setCurrentPosition] = useState('');
  const [nextPosition, setNextposition] = useState('');
  const [path, setPath] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [pickupPos, setPickupPos ] = useState('');
  const [deliveryPos, setDeliveryPos ] = useState('');
  const [delivered, setDelivered ] = useState('');
  const [pickuped, setPickuped]= useState('');

  useEffect(() => {
    if (props.routePath.route) {
      const routeArray = props.routePath.route.split(',');
      setPath(routeArray);
      setCurrentPosition(routeArray[0]);
      setNextposition(routeArray[1]);
      setPathIndex(0);
      setPickuped(false);
      setDelivered(false);
    }
     if (props.routePath.deliveryPoint) setDeliveryPos(props.routePath.deliveryPoint.toLowerCase());
     if (props.routePath.pickupPosition) setPickupPos(props.routePath.pickupPosition.toLowerCase());
   
  }, [props.routePath]);

  useEffect(() => {
    if(currentPosition.toLowerCase() === pickupPos)
    {
      setPickuped(true);
    }
    if(currentPosition.toLowerCase() === deliveryPos && pickuped)
    {
      setDelivered(true);
    } 
    if (path.length > 0 && pathIndex < path.length) {
      const timer = setTimeout(() => {
        setCurrentPosition(path[pathIndex]);
        setPathIndex(pathIndex + 1);
      }, 1000);
     
      return () => clearTimeout(timer); // Limpa o timer
    }

  }, [path, pathIndex]);

  return (
    <Chessboard
     
      id="standard"
      position= {createPositionObject(currentPosition.toLowerCase(),pickupPos.toLocaleLowerCase(),deliveryPos.toLocaleLowerCase())}
      // onDrop={createPositionOnDrop(currentPosition.toLowerCase(),nextPosition.toLowerCase())}
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
  
    if(!pickuped){
          objeto = {
            [deliveryPos]:'bK',
            [pickupPos]:'wQ',
            [dronePos]:'wK'
          };
     }
    if(pickuped && !delivered){
           objeto = {
            [deliveryPos]:'bK',
            [dronePos]:'wK'

           };
      }
      if(pickuped && delivered){
        objeto = {
         [dronePos]:'wK'
        };
       
   }
   
    return objeto;
  }
  // function createPositionOnDrop(dronePos,nextPosition){

  //   let objeto= {};
  
   
  //     objeto = {
  //       sourceSquare: dronePos,
  //       targetSquare: nextPosition,
  //       piece: 'wK',
  //     };
    
   
  //   return objeto;
  // }
}





