import React from 'react'
import './Order.css'
import { useState } from 'react'
import {toast} from "react-toastify";
import { useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';


const Orders = ({url}) => {
  const [orders,setOrders]=useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const id1=localStorage.getItem("artistId");
  const fetchAllOrders=async()=>{
    const response=await axios.get(url+"/api/order/list/"+`${id1}`);
    if(response.data.success)
    {
      setOrders(response.data.data);
      console.log(response.data.data);
      
    }
    else
    {
      toast.error("Error");

    }
  }
  const statusHandler=async(event,orderId,orderEmail)=>{
    console.log(event,orderId,orderEmail)
    const response=await axios.post(url+"/api/order/status",{
      email:orderEmail,
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders();
    }

  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status); // Pre-fill with current status
    setShowPopup(true);
  };

  

  const handleStatusUpdate = async () => {
    setSelectedOrder((prev) => ({ ...prev, status: updatedStatus })); 
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === selectedOrder._id ? { ...order, status: updatedStatus } : order
      )
    );
    const response=await axios.post(url+"/api/order/status",{
      email:selectedOrder.address.email,
      orderId:selectedOrder._id,
      status:updatedStatus
    })
    if(response.data.success)
    {
      toast.success('Order Status Update successful!', {
        position: 'top-right',
      });
      await fetchAllOrders();
    }
    setShowPopup(false);
    
  };

  

  return (
    <>
    <div className="order-add">
    <h3>Order Page</h3>
    <div className="order-list">
      {orders.map((order,index)=>(
        <div key={index} className="order-item">
          <img src={assets.parcel_icon} alt="" />
          <div>
            <p className="order-item-art">
              {order.items.map((item,index)=>{
                if(index==order.items.length-1)
                {
                  return item.name+ " X " +item.quantity
                }
                else
                {
                  return item.name+ " x " +item.quantity+", "
                }
              })}
            </p>
            <p className="order-item-name">
              {order.address.firstName+" "+order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>

              </div>
              <p className="order-item-phone">{order.address.phone}</p>

           
          </div>
          <p>Items:{order.items.length}</p>
          <p>₹{order.amount}</p>
          <div>
          <select onChange={(event)=>statusHandler(event,order._id,order.address.email)}value={order.status}>
            <option value="Art Processing">Art Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button className='view-btn' onClick={() => handleViewOrder(order)}>View Order</button>

         </div>

        </div>

      ))}
    </div>

    
    </div>
    {showPopup && selectedOrder && (
        <div className="popup-overlay">
        <div className="popup-content invoice-layout">
          <h2>Invoice</h2>

          {/* Order Information */}
          <div className="invoice-section">
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.payment ? 'Paid' : 'Pending'}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>
          </div>

          {/* Address Section */}
          <div className="invoice-section">
            <h4>Shipping Address:</h4>
            <p>
              {selectedOrder.address.street},<br />
              {selectedOrder.address.city+", "+selectedOrder.address.state+", "+selectedOrder.address.country+", "+selectedOrder.address.zipcode}
            </p>
          </div>

          {/* Items Table */}
          <div className="invoice-section">
            <h4>Order Items:</h4>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (      
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                          src={"http://localhost:4000"+"/images/"+item.image} 
                          alt="Product"
                          style={{ maxWidth: '100px', height: '100px' }}
                      />
                    </td>
           
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <div className="invoice-section invoice-total">
            <h3>Total Amount: ${selectedOrder.amount}</h3>
          </div>

          {/* Status Update Section */}
          <div className="invoice-section">
          <label htmlFor="status"><strong>Update Status:</strong></label>
              <select
                id="status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value="Art Processing">Art Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
          </div>

          {/* Actions */}
          <div className="popup-actions">
            <button onClick={handleStatusUpdate} className="save-btn">Save</button>
            <button onClick={() => setShowPopup(false)} className="close-btn">Close</button>
          </div>
        </div>
      </div>

      
      )}
    </>
  )
}
export default Orders;
