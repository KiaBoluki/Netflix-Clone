// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import logo from '../assets/img/netflix-logo-png.png';
import "../assets/style/Navbar.css";
import { motion } from "framer-motion";

export default function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${show ? "navbar--scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={logo} alt="Netflix Logo" className="navbar__logo" />
      <div className="navbar__auth">
        <a href="" className="navbar__link">Sign Up / Login</a>
      </div>
    </motion.nav>
  );
}