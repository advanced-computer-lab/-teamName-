import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

const FlightDetails = ({ props }) => {
    const { id } = useParams()
    let [flight, setFlights] = useState();
    useEffect(() => {
        const sendRequest = async () => {
            const api = ('http://localhost:8000/flight/').concat(id)
            const Reqflight = await fetch(api);
            const flightJson = await Reqflight.json();

            setFlights(flightJson.flight);
        };
        sendRequest();
    }, [])
    // console.log(id, props, flight);
    return (
        <div>
            <div className="row container">
                <div className="col-3">
                    <h1 className="display-5">{flight && flight.From}</h1>
                    
                </div>
                <div className="col-3">
                    <h1 className="display-5">{flight && flight.To}</h1>
                    
                </div>
                <div className="col-3">
                    <h1 className="display-5">{flight && flight.Date}</h1>
                    
                </div>

            </div>

        </div>
    )
}

export default FlightDetails
