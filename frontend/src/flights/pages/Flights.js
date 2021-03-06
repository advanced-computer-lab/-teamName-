import React, { useEffect, useState } from 'react'
import FlightList from '../components/flightList'
import Flightnavbar from '../../shared/Flightnavbar'
import '../components/flightlist.css'
import Carouselitem from '../../shared/Carouselitem'
import { useAppContext } from '../../cart.context';

const Flights = (props) => {

    const appContext = useAppContext();
    let [form, setForm] = useState({
        From: '',
        To: '',
        BusinessSeats: '',
        EconomySeats: '',
        ArrivalDate: '',
        DepartureDate: '',
        FlightNumber: '',

    });

    const inputHandler = (id, value) => {
        setForm(form => ({
            ...form,
            [id]: value,
        }));
    };
    function removeEmptyVariables(obj) {
        for (let i in obj) {
            if (obj[i] === '') {

                delete obj[i]
            }
        }

        return obj
    }
    const [searchParams, setParams] = useState({})
    const search = (event) => {
        console.log(form)
        setParams(removeEmptyVariables(form))

    }
    const clearQuery = () => {
        setForm({
            From: '',
            To: '',
            Cabin: 'All',
            ArrivalDate: '',
            DepartureDate: '',
        })

        console.log(form);

    }
    useEffect(() => {
        if (appContext.isEditing) {
            alert('Select your edited flights');
        }

    }, [])


    return (
        <div>
            <Flightnavbar  {...props} />
            <Carouselitem />


            <div className='row container-fluid mt-3 worldMap'>
                <div className="col-3">
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        search(e);
                    }}>
                        <div className="card flight-item mt-2 mb-3">
                            <div className="card-header">
                                <h1 className="display-5">Search Filters</h1>
                            </div>
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-3">
                                        <label htmlFor="From" className="form-label">From</label>
                                        <input type="text" className='form-control' id='From' name="From" onChange={e => inputHandler('From', e.target.value)} value={form.From} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="To" className="form-label">To</label>
                                        <input type="text" className='form-control' id='To' name="To" onChange={e => inputHandler('To', e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                    <label htmlFor="Cabin" className="form-label">Cabin</label>
                                        <select className="form-select" id="Cabin" onChange={e => inputHandler('Cabin', e.target.value)} >
                                            <option selected value= "All">Choose a Cabin</option>
                                            <option value="Business">Business</option>
                                            <option value="Economy">Economy</option>
                                            <option value="All">All</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-2">

                                    {/* <div className="col-6">
                                        <label htmlFor="EconomySeats" className="form-check-label">Economy Seats</label>
                                        <input type="checkbox" className='form-check-input'  name="EconomySeats" />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="BusinessSeats" className="form-check-label">Business Seats</label>
                                        <input type="checkbox" className='form-check-input' id='BusinessSeats' name="BusinessSeats" onChange={e => inputHandler('BusinessSeats', e.target.value)} />
                                    </div> */}
                                </div>

                                <div className="row mb-2">
                                    <label htmlFor="Date" className="form-label">Departure Date</label>
                                    <input type="date" className='form-control' id='DepartureDate' name="DepartureDate" onChange={e => inputHandler('DepartureDate', e.target.value)} />
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="Date" className="form-label">??Arrival Date</label>
                                    <input type="date" className='form-control' id='ArrivalDate' name="ArrivalDate" onChange={e => inputHandler('ArrivalDate', e.target.value)} />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className='btn btn-success'>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-8 w-75">
                    {<FlightList query={searchParams} {...props} clearQuery={clearQuery} />}

                </div>
            </div>
        </div>
    )
}

export default Flights
