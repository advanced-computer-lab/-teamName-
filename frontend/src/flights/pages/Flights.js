import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import FlightList from '../components/flightList'

const Flights = () => {
    const query = useLocation();
    const history = useHistory();
    let params = ''

    const [searchParams, setParams] = useState({})
    const search = (event) => {
        // event.preventDefault()

        const data = {
            From: event.target.From.value,
            To: event.target.To.value,
            Cabin: event.target.Cabin.value,

        }

        setParams(data)
        console.log(searchParams)
      

    }

    //   


    return (
        <div className='container row'>
            <div className="col-3">
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    search(e);
                }}>
                    <label htmlFor="From">From</label>
                    <input type="text" id='From' name="From" />
                    <br />
                    <label htmlFor="To">To</label>
                    <input type="text" id='To' name="To" />
                    <br />
                    <label htmlFor="Cabin">Cabin</label>
                    <input type="text" id='Cabin' name="Cabin" />


                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="col-9">
                {<FlightList query={searchParams} />}
            </div>
        </div>
    )
}

export default Flights
