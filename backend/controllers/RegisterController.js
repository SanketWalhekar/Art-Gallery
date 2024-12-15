import Stripe from 'stripe';
import Artist from '../models/Artist.js';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing user order for frontend
const placeOrder =async(req,res)=>{

    const frontend_url="http://localhost:5173";
    const { name, email, password, address, subscriptionType } = req.body;


    try{

      const amount = subscriptionType === 'yearly' ? 50000 : 5000;
      const newOrder=new Artist({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        customerAddress:address,
        subscriptionPlan:req.body.subscriptionType,
        isActive:false
    })
    await newOrder.save();

        const line_items={
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Subscription"
                },
                unit_amount:amount,
            },quantity:1,
        }

        
            
        

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/payment-success?success=true&email=${email}`,
            cancel_url:`${frontend_url}/login?success=false&email=${email}`,

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
    const{email,success}=req.body;
    try{
        if(success=="true")
        {
            await Artist.findByIdAndUpdate(email,{isActive:true});
            res.json({success:true,message:"Paid"})


        }
        else{
            await Artist.findByIdAndDelete(email);
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