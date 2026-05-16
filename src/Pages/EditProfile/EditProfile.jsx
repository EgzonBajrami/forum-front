import { useState } from "react";
import { useSelector } from "react-redux";

import { api, endpoints } from "../../Lib/Api";
import { getHeaderStructore } from "../../Lib/helpers/helpers";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../Components/Header/Header";
import "./EditProfile.css";

const EditProfile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const userData = location.state.profileData;
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [age, setAge] = useState(userData.age);
  const [username, setUsername] = useState(userData.username);
  const [avatar, setAvatar] = useState(userData.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar || "");
  const [uploadError, setUploadError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const auth = useSelector((state) => state.auth.data);
  const config = {
    headers: getHeaderStructore(auth.token),
    params: [userId],
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadError("");
    setResponseMessage("");

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image is too large. Max size is 5MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    setResponseMessage("");
    try {
      const editConfig = { ...config };
      let avatarValue = avatar;

      if (avatarFile) {
        const uploadConfig = {
          headers: {
            ...getHeaderStructore(auth.token),
          },
          params: [userId],
        };
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        uploadConfig.data = formData;

        const uploadResult = await api.call(endpoints.avatarUpload, uploadConfig);

        if (!uploadResult?.success) {
          setUploadError(uploadResult?.message || "Failed to upload avatar.");
          return;
        }

        avatarValue = uploadResult.data;
        setAvatar(avatarValue);
      }

      const userData = [firstName, lastName, age, username, avatarValue];
      editConfig.data = userData;
      const result = await api.call(endpoints.editUser, editConfig);

      if (result.success) {
        setResponseMessage("Profile updated successfully.");
        return;
      }

      setUploadError(result?.message || "Failed to update profile.");
    } catch (error) {
      setUploadError("Failed to update profile.");
    }
  };

  return (
    <>
      <Header />
      <section className="edit-profile-shell">
        <div className="edit-profile-card">
          <div className="edit-profile-header">
            <p className="edit-profile-kicker">Account</p>
            <h1>Edit Profile</h1>
            <span>Update your profile details and avatar.</span>
          </div>

          <Form className="edit-profile-form" onSubmit={handleSubmit}>
            <Form.Group className="edit-profile-group">
              <Form.Label>First Name</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
              />

              <Form.Label>Last Name</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
              />

              <Form.Label>Age</Form.Label>
              <input
                type="number"
                required
                className="form-control"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                placeholder="Age"
              />

              <Form.Label>Username</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />

              <Form.Label>Avatar Upload</Form.Label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleAvatarUpload}
              />

              {avatarPreview && (
                <div className="avatar-preview-wrap">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="avatar-preview-image"
                  />
                </div>
              )}
            </Form.Group>

            {uploadError && <p className="edit-profile-error">{uploadError}</p>}
            {responseMessage && (
              <p className="edit-profile-success">{responseMessage}</p>
            )}

            <div className="submit">
              <Button type="submit" className="edit-profile-button">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};
export default EditProfile;
