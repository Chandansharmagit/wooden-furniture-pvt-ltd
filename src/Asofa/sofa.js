import React from "react";
import "./sofa.css";
import imaga from "./sofa.jpg";
import ImageGrid from "../component/siderproducts/TopPics";
import Newproducts_page from "../component/newproducts/newproducts_page";
import Policy from "../Apolicy/policy";
import Footer from "../component/footers/footer";
const Sofa = () => {
  return (
    <div>
      <div className="carts-pregination-sofas">
        <div className="carts-items-sofa">
          <h1 className="living">Living Room Furnishing</h1>

          <img
            src="https://media.designcafe.com/wp-content/uploads/2021/04/15173233/bold-luxurious-trending-sofa-design.jpg"
            alt=""
            className="sofa-img"
          />
          <ImageGrid />
          <br />
         
        </div>

        <div className="carts-items-sofa">
          <Newproducts_page />
        </div>
        <div className="carts-items-sofa"></div>
      </div>

     

     

      <h1 className="recomended">TOP BLOGS THAT INSPIRE</h1>
      <h4 className="texts">Connect Deep With Sofa World</h4>

      <div className="more-products">
        <div className="more-items">
          <img src={imaga} alt="" className="new-launched-sofas"/>
          <h3>new launched</h3>
        </div>
        <div className="more-items">
          <img src={imaga} alt="" className="new-launched-sofas"/>
          <h3>new launched</h3>
        </div>
        <div className="more-items">
          <img src={imaga} alt="" className="new-launched-sofas"/>
          <h3>new launched</h3>
        </div>
        <div className="more-items">
          <img src={imaga} alt="" className="new-launched-sofas"/>
          <h3>new launched</h3>
        </div>
      </div>
      <Policy/>
      <Footer/>
    </div>
  );
};

export default Sofa;
