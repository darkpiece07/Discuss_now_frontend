import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    setIsDisabled(true);
    e.preventDefault();

    if (email === "" || password === "") {
      return toast.error("all fileds are mandatory", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast.error(error.message.slice(15), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Container
        className="shadow rounded"
        style={{
          margin: "auto",
          marginTop: "40px",
          padding: "20px",
          width: "50vw",
        }}
      >
        <h1>Login via NON Credentials</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <b>Email address</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              style={{ width: "80%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <b>Password</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ width: "80%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={loginHandler}
            disabled={isDisabled}
            className={isDisabled ? "cursor-na" : "cursor-pointer"}
          >
            Login
          </Button>

          <Link to='/signup' style={{color : "black"}}>Haven't account?</Link>

        </Form>
      </Container>
    </>
  );
};

export default Login;
