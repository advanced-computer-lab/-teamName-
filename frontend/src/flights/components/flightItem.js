import React from 'react'

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
            <div className='row justify-content-center'>
                <div className="col-3 text-center">
                    <a className="btn btn-outline-primary" href={'/flights/'.concat(props.id)}>Details</a>
                </div>
                <div className="col-3 text-center">
                    <form action="" method="delete">
                        <a className="btn btn-outline-primary" href={'/flights/'.concat(props.id)}>Delete</a>
                    </form>
                </div>
            </div>
        </li>
    )
}

export default FlightItem
