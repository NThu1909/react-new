import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { doFetch } from "../service/FetchService";
import "./Login.css";
import { useLocalStorage } from "@uidotdev/usehooks";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, saveToken] = useLocalStorage("token", null);

  const handleLogin = (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };
    doFetch("auth/login", "POST", body).then((res) => {
      const tokenRes = res.data.authResponse.accessToken;
      saveToken(tokenRes);
      navigate("/");
    });
    // axios
    //   .post(`${API_URL}/auth/login`, {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     const token = res.data.authResponse.accessToken;
    //     localStorage.setItem("token", token);
    //     navigate("/");
    //   })

    //   .catch((err) => console.log(err));
  };

  console.log(localStorage.getItem("token"));

  return (
    <div className="login-page">
      <h3>Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 submit-btn">
          <Button type="submit" className="btn-primary">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
