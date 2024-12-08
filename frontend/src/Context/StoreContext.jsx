import { createContext,useEffect,useState } from "react";
export const StoreContext =createContext(null)
import axios from 'axios'


const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const [itemCount, setItemCount] = useState(0);
    const url="http://localhost:4000"
    const [token,setToken]=useState("");

    const[art_list,setArtList]=useState([])


    const addToCart= async (itemId)=>{
        if(!cartItems[itemId] && itemCount==0){
            console.log(cartItems[itemId]);
            setCartItems((prev)=>({...prev,[itemId]:1}))
            setItemCount(1);
            if(token){
                await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            }

        }
       
       
    }

    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            setItemCount(0);
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = art_list.find((product) => product._id === item);
                if (itemInfo) {  // Add this check to ensure itemInfo exists
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in art_list.`);
                }
            }
        }
        return totalAmount;
    }
    

    const fetchArtList=async()=>{
        const response=await axios.get(url+"/api/Art_data/list")
        setArtList(response.data.data)
    }

    const loadCartData=async (token)=>{
        const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData() {
            await fetchArtList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            
        }
        loadData();

    },[])

    const contextValue={
        art_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken


    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;