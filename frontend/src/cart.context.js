import * as React from "react"

const CartContext = React.createContext();

const CartContextProvider = (props) => {
  const [cart,setCart] = React.useState({
    "departureFlight" : {},
    "returnFlight" : {} , 
    "busDepSeats" : [] ,
    "busRetSeats" : [] ,
    "econDepSeats" : [] ,
    "econRetSeats" : [] 

  })

  const addCartItem = (type ,newItem)=>{
    let updatedCart = {...cart};
    updatedCart[type] = newItem
    setCart(updatedCart)
    
    
  }
  const clearCart = () => {
    alert('Cart Cleared')
    setCart({
      "departureFlight" : {},
      "returnFlight" : {} , 
    })
  }
  
  return <CartContext.Provider value={{
    cart ,
    addCartItem,
    clearCart
  }}>{props.children}</CartContext.Provider>;
};

const useAppContext = () => React.useContext(CartContext);

export { CartContextProvider, useAppContext };