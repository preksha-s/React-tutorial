import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import common from "../common.module.css";

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

const onSubmit = async (val, submitProps) => {
  console.log(val);
  const res = await fetch(`http://localhost:8000/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(val),
  });

  const data = await res.json();
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

function RegistrationForm() {
  const [formValues, setFormValues] = useState(null);
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={`d-flex justify-content-center ${common.con}`}>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          // console.log(formik);
          return (
            <Form
              className="form-inline w-25 text-purple"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <h2>Registration Form</h2>
              </div>

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
                    <ErrorMessage name="confirmPwd" className="text-danger" />
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
                            <label className="me-3 ms-2" htmlFor={option.value}>
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

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-purple">
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
export default RegistrationForm;
