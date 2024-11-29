import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./statusOrder.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const TrackingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  const location = useLocation();

  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  useEffect(() => {
    const orderIdFromQuery = getQueryParam("orderId");
    if (orderIdFromQuery) {
      setSearchId(orderIdFromQuery);
    }
  }, [location.search]);

  const fetchData = async (searchId) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/orders?orderId=${searchId}`
      );
      const fetchedOrders = response.data;
      console.log("Fetched Orders:", fetchedOrders);
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
      setIsLoading(false);
    } catch (error) {
      setError("Products Not Found to this Id.");
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchId) {
      fetchData(searchId);
    }
  }, [searchId]);

  const getStatusClass = (status, currentStatus) => {
    const statusOrder = ["Order pending", "confirmed", "shipped", "completed"];
    const statusIndex = statusOrder.indexOf(status);
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    let statusClass = "";
    if (status === currentStatus) {
      statusClass = "tracking-order-step--current";
    } else if (statusIndex < currentStatusIndex) {
      statusClass = "tracking-order-step--completed";
    } else {
      statusClass = "dimmed";
    }

    switch (status) {
      case "Order pending":
        return `${statusClass} tracking-order-step--pending`;
      case "confirmed":
        return `${statusClass} tracking-order-step--confirmed`;
      case "shipped":
        return `${statusClass} tracking-order-step--shipped`;
      case "completed":
        return `${statusClass} tracking-order-step--completed`;
      default:
        return statusClass;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getStatusTimestamp = (status, statusHistory) => {
    const statusEntry = statusHistory.find((entry) => entry.status === status);
    return statusEntry ? statusEntry.updatedAt : null;
  };

  const statuses = ["Order pending", "confirmed", "shipped", "completed"];

  const getStatusMessage = (status) => {
    switch (status) {
      case "Order pending":
        return "Your order is pending.";
      case "confirmed":
        return "Your order is confirmed            ";
      case "shipped":
        return "Your order has been shipped           ";
      case "completed":
        return "Your order is completed           ";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="tracking-order-container">
        <main className="wrapper-ids">
          <input
            type="text"
            placeholder="Enter your Tracking ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <span>Enter your Tracking ID</span>
        </main>

        <div className="tracking-order-wrapper">
          <p className="tracking-order-info">
            Timestamp will change whenever your products are prepared for
            shipping. We will inform you through email.
          </p>
        </div>

        <div className="tracking-order-wrapper">
          {isLoading ? (
            <p>Please Enter Product Id or Order Id.</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredOrders.length === 0 ? (
            <p>No orders found for the given ID.</p>
          ) : (
            <div className="tracking-order-content">
              {filteredOrders.map((order, index) => (
                <div key={index} className="tracking-order">
                  <div className="tracking-order-header">
                    <p className="tracking-order-id">Order ID: {order._id}</p>
                    <p className="tracking-order-info">
                      You will receive your order within 3 days if you are
                      outside of Rautahat district. Otherwise, you will receive
                      your order within 1 day.
                    </p>
                  </div>
                  <div className="tracking-order-steps">
                    {statuses.map((status, statusIndex) => (
                      <div
                        key={statusIndex}
                        className={`tracking-order-step ${getStatusClass(
                          status,
                          order.status
                        )}`}
                      >
                        <span className="tracking-order-step__indicator"></span>
                        <p className="tracking-order-step__text">
                          <br />
                          {order.statusHistory &&
                          order.statusHistory.length > 0 ? (
                            <>
                              {getStatusTimestamp(
                                status,
                                order.statusHistory
                              ) ? (
                                <>
                                  <span className="tracking-order-step__message">
                                    {getStatusMessage(status)}
                                  </span>
                                  <span className="tracking-order-step__date">
                                    {formatDate(
                                      getStatusTimestamp(
                                        status,
                                        order.statusHistory
                                      )
                                    )}
                                  </span>
                                  <span className="tracking-order-step__time">
                                    {formatTime(
                                      getStatusTimestamp(
                                        status,
                                        order.statusHistory
                                      )
                                    )}
                                  </span>
                                </>
                              ) : (
                                <span>Updating soon</span>
                              )}
                            </>
                          ) : (
                            <span>Updating Soon.!</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default TrackingOrder;
