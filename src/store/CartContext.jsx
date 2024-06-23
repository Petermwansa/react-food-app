import React, { createContext, useReducer, useState } from 'react'

// this obj will spread the data to other components
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            // if we did have that item, we add it 
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            // if we did not have the item in the Array, we push/add it 
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

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems}

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

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    }
    
    // console.log(cartContext);


  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;
