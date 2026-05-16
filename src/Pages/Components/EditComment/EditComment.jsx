import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./EditComment.css";
import { api, endpoints } from "../../../Lib/Api";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";
import { useSelector } from "react-redux";
import Header from "../Header/Header";

const EditComment = () => {
  const auth = useSelector((state) => state.auth.data);
  const location = useLocation();
  const commentId = location.pathname.split("/")[2];

  const config = {
    headers: getHeaderStructore(auth.token),
    params: [commentId],
  };

  const [data, setData] = useState();
  const [newReply, setNewReply] = useState("");
  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/comments/${commentId}`,
        );
        setData(response.data.result);
      } catch (error) {
        setData(null);
      }
    };
    getComment();
  }, [commentId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const editConfig = { ...config };
    editConfig.data = { content: newReply };
    try {
      await api.call(endpoints.editComment, editConfig);
    } catch (error) {}
  };
  const handleChange = (e) => {
    setNewReply(e.target.value);
  };
  return (
    <>
      <Header />
      {data && (
        <div className="comment-editor-shell">
          <div className="former-content composer-card">
            <h5>Current comment</h5>
            {data[0].content}
          </div>
          <div className="new-comment composer-card">
            <form className="new-comment" onSubmit={handleSubmit}>
              <textarea
                type="text"
                className="comment-editor-area"
                value={newReply}
                onChange={handleChange}
                placeholder="Write your updated comment"
              />
              <button className="submit-btn" type="submit">
                Save comment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default EditComment;
