import React from 'react';
import './loader.css';
import Footer from '../footers/footer';

const Loader = () => {
  return (
    <div>
      <div className='custom-loader-container'>
        <div className="custom-loader">
          <div className="custom-line"></div>
          <div className="custom-line"></div>
          <div className="custom-line"></div>
          <div className="custom-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
