import React from 'react'
import { useAppContext } from '../cart.context';

import './seats.css'

function addOrRemove(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }
}
const SeatPicker = (props) => {
    const appContext = useAppContext();
    let business = [...Array(18).keys()]
    business = business.map((item) => { return (item + 1) })

    const createBusinessRow = (i) => {

        let html = []
        for (let j = i * 6; j < (i + 1) * 6; j++) {
            html.push(<div className="col-1 mx-1 p-0">
                <button className="btn btn-sm btn-primary" onClick={function (e) {
                    e.target.classList.toggle('btn-success')
                    let busDepSeats = appContext.cart.busDepSeats ;
                    addOrRemove(busDepSeats,j);
                    appContext.addCartItem('busDepSeats' , busDepSeats)
                    console.log(appContext)
                }


                }> {business[j]} </button>
            </div>)
            if (j === (i * 6 + 2)) {
                html.push(<div className="col-1">

                </div>)
            }
        }
        return html
    }
    const createBusinessGrid = (count) => {
        let html = [];
        for (let i = 0; i < count; i++) {
            html.push(<div key = { i } className="row w-100 px-0 my-1">
                {createBusinessRow(i)}
            </div>)
        }
        return html
    }
    console.log(business)
    return (
        <>

          {createBusinessGrid(props.seats)}

        </>
    )
}

export default SeatPicker
