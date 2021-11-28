import React from 'react';
import { createContext, useContext, useState } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FlightDetails from './flights/components/flightdetails';

import FlightNew from './flights/components/flightNew'
import Flights from './flights/pages/Flights'

import { CartContextProvider, useAppContext } from './cart.context'




function Home() {

  console.log(useAppContext())

  return (
    <CartContextProvider >
      <Router>
        <Route path='/flights/' exact>


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
    </CartContextProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<Home />, document.getElementById('root'))




// const Component = ({ count, handleIncrementClick, handleDecrementClick }) => <Router>
//   <Route path='/flights/' exact>


//     <Flights />

//   </Route>
//   <Route path='/new/flights/' exact>


//     <FlightNew />

//   </Route>
//   <Route path='/' exact>


//     <a href="/flights/" className="display-3">Flights</a>
//     <a href='/new/flights/' className='display-3'> Create new Flight</a>

//   </Route>
//   <Route path='/flights/:id' exact>

//     <FlightDetails />

//   </Route>
// </Router>;


// const countReducer = function (state = sessionStorage, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return state;
//     case "DECREMENT":
//       return state;
//     default:
//       return state;
//   }
// };
// let store = createStore(countReducer);
// const mapStateToProps = state => {
//   return {
//     count: state
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
//     handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
//   }
// };
// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);