import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import About from "../page/About";
import Users from "../page/Users";
import "./Header.css";
import Addnew from "../page/Addnew";
import Update from "../page/Update";
import Login from "../page/Login";
import { Alert } from "bootstrap";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [token, saveToken] = useLocalStorage("token", null);
  const [tokenDecode, setTokenDecode] = useState("");

  const decodeToken = () => {
    setTokenDecode(jwtDecode(token));
  };
  console.log(tokenDecode);
  // const tokenDecode = jwtDecode(token);
  // console.log(typeof tokenDecode);

  const exp = tokenDecode.exp;
  console.log("exp", tokenDecode.exp);

  const expirationDate = new Date(exp);
  console.log("Expiration Date:", expirationDate.toString());

  const expiryDate = expirationDate < new Date() ? "Expiry date" : "Expired";
  console.log(expiryDate);

  const showUsers = tokenDecode.roles?.includes("ROLE_ADMIN") || false;
  console.log(tokenDecode.roles);
  console.log("Show Users:", showUsers);

  return (
    <>
      <Navbar variant="tabs" bg="primary">
        <Container>
          <div className="header-left d-flex gap-4">
            <div className="menu-logo">
              <Image src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png" />
            </div>
            <Link to="/" className="navbar-brand text-white">
              Home
            </Link>
            {showUsers && (
              <Link to="/users" className="navbar-brand text-white">
                Users
              </Link>
            )}

            <Link to="/about" className="navbar-brand text-white" href="#">
              About
            </Link>
          </div>
          <div className="header-right">
            {token ? (
              <Link
                to="/"
                className="navbar-brand text-white"
                onClick={() => saveToken(null)}
              >
                Logout
              </Link>
            ) : (
              <Link to="/login" className="navbar-brand text-white">
                Login
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/addnew" element={<Addnew />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/alert" element={<Alert />}></Route>
      </Routes>
    </>
    // <div>
    //   <div className="menu">
    //     <div className="menu-left">
    //       <div className="menu-logo">
    //         <img src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png" />
    //       </div>
    //       <div className="menu-choose">
    //         <div className="menu-choose-item home-item">
    //           <Link to="/">Home</Link>
    //         </div>
    //         <div className="menu-choose-item">
    //           <Link to="/users">Users</Link>
    //         </div>
    //         <div className="menu-choose-item">
    //           <Link to="/about">About</Link>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="menu-right">
    //       <div className="menu-right-item">
    //         <Link to="/login">Login</Link>
    //       </div>
    //     </div>
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/users" element={<Users />}></Route>
    //     <Route path="/about" element={<About />}></Route>
    //   </Routes>
    // </div>
  );
};

export default Header;
