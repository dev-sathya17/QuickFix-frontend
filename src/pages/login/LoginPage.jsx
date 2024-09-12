import { useFormik } from "formik";
import "./LoginPage.css";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import userServices from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../features/user/userSlice";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  return errors;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: () => {
      dispatch(signInStart());
      userServices
        .login(formik.values)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            formik.resetForm();
            dispatch(signInSuccess(response.data.user));
            if (response.data.user.role === "user") {
              navigate("/user/dashboard");
            } else if (response.data.user.role === "admin") {
              navigate("/admin/dashboard");
            }
          } else {
            alert(response);
            dispatch(signInFailure());
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(signInFailure());
          alert(error.response.data.message);
        });
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <Header />
      <div className="login-wrapper">
        <form className="login-form-container" onSubmit={formik.handleSubmit}>
          <div className="title-container">
            <h2 className="title">
              Welcome <span className="highlight-header">back!</span>
            </h2>
          </div>

          <div className="input-container-login">
            <MdEmail className="login-icon" />
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email:"
              className="input email-input"
            />
          </div>
          {formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : (
            <></>
          )}
          <div className="input-container-login">
            <FaLock className="login-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password:"
              className="input"
            />
            {showPassword ? (
              <IoMdEye className="login-eye-icon" onClick={togglePassword} />
            ) : (
              <IoMdEyeOff className="login-eye-icon" onClick={togglePassword} />
            )}
          </div>
          {formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : (
            <></>
          )}
          <div className="button-container">
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
            <p>
              Forgot Password?{" "}
              <Link className="link" to="/forgot">
                Click Here
              </Link>
            </p>
            <p>
              Do not have an Account?{" "}
              <Link className="link" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
