import React, { useContext } from 'react';
import './Display.css';
import { StoreContext } from '../../Context/StoreContext';
import ArtItem from '../Art_Item/ArtItem';

const Display = ({ category }) => {
    const { art_list } = useContext(StoreContext);

    if (!art_list || art_list.length === 0) {
        return <div>No items available</div>; // Handle empty or undefined list
    }

    return (
        <div className='display' id='display'>
            <h2>Top Artworks</h2>
            <div className="display-list">
                {art_list.map((item, index) => {
                    if(category==="All" ||category===item.category)
                    {
                        return <ArtItem key={index} id={item._id} name={item.name} features={item.features} price={item.price} image={item.image}/>
                    }
                    
         })}
            </div>
        </div>
    );
};
 
export default Display;
