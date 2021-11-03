import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route , useLocation } from 'react-router-dom'
import FlightDetails from './flights/components/flightdetails';
import FlightList from './flights/components/flightList'
import Flights from './flights/pages/Flights'

function Greeting() {
  

  return (
    <Router>
      <Route path='/flights/' >
        
         
           <Flights/>
        
      </Route>
      <Route path='/' exact>
        
          
          <a href="/flights/?" className="display-3">Flights</a>
        
      </Route>
      <Route path='/flights/:id' exact>
        <FlightDetails />

      </Route>
    </Router>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<Greeting />, document.getElementById('root'))




