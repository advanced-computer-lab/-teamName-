import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FlightDetails from './flights/components/flightdetails';

import FlightNew from './flights/components/flightNew'
import Flights from './flights/pages/Flights'
import Flightnavbar from './shared/Flightnavbar';

function Home() {


  return (
    <Router>
      <Route path='/flights/' exact>
        <Flightnavbar />

        <Flights />

      </Route>
      <Route path='/new/flights/' exact>


        <FlightNew />

      </Route>
      <Route path='/' exact>


        <a href="/flights/" className="display-3">Flights</a>
        <a href='/new/flights/' className='display-3'> Create new Flight</a>

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
ReactDOM.render(<Home />, document.getElementById('root'))




