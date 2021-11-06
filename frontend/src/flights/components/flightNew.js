import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const FlightNew = () => {
    let [form, setForm] = useState({
        From: '',
        To: '',
        Seats: '',
        Cabin: '',
        Date: '',

    });
    let history = useHistory();
    
    const inputHandler = (id, value) => {
        setForm(formState => ({
            ...formState,
            [id]: value,
        }));
    };
    const onSubmitHandler = async e => {
        console.log(form)
        // await axios.post('')
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

                            <h1 className="display-5">From</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('From', e.target.value)} />

                        </div>
                        <div className="col-3">
                            <h1 className="display-5">To</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('To', e.target.value)} />

                        </div>
                        <div className="col-3">
                            <h1 className="display-5">Date</h1>
                            <input type="date" name="" id="" onChange={e => inputHandler('Date', e.target.value)} />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h1 className="display-5">Seats</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('Seats', e.target.value)} />
                        </div>
                        <div className="col-3">
                            <h1 className="display-5">Cabin</h1>
                            <input type="text" name="" id="" onChange={e => inputHandler('Cabin', e.target.value)} />
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
