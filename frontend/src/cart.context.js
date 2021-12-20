import * as React from "react"

const CartContext = React.createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = React.useState({
    "departureFlight": {},
    "returnFlight": {},
    "busDepSeats": [],
    "busRetSeats": [],
    "econDepSeats": [],
    "econRetSeats": [],
    "totalPrice": 0

  })
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDepart, setIsDepart] = React.useState(false);
  const [isReturn, setIsReturn] = React.useState(false);

  const addCartItem = (type, newItem) => {
    let updatedCart = { ...cart };
    updatedCart[type] = newItem
    
    setCart(updatedCart)
    console.log(updatedCart);

  }
  const updateWhole = (newItem) => {

    setCart(newItem)


  }
  const clearCart = () => {
      setCart({
      "departureFlight": {},
      "returnFlight": {},
      "busDepSeats": [],
      "busRetSeats": [],
      "econDepSeats": [],
      "econRetSeats": [],
      "totalPrice": 0
    })
    setIsEditing(false);
    setIsDepart(false) ;
    setIsReturn(false );
  }
  const isEdit = (state) => {
    setIsEditing(state)
  }
  const updateTotalSeats = () => {
    let busDep = cart.departureFlight.BusPrice * cart.busDepSeats.length
    let econDep = cart.departureFlight.EconPrice * cart.econDepSeats.length
    let busRet = cart.returnFlight.BusPrice * cart.busRetSeats.length
    let econRet = cart.returnFlight.EconPrice * cart.econRetSeats.length

    let total = (busDep + econDep + busRet + econRet)
    addCartItem('totalPrice',total);
    return total
}
  return <CartContext.Provider value={{
    cart,
    addCartItem,
    clearCart,
    isEditing,
    isEdit,
    isDepart,
    setIsDepart,
    isReturn,
    setIsReturn,
    updateWhole
  }}>{props.children}</CartContext.Provider>;
};

const useAppContext = () => React.useContext(CartContext);

export { CartContextProvider, useAppContext };