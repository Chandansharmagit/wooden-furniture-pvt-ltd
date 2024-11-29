import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Wishlist.css'; // Assuming you will add the CSS below in this file.
import Footer from '../footers/footer';
import { useCart } from '../contextpage/context';
const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useCart();
    const navigate = useNavigate();

    const handleViewProduct = (id) => {
        navigate(`/cart/${id}`);
    };

    if (wishlist.length === 0) {
        return <div className="empty-wishlist">No products in the wishlist</div>;
    }

    return (
        <div className="wishlist-container">
            {wishlist.map((product) => (
                <div className="wishlist-item" key={product._id}>
                    <div className="wishlist-image-container">
                        <img
                            src={product.image1}
                            alt={product.name}
                            className="wishlist-image"
                            onClick={() => handleViewProduct(product._id)}
                        />
                    </div>
                    <div className="wishlist-details">
                        <h3 className="wishlist-title">{product.name}</h3>
                        <p className="wishlist-stock">{product.stock} Pieces Left in our stock</p>
                       
                        <button
                            type="button"
                            className="wishlist-view-button"
                            onClick={() => removeFromWishlist(product._id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;
