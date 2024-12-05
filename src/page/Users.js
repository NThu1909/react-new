import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./Users.css";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [alert, setAlert] = useState(false);
  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/student")
      .then((res) => setUsers(res.data.data))
      .catch((error) => console.error(error))
      .finally((done) => done);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserById = (id) => {
    axios
      .delete(`http://localhost:8080/student/${id}`)
      .then((res) => {
        console.log(res);
        fetchUsers();
      })
      .catch((error) => console.error(error))
      .finally((done) => done);
  };
  return (
    <div className="table-users ">
      <h2>List Users</h2>
      <div className="uplist d-flex justify-content-between mb-2">
        <h3>{`Total: ${users.length}`} </h3>
        <Link to={`/update/-1`}>
          <Button variant="success">Add new</Button>
        </Link>
      </div>
      <div className="table-user-block">
        <table className="table">
          <thead className="table-success">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Day of Birth</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={`user--${user.id}`}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.dob}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td className="btn-action d-flex gap-2">
                  <Link to={`/update/${user.id}`}>
                    <Button variant="outline-warning">Edit</Button>
                  </Link>

                  <Button
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
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Notification
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Are you sure to delete this ?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            No
                          </button>
                          <button
                            onClick={() => {
                              deleteUserById(user.id);
                            }}
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
