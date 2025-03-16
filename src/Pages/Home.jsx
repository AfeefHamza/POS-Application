import React from 'react'
import '../Pages/Home.css'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'



function Home() {
  return (
    <>
    <div className="landing-page">

<header className="header">
  <div className="logo"><img className='w-50'  src={logo} alt="" /></div>
  <nav className="navigation">
    <a href="#features">Features</a>
    <a href="#contact">Contact</a>
  </nav>
  <div className="auth-buttons">
    <Link to={'/login'} className="login-button">Login</Link>
    <Link to={'/register'} className="signup-button">Sign Up</Link>
  </div>
</header>

<section className="hero">
  <div className="hero-content">
    <h1>Effortless Inventory Management for Your Business</h1>
    <p>Streamline your stock, optimize your operations, and gain valuable insights with our intuitive inventory management system.</p>
  </div>
  <div className="hero-image">
    <img src="https://img.freepik.com/premium-vector/isometric-style-illustration-delivery-order-with-truck-smartphone_529804-272.jpg?semt=ais_hybrid" alt="Inventory Management Illustration" />
  </div>
</section>

<section id="features" className="features">
  <h2>Key Features</h2>
  <div className="feature-grid">
    <div className="feature-item">
      <img src="https://png.pngtree.com/png-clipart/20230430/original/pngtree-skin-care-products-flat-style-flat-illustration-png-image_9125819.png" alt="Real-time Tracking" />
      <h3>Product Management</h3>
      <p>Add, Edit, Delete, and Categorize products, pricing, stock levels, and descriptions....</p>
    </div>
    <div className="feature-item">
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/warehouse-worker-checking-inventory-illustration-download-in-svg-png-gif-file-formats--flow-logo-control-system-life-style-pack-e-commerce-shopping-illustrations-7481960.png" alt="Automated Alerts" />
      <h3>Inventory Management</h3>
      <p>Track stock levels,Download sale reports...</p>
    </div>
    <div className="feature-item">
      <img src="https://cdn.prod.website-files.com/612933c2d902f20aa8205a95/6156cfbb777eb900af8fd91f_ROI-Security%402x-1536x804.png" alt="User Roles" />
      <h3>Role-based Access Control</h3>
      <p>Control access levels for admins and users with custom permissions.</p>
    </div>
  </div>
</section>

<section id="pricing" className="pricing">
  <h2>Simple & Transparent</h2>
</section>



<section id="contact" className="contact">
  <h2>Contact Us</h2>
  {/* Contact Form or Information */}
</section>

<footer className="footer">
  <p>© {new Date().getFullYear()} All rights reserved.</p>
</footer>

</div>

    </>
  )
}

export default Home