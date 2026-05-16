import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import VerticalModal from "../Modal/Modal";
import { logout } from "../../../Lib/auth";

import { api, endpoints } from "../../../Lib/Api";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";

import { EnvelopeFill, EnvelopeDashFill } from "react-bootstrap-icons";

import "./Header.css";

const Header = () => {
  const auth = useSelector((state) => state.auth.data);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decoded = useMemo(() => {
    if (!auth?.token) return null;

    try {
      return jwt_decode(auth.token);
    } catch {
      return null;
    }
  }, [auth]);

  const config = useMemo(() => {
    if (!auth?.token || !decoded?._id) return null;

    return {
      headers: getHeaderStructore(auth.token),
      params: [decoded._id],
    };
  }, [auth, decoded]);

  useEffect(() => {
    if (!config) return;

    const getUserNotific = async () => {
      try {
        const result = await api.call(endpoints.getUserNotifications, config);
        console.log("result", result);
      } catch (err) {}
    };

    getUserNotific();
  }, [config]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  const handleNotificationClick = (event) => {
    event.preventDefault();
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    if (decoded?._id) {
      navigate(`/profile/${decoded._id}`);
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="color-navbar"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/home">
            <img
              className="navImage"
              alt="logo"
              src="https://imgur.com/99XjHxi.png"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="obje"
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            {auth ? (
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link onClick={handleClick}>Log out</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            )}

            {auth && (
              <div className="putinline">
                <Nav>
                  <Nav.Link>
                    <div
                      onClick={handleNotificationClick}
                      className="addBorder"
                    >
                      {open ? (
                        <EnvelopeDashFill
                          onClick={() => setOpen(false)}
                          color="royalblue"
                          size={30}
                        />
                      ) : (
                        <EnvelopeFill
                          onClick={() => setOpen(true)}
                          color="royalblue"
                          size={30}
                        />
                      )}
                    </div>
                  </Nav.Link>

                  <Nav.Link onClick={navigateHandler}>Profile</Nav.Link>
                </Nav>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <VerticalModal show={open} onHide={() => setOpen(false)} />
    </>
  );
};

export default Header;
