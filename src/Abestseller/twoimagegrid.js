import React from "react";
import "./towgrid.css";
import { useEffect, useState } from "react";
import axios from "axios";
import imaga from "../Asofa/sofa.jpg";
import iamges from "./DISC.jpg";
import img from "./seller.jpg";

const Twoimagegrid = () => {
  const [images, setImages] = useState([]); 
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getting_updating_data"
      );
      console.log("Fetched images:", response.data); // Check the structure of the fetched data
      setImages(response.data); // Adjust this line if needed
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };
  return (
    <div>
      <h1 className="recomended">Nepal's Finest Online Furniture Brand</h1>
      <h4 className="texts">
        Buy Furniture Online from our extensive collection of wooden furniture
        units to give your home an elegant touch at affordable prices.
      </h4>
    
        <div className="grid-prgination">
        {images.map((image) => (
          <div class="image">
            <img
              src={`data:image/png;base64,${image.imageByte}`}
              alt="Image 1" className="imageByte"
            />
          </div>
             ))}
         
        </div>
   

      <h1 className="recomended">Explore More Products</h1>

      <div className="seller-img">
        <img src={img} alt="" className="img-sr" />
      </div>
    </div>
  );
};

export default Twoimagegrid;
