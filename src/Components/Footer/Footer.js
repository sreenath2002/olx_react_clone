import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div className="column">
          <div className="heading">POPULAR LOCATIONS</div>
          <ul className="list">
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        <div className="column">
          <div className="heading">ABOUT US</div>
          <ul className="list">
            <li>About OLX Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>OLXPeople</li>
          </ul>
        </div>

        <div className="column">
          <div className="heading">OLX</div>
          <ul className="list">
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy Information</li>
          </ul>
        </div>
      </div>

      <div className="footer">
        <p className="countries">
          Other Countries: Pakistan - South Africa - Indonesia
        </p>
        <p className="copyright">
          Free Classifieds in India. © 2006-2021 OLX
        </p>
      </div>
    </div>
  );
}

export default Footer;

