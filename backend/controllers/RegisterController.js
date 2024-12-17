import Stripe from 'stripe';
import Artist from '../models/Artist.js';

const stripe=new Stripe("sk_test_51O1TiuSIYdbve5xsumxp8fSNL3SDSFBb2HUKyCkmIjsiwDjBLVNo7Sabphd0N5n6RfbjcRAXXsSPNTUSrGhb9Kl700lE4hvDkG")

//Placing user order for frontend
const placeOrder =async(req,res)=>{

    const frontend_url="http://localhost:5173";
    const { name, email, password, address, subscriptionType } = req.body;


    try{
    const amount = subscriptionType === 'yearly' ? 50000 : 5000;

    const isExistArtist = await Artist.findOne({ email });

   
    if (isExistArtist && isExistArtist.isActive) {
        return res.json({ success: false, message: "Already Exist" });
    }


    if (!isExistArtist) {
      const newOrder = new Artist({
        name,
        email,
        password,
        customerAddress: address,
        subscriptionPlan: subscriptionType,
        isActive: false,
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
      success_url: `http://localhost:5173/payment-success?success=true&email=${email}`,
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