import { createSelector } from 'reselect';

//input selector doesnot use createselector
//output selector uses createselector

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity
            , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedPrice, cartItem) =>
                accumalatedPrice + cartItem.quantity + cartItem.price
            , 0
        )
)