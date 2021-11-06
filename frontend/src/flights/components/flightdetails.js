import React, { useEffect, useState } from 'react';
import { useHistory, useParams ,Redirect } from 'react-router-dom'
import axios from 'axios'

const FlightDetails = ({ props }) => {
    const { id } = useParams()
    let [flight, setFlights] = useState();
    let [form, setForm] = useState();
    let history = useHistory();


    const api = ('http://localhost:8000/flight/').concat(id)
    useEffect(() => {
        const sendRequest = async () => {

            const Reqflight = await fetch(api);
            const flightJson = await Reqflight.json();

            setFlights(flightJson.flight);
            setForm(flight)
            
        };
        sendRequest();
       
    }, [])
    useEffect(() => {
        setForm(flight)
    }, [flight])
    
    const onSubmitHandler = async (event) => {
        if (event) {
            console.log(form , api)
        }
        await fetch(('http://localhost:8000/flight/').concat(id), {
            method: 'PUT' ,
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(form)
        })
        history.push('/flights/')
        console.log(history)

    }
    // console.log(id, props, flight);
    return (
        <div className='container'>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(e)
            }}>
                <div className="row">
                    <div className="col-3">

                        <h1 className="display-5">From</h1>
                        <input type="text" name="" id="" value={form && form.From} onChange={(e) => setForm({ ...form, From: e.target.value })} />

                    </div>
                    <div className="col-3">
                        <h1 className="display-5">To</h1>
                        <input type="text" name="" id="" value={form && form.To} onChange={(e) => setForm({ ...form, To: e.target.value })} />

                    </div>
                    <div className="col-3">
                        <h1 className="display-5">Date</h1>
                        <input type="date" name="" id="" value={form && form.Date} onChange={(e) => setForm({ ...form, Date: e.target.value })} />

                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <h1 className="display-5">Seats</h1>
                        <input type="number" name="" id="" value={form && form.Seats} onChange={(e) => setForm({ ...form, Seats: e.target.value })} />
                    </div>
                    <div className="col-3">
                        <h1 className="display-5">Cabin</h1>
                        <input type="text" name="" id="" value={form && form.Cabin} onChange={(e) => setForm({ ...form, Cabin: e.target.value })} />
                    </div>
                    <div className="col-3">
                        <button type="submit" className="btn btn-outline-success"> Edit </button>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default FlightDetails
