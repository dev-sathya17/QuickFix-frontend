import "./Register.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import userServices from "../../services/user.service";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (values.password.length > 20) {
    errors.password = "Password must be within 20 characters";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/i.test(values.password)
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile is Required";
  } else if (values.mobile.length !== 10) {
    errors.mobile = "Invalid mobile number";
  }

  return errors;
};

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      userServices
        .register(values)
        .then((response) => {
          alert(response.data.message);
          if (response.status === 201) {
            formik.resetForm();
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.message);
        });
      setSubmitting(false);
    },
  });

  return (
    <div className="reg-container">
      <div className="reg-header">
        <Header />
      </div>
      <div className="wrapper">
        <div className="form-container">
          <h2 className="form-title">
            Create an <span className="highlight-title highlight">Account</span>
          </h2>
          <p className="form-description align-center">
            Register now, and get your issues{" "}
            <span className="highlight">solved. &#128512;</span>
          </p>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="input-container">
                <label htmlFor="firstName">Name: </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className="error">{formik.errors.name}</span>
                ) : null}
              </div>

              <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="input-container password-container">
                <label htmlFor="password">Password:</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  maxLength={20}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="input-container">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  className="input"
                  type="tel"
                  placeholder="Mobile"
                  id="mobile"
                  name="mobile"
                  required
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="error">{formik.errors.mobile}</div>
                ) : null}
              </div>
            </div>
            <button type="submit" className="submit-button">
              REGISTER
            </button>
            <p className="align-center login-nav">
              Already have an account?{" "}
              <Link to="/" className="link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
