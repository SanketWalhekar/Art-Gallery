import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import { sendEmail } from "./Common.js";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing user order for frontend
const placeOrder =async(req,res)=>{

    const frontend_url="http://localhost:5173";

    try{
        const newOrder=new orderModel({
            artistId:req.body.artistId,
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({success:true,session_url:session.url})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const verifyOrder=async(req,res)=>
{
    const{orderId,success}=req.body;
    try{
        if(success=="true")
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})


        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
       
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// users orders for frontend

const userOrders=async (req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})

    }
    catch(error){
        console.log(error);
        res.json({success:false,messsage:"Error"});
    }

}

//Listing orders for admin panel
const listOrders=async(req,res)=>{
try{
    const id=req.params.id;

    const orders=await orderModel.find({artistId:id});
    
    const paidData = orders.filter(item => item.payment === true);
    // console.log(paidData);
    
    res.json({success:true,data:paidData})
}
catch(error)
{
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

//api for upadting order status
const updateStatus = async (req,res)=>
{
    try{
        const email=req.body.email;
        console.log(email);
        
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        const mailOptions = {
            from: "fw19if002@gmail.com",
            to: email,
            subject: "Sketch Order Status ",
            text: `I hope this email finds you well.We are writing to update you regarding the status of your order: 
            Order Number: ${req.body.orderId}
            Current Status: ${req.body.status}
            Should you have any questions or need further assistance, please feel free to reach out. We are here to help!
            Thank you for choosing Art Gallery.
            
            Best regards,
            Art Gallery`
        };
        
        sendEmail(mailOptions);
        res.json({success:true,message:"Status Upadted"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};