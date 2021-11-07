import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import ReactDOM from 'react-dom';
import FlightItem from './flightItem';
function removeEmptyVariables(obj) {
  for (let i in obj) {
    if (!obj[i]) {

      delete obj[i]
    }
  }
 
  return obj
}

function FlightList(props) {
  const query = useLocation()

  const bodyJ = removeEmptyVariables(props.query)


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
        JSON.stringify(bodyJ), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(reqflights.data);
      setFlights(reqflights.data.reqFlights);
    };
    sendRequest();
  }, [props.query])

  return (
    <div className='container'>
      <h1 className='display-4'>Flights:</h1>
      <ul>
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