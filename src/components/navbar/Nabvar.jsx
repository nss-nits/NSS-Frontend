import "./navbar.css";
import React, { useState } from "react";
import { TfiAlignRight } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../images/nss.png";

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false); // Function to close the menu

  const [color, setcolor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 10) {
      setcolor(true);
    } else setcolor(false);
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div
      className={
        color
          ? "header navbar sticky-top navbar-light navbar-fixed-top header-bg"
          : "header navbar sticky-top navbar-light navbar-fixed-top"
      }
    >
      <Link
        to="/"
        onClick={scrollToTop}
        className="navbar-brand m-0 d-flex  align-items-center justify-content-center"
      >
        <img src={Logo} alt="nss-logo" className="mr-2 logo-img " />
        <h2
          style={{
            color: "#f5f5f5",
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
          className="nav-nss"
        >
          NSS <span className="nit-silchar"> NITS</span>
        </h2>
      </Link>
      <div className="nav-sec">
        <ul
          className={
            click ? "nav-menu navbar-nav" : "nav-menu active navbar-nav"
          }
        >
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => {
                scrollToTop();
                closeMenu();
              }} 
              style={{ color: "white" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/About"
              className="nav-link"
              onClick={() => {
                scrollToTop();
                closeMenu();
              }} // Close the menu after clicking on the link
              style={{ color: "white" }}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Event"
              className="nav-link"
              onClick={() => {
                scrollToTop();
                closeMenu();
              }} // Close the menu after clicking on the link
              style={{ color: "white" }}
            >
              Event
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Team"
              className="nav-link"
              onClick={() => {
                scrollToTop();
                closeMenu();
              }} // Close the menu after clicking on the link
              style={{ color: "white" }}
            >
              Team
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Alumni"
              className="nav-link"
              onClick={() => {
                scrollToTop();
                closeMenu();
              }} // Close the menu after clicking on the link
              style={{ color: "white" }}
            >
              Alumni
            </Link>
          </li>
        </ul>
        <div className="btnn btn" onClick={handleClick}>
          {click ? (
            <MdClose size={25} style={{ color: "white" }} />
          ) : (
            <TfiAlignRight size={25} style={{ color: "white" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
