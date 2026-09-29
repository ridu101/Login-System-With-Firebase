import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  // for error
  const [error, setError] = useState("");
  // for success
  const [success, setSuccess] = useState(false);
  // event handler
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);

    // at once validations
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters with one uppercase, one lowercase, one number, and one special character",
      );
      toast.error(
        "Password must be at least 6 characters with one uppercase, one lowercase, one number, and one special character",
      );
      return;
    }

    // // password validation for 6 character
    // const passwordPattern = /^.{6,}$/;

    // if (!passwordPattern.test(password)) {
    //   console.log("password criteria didn't match");
    //   setError("Password must be 6 characters or longer");
    //   toast.error("Password must be 6 characters or longer");
    //   return;
    // }
    // // password validation for upper and lower case
    // const casePasswordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    // if (!casePasswordPattern.test(password)) {
    //   setError(
    //     "Password must be at least 6 characters with one uppercase and one lowercase letter",
    //   );
    //   toast.error(
    //     "Password must be at least 6 characters with one uppercase and one lowercase letter",
    //   );
    //   return;
    // }
    // // one spacial character
    // const spacialPasswordPattern =
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/;
    // if (!spacialPasswordPattern.test(password)) {
    //   setError(
    //     "Password must be at least 6 characters with one uppercase, one lowercase, and one special character",
    //   );
    //   toast.error(
    //     "Password must be at least 6 characters with one uppercase, one lowercase, and one special character",
    //   );
    //   return;
    // }

    // error reset or reset success
    setError("");
    setSuccess(false);

    // terms and conditions
    if (!terms) {
      setError("Please accept our terms and conditions");
      toast.error("Please accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("after create a new user", result.user);
        setSuccess(true);
        // toast.success("Account Created Successfully!!");
        e.target.reset();
        // validate the email before registration 
        sendEmailVerification(result.user)
          .then( () =>{
              Swal.fire({
              title: "Account Created Successfully!",
              text: "Please verify your email address. After verification, you can login.",
              icon: "success",
              confirmButtonText: "OK",
            })
          })
          .catch(error=>{
            toast.error(error.message);
          })
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Register to access all the features of the website
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
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
                  <label class="label">
                    <input type="checkbox" name="terms" class="checkbox" />
                    Accept our Terms and Conditions
                  </label>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
                <p>
                  Already Have an Account ?{" "}
                  <span>
                    <Link
                      to="/login"
                      className="text-blue-600 font-semibold link link-hover"
                    >
                      Log In
                    </Link>
                  </span>
                </p>
              </fieldset>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
