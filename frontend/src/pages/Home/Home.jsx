import React, { useState } from 'react';
import './Home.css'
import Header1 from '../../components/Header1/Header1'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Display from '../../components/Display/Display';

const Home = () => {
  const[category,setCategory]=useState("All");
  return (
    <div>
      <Header1/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <Display category={category}/>
    </div>
  )
}

export default Home
