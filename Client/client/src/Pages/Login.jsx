import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <h2>Login</h2>
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            try {
                await login(values);
                setSubmitting(false);
                navigate("/"); // redirect after login
            } catch (err) {
            setStatus(err.message || "Login failed");
            setSubmitting(false);
            }
            }}
        >
            {({ isSubmitting, status }) => (
            <Form>
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

            {status && <div style={{ color: "red" }}>{status}</div>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
}
