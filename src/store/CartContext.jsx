import React, { createContext, useReducer, useState } from 'react'

// this obj will spread the data to other components
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            // if we did have that item, we add to it 
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            // if we did not have the item in the Array, we push/add it to the cart  
            updatedItems.push({...action.item, quantity: 1})
        }

        // then we return an updated state 
        return {...state, items: updatedItems}
    }

    if (action.type === 'REMOVE_ITEM') {
        //we update the state to remove a meal item
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        // we check if the quantity of the items with that id is 1, we just remove it using the Splice method....
        //else, we reduce the quantity by 1 on each click
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // we then finally return the updated state after the action and the new array of updated items 
        return { ...state, items: updatedItems}

    }

    // here we are clearing the cart 
    if (action.type === "CLEAR_CART") {
        // we return a new state that copies the old state and then sets the items to an empty array this clears the cart 
        return  {
            ...state, items: []
        }
    }


    return state;
}

export const CartContextProvider = ({children}) => {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: []})



    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item})
    }
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id})
    }
    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    }


    
    // console.log(cartContext);


  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;
