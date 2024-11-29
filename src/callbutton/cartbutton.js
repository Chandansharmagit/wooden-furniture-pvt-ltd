// CallButton.js
import React from "react";
import "./cartbtn.css"; // Create a CSS file for styling
import { useCart } from "../component/contextpage/context";
const CartButton = () => {
  const { count } = useCart();

  const cartpage = () => {
    window.location.href = "/selling-page";
  }

  return (
    <div>
   
    <div className="call-button-cart">
      <span className="call-icon-cart" onClick={cartpage}>
        <svg
        
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          id="phones"
          fill="currentColor"
          class="bi bi-bag-dash"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"
          />
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg><span className="cartcount"><p className="cc">({count})</p></span>
        
      </span>
    </div>
    </div>
  );
};

export default CartButton;
