import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I5DelFneqv2OWruKG8N3xcZ4csaI4JH8mHZMBu2ckW5P16Wj2nfe16Gvy5fp0gBVaBJXrQHEidvjYamjcpeCg4C00f8hYJYLv';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful!!!');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Test Payment Limited'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/Cuz.svg'
            description={`Your total is $${price}`}
            amountt={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;