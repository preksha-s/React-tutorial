import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phNumbers: [""],
};
const savedValues = {
  name: "preksha",
  email: "preksh@g.com",
  channel: "code evolution",
  comments: "mmewem emwmew em emw",
  address: "2121 baker street ",
  social: {
    facebook: "",
    twitter: "",
  },
  phNumbers: [""],
};
const onSubmit = (values, submitProps) => {
  console.log(values, submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format ")
    .required("Email is required"),
  channel: Yup.string().required("Channel is required"),
  address: Yup.string().required("address is required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    return (error = "Comment is required");
  } else {
    return (error = "");
  }
};
function Youtube() {
  const [formValues, setFormValues] = useState(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        console.log(formik);
        return (
          <Form
            className="form-inline w-25 text-purple"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <h2>Youtube Form</h2>
            </div>
            <div className="mb-2">
              <label type="text" htmlFor="name" className="d-block">
                Name
              </label>
              <div>
                {" "}
                <Field
                  placeholder="
                    Name"
                  type="text"
                  name="name"
                  id="name"
                  className="w-100"
                />
                <div className="text-danger">
                  <ErrorMessage name="name" className="text-danger" />
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
              <label type="text" htmlFor="channel">
                Channel
              </label>
              <div>
                <Field
                  className=" w-100"
                  type="text"
                  placeholder="Channel"
                  id="channel"
                  name="channel"
                />
                <div className="text-danger">
                  <ErrorMessage name="channel" className="text-danger" />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label type="text" htmlFor="comments">
                Comments
              </label>
              <div>
                <Field
                  as="textarea"
                  className=" w-100"
                  type="text"
                  placeholder="Comments"
                  id="comments"
                  name="comments"
                  validate={validateComments}
                />
                <div className="text-danger">
                  <ErrorMessage name="comments" className="text-danger" />
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label type="text" htmlFor="Address">
                Address
              </label>
              <div>
                <Field
                  className=" w-100"
                  type="text"
                  placeholder="Address"
                  id="address"
                  name="address"
                >
                  {(props) => {
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          {...field}
                          className="w-100"
                        />
                        {meta.touched && meta.error ? (
                          <div className="text-danger">{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
            </div>
            <div className="mb-2">
              <label type="text" htmlFor="facebook">
                Facebook
              </label>
              <div>
                <Field
                  className=" w-100"
                  type="text"
                  placeholder="Facebook"
                  id="facebook"
                  name="social.facebook"
                />
                <div className="text-danger">
                  <ErrorMessage
                    name="social.facebook"
                    className="text-danger"
                  />
                </div>
              </div>

              <div>
                <label type="text" htmlFor="twitter">
                  Twitter
                </label>
                <div>
                  <Field
                    className=" w-100"
                    type="text"
                    placeholder="Twitter"
                    id="twitter"
                    name="social.twitter"
                  />
                  <div className="text-danger">
                    <ErrorMessage
                      name="social.twitter"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label type="text" htmlFor="facebook">
                Facebook
              </label>
              <div>
                <Field
                  className=" w-100"
                  type="text"
                  placeholder="Facebook"
                  id="facebook"
                  name="social.facebook"
                />
                <div className="text-danger">
                  <ErrorMessage
                    name="social.facebook"
                    className="text-danger"
                  />
                </div>
              </div>

              <div>
                <label type="text" htmlFor="phNumbers">
                  Phone No.
                </label>
                <div>
                  <FieldArray name="phNumbers">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const values = form.values;
                      const { phNumbers } = values;
                      return (
                        <div className="py-2">
                          {phNumbers.map((phNumber, index) => (
                            <div key={index}>
                              <Field name={`phNumbers[${index}]`} />
                              <button type="button" onClick={() => push("")}>
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="reset"
                className="btn btn-primary me-2"
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => setFormValues(savedValues)}
              >
                Load Saved Data
              </button>
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
  );
}
export default Youtube;
