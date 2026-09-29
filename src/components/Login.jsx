import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../firebase.init";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Login = () => {
  // for error
  const [error, setError] = useState("");
  // for success
  const [success, setSuccess] = useState(false);

  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    // reset error and success
    setError("");
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // check email verification first
        if (!result.user.emailVerified) {
          toast.error("Please verify your email before login.");

          // logout unverified user
          signOut(auth);

          return;
        }
        // only verified user will reach here
        console.log("Verified User:", result.user);
        setSuccess(true);
        toast.success("Login Successful!!");
      })
      .catch((error) => {
        console.log(error.message);

        setError(error.message);
        toast.error(error.message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    if (email.length === 0) {
      toast.error("Please Enter Email in The Input Field");
      return;
    }

    console.log("forgot button clicked", email);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Reset Link Sent !!",
          text: "Please Open Your Email And Reset Your Password",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        toast.error(error.message);
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
                  ref={emailRef}
                />

                <label className="label">Password</label>

                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />

                <div>
                  <a onClick={handleForgotPassword} className="link link-hover">
                    Forgot password?
                  </a>
                </div>

                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>

              <ToastContainer />
            </form>

            <p>
              Don't have an Account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold link link-hover"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
