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

  const appContext = useAppContext()

 const useUpdateList = () => { useEffect(() => {
    let body = props.query;
    let body2 = body;
    if (body.ArrivalDate) {
      body2 = {
        ...body,
        ['ArrivalDate']: new Date(`${body.ArrivalDate}T24:00`).toISOString(),
      }
    }
    if (body.DepartureDate) {
      body2 = {
        ...body,
        ['DepartureDate']: new Date(`${body.DepartureDate}T24:00`).toISOString()
      }
    }

    body2 = removeEmptyVariables(body2)
    const sendRequest = async () => {

      const reqflights = await axios.post('http://localhost:8000/admin/flight/',
        JSON.stringify(body2), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(reqflights.data.reqFlights)
      setFlights(reqflights.data.reqFlights);
    };
    
    sendRequest();
  }, [props.query, appContext.cart.returnFlight ]); }

  useUpdateList()
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

    

    returnFlight()
    console.log(appContext.cart);
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