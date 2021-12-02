import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../cart.context';
import axios from 'axios';

import './flightlist.css'
import FlightItem from './flightItem';


function removeEmptyVariables(obj) {
  for (let i in obj) {
    if (obj[i] === '') {

      delete obj[i]
    }
  }

  return obj
}

function FlightList(props) {

  let [allFlights, setAllFlights] = useState();
  let [flights, setFlights] = useState();
  const updateFlights = (id) => {
    let newFlights = flights.filter((flight) => {

      if (flight._id == id) {
        console.log(flight)
        return false;
      }
      else {

        return true;
      }
    })

    setFlights(newFlights);
  }
  const flightFilter = (flight, search) => {
    let conditionsMet = true;
    for (const [key, value] of Object.entries(search)) {
      console.log(key, value, flight[key])
      if (flight[key] === value) {
        conditionsMet = conditionsMet && true;

      }
      else {
        conditionsMet = conditionsMet && false;
      }
    }

    return conditionsMet

  }


  const appContext = useAppContext()


  useEffect(() => {

    const sendRequest = async () => {
      const reqflights = await axios.post('http://localhost:8000/admin/flight/',
        JSON.stringify({}), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAllFlights(reqflights.data.reqFlights);
      setFlights(reqflights.data.reqFlights)
    };
    sendRequest();

  }, [appContext.cart.returnFlight]);

  let isReturn = false;
  useEffect(() => {
    let searchedFlights = [] ;
    if (allFlights) {
      searchedFlights = allFlights.filter(flight => flightFilter(flight, props.query))
      console.log(searchedFlights)
      
    }
    if (!isReturn) 
    setFlights(searchedFlights)
    else 
    isReturn = true;
    console.log(flights)


  }, [props.query]);


  const returnFlight = () => { 
    const departure = appContext.cart.departureFlight

    if (!flights) {
      return
    }
    if (!departure.To) {
      return
    }
    let newFlights = flights.filter((flight) => {
      if (flight.From === departure.To && flight.To === departure.From) {
        return true;
      }
      else {
        return false;
      }
    })
    setFlights(newFlights);
  }


  useEffect(() => {
    props.clearQuery();
    returnFlight()
    isReturn = true;
  }, [appContext.cart.departureFlight])




  return (
    <div className='container '>
      <h1 className='display-4' id='flights'>Flights:</h1>
      <ul className='flightList py-3 mt-2 custom-scrollbar-css p-2'>
        {flights && flights.map(flight =>
          <FlightItem
            key={flight._id}
            id={flight._id}
            FlightNumber={flight.FlightNumber}
            From={flight.From}
            To={flight.To}
            ArrivalDate={flight.ArrivalDate}
            DepartureDate={flight.DepartureDate}
            EconomySeats={flight.EconomySeats}
            BusinessSeats={flight.BusinessSeats}
            Update={updateFlights}
            storage={props}
            returnFlight={returnFlight}
            BusPrice={flight.BusPrice}
            EconPrice={flight.EconPrice}

          />
        )}
      </ul>
    </div>
  )
}

export default FlightList;