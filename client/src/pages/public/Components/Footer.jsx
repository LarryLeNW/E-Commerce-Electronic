import { memo } from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="w-full bg-main">
      <footer>
        <div className="footer-container p-6">
          <div className="footer-section">
            <h2>Contact Us</h2>
            <p>Company Name</p>
            <p>1234 Car Street, Auto City,CA 56789</p>
            <p>Phone:(+91)9876543210</p>
            <p>Email:Youtube@gmail.com</p>
          </div>
          <div className="footer-section">
            <h2>Quick Links</h2>
            <a href="">
              <li>Home</li>
            </a>
            <a href="">
              <li>About Us</li>
            </a>
            <a href="">
              <li>Services</li>
            </a>
            <a href="">
              <li>Inventory</li>
            </a>
            <a href="">
              <li>Financing</li>
            </a>
            <a href="">
              <li>Blog</li>
            </a>
            <a href="">
              <li>FAQs</li>
            </a>
          </div>
          <div className="footer-section">
            <h2>Customer Service</h2>
            <a href="">
              <li>Support</li>
            </a>
            <a href="">
              <li>Warranty</li>
            </a>
            <a href="">
              <li>Return Policy</li>
            </a>
            <a href="">
              <li>Terms and Conditions</li>
            </a>
            <a href="">
              <li>Privacy Policy</li>
            </a>
          </div>
          <div className="footer-section">
            <h2>Follow Us</h2>
            <a href="">
              <li>Facebook</li>
            </a>
            <a href="">
              <li>Twitter</li>
            </a>
            <a href="">
              <li>Instagram</li>
            </a>
            <a href="">
              <li>Youtube</li>
            </a>
          </div>
          <div className="footer-section">
            <h2>News Letter</h2>
            <p>Subscribe to our newsletter for the latest updates</p>
            <form action="">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="footer-section2">
            <h2>Operating Hours</h2>
            <p>Mon - Fri 9AM-7PM</p>
            <p>Saturday 10AM-6PM</p>
            <p>Sunday Closed</p>
          </div>
          <div className="footer-section2">
            <h2>Payment Methods</h2>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/mastercard-logo.png"
              alt="mastercard-logo"
            />
            <span>Mastercard</span>
            <img
              className="visa"
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/visa.png"
              alt="visa"
            />
            <img
              className="rupay"
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/rupay.png"
              alt="rupay"
            />
          </div>
          <div className="footer-section2">
            <h2>Experiences</h2>
            <a href="">
              <li>MyFerrari</li>
            </a>
            <a href="">
              <li>Ferrari E-Sports Series</li>
            </a>
            <a href="">
              <li>Ferrari World Abu Dhabi</li>
            </a>
            <a href="">
              <li>Dealers</li>
            </a>
            <a href="">
              <li>Ferrari Land Barcelona</li>
            </a>
          </div>
          <div className="footer-section3">
            <img
              className="copyright"
              width="24"
              height="24"
              src="https://img.icons8.com/fluency/48/copyright.png"
              alt="copyright"
            />{" "}
            <p>2024 Company Name All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default memo(Footer);
