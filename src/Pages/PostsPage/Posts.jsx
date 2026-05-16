import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "../Components/AllComments/Comments";
import "./Posts.css";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { api, endpoints } from "../../Lib/Api";
import { getHeaderStructore } from "../../Lib/helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regFaHeart } from "@fortawesome/free-regular-svg-icons";

import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Header from "../Components/Header/Header";

const Posts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedPostId = location.pathname.split("/")[4];
  const auth = useSelector((state) => state.auth.data);
  const decoded = jwt_decode(auth.token);
  const [img, setImg] = useState();
  const [heart, setHeart] = useState();
  const [show, setShow] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const config = useMemo(() => {
    return {
      headers: getHeaderStructore(auth.token),
      params: [requestedPostId],
    };
  }, [auth, requestedPostId]);

  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await axios.get(
          `http://127.0.0.1:4000/posts/${requestedPostId}`,
        );
        setPost([result.data.data]);
        if (result.data.data.upvotedBy.includes(decoded._id)) {
          setHeart(true);
        }
        if (result.data.data.imageSubmission.length > 0) {
          setImg(result.data.data.imageSubmission + ".jpg");
        }
      } catch (error) {
        setPost([]);
      }
    };
    getPost();
  }, [config, decoded._id, requestedPostId]);
  const handleEdit = (e) => {
    e.preventDefault();
    setShowActions(false);
    navigate(`/edit/${requestedPostId}`, { state: { locationPost: post } });
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const editConfig = { ...config };
      await api.call(endpoints.removePost, editConfig);
    } catch (error) {}
  };
  const handleUpvote = async (e) => {
    e.preventDefault();
    try {
      await api.call(endpoints.upVote, config);
      const result = await axios.get(
        `http://127.0.0.1:4000/posts/${requestedPostId}`,
      );
      setPost([result.data.data]);
      if (result.data.data.imageSubmission.length > 0) {
        setImg(result.data.data.imageSubmission + ".jpg");
      }
    } catch (error) {}
  };
  const handleDownVote = async (e) => {
    e.preventDefault();
    try {
      await api.call(endpoints.downVote, config);
      const result = await axios.get(
        `http://127.0.0.1:4000/posts/${requestedPostId}`,
      );
      setPost([result.data.data]);
      if (result.data.data.upvotedBy.includes(decoded._id)) {
        setHeart(true);
      }
      if (result.data.data.imageSubmission.length > 0) {
        setImg(result.data.data.imageSubmission + ".jpg");
      }
    } catch (error) {}
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShowActions(false);
    setShow(!show);
  };

  const handleToggleActions = (e) => {
    e.preventDefault();
    setShowActions(!showActions);
  };

  console.log("heart", heart);

  return (
    <>
      <Header />
      {post &&
        post.map((elem, index) => {
          return (
            <>
              <div className="avatar">
                <img src={`${elem.author.avatar}`} alt="avatar" />
              </div>
              <div key={elem._id} className="postInfo">
                <div className="elemContainer">
                  <h3>{elem.title}</h3>
                </div>
                <div
                  className="postContainer"
                  dangerouslySetInnerHTML={{ __html: elem.textSubmission }}
                />

                {img && (
                  <div className="image-here">
                    <img src={img} className="image-onpost" alt="here" />
                  </div>
                )}
                <div className="buttons">
                  <div className="post-date">
                    <small>Date:{elem.createdAt.split("T")[0]}</small>
                  </div>
                  <div className="hearts">
                    <FontAwesomeIcon
                      size="lg"
                      icon={
                        elem.upvotedBy.includes(decoded._id)
                          ? faHeart
                          : regFaHeart
                      }
                      onClick={handleUpvote}
                    />
                    {elem.points}
                    <FontAwesomeIcon
                      size="lg"
                      icon={
                        elem.downvotedBy.includes(decoded._id)
                          ? faHeartCrack
                          : faThumbsDown
                      }
                      onClick={handleDownVote}
                    />
                    {(decoded._id === elem.author._id ||
                      auth.role === "ADMIN") && (
                      <div className="post-actions-dropdown">
                        <button
                          type="button"
                          onClick={handleToggleActions}
                          className="button-noremove"
                          aria-label="Post actions"
                        >
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        {showActions && (
                          <div className="buttons-remove">
                            {decoded._id === elem.author._id && (
                              <button
                                onClick={handleEdit}
                                className="button-noremove"
                                id={elem._id}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={handleShow}
                              className="button-remove"
                              id={elem._id}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {show && (
                      <div className="buttons-remove">
                        Are you sure you want to delete this post?
                        <div className="buttons-remove-wrapper">
                          <button
                            className="button-remove"
                            onClick={handleRemove}
                            id={elem._id}
                          >
                            Yes
                          </button>
                          <button
                            className="button-noremove"
                            onClick={handleShow}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Comments key={elem._id} />
            </>
          );
        })}
    </>
  );
};
export default Posts;
