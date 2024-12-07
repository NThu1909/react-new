import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { doFetch } from "../service/FetchService";
import "./Users.css";
import { Col } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(-1);
  const fetchUsers = () => {
    doFetch("admin/user", "GET", undefined, true).then((res) =>
      setUsers(res.data.listUser)
    );
    // axios
    //   .get(`${API_URL}/admin/user`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => setUsers(res.data.listUser))
    //   .catch((error) => console.error(error))
    //   .finally((done) => done);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserById = (id) => {
    doFetch(`admin/user/${id}`, "DELETE", undefined, true).then((res) =>
      fetchUsers()
    );
    // axios
    //   .delete(`${API_URL}/admin/user/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     fetchUsers();
    //   })
    //   .catch((error) => console.error(error))
    //   .finally((done) => done);
  };

  return (
    <Container>
      <Row>
        <Row className="text-center">
          <h3>List Users</h3>
        </Row>
        <Row className="">
          <Col className="col-lef">
            <h3 className="">{`Total: ${users.length}`} </h3>
          </Col>
          <Col className="col-rig">
            <Link to={`/update/-1`}>
              <Button variant="success">Add new</Button>
            </Link>
          </Col>
        </Row>
        <Row className="table-user-block">
          <Table>
            <thead className="table-success">
              <tr>
                <th>No</th>
                <th>UserName</th>
                <th>Full Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={`user--${user.id}`}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td className="btn-action d-flex gap-2">
                    <Button disabled={user.id === 1} variant="outline-warning">
                      <Link className="btn-update" to={`/update/${user.id}`}>
                        Edit
                      </Link>
                    </Button>

                    <Button
                      onClick={() => setUserId(user.id)}
                      disabled={user.id === 1}
                      variant="outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Delete
                    </Button>
                    {/* Alert */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <Modal.Dialog>
                        <Modal.Header>
                          <Modal.Title className="fs-5" id="exampleModalLabel">
                            Notification
                          </Modal.Title>
                          <Button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></Button>
                        </Modal.Header>
                        <Modal.Body>Are you sure to delete this ?</Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            No
                          </Button>
                          <Button
                            onClick={() => {
                              deleteUserById(userId);
                            }}
                            className="btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Row>
    </Container>
  );
};

export default Users;
