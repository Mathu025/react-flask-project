import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 chars").required("Required"),
  role: Yup.string().oneOf(["traveler", "organizer", "user"]).required("Required"),
});

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "", role: "traveler" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);
          try {
            await signup(values);
            setSubmitting(false);
            navigate("/"); 
          } catch (err) {
            setStatus(err.message || "Signup failed");
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Role</label>
              <Field as="select" name="role">
                <option value="traveler">Traveler</option>
                <option value="organizer">Organizer</option>
                <option value="user">User</option>
              </Field>
            </div>

            {status && <div style={{ color: "red" }}>{status}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
