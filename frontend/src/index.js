<<<<<<< HEAD
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function Greeting() {

    const [flights,setflights]= useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/flight').then(res =>{
          setflights(res.data);
        });
    
      },[])

      console.log(flights);

  return (
    <h1 className="display-1">
        Hello World
    </h1>
=======
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FlightDetails from './flights/components/flightdetails';
import FlightList from './flights/components/flightList'


function Greeting() {
  let [flight, setFlights] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      const flights = await fetch('http://localhost:8000/flight');
      const flightsJson = await flights.json();

      setFlights(flightsJson.reqFlights);
    };
    sendRequest();
  }, [])

  return (
    <Router>
      <Route path='/flights' exact>
        
         
          {flight && <FlightList items={flight} />}
        
      </Route>
      <Route path='/' exact>
        
          
          <a href="/flights" className="display-3">Flights</a>
        
      </Route>
      <Route path='/flights/:id' exact>
        <FlightDetails />

      </Route>
    </Router>
>>>>>>> aebdaf4839ca0d324944367cdfc00a4fa2bef21b
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<Greeting />, document.getElementById('root'))




