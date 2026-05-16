import "./Dashboard.css";
import { api, endpoints } from "../../Lib/Api";
import { getHeaderStructore } from "../../Lib/helpers/helpers";
import { useSelector } from "react-redux";
import { Form, Button, Table } from "react-bootstrap";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.data);
  const [username, setUserName] = useState("");
  const [user, setUser] = useState([]);
  const [subforum, setSubForum] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const config = {
    headers: getHeaderStructore(auth.token),
  };

  const getErrorMessage = (error, fallbackMessage) =>
    error?.response?.data?.message || error?.message || fallbackMessage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResponseMessage("");
    try {
      const editConfig = {
        headers: getHeaderStructore(auth.token),
        params: [username],
      };
      const result = await api.call(endpoints.findUser, editConfig);
      setUser(result.data);
      setResponseMessage("User search completed.");
    } catch (error) {
      setUser([]);
      setErrorMessage(getErrorMessage(error, "Failed to search for user."));
    }
  };

  const removeUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResponseMessage("");
    try {
      const editConfig = {
        headers: getHeaderStructore(auth.token),
        params: [e.currentTarget.id],
      };
      await api.call(endpoints.removeUser, editConfig);
      setUser((prevUsers) =>
        prevUsers.filter((elem) => elem._id !== e.currentTarget.id),
      );
      setResponseMessage("User removed successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to remove user."));
    }
  };

  const createSub = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResponseMessage("");
    try {
      const editConfig = { ...config };
      editConfig.data = { subforum, description, icon };
      await api.call(endpoints.createSub, editConfig);
      setResponseMessage("Subforum created successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to create subforum."));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setResponseMessage("");
    try {
      const editConfig = {
        headers: getHeaderStructore(auth.token),
        params: [subforum],
      };
      const result = await api.call(endpoints.findSubByName, editConfig);
      if (!result.data?.length) {
        setErrorMessage("No subforum found with that name.");
        return;
      }
      const subId = result.data[0]._id;
      setResponseMessage("Subforum found. Opening editor...");
      navigate(`/editSub/${subId}`, { state: { name: result } });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to find subforum."));
    }
  };

  return (
    <>
      <Header />

      <main className="dashboard-shell">
        <section className="dashboard-title">
          <p>Admin workspace</p>
          <h1>Dashboard</h1>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <h2>Create subforum</h2>
            <Form className="admin-get" onSubmit={createSub}>
              <Form.Group className="mb-3">
                <Form.Label>Subforum Name</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={subforum}
                  onChange={(e) => setSubForum(e.target.value)}
                  placeholder="Create new subforum"
                />

                <Form.Label>Subforum Description</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                />

                <Form.Label>Subforum Icon</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Icon URL"
                />

                <Button type="submit">Create</Button>
              </Form.Group>
            </Form>
          </article>

          <article className="dashboard-card">
            <h2>Edit subforum</h2>
            <Form className="admin-get" onSubmit={handleEdit}>
              <Form.Group className="mb-3">
                <Form.Label>Subforum</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={subforum}
                  onChange={(e) => setSubForum(e.target.value)}
                  placeholder="Find subforum by name"
                />
                <Button type="submit">Open editor</Button>
              </Form.Group>
            </Form>
          </article>
        </section>

        {responseMessage && <p>{responseMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}

        <section className="dashboard-users">
          <article className="dashboard-card">
            <h2>User lookup</h2>
            <Form className="admin-get" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Get user data"
                />
                <Button type="submit">Search</Button>
              </Form.Group>
            </Form>
          </article>

          {user.length > 0 && (
            <div className="dashboard-table-wrap">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User id</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Total posts</th>
                    <th>Created at</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {user.map((elem) => (
                    <tr key={elem._id}>
                      <td>{elem._id}</td>
                      <td>
                        {elem.firstName} {elem.lastName}
                      </td>
                      <td>{elem.username}</td>
                      <td>{elem.posts.length}</td>
                      <td>{elem.createdAt.split("T")[0]}</td>
                      <td onClick={removeUser} id={elem._id}>
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
