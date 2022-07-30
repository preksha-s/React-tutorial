import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("form data", values);
};
const validate = (values) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //values.name, values.email,values.channel
  //errors.name ,errors.email,errors.channel
  let errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (regex.test(values.email)) {
    errors.email = "invalid email format";
  }
  if (!values.channel) {
    errors.channel = "Channel is Required";
  }
  return errors;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format ")
    .required("Email is required"),
  channel:
    Yup.string()
    .required("Channel is required"),
});
function oldYoutubeForm() {
  //manage form state handle form submission validation and error msg
  const formik = useFormik({
    // initialValues corresponds to name attribut in our input tag
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log(formik.values, formik.errors, formik.touched);
  //form state  maintains value of different form fields changes in form should be reflected in forms
  return (
    <div className="youtube">
      <form className="form-inline" onSubmit={formik.handleSubmit}>
        <div><h2>Youtube Form</h2></div>
        <div className="mb-2 d-flex">
          <label type="text" htmlFor="name" className="d-block">
            Name
          </label>
          <div>
            {" "}
            <input
              placeholder="
            Name"
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-2 d-flex">
          <label type="text" htmlFor="email">
            Email
          </label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-2 d-flex">
          <label type="text" htmlFor="channel">
            Channel
          </label>
          <div>
            <input
              className=" mb-2"
              type="text"
              placeholder="channel"
              id="channel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
            />
            {formik.errors.channel && formik.touched.channel ? (
              <div className="text-danger">{formik.errors.channel}</div>
            ) : null}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {" "}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default oldYoutubeForm;
