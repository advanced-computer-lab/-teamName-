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
      //console.log(key, value, flight[key])
      if (key === "BusinessSeats" || key === "EconomySeats") {
        console.log(key, value, flight[key].length)
        if (flight[key].length === value) {
          conditionsMet = conditionsMet && true;

        }
        else {
          console.log('false')
          conditionsMet = conditionsMet && false;
        }
      }
      else {
        if (flight[key] === value) {
          conditionsMet = conditionsMet && true;

        }
        else {
          conditionsMet = conditionsMet && false;
        }
      }
    }

    return conditionsMet

  }


  const appContext = useAppContext()


  const sendRequest = async () => {
    const reqflights = await axios.post('http://localhost:8000/admin/flight/',
      JSON.stringify({}), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setAllFlights(reqflights.data.reqFlights);
    setFlights(reqflights.data.reqFlights)
    return(reqflights.data.reqFlights); 
  }
  useEffect(() => {


    sendRequest();

  }, []);

  let isReturn = false;
  useEffect(() => {
    let searchedFlights = [];
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
    return newFlights;
  }
  const finishedEditing = () => {
    sendRequest();
  }


  useEffect(() => {
    if (appContext.isEditing || appContext.isReturn) {
      if (appContext.cart.departureFlight.To != appContext.cart.returnFlight.From) {

        appContext.addCartItem("returnFlight", {});
        appContext.setIsReturn(true)
        isReturn = true;
        returnFlight()
      }
      else {
        return;
      }
    }
    else {
      props.clearQuery();
      returnFlight();
      isReturn = true;
    }

  }, [appContext.cart.departureFlight.From])

  const [confirm, setConfirm] = useState('Flights: ');

  useEffect(() => {
    if (appContext.isEditing) {
      setConfirm('Select the Flight for your Edit');
    }
    else {
      setConfirm("Flights:")
    }
  }, [appContext.isEditing])


  useEffect(() => {
    if (appContext.isReturn) {
      console.log("REturndds", appContext.isReturn)
      sendRequest()
      const flightss = returnFlight();
      isReturn = true;
      setFlights(flightss);
      console.log(flightss);
      console.log(flights)
    }
  }, [appContext.isEditing ])



  return (
    <div className='container '>
      <h1 className='display-4' id='flights'>{confirm}</h1>
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
            finish={finishedEditing}
          />
        )}
      </ul>
    </div>
  )
}

export default FlightList;