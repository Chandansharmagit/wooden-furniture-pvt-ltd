import React, { useState } from "react";
import "./SidebarMenu.css";
import axios from "axios";
import { Link } from "react-router-dom";
const SidebarMenu = () => {
  const [isClosed, setIsClosed] = useState(true);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const toggleSubMenu = (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  };

  return (
    <div>
      <div className={`sidebar ${isClosed ? "close" : ""}`}>
        <div className="menus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            id="menu"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
            onClick={toggleSidebar}
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#">
              <i className="bx bx-grid-alt"></i>
              <Link to="/userdashboard">
                <span className="link_name">Dashboard</span>
              </Link>
            </a>
            <ul className="sub-menu blank">
              <li>
                <Link to="/userdashboard">
                  {" "}
                  <a className="link_name" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Products uploading</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={toggleSubMenu}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Category
                </a>
              </li>
              <li>
                <Link to="/top-pics">
                  {" "}
                  <a href="#">Top pics Slider</a>
                </Link>
              </li>
              <li>
                <Link to="/upload">
                  {" "}
                  <a href="#">New products uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/homeupload">
                  <a href="#">Home products Uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/bedsuploading">
                  {" "}
                  <a href="#">Beds uploading</a>
                </Link>
              </li>
              





              <li>
                <Link to="/Bedsidetableuploding">
                  {" "}
                  <a href="#">BedSide Tables products uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/DarazSectionsUploading">
                  <a href="#">Daraz products Uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/mattressUploading">
                  {" "}
                  <a href="#">Mattress uploading</a>
                </Link>
              </li>




              <li>
                <Link to="/Side_Mirroruploading">
                  {" "}
                  <a href="#">Main mirror uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/wallmirrorUploading">
                  <a href="#">Wall mirror Uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/Officetables">
                  {" "}
                  <a href="#">Office decorations uploading</a>
                </Link>
              </li>



              <li>
                <Link to="/Photoframeuploading">
                  {" "}
                  <a href="#">Wall photoframe uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/tvSectionUploading">
                  <a href="#">Tv units stand uploading</a>
                </Link>
              </li>
              <li>
                <Link to="/Officetables">
                  {" "}
                  <a href="#">WallphotoFrames uploading</a>
                </Link>
              </li>
              
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Posters uploading</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={toggleSubMenu}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Posts
                </a>
              </li>
              <li>
                <Link to='/First_templateUploading'><a>First template two Img </a></Link>
              </li>
              <li>
                <Link to='/Seconds_templateUploading'><a >Seconds templateUploading Grid</a></Link>
              </li>
              <li>
                <Link to='/Thirds_templateUploading'><a >Thirds templateUploading Grid</a></Link>
              </li>
              <li>
                <Link to='/top-pics'><a href="#">Top pics Slider</a></Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Analytics</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Analytics
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="">
              <i className="bx bx-line-chart"></i>
              <Link to="/orders">
                {" "}
                <span className="link_name"> Find Products By Order id</span>
              </Link>
            </a>
            <ul className="sub-menu blank">
              <li>
                <Link to="/orders">
                  <a className="link_name" href="#">
                    Find Products By Order id
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-plug"></i>
                <span className="link_name">Messaging || Feedback</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={toggleSubMenu}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Plugins
                </a>
              </li>
              <li>
                <Link to="/feedback_geting">
                  <a href="">user feedback</a>
                </Link>
              </li>
              <li>
                <Link to="/user_search">
                  <a href="#">User Search Query</a>
                </Link>
              </li>
              <li>
                <Link to="/Subscribed_email">
                  <a href="">Subscribed Emails</a>
                </Link>
              </li>
              <li>
                <Link to='/P_chat'><a href="">Products Related Message</a></Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-compass"></i>
              <span className="link_name">Our Customers</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Our Customers
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-history"></i>
              <span className="link_name">History</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  History
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Setting
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content"></div>
      </section>
    </div>
  );
};

export default SidebarMenu;
