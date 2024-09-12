import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import "./ForgotPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import userServices from "../../services/user.service";

const ResetPassword = () => {
  const location = useLocation();
  const { email } = location.state || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hasNumber = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const isValidPassword = (password) => {
    if (password.length < 8 || password.length > 20) {
      setError("Password must be between 8 and 20 characters long");
      return false;
    } else if (!hasNumber.test(password)) {
      setError("Password must contain at least one number");
      return false;
    } else if (!hasLowercase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    } else if (!hasUppercase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    } else if (!hasSpecialChar.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    isValidPassword(password);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirm = () => {
    if (error) {
      alert(error);
      return;
    }
    setLoading(true);

    userServices
      .reset(email, password)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert(error.response.data.error);
      });
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-form-container">
        <h1>Reset Your Password</h1>
        <div className="fp-input-container">
          <FaLock className="fp-icon" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            placeholder="Password"
            id="password"
            className="fp-input"
          />
          {showPassword ? (
            <IoMdEye className="fp-eye-icon" onClick={togglePassword} />
          ) : (
            <IoMdEyeOff className="fp-eye-icon" onClick={togglePassword} />
          )}
        </div>
        {error ? (
          <div className="fp-error">
            <p className="fp-error-message">{error}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="fp-input-container">
          <FaLock className="fp-icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="Confirm Password"
            id="confirm-password"
            className="fp-input"
          />
          {showConfirmPassword ? (
            <IoMdEye className="fp-eye-icon" onClick={toggleConfirmPassword} />
          ) : (
            <IoMdEyeOff
              className="fp-eye-icon"
              onClick={toggleConfirmPassword}
            />
          )}
        </div>
        {confirmPasswordError ? (
          <div className="fp-error">
            <p className="fp-error-message">{confirmPasswordError}</p>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={handleConfirm}
          className={error || loading ? "fp-button-error" : "fp-signup-button"}
          disabled={error || loading ? true : false}
        >
          {loading ? "Loading..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
