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
            <svg
              className="navImage"
              xmlns="http://www.w3.org/2000/svg"
              width="673"
              height="122"
              fill="none"
              viewBox="0 0 673 122"
            >
              <path
                fill="#70E2FF"
                d="m0 97 31.2-43.6-.1 16.5L.9 27h26.5L45 53l-11.3.1L50.9 27h25.4L46.1 69V52.6L77.8 97h-27L33.2 69.8l10.9-.1L26.9 97zm116.833 1.6q-8.5 0-15.8-2.7-7.2-2.7-12.5-7.6a36.3 36.3 0 0 1-8.3-11.7q-2.9-6.7-2.9-14.6 0-8 2.9-14.6 3-6.7 8.3-11.6 5.3-5 12.5-7.7 7.3-2.7 15.8-2.7 8.6 0 15.8 2.7t12.5 7.7q5.3 4.9 8.2 11.6 3 6.6 3 14.6 0 7.9-3 14.6a35.1 35.1 0 0 1-8.2 11.7q-5.3 4.9-12.5 7.6t-15.8 2.7m0-19.1q3.3 0 6.1-1.2 2.9-1.2 5-3.4 2.2-2.3 3.4-5.5 1.2-3.3 1.2-7.4t-1.2-7.3q-1.2-3.3-3.4-5.5a13.9 13.9 0 0 0-5-3.5q-2.8-1.2-6.1-1.2t-6.2 1.2q-2.8 1.2-5 3.5-2.1 2.2-3.3 5.5-1.2 3.2-1.2 7.3t1.2 7.4q1.2 3.2 3.3 5.5a15.8 15.8 0 0 0 5 3.4q2.9 1.2 6.2 1.2M164.898 97V27h19.4l35.6 42.6h-9V27h23v70h-19.4l-35.6-42.6h9V97zm80.371 0V27h23.6v70z"
              ></path>
              <path
                fill="#fff"
                d="M290.2 97V27h48v6.4h-40.6V97zm6.6-29.7v-6.4h37v6.4zm86.402 30.3q-7.9 0-14.7-2.6-6.7-2.7-11.7-7.5a36.6 36.6 0 0 1-7.7-11.3q-2.7-6.5-2.7-14.2t2.7-14.1q2.8-6.5 7.7-11.3 5-4.9 11.7-7.5 6.7-2.7 14.7-2.7 7.9 0 14.6 2.7 6.7 2.6 11.6 7.4 5 4.8 7.7 11.3 2.8 6.5 2.8 14.2t-2.8 14.2q-2.7 6.5-7.7 11.3-4.9 4.8-11.6 7.5-6.7 2.6-14.6 2.6m0-6.6q6.3 0 11.6-2.1 5.4-2.2 9.3-6.1a28.7 28.7 0 0 0 6.2-9.2q2.2-5.3 2.2-11.6t-2.2-11.5q-2.2-5.3-6.2-9.2-3.9-4-9.3-6.1-5.3-2.2-11.6-2.2t-11.7 2.2q-5.4 2.1-9.4 6.1-3.9 3.9-6.2 9.2-2.2 5.2-2.2 11.5 0 6.2 2.2 11.5 2.3 5.3 6.2 9.3 4 3.9 9.4 6.1 5.4 2.1 11.7 2.1m53.287 6V27h26.2q13.3 0 20.9 6.4 7.7 6.3 7.7 17.6 0 7.4-3.5 12.8-3.4 5.3-9.8 8.2-6.4 2.8-15.3 2.8h-22.1l3.3-3.4V97zm47.8 0-18-25.4h8l18.1 25.4zm-40.4-25-3.3-3.5h21.9q10.5 0 15.9-4.6 5.5-4.6 5.5-12.9 0-8.4-5.5-13-5.4-4.6-15.9-4.6h-21.9l3.3-3.5zm93.065 25.6q-13.4 0-21.1-7.7t-7.7-22.8V27h7.4v39.8q0 12.4 5.6 18.3t15.8 5.9q10.3 0 15.9-5.9t5.6-18.3V27h7.2v40.1q0 15.1-7.7 22.8-7.599 7.7-21 7.7m51-.6V27h6.1l32 54.6h-3.2l31.7-54.6h6.1v70h-7.1V38.1h1.7l-29.2 50h-3.5l-29.4-50h1.9V97z"
              ></path>
            </svg>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="obje"
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            {auth ? (
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {auth?.role === "ADMIN" && (
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                )}
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
                          color="#fff"
                          size={30}
                        />
                      ) : (
                        <EnvelopeFill
                          onClick={() => setOpen(true)}
                          color="#fff"
                          size={30}
                        />
                      )}
                    </div>
                  </Nav.Link>

                  <Nav.Link onClick={navigateHandler}>Profile</Nav.Link>
                  <Nav.Link onClick={handleClick}>Log out</Nav.Link>
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
