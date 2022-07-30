import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  useFormikContext,
} from "formik";
import * as Yup from "yup";

const genderOptions = [
  {
    key: "Male",
    value: "male",
  },
  {
    key: "Female",
    value: "female",
  },
  {
    key: "Other",
    value: "other",
  },
];
const initialValues = {
  fname: "",
  lname: "",
  email: "",
  pwd: "",
  confirmPwd: "",
  gender: "",
};
const savedValues = {
  fname: "",
  lname: "",
  email: "",
  pwd: "",
  confirmPwd: "",
  gender: "",
};

const validationSchema = Yup.object({
  fname: Yup.string()
    .required("Firstname  is required")
    .max(10, 'shouldn"t exceed more then 16 characters'),
  lname: Yup.string()
    .required("Lastname is required")
    .max(10, 'shouldn"t exceed more then 16 characters'),
  email: Yup.string()
    .email("Invalid email format ")
    .required("Email is required"),
  pwd: Yup.string().required("Password is required"),
  confirmPwd: Yup.string().when("pwd", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("pwd")],
      "Both password need to be the same"
    ),
  }),
  gender: Yup.string().required("gender is required"),
});

export const Profile = () => {
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [formValues, setFormValues] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [updated, setUpd] = useState("");
  //   get users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  //edit
  const editUsers = async (data) => {
    userList.find((ele) => {
      if (data.id == ele.id) {
        const savedValues = ele;
        setFormValues(savedValues);
        setIsEdit(true);
        setShow(true);
      }
    });
  };

  //update

  const updateUser = async (ele) => {
    const res = await fetch(`http://localhost:8000/users/${ele.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ele),
    });

    const data = await res.json();
    if (data) {
      fetchUsers();
      handleClose(true);
      setOpen(true);
      setUpd("User updated successfully");
    }
    setUserList(
      userList.map((user) => (user.id == data.id ? { ...user } : user))
    );
  };

  //delete user
  const deleteUsers = async (data) => {
    await fetch(`http://localhost:8000/users/${data.id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };
  //   add user
  const onSubmit = async (val, submitProps) => {
    const res = await fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(val),
    });

    const data = await res.json();
    fetchUsers();
    setShow(false);
    setOpen(true);
    setUpd("User added successfully");
  };

  const addUser = async () => {
    setShow(true);
    setFormValues(initialValues);
    setIsEdit(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-2">
      <div className="d-flex justify-content-between py-2">
        <h2 className="text-info">UserList</h2>
        <button className="btn btn-primary" onClick={() => addUser()}>
          Add User
        </button>
      </div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((row, i) => {
              return (
                <tr>
                  <th scope="row" key={i}>
                    {i}
                  </th>
                  <td>{row.fname}</td>
                  <td>{row.lname}</td>
                  <td>{row.gender}</td>
                  <td>{row.email}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => editUsers(row)}
                    >
                      {" "}
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUsers(row)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {(formik) => {
              return (
                <Form
                  className="p-3 text-purple"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="mb-2">
                    <label type="text" htmlFor="fname" className="d-block">
                      Firstname
                    </label>
                    <div>
                      {" "}
                      <Field
                        placeholder="
                  Firstname"
                        type="text"
                        name="fname"
                        id="fname"
                        className="w-100"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="fname" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label type="text" htmlFor="lname" className="d-block">
                      Lastname
                    </label>
                    <div>
                      {" "}
                      <Field
                        placeholder="
                  Lastname"
                        type="text"
                        name="lname"
                        id="lname"
                        className="w-100"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="lname" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label type="text" htmlFor="email">
                      Email
                    </label>
                    <div>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        className="w-100"
                        placeholder="Email"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="email" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label type="text" htmlFor="pwd">
                      Password
                    </label>
                    <div>
                      <Field
                        type="password"
                        id="pwd"
                        name="pwd"
                        className="w-100"
                        placeholder="Password"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="pwd" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label type="text" htmlFor="confirmPwd">
                      Confirm Password
                    </label>
                    <div>
                      <Field
                        type="password"
                        id="confirmPwd"
                        name="confirmPwd"
                        className="w-100"
                        placeholder="confirm Password"
                      />
                      <div className="text-danger">
                        <ErrorMessage
                          name="confirmPwd"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mb-2">
                    <label type="text" htmlFor="confirmPwd">
                      Gender
                    </label>
                    <div className="d-flex">
                      <Field name="gender">
                        {({ field }) => {
                          return genderOptions.map((option) => {
                            return (
                              <React.Fragment key={option.key}>
                                <input
                                  className="align-self-center"
                                  type="radio"
                                  id={option.value}
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <label
                                  className="me-3 ms-2"
                                  htmlFor={option.value}
                                >
                                  {option.key}
                                </label>
                              </React.Fragment>
                            );
                          });
                        }}
                      </Field>
                      <div className="text-danger col-12">
                        <ErrorMessage name="gender" className="text-danger" />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button variant="secondary  me-3" onClick={handleClose}>
                      Close
                    </Button>
                    {isEdit ? (
                      <button
                        type="button"
                        disabled={!formik.isValid}
                        className="btn btn-purple"
                        onClick={() => updateUser(formik.values)}
                      >
                        Update {isEdit}
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-purple">
                        Submit
                      </button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header>
          <h2>Success </h2>
        </Modal.Header>
        <Modal.Body>
          <div>{updated}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpen(false); // Open the modal
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
