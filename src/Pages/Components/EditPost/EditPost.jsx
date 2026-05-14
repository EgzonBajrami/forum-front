import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { api, endpoints } from "../../../Lib/Api";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";
import "./EditPost.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Header from "../Header/Header";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const auth = useSelector((state) => state.auth.data);
  const postData = location.state.locationPost;
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState(postData[0].title);
  const [content, setContent] = useState(postData[0].textSubmission);
  const [img, setImg] = useState(postData[0].imageSubmission);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const config = useMemo(
    () => ({
      headers: getHeaderStructore(auth.token),
      params: [postId],
    }),
    [auth.token, postId],
  );
  useEffect(() => {
    const getPost = async () => {
      const result = await api.call(endpoints.getPost, config);

      setPost([result.data]);
    };
    getPost();
  }, [config]);
  console.log(post);
  console.log(location.state);
  const sub = location.state.locationPost[0].subforum;
  console.log(sub);
  const pid = location.state.locationPost[0]._id;

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.currentTarget.value);
  };
  const handleContent = (e) => {
    e.preventDefault();
    setContent(e.currentTarget.value);
  };
  const handleImg = (e) => {
    setImg(e.currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const editConfig = { ...config };
    const postData = [title, content, img];
    editConfig.data = postData;
    const result = await api.call(endpoints.editPost, editConfig);
    setVariant("success");
    setMessage("Your post has been edited!");

    setTimeout(() => {
      console.log(result);
      navigate(`/subforums/${sub}/post/${pid}`);
    }, 3000);
  };
  return (
    <>
      <Header />
      <div className="composer-shell">
        <div className="composer-head">
          <p>Publishing</p>
          <h1>Edit post</h1>
        </div>
        {variant && <Alert variant={variant}>{message}</Alert>}
        <div className="cont-div composer-card">
          {post && (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post title</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={title}
                  onChange={handleTitle}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Post content</Form.Label>
                <textarea
                  type="text"
                  required
                  rows="12"
                  className="form-control"
                  value={content}
                  onChange={handleContent}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post Image</Form.Label>
                <input
                  type="text"
                  className="form-control"
                  value={img}
                  onChange={handleImg}
                />
              </Form.Group>
              <Button type="submit">Save changes</Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};
export default EditPost;
