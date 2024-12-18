import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Addnew.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL } from "../components/Constant/Constant";
import { doFetch } from "../service/FetchService";
import { jwtDecode } from "jwt-decode";

const Update = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    age: "",
    email: "",
    password: "",
    roleIds: "",
  });

  console.log(user);
  let params = useParams();
  const userId = params.id;
  const isAddNew = userId === "-1";
  const token = localStorage.getItem("token");
  const getJwt = jwtDecode(token);
  console.log(getJwt);
  const showOffUsers = () => {
    if (getJwt.roles === "ROLE_ADMIN"){
      
    }
  }
  const body = { ...user };
  console.log(typeof userId);
  const getUserById = () => {
    doFetch(`admin/user/${userId}`, "GET", undefined, true).then((res) =>
      setUser(res.data.objUser)
    );
    // axios
    //   .get(`${API_URL}/admin/user/${userId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })

    //   .then((res) => {
    //     setUser(res.data.objUser);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => console.log("success"));
  };

  const postUser = () => {
    doFetch("admin/user", "POST", body, true).then((res) => navigate("/users"));
    // axios
    //   .post(
    //     `${API_URL}/admin/user`,
    //     {
    //       username: user.username,
    //       fullName: user.fullName,
    //       age: user.age,
    //       email: user.email,
    //       password: user.password,
    //     },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then((res) => {
    //     navigate("/users");
    //   })
    //   .catch((error) => console.error(error))
    //   .finally((done) => done);
  };

  const putUser = () => {
    doFetch(`admin/user/${userId}`, "PUT", body, true).then((res) =>
      navigate("/users")
    );
    // axios
    //   .put(
    //     `${API_URL}/admin/user/${userId}`,
    //     {
    //       username: user.username,
    //       fullName: user.fullName,
    //       age: user.age,
    //       email: user.email,
    //       password: user.password,
    //     },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then((res) => {
    //     navigate("/users");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => console.log("success"));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddNew) {
      postUser();
    } else {
      putUser();
    }
  };

  useEffect(() => {
    if (!isAddNew) {
      getUserById();
    }
  }, []);

  const checkboxOptions = [
    { id: 1, text: "ADMIN" },
    { id: 2, text: "STUDENT" },
    { id: 3, text: "TEACHER" },
  ];

  const handleCheckRoles = (roleId) => {
    const newRoles = user.roleIds;
    if (newRoles.includes(roleId)) {
      newRoles.splice(newRoles.indexOf(roleId), 1);
    } else {
      newRoles.push(roleId);
    }
    setUser({ ...user, roleIds: [...newRoles] });
  };
  return (
    <div className="addnew-user-page">
      <h3>{`${isAddNew ? "Add new" : "Update"} user`}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">User Name</Form.Label>

          <Form.Control
            disabled={!isAddNew}
            id="username"
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fullName">Full Name</Form.Label>
          <Form.Control
            id="fullName"
            value={user?.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="age">Age</Form.Label>

          <Form.Control
            type="number"
            id="age"
            value={user?.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <div className="group-choose">
            {checkboxOptions.map((option) => (
              <div className="check-box-group">
                <Form.Label>{option.text}</Form.Label>
                <Form.Check
                  checked={user.roleIds.includes(option.id)}
                  type="checkbox"
                  value={option.id}
                  onChange={(e) => handleCheckRoles(Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="submit-btn d-flex justify-content-center">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Update;
