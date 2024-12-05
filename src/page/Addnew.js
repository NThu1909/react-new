import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Addnew.css";
import axios from "axios";

const Addnew = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    dob: "",
    phoneNumber: "",
    email: "",
    code: "",
  });

  const postUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/student", {
        name: user.name,
        dob: user.dob,
        phoneNumber: user.phoneNumber,
        email: user.email,
        code: user.code,
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
          <label for="name" class="form-label">
            Name
          </label>

          <input
            type="text"
            id="name"
            class="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label">
            Day of birth
          </label>
          <input
            type="text"
            class="form-control"
            id="dob"
            value={user.dob}
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone Number
          </label>

          <input
            type="tel"
            id="phone"
            class="form-control"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
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
        <div class="mb-3">
          <label for="code" class="form-label">
            Code
          </label>
          <input
            type="code"
            id="code"
            class="form-control"
            value={user.code}
            onChange={(e) => setUser({ ...user, code: e.target.value })}
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
