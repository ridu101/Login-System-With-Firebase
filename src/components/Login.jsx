// import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successful!!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Account does not exist or email/password is incorrect");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login to access all the features !!! Happy Journey !!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              <ToastContainer />
            </form>
            <p>
              Don't have an Account ?
              <Link
                to="/register"
                className="text-blue-600 font-semibold link link-hover"
              >
                {" "}
                Register Now{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
