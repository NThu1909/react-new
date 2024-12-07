import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Addnew.css";
import axios from "axios";
import { API_URL } from "../components/Constant/Constant";

const Addnew = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    fullName: "",
    age: "",
    email: "",
  });

  const postUser = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/admin/user`, {
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
      })
      .then((res) => {
        navigate("/users");
      })
      .catch((error) => console.error(error))
      .finally((done) => done);
  };

  useEffect(() => {
    postUser();
  }, []);
  return (
    <div className="addnew-user-page">
      <h3 className="mt-4">Add New User</h3>
      <form onSubmit={postUser}>
        <div class="mb-3">
          <label for="username" class="form-label">
            UserName
          </label>

          <input
            type="text"
            id="username"
            class="form-control"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="fullName" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="fullName"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label">
            Date of Birth
          </label>

          <input
            type="date"
            id="dob"
            class="form-control"
            value={user.dob}
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            class="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnew;
