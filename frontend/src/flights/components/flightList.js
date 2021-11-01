import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import FlightItem from './flightItem';

function FlightList(props){
    console.log(props)
    return (
        <div className='container'>
         <h1 className='display-4'>Flights:</h1>
         <ul> 
             {props.items.map( flight =>  
               <FlightItem
               id = {flight._id}
                key = {flight._id}
                From = {flight.From}
                To = {flight.To}
                Date = {flight.Date}
                Cabin = {flight.Cabin}
                Seats = {flight.Seats} 
              />
             )}
         </ul>
        </div>
      )
}

export default FlightList;