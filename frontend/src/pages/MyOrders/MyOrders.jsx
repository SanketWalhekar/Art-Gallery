import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useEffect } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";


const MyOrders = () => {

    const{url,token}=useContext(StoreContext)
    const [data,setData]=useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [showPopup, setShowPopup] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState('');


    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setUpdatedStatus(order.status); 
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

      const downloadPDF = () => {

        const doc = new jsPDF();
        const invoiceContent = document.getElementById("invoice-content");
        html2pdf()
          .from(invoiceContent)
          .save("invoice.pdf");
      }; 

      const style = {
        "margin-left": "3px",
        "padding-left":"2px",
        "padding-right":"2px",
        "width":"50px"
      };

  return (
    <>
    <div>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt=""/>
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1)
                            {
                                return item.name+" X "+item.quantity

                            }
                            else{
                                return item.name+" X "+item.quantity+", "


                            }

                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <div>
                            <button onClick={fetchOrders}>Track Order</button>
                            <button style={style} onClick={() => handleViewOrder(order)}>Invoice</button>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
    {showPopup && selectedOrder && (
        <div className="popup-overlay">
        <div className="popup-content invoice-layout" >
            <div class="invoice-content" id="invoice-content">
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
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Delivery Charges</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (      
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>$2</td>
                    <td>${item.quantity * item.price + 2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <div className="invoice-section invoice-total">
            <h3>Total Amount: ${selectedOrder.amount}</h3>
          </div>
        </div>
          {/* Actions */}
          <div className="popup-actions">
            <button onClick={() => setShowPopup(false)} className="close-btn">Close</button>
            <button onClick={downloadPDF} className="download-btn">Download PDF</button>
          </div>
          
        </div>
        
      </div>

      
      )}
    </>
  )
}

export default MyOrders