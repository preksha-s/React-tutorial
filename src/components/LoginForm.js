import React, { useState, useEffect, Profiler } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import common from "../common.module.css";
import { useNavigate } from "react-router-dom";
import Auth from "./auth";
import Home from "./Home";
const initialValues = {
  email: "",
  pwd: "",
};
const savedValues = {
  email: "",
  pwd: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format ")
    .required("Email is required"),
  pwd: Yup.string().required("Password is required"),
});

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = async (values, { setErrors }) => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    const user = data.find((ele) => {
      return ele.email == values.email;
    });
    if (user) {
      if (user.email == values.email && user.pwd == values.pwd) {
        localStorage.setItem("email", values.email);
        localStorage.setItem("isAuthenticated", true);
        setauthenticated(true)
        navigate("/profile",{auth:true});
        window.location.reload()
      }else{
        
        setErrorMessage('pwd doesnt match')
      }
    }else{
      setErrorMessage('user doesnt exists')
    }
  };

  const [formValues, setFormValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticated, setauthenticated] = useState( localStorage.getItem("isAuthenticated")?true:false);
  const getEmail = localStorage.getItem("email");
  const getPwd = localStorage.getItem("pwd");

  useEffect(() => {}, []);
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")?true:false
  );
  return (
    <div className={`d-flex justify-content-center ${common.con}`}>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form
              className="form-inline w-25 text-purple "
              onSubmit={formik.handleSubmit}
            >
              <div>
                <h2>Login Form</h2>
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
                    type="text"
                    id="pwd"
                    name="pwd"
                    className="w-100"
                    placeholder="Password"
                  />
                  <div className="text-danger">
                    <ErrorMessage name="pwd" className="text-danger" />
                  </div>
                  <div className="text-danger">{errorMessage}</div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-purple"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default LoginForm;
