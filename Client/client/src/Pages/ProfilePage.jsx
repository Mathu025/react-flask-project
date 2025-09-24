import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../api";

const ProfilePage = () => {
  const [message, setMessage] = useState("");

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
        const userData = { ...values, role: "user" };
      await createUser(userData);
      setMessage("User created successfully!");
      resetForm();
    } catch (err) {
      setMessage("Error creating user. Try again.");
    }
  };

  return (
    <div>
      <h2>Profile / Signup</h2>
      {message && <p>{message}</p>}

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfilePage;
