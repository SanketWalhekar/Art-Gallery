import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {
    const [image,setImage]=useState(false);
    const[data,setData]=useState({
        id:"",
        name:"",
        features:"",
        category:"Sketch",
        price:""
    })

    const onChangeHandler=(event)=>
    {
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
      
        try {
          const artist = localStorage.getItem('artistId');
      
          const formData = new FormData();
          formData.append("id", artist);
          formData.append("name", data.name);
          formData.append("features", data.features);
          formData.append("price", Number(data.price));
          formData.append("category", data.category);
          formData.append("image", image);
      
          const response = await axios.post('http://localhost:4000/api/Art_data/add', formData);
      
          if (response.data?.success) {
            setData({
              id: artist,
              name: "",
              features: "",
              category: "Sketch",
              price: ""
            });
            setImage(false);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error('An error occurred. Please try again.');
        }
      };
      
  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input  onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />

            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex col">
                <p>Product description</p>
                <textarea name="features" onChange={onChangeHandler} value={data.features} rows="6" placeholder='Write Content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Sketch">Sketch</option>
                        <option value="ColorPencil">Color Pencil</option>
                        <option value="CanvasPaintings">Canvas Paintings</option>
                        <option value="WaterColor">Water Color</option>
                        <option value="DigitalArtwork">Digital Artwork</option>
                        <option value="GlassPainting">Glass Painting</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="add-price flrx-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add