import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Login from "./component/loginpage/login";
import Headers from "./component/header/headers";
import MainImage from "./component/navbar/headingimage/mainImage";
import Addtocart from "./component/addtocartpage/addtocart";
import ProductDetailsPage from "./dynamicpage/productdetails";
import ProductUploadPage from "./dynamicpage/uplodingnewproducts";
import Newchekout from "./component/checkoutprocess/newchekout";

import Checkout from "./component/addtocartpage_after_details/cartitems";
import SearchResults from "./component/searchresult/searchreasult";
import PLogin from "./poplogin/poplogin";
import CallButton from "./callbutton/callbutton";
import { CheckoutTwo } from "./orderconfirmation/orderconfirmation";
import axios from "axios";
import Policy from "./Apolicy/policy";
import HomeProducts from "./dynamicpage/uploadingproducts/Homeproduct";
import Sofa from "./Asofa/sofa";
import Bedssection from "./Abeds/bedssection";
import BedsProducts from "./dynamicpage/uploadingproducts/Bedsproductsuploading/Bedsuploading";
import Utoppics from "./dynamicpage/uploadingToppics/utoppics";
import Userdashboard from "./admindashborad/userdashboard";
import Feedback from "./callbutton/feedback";
import AdminChat from "./callbutton/anotherfeed";
import CartButton from "./callbutton/cartbutton";
import Order_tracking_btn from "./callbutton/ordertracking";
import Allorder from "./Userdashbboard/allorder";
import SidebarMenu from "./Userdashbboard/sidebar";
import Visualize3D from "./component/addtocartpage/visualize";
import Profile from "./Auserprofile";
import Register from "./component/loginpage/register";
import Forgot_password from "./component/loginpage/forgot-password";
import New_password from "./component/loginpage/create-new-password";
import VerifyOtp from "./component/loginpage/VerifyOtp";
import FeedbackPage from "./admindashborad/Getfeedback/getfeedback";
import UserOrderProducts from "./admindashborad/userorderproducts/Userorderproducts";
import Search from "./admindashborad/searchQuery/Search";

import TrackingOrder from "./component/header/trackingOrder";
import Wishlist from "./component/addtocartpage/Wishlist";
import ChatRoom from "./Chatroom/Chatroom";
import ProductRel_Chat from "./admindashborad/userorderproducts/SocketMassaging/ProductRel_Chat";
import Subscribed_email from "./admindashborad/searchQuery/Subscribed_email";
import Feedback_user from "./ProductFeedback/ProductsFeedback";
import Amazon2 from "./component/amazon_style/amazon2";
import FirstTemplateUploading from "./dynamicpage/Template_Uploading/FirstTemplateUploading";
import SecondTemplatesGrid from "./dynamicpage/Template_Uploading/SecondTemplatesGrid";
import ThirdTemplateUploding from "./dynamicpage/Template_Uploading/ThirdTemplateUploding";
import AuthLoader from "./component/loaders/AuthLoader";
// import Hanging from "./callbutton/hanging/Hanging";

import Darazssection from "./Abeds/Daraz";

import TVsection from "./Abeds/TVunits";
import BedsideTable from "./dynamicpage/uploadingproducts/Bedsproductsuploading/BedsideTable";
import DarazUploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/DarazUploading";
import LampsUploding from "./dynamicpage/uploadingproducts/Bedsproductsuploading/LampsUploding";
import MattressUploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/MattressUploading";
import MirrorUploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/MirrorUploading";
import OfficeTablessection from "./Abeds/OfficeTables";
import PhotoFramesUploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/PhotoFramesUploading";
import BedSidesection from "./Abeds/BedsideTabels";
import Lampssection from "./Abeds/Lamps";
import Mattresssection from "./Abeds/Mattress";
import MirrorSections from "./Abeds/Mirror";
import Wallsection from "./Abeds/Wallmirror";
import Framesection from "./Abeds/Photoframe";

import Wallmirriruploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/Wallmirrir";
import OfficeTables from "./dynamicpage/uploadingproducts/Bedsproductsuploading/OfficeTables";
import BestSeller from "./Abestseller/bestseller";
import TvSectionUploading from "./dynamicpage/uploadingproducts/Bedsproductsuploading/TvSection";
import Hanging from "./callbutton/hanging/Hanging";
import AdminChatKafka from "./admindashborad/adminChart/Chatting";
import RequestOrder from "./callbutton/RequestNewOrder/RequestOrder";
import ProductDetail from "./Addtocart/Addcart";
import WebSocketComponent from "./admindashborad/notify";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [userlogin, setuserlogin] = useState(null);
  const [loginauth, setuserAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [islogin, setislogin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state added

  const getuser = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/googlelogin`, {
        withCredentials: true, // Important for sending cookies or authentication tokens
      });
    
      setUser(response.data.user);
  
      if (response.status === 200) {
        setislogin(true);
      } else {
        setislogin(false);
      }
    } catch (error) {
      console.log("Error getting user:", error);
      setislogin(false);
    }
  };
  

  const loginwith_user = async () => {
    const token = localStorage.getItem("usertoken");
    const email = localStorage.getItem("userEmail");
    console.log("Token:", token);
    console.log("Email:", email);

    if (token) {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/userprofile_id/${email}` // Updated URL
        );
        console.log("API Response:", response);
        

        setuserlogin(response.data);
        if (response.status === 200) {
          setuserAuth(true);
        } else {
          setuserAuth(false);
        }
      } catch (error) {
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
        setuserAuth(false);
      }
    } else {
      console.log("Token not found yet");
      setuserAuth(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await loginwith_user();
      await getuser();
      setLoading(false); // Set loading to false after auth checks
    };

    checkAuth();
  }, []);

  return (
    <div>
      <BrowserRouter>
      
        <Headers />
        <Navbar />
        {loading ? ( // Show a loading indicator or spinner while checking auth
          <div>
            <AuthLoader />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<MainImage />} />
            <Route path="/cart/:id" element={<Addtocart />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<Newchekout />} />
            <Route path="/selling-page" element={<Checkout />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/sofas" element={<Sofa />} />
            <Route path="/pop" element={<PLogin />} />
            <Route path="/beds" element={<Bedssection />} />
            <Route path="/top-pics" element={<Utoppics />} />
            <Route path="/subscribed-email" element={<Subscribed_email />} />
            <Route path="/user-stories" element={<Feedback_user />} />
            <Route path="/user_feedback" element={<Amazon2 />} />
            <Route path="/visualize" element={<Visualize3D />} />
            <Route path="/register-here" element={<Register />} />
            <Route path="/forget-password" element={<Forgot_password />} />
            <Route path="/new-password" element={<New_password />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/feedback_geting" element={<FeedbackPage />} />
            <Route path="/Sofa_hub" element={<BestSeller />} />
            <Route path="/chat_k" element={<AdminChatKafka />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/addcart" element={<ProductDetail />} />
            <Route path="/not" element={<WebSocketComponent/>} />
         
            

            {/* getting the products of the uploading products */}

            <Route path="/BedsideTables" element={<BedSidesection />} />
            <Route path="/DarazSections" element={<Darazssection />} />
            <Route path="/LampsansLighiting" element={<Lampssection />} />
            <Route path="/mattress" element={<Mattresssection />} />
            <Route path="/Side_Mirror" element={<MirrorSections />} />
            <Route path="/wallmirror" element={<Wallsection />} />
            <Route path="/photoframes" element={<Framesection />} />
            <Route path="/Office_decoratations" element={<OfficeTablessection />} />
            <Route path="/TvUnits" element={<TVsection />} />
           

            {loginauth || islogin ? (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<ChatRoom />} />
                <Route path="/P_chat" element={<ProductRel_Chat />} />
                <Route path="/userdashboard" element={<Userdashboard />} />
                <Route path="/user_search" element={<Search />} />
                <Route path="/track-order" element={<TrackingOrder />} />
                <Route path="/orderconfirmation" element={<CheckoutTwo />} />
                <Route path="/bedsuploading" element={<BedsProducts />} />
                <Route path="/homeupload" element={<HomeProducts />} />
                <Route path="/orders" element={<Allorder />} />

                {/* //making the proudcts uploading */}

                <Route path="/Bedsidetableuploding" element={<BedsideTable />} />
                <Route path="/DarazSectionsUploading" element={<DarazUploading />} />
                <Route path="/LampsansLighitingUploading" element={<LampsUploding />} />
                <Route path="/mattressUploading" element={<MattressUploading />} />
                <Route path="/Side_Mirroruploading" element={<MirrorUploading />} />
                <Route path="/wallmirrorUploading" element={<Wallmirriruploading />} />
                <Route path="/Officetables" element={<OfficeTables />} />

                <Route path="/Photoframeuploading" element={<PhotoFramesUploading />} />
                <Route path="/tvSectionUploading" element={<TvSectionUploading/>} />
               
                <Route
                  path="/Office_decoratations"
                  element={<OfficeTables />}
                />
                <Route path="/TvUnits" element={<TVsection />} />

                <Route
                  path="/First_templateUploading"
                  element={<FirstTemplateUploading />}
                />
                <Route
                  path="/Subscribed_email"
                  element={<Subscribed_email />}
                />
                <Route path="/sidebar" element={<SidebarMenu />} />
                <Route
                  path="/Seconds_templateUploading"
                  element={<SecondTemplatesGrid />}
                />
                <Route
                  path="/user-order-products"
                  element={<UserOrderProducts />}
                />
                <Route path="/upload" element={<ProductUploadPage />} />
                <Route
                  path="/Thirds_templateUploading"
                  element={<ThirdTemplateUploding />}
                />
                <Route path="/wishlist" element={<Wishlist />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        )}

      {/* <Hanging/> */}
        <AdminChat />
        <RequestOrder/>
        <Feedback />
        <Order_tracking_btn />
        <CartButton />
        <CallButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
