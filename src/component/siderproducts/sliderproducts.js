import React, { useEffect } from 'react'
import './sliderp.css'
import images from './unnamed.jpg';
import Sliderp from './slider'
import AOS from 'aos';
import 'aos/dist/aos.css';
function Sliderproducts() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
    });
  },[])
  return (
    <div>
   
    <div className='sl-p' data-aos="fade-up">
          <h1 className="recomended"></h1>
      <h4 className="texts">
       
      </h4>
      <div className="slider-pregination">
        <img src={images} alt=""className='ima-p' />
        <div className="slider-items">
            <Sliderp/>

        </div>
       
      </div>
  
    </div>
    </div>
  )
}

export default Sliderproducts
