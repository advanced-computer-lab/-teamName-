import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useAppContext } from '../cart.context';
import Modalitem from './Modalitem';
import './navbar.css'
import './cart.css'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";


function add(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    }
    return array;
}

const Cart = (props) => {


    const appContext = useAppContext();

    const returnKeyLabel = (arr) => {
        let keyLabelArr = [];
        arr.forEach(key => {
            keyLabelArr.push({ "key": key, "label": key.toString() })
        })
        return keyLabelArr
    }
    const [totalSeats, setTotalSeats] = useState(0)
    const onSelectSeatHandler = (key, values) => {
        let seatsSelected = []
        values.forEach((item) => {
            seatsSelected = add(seatsSelected, parseInt(item))

        })

        appContext.addCartItem(key, seatsSelected)
       
        console.log(appContext.cart, seatsSelected)

    }


    const updateTotalSeats = () => {
        let busDep = appContext.cart.departureFlight.BusPrice * appContext.cart.busDepSeats.length
        let econDep = appContext.cart.departureFlight.EconPrice * appContext.cart.econDepSeats.length
        let busRet = appContext.cart.returnFlight.BusPrice * appContext.cart.busRetSeats.length
        let econRet = appContext.cart.returnFlight.EconPrice * appContext.cart.econRetSeats.length
        
        setTotalSeats(busDep + econDep + busRet + econRet)
        
        return (busDep + econDep + busRet + econRet)
    }
    useEffect(()=> {
        const price = updateTotalSeats()
        appContext.addCartItem('totalPrice' , price)
        console.log(appContext.cart)
    }, [appContext.cart.busDepSeats.length , appContext.cart.econDepSeats.length , appContext.cart.busRetSeats.length ,appContext.cart.econRetSeats.length ])


    const isDepartureFlight = () => {

        if (appContext.cart.departureFlight.id) {
            
            return (<>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">From: {appContext.cart.departureFlight.From}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">To: {appContext.cart.departureFlight.To}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{appContext.cart.departureFlight.DepartureDate}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {appContext.cart.departureFlight.ArrivalDate}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">
                        <h2 className="display-5">Business seats available: {appContext.cart.departureFlight.BusinessSeats.length}</h2>

                        <DropdownMultiselect
                            options={returnKeyLabel(appContext.cart.departureFlight.BusinessSeats)}
                            name="busDep seats"
                            handleOnChange={(selected) => {
                                onSelectSeatHandler('busDepSeats', selected)
                                updateTotalSeats();
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <h2 className="display-5">Economy seats available: {appContext.cart.departureFlight.EconomySeats.length}</h2>
                        <DropdownMultiselect
                            options={returnKeyLabel(appContext.cart.departureFlight.EconomySeats)}
                            name="retDep seats"
                            handleOnChange={(selected) => {
                                onSelectSeatHandler('econDepSeats', selected)  
                                updateTotalSeats();
                            }}
                        />
                    </div>
                </div>
            </>
            )
        }
        return (<> </>);
    }
    const isReturnFlight = () => {
        if (appContext.cart.returnFlight.id) {
            return (
                <>
                    <div className="row">
                        <h1 className="display-5"> Return Flight </h1>
                        <div className="col-5">
                            <h2 className="display-5">From: {appContext.cart.returnFlight.From}</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="display-5">To: {appContext.cart.returnFlight.To}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <h2 className="display-5">Departure:<br />{appContext.cart.returnFlight.DepartureDate}</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="display-5">Arrival:<br /> {appContext.cart.returnFlight.ArrivalDate}</h2>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h2 className="display-5">Business seats available: {appContext.cart.returnFlight.BusinessSeats.length}
                                <DropdownMultiselect
                                    options={returnKeyLabel(appContext.cart.returnFlight.BusinessSeats)}
                                    name="busRet"
                                    handleOnChange={(selected) => {
                                        onSelectSeatHandler('busRetSeats', selected)
                                    }} />
                            </h2>

                        </div>
                        <div className="col-6">
                            <h2 className="display-5">Economy seats available: {appContext.cart.returnFlight.EconomySeats.length}</h2>
                            <DropdownMultiselect
                                options={returnKeyLabel(appContext.cart.returnFlight.EconomySeats)}
                                name="econRet"
                                handleOnChange={(selected) => {
                                    onSelectSeatHandler('econRetSeats', selected)
                                }} />
                        </div>
                    </div>
                    <Modal.Footer>

                        <button className="btn btn-outline-success" onClick={() => { props.confirmFlight(); props.handleCloseDetails() }}>
                            Confirm Reservation
                        </button>

                    </Modal.Footer>
                </>
            )
        }
        return (<> </>);
    }

    return (
        <>
            <Modalitem show={props.showSummary} close={props.handleCloseDetails} title="Order Summary">

                {isDepartureFlight()}
                <hr />
                <hr />
                {isReturnFlight()}
                <Modal.Footer>
                    <div className="row">
                        <h2 className="display-5">Total price : {totalSeats}</h2>
                    </div>
                </Modal.Footer>


            </Modalitem>
        </>
    )
}

export default Cart
