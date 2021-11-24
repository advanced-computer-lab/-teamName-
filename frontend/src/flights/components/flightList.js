import React, { useEffect, useState } from 'react';
import axios from 'axios' ;



import './flightlist.css'
import FlightItem from './flightItem';
function removeEmptyVariables(obj) {
  for (let i in obj) {
    if (obj[i] == '') {

      delete obj[i]
    }
  }

  return obj
}

function FlightList(props) {

  let body = props.query;
  let body2 = body;
  if (body.ArrivalDate) {
    body2 = {
      ...body,
      ['ArrivalDate']: new Date(body.ArrivalDate).toISOString(),
    }
  }
  if (body.DepartureDate) {
    body2 = {
      ...body,
      ['DepartureDate']: new Date(body.DepartureDate).toISOString()
    }
  }

  // const bodyJ = removeEmptyVariables(body2)


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
  useEffect(() => {

    const sendRequest = async () => {
      const reqflights = await axios.post('http://localhost:8000/admin/flight/',
        JSON.stringify(body2), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFlights(reqflights.data.reqFlights);
    };
    sendRequest();
  }, [props.query])

  return (
    <div className='container'>
      <h1 className='display-4'>Flights:</h1>
      <ul className='flightList'>
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
          />
        )}
      </ul>
    </div>
  )
}

export default FlightList;