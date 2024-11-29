import React, { useState } from "react";
import "./navbar.css";
import { useCart } from "../contextpage/context";

import { Link } from "react-router-dom";
import logo from "./logo-no-background.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { count, wishlistCount } = useCart();

  const [showInput, setShowInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submenuState, setSubmenuState] = useState({
    show1: false,
    show2: false,
    show3: false,
  });

  const toggleSearchBox = () => {
    setShowInput(!showInput);
  };

  const toggleNavLinks = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSubmenu = (menu) => {
    setSubmenuState({
      ...submenuState,
      [menu]: !submenuState[menu],
    });
  };

  const handlecart = () => {
    navigate("/selling-page");
  }

  return (
    <>
      <nav>
        <div className="wrapper">
          <h3 className="smartest">
            <img src={logo} alt="" className="logo-wns" />
          </h3>

          <div className="cart-phones" onClick={handlecart}>
            
            <a href="#" class="cart">
              <span class="counter">{count}</span>
            </a>
          </div>

          <input type="radio" name="slider" id="menu-btn" />

          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <i className="fas fa-times"></i>
            </label>

            <li>
              <a className="desktop-item">MATTRESS</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                SOFAS
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fmattress_IrRmELi.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>KING KOIL MATTRESS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/mattress">World Luxury</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Ortho</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Chiropedic</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Gravity</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>KING KOIL MATTRESS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/mattress">Signature</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Physio Pedic</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Naturalle 1.0</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Revital</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>SLEEPWELL MATTRESS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/mattress">Spine Tech Luxury</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Spine Tech Air</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Ultra Eurotop</Link>
                      </li>
                      <li>
                        <Link to="/mattress">Durafirm</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a className="desktop-item">SOFAS</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                SOFAS
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fsofa_menu.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>SECTIONAL SOFAS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Sofa_hub">Bed Design Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">L Shaped Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2 Seater Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">3 Seater Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">3+2 Sofa Sets</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2+2+1 Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2+2 Sofa</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>SECTIONAL SOFAS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Sofa_hub">Bed Design Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">L Shaped Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2 Seater Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">3 Seater Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">3+2 Sofa Sets</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2+2+1 Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">2+2 Sofa</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>SOFA SETS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Sofa_hub">Diwan Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Outdoor Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Office Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Rexine Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Chesterfield Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Wooden Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Fabric Sofas</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>CARVED SOFA</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Sofa_hub">Carved Diwan Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Single Carved Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Royal Carved Sofa</Link>
                      </li>
                      <li>
                        <Link to="/Sofa_hub">Carved Sofa Sets</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a className="desktop-item">BEDROOM</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                BEDROOM
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fbedroom_menu.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>BEDS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/beds">Carved Royal Bed</Link>
                      </li>
                      <li>
                        <Link to="/beds">Hydraulic Storage Beds</Link>
                      </li>
                      <li>
                        <Link to="/beds">Single Beds</Link>
                      </li>
                      <li>
                        <Link to="/beds">Queen Size Beds</Link>
                      </li>
                      <li>
                        <Link to="/beds">King Size Beds</Link>
                      </li>
                      <li>
                        <Link to="/beds">Dressing Table</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>COMBO SETS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/beds">Below 150 thousand</Link>
                      </li>
                      <li>
                        <Link to="/beds">Below 1 lakh</Link>
                      </li>
                      <li>
                        <Link to="/beds">Below 80 thousand</Link>
                      </li>
                      <li>
                        <Link to="/beds">Below 50 thousand</Link>
                      </li>
                      <li>
                        <Link to="/beds">Tea Tables</Link>
                      </li>
                      <li>
                        <Link to="/beds">Beside Tables</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>STORAGE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/beds">Bookshelves</Link>
                      </li>
                      <li>
                        <Link to="/beds">Cabinets & Sideboards</Link>
                      </li>
                      <li>
                        <Link to="/beds">TV units</Link>
                      </li>
                      <li>
                        <Link to="/beds">Cupboards</Link>
                      </li>
                      <li>
                        <Link to="/beds">Wardrobes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a className="desktop-item">DINING AND KITCHEN</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                DINING AND KITCHEN
              </label>

              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fkitchen_and_dining_zTHJF0q.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>DINING FURNITURE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/modular_kitchen">Dining Sets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">2 Seater Dining Sets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">4 Seater Dining Sets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">6 Seater Dining Sets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">8 Seater Dining Sets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Dining Tables</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Dining Chairs</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>KITCHEN FURNITURE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/modular_kitchen">Cabinets & Sideboards</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Kitchen Cabinets</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Kitchen Island</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Kitchen Racks</Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">Kitchen Shelves</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>MODULAR KITCHEN</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/modular_kitchen">
                          L Shape Modular Kitchen
                        </Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">
                          U Shape Modular Kitchen
                        </Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">
                          Parallel Shape Modular Kitchen
                        </Link>
                      </li>
                      <li>
                        <Link to="/modular_kitchen">
                          Straight Shape Modular Kitchen
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a className="desktop-item">LIVING</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                LIVING
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Ffurnishing_8NQWGTu.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>TABLES</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/sofa_hub">Table</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Tea/Coffee Tables</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Side & End Tables</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Console Table</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Laptop Tables</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>LIVING STORAGE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/sofa_hub">Wall Shelves</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Magazine Racks</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Cabinet & Sideboard</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Chest drawers</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Religious Units</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Carved Mirror</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Table Runners</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>SEATING & CHAIRS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/sofa_hub">Lounge Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Wing Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Rocking Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Arm Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Metal Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Office Chairs</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Ottomans & Pouffes</Link>
                      </li>
                      <li>
                        <Link to="/sofa_hub">Tools</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a className="desktop-item">STUDY AND OFFICE</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                STUDY AND OFFICE
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2Fstudy__office_bZnq1Ps.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>STORAGE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Office_decorations">Bookshelves</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Wall Shelves</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Magazine Racks</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">File Cabinets</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Shoe Racks</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>TABLES</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Office_decorations">Portable Table</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Wall Mounted Table</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Corner Study Table</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Executive Tables</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Computer Tables</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Study Tables</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>OFFICE FURNITURE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/Office_decorations">Executive Tables</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Office Sofas</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Office Chairs</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Office Tables</Link>
                      </li>
                      <li>
                        <Link to="/Office_decorations">Work Stations</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a className="desktop-item">OUTDOOR</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                OUTDOOR
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2FOUTDOOR.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>GARDEN FURNITURE</header>
                  </div>
                  <div className="row">
                    <header>OUTDOOR ITEMS</header>
                  </div>
                  <div className="row">
                    <header>BALCONY FURNITURE</header>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a className="desktop-item">LAMPS AND LIGHTING</a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                Lamps and lighting
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://www.furniturehub.com.np/_next/image?url=https%3A%2F%2Fbackend.furniturehub.com.np%2Fuploads%2Fcategory%2FOUTDOOR.jpg&w=1200&q=75"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>GARDEN FURNITURE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/LampsansLighting">Garden Tables</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Garden Chairs</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Outdoor Benches</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Garden Lighting</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>OUTDOOR ITEMS</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/LampsansLighting">Umbrellas</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Outdoor Sofas</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">BBQ Grills</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Outdoor Lamps</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>BALCONY FURNITURE</header>
                    <ul className="mega-links">
                      <li>
                        <Link to="/LampsansLighting">Balcony Tables</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Balcony Chairs</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Balcony Sets</Link>
                      </li>
                      <li>
                        <Link to="/LampsansLighting">Balcony Lighting</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a href="#" className="desktop-item">
                USER ACCOUNT
              </a>
              <input type="checkbox" id="showDrop" />
              <label for="showDrop" className="mobile-item">
                User Account
              </label>
              <ul className="drop-menu">
                <li>
                  <Link to="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/register-here">
                    <a>Sign up</a>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <a>Your profile</a>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/userorderproducts">
                    <a>My orders </a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
