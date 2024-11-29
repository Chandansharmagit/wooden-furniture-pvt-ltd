import React, { useEffect, useState } from "react";
import "./mainimage.css";

import Dobleimage from "../../doubleimage/dobleimae";
import Newproducts_page from "../../newproducts/newproducts_page";
import Amazon from "../../amazon_style/amazon";
import Footer from "../../footers/footer";
import Doubleslider from "../../doubleslider/doubeslider";
import PLogin from "../../../poplogin/poplogin";
import BestSeller from "../../../Abestseller/bestseller";
import Twoimagegrid from "../../../Abestseller/twoimagegrid";
import ImageGrid from "../../siderproducts/TopPics";
import Policy from "../../../Apolicy/policy";
import { useCart } from "../../contextpage/context";
import FlashSale from "../../../Templates/FlashSale";
import video from "./brown.mp4";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";

// Importing Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function MainImage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isAuthenticated,
    googleAuth,
  } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("usertoken");
      if (token || googleAuth) {
        setShowLoginPopup(false);
      } else {
        setShowLoginPopup(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [googleAuth]); // Added dependency on googleAuth

  return (
    <div>
      <div className="custom-slider-container">
        {/* Right side slidable images */}
        <div className="custom-right-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Added Swiper modules here
            navigation={{
              nextEl: ".swiper-button-next-unique",
              prevEl: ".swiper-button-prev-unique",
            }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Added autoplay settings
          >
            <SwiperSlide>
              <img
                src="https://www.erginternational.com/images/Napoli-Corsa-HomePage_NewProducts.jpg"
                alt="Slide 1"
                className="custom-slide-image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://furniture.ug/blog/wp-content/uploads/2023/12/6f74b0d08ce37a8961b5038ea4dcb2ac.jpg"
                alt="Slide 2"
                className="custom-slide-image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://sastosofa.com/wp-content/uploads/2023/05/fffffff.png"
                alt="Slide 3"
                className="custom-slide-image"
              />
            </SwiperSlide>
            {/* Navigation buttons */}
            <div className="swiper-button-next-unique"></div>
            <div className="swiper-button-prev-unique"></div>
          </Swiper>
        </div>
        {/* Left side static images */}
        <div className="custom-left-images">
          {/* First Image */}
          <img
            src="https://www.erginternational.com/images/Napoli-Corsa-HomePage_NewProducts.jpg"
            alt="Static Image 1"
            className="custom-static-image"
          />

          {/* Video replacing the second image */}
          <video
            className="custom-video"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate" /* Disable extra controls */
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Other components */}
      <Dobleimage />
      <ImageGrid />
      <FlashSale />
      <Newproducts_page />
      <Twoimagegrid />
      <Doubleslider />
      <BestSeller />
      <Amazon />
      <Policy />
      <Footer />

      {/* Conditional Login Popup */}
      {showLoginPopup && <PLogin setShowLoginPopup={setShowLoginPopup} />}
    </div>
  );
}

export default MainImage;
