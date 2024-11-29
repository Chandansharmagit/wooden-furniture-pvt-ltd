import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import "./Allorder.css";
import Footer from "../component/footers/footer";
import SidebarMenu from "./sidebar";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable
const Allorder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const previousDataRef = useRef([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/orders`);
      const newData = response.data.reverse();

      const newOrderIds = newData.map((order) => order._id);
      const previousOrderIds = previousDataRef.current.map(
        (order) => order._id
      );
      const newOrders = newData.filter(
        (order) => !previousOrderIds.includes(order._id)
      );

      setData(
        newData.map((order) => ({
          ...order,
          isNew: newOrders.some((newOrder) => newOrder._id === order._id),
        }))
      );
      previousDataRef.current = newData;
    } catch (error) {
      setError("Failed to fetch orders");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleStatusChange = useCallback(async (orderId, status) => {
    try {
      await axios.put(`${apiBaseUrl}/orders/${orderId}`, { status });
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  }, []);

  const handleDeleteOrder = useCallback(async (orderId) => {
    try {
      await axios.delete(`${apiBaseUrl}/orders/${orderId}`);
      setData((prevData) => prevData.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    return data.filter((order) =>
      order._id.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [data, searchInput]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search User Orders by User ID"
        value={searchInput}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="containering">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className={`order-card ${order.isNew ? "new-order" : ""}`}
          >
            {order.isNew && (
              <>
                <div className="red-dot"></div>
                <div className="new-text">NEW</div>
              </>
            )}
            <div className="order-header">{order.fullName}</div>
            <div className="order-header">Order ID: {order._id}</div>
            <div className="order-details">Email: {order.email}</div>
            <div className="order-header">Status : {order.status}</div>
            <div className="order-details">
              Address: {order.address}, {order.city}, {order.region},{" "}
              {order.postalCode}
            </div>
            <div className="order-details">Contact: {order.contact}</div>
            <div className="order-details">
              Expiration Date: {order.expirationDate}
            </div>
            <div className="order-details">CVC: {order.cvc}</div>
            <div className="order-details">Order Items:</div>
            {order.cartItems.map((item) => {
              const imagePath = item.image1.startsWith("/")
                ? item.image1.slice(1)
                : item.image1;

              return (
                <div key={item.uniqueId} className="order-item">
                  <div>{item.name}</div>
                  <div>Price: ${item.price}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Color: {item.color}</div>
                  <div>Images:</div>
                  <div>
                    <img
                      src={`${apiBaseUrl}/${imagePath}`} // Single slash here
                      alt={item.name}
                      width="100%"
                      height="auto"
                    />
                  </div>
                </div>
              );
            })}

            <div className="order-actions">
              <button
                onClick={() => handleStatusChange(order._id, "Pending")}
                className="status-button"
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "Confirmed")}
                className="status-button"
              >
                Confirmed
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "Shipped")}
                className="status-button"
              >
                Shipped
              </button>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="delete-button"
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
      <SidebarMenu />
      <Footer />
    </div>
  );
};

export default Allorder;
