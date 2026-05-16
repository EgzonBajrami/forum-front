import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { api, endpoints } from "../../../Lib/Api";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";

import "./Modal.css";

const VerticalModal = (props) => {
  const auth = useSelector((state) => state.auth.data);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

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

    const getNotifications = async () => {
      try {
        const result = await api.call(endpoints.getUserNotifications, config);

        setNotifications(result.data || []);
      } catch (err) {
      }
    };

    getNotifications();
  }, [config]);

  const handleClick = async (notification) => {
    try {
      navigate(
        `/subforums/${notification.postId.subforum}/post/${notification.postId._id}`,
      );

      const editConf = {
        headers: getHeaderStructore(auth.token),
        params: [notification._id],
      };

      await api.call(endpoints.deleteNotification, editConf);

      props.onHide();
    } catch (err) {
    }
  };

  const handleClear = async (e) => {
    e.preventDefault();

    if (!config) return;

    try {
      await api.call(endpoints.clearNotifications, config);

      setNotifications([]);
    } catch (err) {
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notifications
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="wrapper">
          {notifications.length > 0 ? (
            notifications.map((elem) => (
              <div
                className="notifications-wrapper"
                onClick={() => handleClick(elem)}
                key={elem._id}
              >
                {elem.text}
              </div>
            ))
          ) : (
            <div>No notifications</div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-footer">
        <Button onClick={handleClear}>Clear</Button>

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerticalModal;

