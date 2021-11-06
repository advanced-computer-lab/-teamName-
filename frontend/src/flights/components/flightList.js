import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom'

import ReactDOM from 'react-dom';
import FlightItem from './flightItem';
function removeEmptyVariables(obj) {
  for (let i in obj) {
    if (!obj[i]) {

      delete obj[i]
    }
  }
  console.log(obj)
  return obj
}

function FlightList(props) {
  const query = useLocation()

  const bodyJ = removeEmptyVariables(props.query)


  let [flights, setFlights] = useState();
  const updateFlights = (id) => {
    setFlights(flights.filter((flight) => {
      if (flight.id != id) {
        return true
      }
    }))
  }
  useEffect(() => {

    const sendRequest = async () => {
      const reqflights = await fetch('http://localhost:8000/flight/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyJ)
      })

      const flightsJson = await reqflights.json();
      console.log(flightsJson)
      setFlights(flightsJson.reqFlights);
    };
    sendRequest();
  }, [props.query])

  return (
    <div className='container'>
      <h1 className='display-4'>Flights:</h1>
      <ul>
        {flights && flights.map(flight =>
          <FlightItem
            id={flight._id}
            key={flight._id}
            From={flight.From}
            To={flight.To}
            Date={flight.Date}
            Cabin={flight.Cabin}
            Seats={flight.Seats}
            Update = {updateFlights}
          />
        )}
      </ul>
    </div>
  )
}

export default FlightList;