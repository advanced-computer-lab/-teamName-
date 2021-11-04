import React, { useEffect } from 'react'

const FlightItem = (props) => {

    return (
        <li>
            <div className="row">
                <div className="col-2">
                    <h2 className="display-5">{props.From}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.To}</h2>
                </div>
                <div className="col-4">
                    <h2 className="">{props.Date}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.Seats}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.Cabin}</h2>
                </div>
            </div>
            <div className='row'>
                <div className="col-6 offset-3">
                    <form onSubmit={async () => await fetch(`http://localhost:8000/flight/${props.id}`, { method: 'DELETE' })}>
                        <button type="submit" className="btn btn-outline-primary">Delete</button>
                    </form>
                    <a className="btn btn-outline-primary" href={'/flights/'.concat(props.id)}>Details</a>
                </div>

            </div>
        </li>
    )
}

export default FlightItem
