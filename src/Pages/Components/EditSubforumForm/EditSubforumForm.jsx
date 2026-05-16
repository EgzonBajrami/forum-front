import { api, endpoints } from "../../../Lib/Api";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditSubforumForm.css";
import Header from "../Header/Header";

const EditSubforumForm = () => {
  const auth = useSelector((state) => state.auth.data);
  const location = useLocation();
  const commentId = location.pathname.split("/")[2];
  const data = location.state.name;
  const [subforum, setSubForum] = useState(data.data[0].subforumName);
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState(data.data[0].description);

  const config = {
    headers: getHeaderStructore(auth.token),
    params: [commentId],
  };

  const editSub = async (e) => {
    e.preventDefault();
    try {
      const editConfig = { ...config };
      editConfig.data = {
        subforumName: subforum,
        description: description,
        icon: icon,
      };
      const result = await api.call(endpoints.editSubForum, editConfig);
      return result;
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <Header />
      <section className="edit-subforum-shell">
        <div className="edit-subforum-card">
          <div className="edit-subforum-header">
            <p className="edit-subforum-kicker">Admin</p>
            <h1>Edit Subforum</h1>
            <span>
              Update the name, description, and icon for this subforum.
            </span>
          </div>

          <Form className="edit-subforum-form" onSubmit={editSub}>
            <Form.Group className="edit-subforum-group">
              <Form.Label>Subforum Name</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={subforum}
                onChange={(e) => {
                  setSubForum(e.target.value);
                }}
                placeholder="e.g. Frontend Lounge"
              />

              <Form.Label>Subforum Description</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Tell members what this subforum is about"
              />

              <Form.Label>Subforum Icon URL</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={icon}
                onChange={(e) => {
                  setIcon(e.target.value);
                }}
                placeholder="https://example.com/icon.png"
              />

              <Button type="submit" className="edit-subforum-button">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </div>
      </section>
    </>
  );
};
export default EditSubforumForm;
