import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css"; // Import CSS for styling

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [artistDetails, setArtistDetails] = useState(null); // State for artist details
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/owner/order"); // Update URL if needed
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user and artist details
  const fetchDetails = async (order) => {
    try {
        console.log(order.artistId);
        console.log(order.userId);
      
      const artistResponse = await axios.get(
        `http://localhost:4000/api/ownerorder/fetchArtist/${order.artistId}`
      );
      const userResponse = await axios.get(
        `http://localhost:4000/api/ownerorder/fetchUser/${order.userId}`
      );

      setUserDetails(userResponse.data.data);
      setArtistDetails(artistResponse.data.data);
      setSelectedOrder(order);
      setShowModal(true); // Show modal after fetching data
      console.log(artistResponse.data);


    } catch (err) {
      console.error("Error fetching user or artist details:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="orders-container">
      <h2>Order List</h2>
      {orders.length > 0 ? (
        <div className="orders-table">
          <div className="orders-table-header">
            <b>Order ID</b>
            <b>Artist ID</b>
            <b>User ID</b>
            <b>Amount</b>
            <b>Status</b>
            <b>Date</b>
          </div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="orders-table-row"
              onClick={() => fetchDetails(order)} // Handle row click
            >
              <p>{order._id}</p>
              <p>{order.artistId}</p>
              <p>{order.userId}</p>
              <p>₹{order.amount}</p>
              <p>{order.status}</p>
              <p>{new Date(order.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}

      {/* Modal for order details */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3>Order Details</h3>
            {selectedOrder && (
              <div>
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedOrder.amount}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
                <h4>Items:</h4>
                <ul>
                  {selectedOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantity: {item.quantity} - Price: ₹
                      {item.price}
                    </li>
                  ))}
                </ul>
                <h4>Address:</h4>
                <pre>{JSON.stringify(selectedOrder.address, null, 2)}</pre>
              </div>
            )}
            <h3>User Details</h3>
            {userDetails ? (
              <div>
                <p>
                  <strong>Name:</strong> {userDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails.phone}
                </p>
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
            <h3>Artist Details</h3>
            {artistDetails ? (
              <div>
                <p>
                  <strong>Name:</strong> {artistDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {artistDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {artistDetails.phone}
                </p>
              </div>
            ) : (
              <p>Loading artist details...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
