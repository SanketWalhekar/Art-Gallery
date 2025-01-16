import Stripe from 'stripe';
import Artist from '../models/Artist.js';
import moment from "moment/moment.js"

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder =async(req,res)=>{

    const frontend_url="http://localhost:5173";
    const { name, email, password, address, subscriptionType } = req.body;


    try{
    const amount = subscriptionType === 'yearly' ? 50000 : 5000;

    const currentTimestamp = moment();
    const expirydate = subscriptionType === 'yearly' ? currentTimestamp.clone().add(365, 'days') : currentTimestamp.clone().add(30, 'days');
  

    const isExistArtist = await Artist.findOne({ email });

    const currentTimestampp = moment().valueOf();
    let planExpiry=null;

    if(isExistArtist!=null){
        planExpiry=moment(isExistArtist.subscriptionExpiry).valueOf()>=currentTimestampp?false:true
    }

   console.log(planExpiry);
   console.log(isExistArtist);
   
    if (isExistArtist && (isExistArtist.isActive && !planExpiry)) {
        return res.json({ success: false, message: "Already Exist" });
    }

    
    if (isExistArtist!=null) {
      await Artist.findOneAndUpdate(
        { email: email }, 
        {
          $set: {
            name,
            password,
            customerAddress: address,
            subscriptionPlan: subscriptionType,
            isActive: true,
            subscriptionExpiry: expirydate,
          },
        }
      );
    }
    else if(isExistArtist==null) {
      const newOrder = new Artist({
        name,
        email,
        password,
        customerAddress: address,
        subscriptionPlan: subscriptionType,
        isActive: false,
        subscriptionExpiry: expirydate
      });
      await newOrder.save();
    }
   
    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Subscription"
          },
          unit_amount: amount, 
        },
        quantity: 1,
      }
    ];

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/payment-success?success=true&email=${email}',
      cancel_url: `http://localhost:5173/`,
    });

    
    res.json({ success: true, session_url: session.url });

      

        
        

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const verifyOrder=async(req,res)=>
{
    const{email,success}=req.body;
    try{
        if(success=="true")
        {
            const updateData={isActive:true};
            await Artist.findOneAndUpdate({ email: email }, updateData, { isActive: true });
            res.json({success:true,message:"Paid"})
        }
        else{
            await Artist.findOneAndDelete({ email: email });
            res.json({success:false,message:"Not Paid"})
        }
       
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
export {placeOrder,verifyOrder}