import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Footer from "../component/footers/footer";
import "./dashbord.css";
import SidebarMenu from "../Userdashbboard/sidebar";
import axios from "axios";

const Userdashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [event, setEvents] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [orders, setOrders] = useState({
    pending: { count: 0, orders: [] },
    confirmed: { count: 0, orders: [] },
    shipped: { count: 0, orders: [] },
  });
  const [salesData, setSalesData] = useState({
    shippedOrdersCount: 0,
    todayTotalRevenue: 0,
  });
  const [comparisonData, setComparisonData] = useState({
    todayTotalRevenue: 0,
    yesterdayTotalRevenue: 0,
    salesIncreased: false,
  });
  const [revenue, setRevenue] = useState(null);
  const [profile, setprofile] = useState([]);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/total_products`); // Use the renamed variable
        setEvents(response.data);
      } catch (error) {
        console.error(
          "Error fetching total products:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/total_orders`); // Updated to use apiBaseUrl
        setTotalOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalOrders();
  }, []);

  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/order_now`); // Updated to use apiBaseUrl
        setTodayOrders(response.data);
        console.log("total", response.data);
        setSalesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodayOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/pending_orders`); // Updated to use apiBaseUrl
        console.log("Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, []);

  const xvalues = ["Italy", "France", "Spain", "USA", "Argentina"];
  const yvalues = [55, 49, 44, 24, 15];
  const barColors = ["red", "green", "blue", "orange", "brown"];
  const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const chartRef = useRef();
  const doughnutChartRef = useRef();
  const linechart = useRef();
  const lineChartInstanceRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const doughnutChartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const doughnutCtx = doughnutChartRef.current.getContext("2d");
    const linecharts = linechart.current.getContext("2d");

    if (lineChartInstanceRef.current) {
      lineChartInstanceRef.current.destroy();
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (doughnutChartInstanceRef.current) {
      doughnutChartInstanceRef.current.destroy();
    }

    lineChartInstanceRef.current = new Chart(linecharts, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xvalues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yvalues,
          },
        ],
      },
      options: {
        responsive: true,
        legend: { display: false },
        title: {
          display: true,
          text: "Bar Chart",
        },
      },
    });

    doughnutChartInstanceRef.current = new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: xvalues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yvalues,
          },
        ],
      },
      options: {
        responsive: true,
        legend: { display: true },
        title: {
          display: true,
          text: "Doughnut Chart",
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      if (doughnutChartInstanceRef.current) {
        doughnutChartInstanceRef.current.destroy();
      }
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleChangeOrderStatus = async (
    orderId,
    newStatus,
    userEmail,
    image1,
    fullname,
    name,
    price,
    quantity
  ) => {
    try {
      // Step 1: Update order status via API
      const response = await axios.put(
        `http://localhost:5001/orders/${orderId}/status`,
        { status: newStatus }
      );
  
      if (response.status === 200) {
        console.log("Order status updated successfully");
  
        // Step 2: Send email notification to the user
        await axios.post(`${apiBaseUrl}send-email`, {
          orderId: orderId,
          newStatus: newStatus,
          email: userEmail,
          image: image1,
          username: fullname,
          productname: name,
          price: price,
          quantity: quantity,
        });
  
        console.log("Email sent successfully");
  
        // Step 3: Send a push notification to the user about the status update
        try {
          const notificationResponse = await axios.post(`http://localhost:8089/send-notification`, {
            userEmail: userEmail,
            title: "Order Status Update",
            message: `Your order #${orderId} status has been updated to: ${newStatus}`,
          });
          console.log("Notification response:", notificationResponse.data);
        } catch (error) {
          console.error("Failed to send notification:", error.response?.data || error.message);
        }
        
  
        console.log("Notification sent successfully");
      }
    } catch (error) {
      console.error("Failed to change order status", error);
    }
  };
  

  //getting the total sales of today

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/today_sales_summary`); // Updated to use apiBaseUrl
        setSalesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSalesData();
  }, []);

  //sales comparison

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/sales_comparison`); // Updated to use apiBaseUrl
        setComparisonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComparisonData();
  }, []);

  //last month revenue

  useEffect(() => {
    // Fetch revenue data from the backend
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/last_month_revenue`); // Updated to use apiBaseUrl
        setRevenue(response.data.lastMonthRevenue);
      } catch (err) {
        console.error("Error fetching revenue:", err);
      }
    };

    fetchRevenue();
  }, []);

  //getting the total login user

  useEffect(() => {
    const fetchlogin = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/total-users`); // Updated to use apiBaseUrl
        setprofile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlogin();
  }, []);

  //deleting the user profile

  const onDelete = async (profileId) => {
    try {
      await axios.delete(`${apiBaseUrl}/delete_profile/${profileId}`); // Updated to use apiBaseUrl
      setprofile(profile.filter((item) => item._id !== profileId));
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  return (
    <>
      <div>
        <div className="user-dashboard">
          <div className="user-analysis">
            <h3 className="texts">Total Products</h3>
            <h4 className="texts">{event}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Today Sales</h3>
            <h4 className="texts">{orders.shipped.count}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Total Orders Today</h3>
            <h4 className="texts">{todayOrders}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Refund products</h3>
            <h4 className="texts">0</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Orders in Pending</h3>
            <h4 className="texts">{orders.pending.count}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Orders Confirmed</h3>
            <h4 className="texts">{orders.confirmed.count}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Orders Shipped</h3>
            <h4 className="texts">{orders.shipped.count}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Total Orders</h3>
            <h4 className="texts">{totalOrders}</h4>
          </div>

          <div className="user-analysis">
            <h3 className="texts">last month revenue</h3>
            <h4 className="texts">{revenue}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">products left in stock</h3>
            <h4 className="texts">{totalOrders}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">refund revenue to customer</h3>
            <h4 className="texts">{totalOrders}</h4>
          </div>
          <div className="user-analysis">
            <h3 className="texts">Sales Comparison</h3>
            <h4 className="texts">
              {comparisonData.todayTotalRevenue !== undefined
                ? comparisonData.todayTotalRevenue.toFixed(2)
                : "N/A"}{" "}
              (Today)
            </h4>
            <h4 className="texts">
              {comparisonData.yesterdayTotalRevenue !== undefined
                ? comparisonData.yesterdayTotalRevenue.toFixed(2)
                : "N/A"}{" "}
              (Yesterday)
            </h4>
          </div>
        </div>
      </div>
      <div>
        <div className="user-dashboard">
          <div className="user-analysis" id="chart">
            <h3>User Graph</h3>
            <hr />
            <canvas id="myChart" ref={chartRef}></canvas>
          </div>
          <div className="user-analysis" id="doughnutChart">
            <h3>User Graph</h3>
            <hr />
            <canvas id="myDoughnutChart" ref={doughnutChartRef}></canvas>
          </div>
        </div>
      </div>
      <div>
        <div className="user-dashboard">
          <div className="user-analysis" id="lineChart">
            <h3>User Graph</h3>
            <hr />
            <canvas id="mylinechart" ref={linechart}></canvas>
          </div>
        </div>
      </div>

      <div>
        <div className="user-dashboard">
          <div className="user-analysis" id="pending_status">
            <div className="carts-pregination">
              <div className="carts-items">
                <button
                  className={`btn-cartss fav ${
                    activeTab === "pending" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("pending")}
                >
                  Order in pending
                </button>
              </div>

              <div className="carts-items">
                <button
                  className={`btn-cartss fav ${
                    activeTab === "confirmed" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("confirmed")}
                >
                  Order Confirmed
                </button>
              </div>
              <div className="carts-items">
                <button
                  className={`btn-cartss fav ${
                    activeTab === "shipped" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("shipped")}
                >
                  Order shipped
                </button>
              </div>
            </div>
            <hr />
            <div className="carts-pregination">
              <div className="carts-items">
                {activeTab === "pending" && (
                  <div className="tab-content">
                    <div className="new-products">
                      {orders.pending.orders.length > 0 ? (
                        orders.pending.orders.map((order) => (
                          <div key={order._id}>
                            {order.cartItems.map((item) => (
                              <div key={item.uniqueId} className="product-item">
                                <img
                                  src={`${apiBaseUrl}${item.image1}`} // Updated to use apiBaseUrl
                                  alt={item.name}
                                  className="product-image"
                                />

                                <h3 className="item-new-price">
                                  {order.fullName}
                                </h3>
                                <p>user email: {order.email}</p>
                                <p>product name: {item.name}</p>
                                <h3>user_id: {order._id}</h3>

                                <p>Price: Rs {item.price}</p>
                                <p>Price: Rs {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <div className="order-status-buttons">
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "confirmed",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Confirm Order
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "shipped",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Ship Order
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p>No pending products available</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "confirmed" && (
                  <div className="tab-content">
                    <div className="new-products">
                      {orders.confirmed.orders.length > 0 ? (
                        orders.confirmed.orders.map((order) => (
                          <div key={order._id}>
                            {order.cartItems.map((item) => (
                              <div key={item.uniqueId} className="product-item">
                                <img
                                  src={`${item.image1}`}
                                  alt={item.name}
                                  className="product-image"
                                />
                                <h3 className="item-new-price">
                                  {order.fullName}
                                </h3>
                                <p>Price: Rs {order.email}</p>
                                <h3>user_id: {order._id}</h3>
                                <h4>{item.name}</h4>
                                <p>Price: Rs {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <div className="order-status-buttons">
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "confirmed",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Confirm Order
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "shipped",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Ship Order
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p>No confirmed products available</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "shipped" && (
                  <div className="tab-content">
                    <div className="new-products">
                      {orders.shipped.orders.length > 0 ? (
                        orders.shipped.orders.map((order) => (
                          <div key={order._id}>
                            {order.cartItems.map((item) => (
                              <div key={item.uniqueId} className="product-item">
                                <img
                                  src={`${item.image1}`}
                                  alt={item.name}
                                  className="product-image"
                                />
                                <h3 className="item-new-price">
                                  {order.fullName}
                                </h3>
                                <p>Price: Rs {order.email}</p>
                                <h3>user_id: {order._id}</h3>
                                <h4>{item.name}</h4>
                                <p>Price: Rs {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <div className="order-status-buttons">
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "confirmed",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Confirm Order
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleChangeOrderStatus(
                                        order._id,
                                        "shipped",
                                        order.email,
                                        item.image1,
                                        order.fullName,
                                        item.name,
                                        item.price,
                                        item.quantity
                                      )
                                    }
                                  >
                                    Ship Order
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p>No shipped products available</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-dashboard">
        <div className="user-analysis" id="profile">
          <h3>total User profile</h3>
          <hr />

          <div className="new-products">
            {profile.map((product, index) => (
              <div className="products-item" key={product._id}>
                <div className="slider">
                  <div className="slides">
                    <div className="slide first">
                      <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="pro-img"
                      />
                    </div>
                  </div>
                </div>

                <h3>{product.displayName}</h3>
                <p>Price: Rs {product.email}</p>
                <h3>{product.username}</h3>
                <h3> {product.contact}</h3>
                <span className="item-new-price">{product.email}</span>

                <button
                  className="delete-button"
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </>
  );
};

export default Userdashboard;
