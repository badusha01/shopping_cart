import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, produtctToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === produtctToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === produtctToAdd.id?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    return [...cartItems, { ...produtctToAdd, quantity: 1 }];
}; 

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItem: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); 
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
      setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd))
    }


    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}