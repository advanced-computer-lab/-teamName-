import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const FlightNew = () => {
    let [form, setForm] = useState({
        From: '',
        To: '',
        BusinessSeats: '',
        EconomySeats: '',
        ArrivalDate: '',
        DepartureDate: '',
        FlightNumber: '',

    });
    let history = useHistory();

    const inputHandler = (id, value) => {
        setForm(form => ({
            ...form,
            [id]: value,
        }));
    };
    const onSubmitHandler = async e => {
        console.log(form)

        await axios.post('http://localhost:8000/admin/newflight/',
            JSON.stringify(form)
            , {
            headers: { 'Content-Type': 'application/json' },

        });
        history.push('/flights')
    }

    return (
        <div>
            <div className='container'>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitHandler(e)
                }}>
                    <div className="row">
                        <div className="col-3">
                            <h1 className="display-5">Flight number</h1>
                            <input type="number" name="" id="" onChange={e => inputHandler('FlightNumber', e.target.value)} />

                        </div>
                        <div className="col-3">

                            <h1 className="display-5">From</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('From', e.target.value)} />

                        </div>
                        <div className="col-3">
                            <h1 className="display-5">To</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('To', e.target.value)} />

                        </div>


                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h1 className="display-5">Departure Date</h1>
                            <input type="date" name="" id="" onChange={e => inputHandler('DepartureDate', e.target.value)} />
                        </div>
                        <div className="col-4">
                            <h1 className="display-5">Arrival Date</h1>
                            <input type="date" name="" id="" onChange={e => inputHandler('ArrivalDate', e.target.value)} />
                        </div>



                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h1 className="display-5">Business Seats</h1>
                            <input type="number" name="" id="" onChange={e => inputHandler('BusinessSeats', e.target.value)} />
                        </div>
                        <div className="col-3">
                            <h1 className="display-5">Economy Seats</h1>
                            <input type="number" name="" id="" onChange={e => inputHandler('EconomySeats', e.target.value)} />
                        </div>
                        <div className="col-3">
                            <button type="submit" className="btn btn-outline-success"> Create </button>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default FlightNew
