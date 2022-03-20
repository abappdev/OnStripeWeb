import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "React by AB AppDev",
    price: 10,
    productBy: "AB AppDev"
  })


  const makePayment = async token => {
    const body = {
      token, product
    }
    const header = {
      "Content-Type": "application/json"
    }

    try {
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: header,
        body: JSON.stringify(body)
      });
      console.log("Payment Successful");
      const { status } = response;
      console.log(status);
    } catch (error) {
      console.log("Payment Failed");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name='Buy React Course'
          amount={product.price * 100}
        >
          <button className="btn-large blue">Buy React Course at {product.price * 100} INR</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
