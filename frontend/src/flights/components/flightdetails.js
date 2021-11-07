import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom'
import axios from 'axios'

const FlightDetails = ({ props }) => {
    const { id } = useParams()
    let [flight, setFlights] = useState();
    let [form, setForm] = useState();
    let history = useHistory();


    const api = ('http://localhost:8000/admin/flight/').concat(id)
    useEffect(() => {
        const sendRequest = async () => {

            const Reqflight = await axios.get(api);


            setFlights(Reqflight.data.flight);
            setForm(flight)

        };
        sendRequest();

    }, [])
    useEffect(() => {
        setForm(flight)
    }, [flight])

    const onSubmitHandler = async (event) => {
        if (event) {
            console.log(form, api)
        }
        await axios.put(('http://localhost:8000/admin/flight/').concat(id),
            JSON.stringify(form),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        history.push('/flights/')
        console.log(history)
    }
    return (
        <div className='container'>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(e)
            }}>

                <div className="row">
                    <div className="col-3">

                        <h1 className="display-5">Flight number</h1>
                        <input type="number" name="" id="" value={form && form.FlightNumber} onChange={(e) => setForm({ ...form, FlightNumber: e.target.value })} />

                    </div>
                    <div className="col-3">

                        <h1 className="display-5">From</h1>
                        <input type="text" name="" id="" value={form && form.From} onChange={(e) => setForm({ ...form, From: e.target.value })} />

                    </div>
                    <div className="col-3">
                        <h1 className="display-5">To</h1>
                        <input type="text" name="" id="" value={form && form.To} onChange={(e) => setForm({ ...form, To: e.target.value })} />

                    </div>

                </div>
                <div className="row">

                    <div className="col-4">
                        <h1 className="display-5">Arrival Date</h1>
                        <input type="date" name="" id="" value={form && form.ArrivalDate} onChange={(e) => setForm({ ...form, ArrivalDate: e.target.value })} />

                    </div>
                    <div className="col-4">
                        <h1 className="display-5">Departure Date</h1>
                        <input type="date" name="" id="" value={form && form.DepartureDate} onChange={(e) => setForm({ ...form, DepartureDate: e.target.value })} />

                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <h1 className="display-5">Economy seats</h1>
                        <input type="number" name="" id="" value={form && form.EconomySeats} onChange={(e) => setForm({ ...form, EconomySeats: e.target.value })} />
                    </div>
                    <div className="col-3">
                        <h1 className="display-5">Buisness seats</h1>
                        <input type="text" name="" id="" value={form && form.BusinessSeats} onChange={(e) => setForm({ ...form, BusinessSeats: e.target.value })} />
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
