import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useAppContext } from '../cart.context';
import Modalitem from './Modalitem';
import './navbar.css'
import './cart.css'
import Multiselect from 'multiselect-react-dropdown';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import StripeCheckout from "react-stripe-checkout";

function add(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    }
    return array;
}

const Cart = (props) => {


    const appContext = useAppContext();

    const [confirm, setConfirm] = useState('Confirm Reservation');
    const [seatsSelectedd, setSeatsSelected] = useState({
        "busDepSeats": appContext.cart.busDepSeats,
        "busRetSeats": appContext.cart.busRetSeats,
        "econRetSeats": appContext.cart.econRetSeats,
        "econDepSeats": appContext.cart.econDepSeats,
    });

    const displaySeats = (type) => {
        let seats = seatsSelectedd[type];
        return seats.map((e, i) => <li key={i} className="seats-element">{e}, </li>)
    }

    const returnKeyLabel = (arr) => {
        let keyLabelArr = [];
        arr.forEach(key => {
            if (key)
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
        let newSeats = { ...seatsSelectedd };
        newSeats[key] = seatsSelected;
        setSeatsSelected(newSeats);
        appContext.addCartItem(key, seatsSelected)
        //console.log(appContext.cart, seatsSelected)

    }
    const [departureFlight, setDeparture] = useState(appContext.cart.departureFlight)
    const [returnFlight, setReturn] = useState(appContext.cart.returnFlight)
    useEffect(() => {
        if (appContext.isEditing) {
            setConfirm('Edit Reservation');
            setTotalSeats(0);
        }
        setDeparture(appContext.cart.departureFlight)
        setReturn(appContext.cart.returnFlight)
    }, [appContext.totalPrice, appContext.isEditing, appContext.isDepart, appContext.isReturn, appContext.cart.departureFlight.From, appContext.cart.returnFlight.From, appContext.cart.departureFlight.To, appContext.cart.returnFlight.To]);


    const updateTotalSeats = () => {
        let busDep = appContext.cart.departureFlight.BusPrice * seatsSelectedd.busDepSeats.length
        let econDep = appContext.cart.departureFlight.EconPrice * seatsSelectedd.econDepSeats.length
        let busRet = appContext.cart.returnFlight.BusPrice * seatsSelectedd.busRetSeats.length
        let econRet = appContext.cart.returnFlight.EconPrice * seatsSelectedd.econRetSeats.length

        let total = (busDep + econDep + busRet + econRet)
        setTotalSeats(total);

        appContext.addCartItem('totalPrice', total)
        return total
    }

    useEffect(() => {

        setDeparture(appContext.cart.departureFlight)
        setReturn(appContext.cart.returnFlight)
        updateTotalSeats();
        setTheDep(isDepartureFlight());
        setTheRet(isReturnFlight());


    }, [totalSeats, setTotalSeats, appContext.cart.busDepSeats.length, appContext.cart.econDepSeats.length, appContext.cart.busRetSeats.length, appContext.cart.econRetSeats.length])


    const isDepartureFlight = () => {

        if (departureFlight && departureFlight.From) {

            return (<div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">From: {departureFlight.From}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">To: {departureFlight.To}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{new Date(departureFlight.DepartureDate).toLocaleDateString()}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {new Date(departureFlight.ArrivalDate).toLocaleDateString()}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">
                        <h2 className="display-5">Seats selected:</h2>
                        {displaySeats('busDepSeats')}
                        <h2 className="display-5">Business seats available: {departureFlight.BusinessSeats.length}</h2>

                        <DropdownMultiselect
                            options={returnKeyLabel(departureFlight.BusinessSeats)}
                            name="busDep"
                            handleOnChange={(selected) => {
                                onSelectSeatHandler('busDepSeats', selected)
                                //updateTotalSeats();
                            }}
                        //selected={(appContext.cart.busDepSeats) ? appContext.cart.busDepSeats : { key: 0, label: "Nothing selected" } }
                        />
                    </div>
                    <div className="col-6">
                        <h2 className="display-5">Seats selected:</h2>
                        {displaySeats('econDepSeats')}
                        <h2 className="display-5">Economy seats available: {departureFlight.EconomySeats.length}</h2>

                        <DropdownMultiselect
                            options={returnKeyLabel(departureFlight.EconomySeats)}
                            name="retDep"
                            handleOnChange={(selected) => {
                                onSelectSeatHandler('econDepSeats', selected)
                                //updateTotalSeats();
                            }}
                        //selected={(appContext.cart.econDepSeats) ? appContext.cart.econDepSeats : { key: 0, label: "Nothing selected" } }
                        />
                    </div>
                </div>
            </div>
            )
        }
        setSeatsSelected({
            "busDepSeats": [],
            "busRetSeats": [],
            "econRetSeats": [],
            "econDepSeats": [],
        })
        return (<> </>);
    }
    const isReturnFlight = () => {
        if (returnFlight && returnFlight.From) {
            return (
                <>
                    <div className="row">
                        <h1 className="display-5"> Return Flight </h1>
                        <div className="col-5">
                            <h2 className="display-5">From: {returnFlight.From}</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="display-5">To: {returnFlight.To}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <h2 className="display-5">Departure:<br />{new Date(returnFlight.DepartureDate).toLocaleDateString()}</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="display-5">Arrival:<br /> {new Date(returnFlight.ArrivalDate).toLocaleDateString()}</h2>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h2 className="display-5">Seats selected:</h2>
                            {displaySeats('busRetSeats')}
                            <h2 className="display-5">Business seats available: {returnFlight.BusinessSeats.length}

                                <DropdownMultiselect
                                    options={returnKeyLabel(returnFlight.BusinessSeats)}
                                    name="busRet"
                                    handleOnChange={(selected) => {
                                        onSelectSeatHandler('busRetSeats', selected)
                                    }}
                                //selected={(appContext.cart.busRetSeats) ? appContext.cart.busRetSeats : { key: 0, label: "Nothing selected" }}
                                />

                            </h2>

                        </div>
                        <div className="col-6">
                            <h2 className="display-5">Seats selected:</h2>
                            {displaySeats('econRetSeats')}
                            <h2 className="display-5">Economy seats available: {returnFlight.EconomySeats.length}</h2>
                            <DropdownMultiselect
                                options={returnKeyLabel(returnFlight.EconomySeats)}
                                name="econRet"
                                handleOnChange={(selected) => {
                                    onSelectSeatHandler('econRetSeats', selected)
                                }}
                            //selected={ (appContext.cart.econRetSeats) ? appContext.cart.econRetSeats : { key: 0, label: "Nothing selected" }}
                            />

                        </div>
                    </div>
                    <Modal.Footer>
                        <StripeCheckout
                            stripeKey="pk_test_51K9DLKEJp0MOvRASGftWvxdsVtFV0TUXtm33HATBblyNeUE2bR0rYPUHKONmydWd3GHxDUHoLiJM0wpUrY9hRblR00PbgLigWR"
                            token={props.makePayment}
                            name="Buy Order"
                            amount={(totalSeats - sessionStorage.getItem('oldPrice')) * 100}

                        >
                            <button className="btn btn-outline-success" type="submit" onClick={() => {

                            }}>
                                {confirm}
                            </button>
                        </StripeCheckout>






                    </Modal.Footer>
                </>
            )
        }
        setSeatsSelected({
            "busDepSeats": [],
            "busRetSeats": [],
            "econRetSeats": [],
            "econDepSeats": [],
        })
        return (<> </>);
    }
    const [theDep, setTheDep] = useState();
    const [theRet, setTheRet] = useState();
    useEffect(() => {
        setTheDep(isDepartureFlight());
        setTheRet(isReturnFlight());
    }, [departureFlight, returnFlight])

    return (
        <>
            <Modalitem show={props.showSummary} close={props.handleCloseDetails} title="Order Summary">
                <div className="product">
                    {theDep}
                    <hr />
                    <hr />
                    {theRet}
                    <hr />
                    <div className="row mt-n1">
                        <div className="col-5 text-center">
                            {appContext.isEditing && <h2 className="display-5 text-start">Old Price: {sessionStorage.getItem('oldPrice')}</h2>}
                        </div>
                        <div className="col-5 text-start">
                            <h2 className="display-5 text-start">Total price: {totalSeats}   </h2>
                        </div>



                    </div>
                </div>



            </Modalitem>
        </>
    )
}

export default Cart
