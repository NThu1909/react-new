import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Addnew.css";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    dob: "",
    phoneNumber: "",
    email: "",
    code: "",
  });
  const [userId, setUserId] = useState(null);
  let params = useParams();

  const getUserById = (e) => {
    axios
      .get(`http://localhost:8080/student/${params.id}`)
      .then((res) => {
        setUser(res.data.data);
        setUserId(res.id);
      })
      .then(() => {
        if (userId === -1) {
          postUser();
        } else {
          handleSubmit();
        }
      });
    // .then((res) => {
    //   setUser(res.data.data);
    //   setUserId(res.id);
    // })
    // .catch((err) => {
    //   console.error(err);
    // })
    // .finally(() => console.log("success"));
  };
  useEffect(() => {
    getUserById();
  }, []);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/student/${params.id}`, {
        name: user.name,
        dob: user.dob,
        phoneNumber: user.phoneNumber,
        email: user.email,
      })
      .then((res) => {
        navigate("/users");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => console.log("success"));
  };
  return (
    <div className="addnew-user-page">
      <h3>Update user</h3>
      <form onSubmit={getUserById} key={`update--${user.id}`}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            id="name"
            className="form-control"
            value={user?.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Day of birth
          </label>
          <input
            type="text"
            className="form-control"
            id="dob"
            value={user?.dob}
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>

          <input
            type="tel"
            id="phone"
            className="form-control"
            value={user?.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
