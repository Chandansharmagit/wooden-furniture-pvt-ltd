import React from "react";
import { useEffect, useState } from "react";
import "./doubleimage.css";
import axios from "axios";
import oneside from "./oneside.png";
import two from "./rightside.png";
function Dobleimage() {
  const [images, setImages] = useState([]); // Initialize as an array
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getting_templates_uploading"
      );
      console.log("Fetched images:", response.data); // Check the structure of the fetched data
      setImages(response.data); // Adjust this line if needed
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };
  return (
    <div>
      <h1 className="recomended">
        RECOMMENDED <span>FOR YOU</span>
      </h1>
      <h4 className="texts">
        Take a look at the newest additions to our modern furniture collection
      </h4>
      {images.map((image) => (
        <div className="image-container" key={image.id}>
          <div className="items">
            <img
              src={`data:image/png;base64,${image.returnimage1}`}
              alt={image.text}
              className="imgs-data"
            />
          </div>
          <div className="items newitems">
            <img
              src={`data:image/png;base64,${image.returnimage2}`}
              alt={image.text}
              className="imgs-data"
            />
          </div>
        </div>
      ))}

      {/* <div className="checkoutprocess">
        
      </div> */}
    </div>
  );
}

export default Dobleimage;
