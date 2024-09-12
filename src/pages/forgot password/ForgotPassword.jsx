import { useState } from "react";
import "./ForgotPassword.css";
import { MdOutlineMail } from "react-icons/md";
import userServices from "../../services/user.service";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);

    userServices
      .forgotPassword(email)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setLoading(false);
          setShowOtp(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setError("Email is required");
    } else {
      setError("");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      userServices
        .verify(otp, email)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            setShowOtp(false);
            navigate("/reset", { state: { email } });
          } else {
            alert(response);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      alert("Please enter a valid OTP");
    }
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-form-container">
        <h2 className="form-title">
          Oh snap &#128543;, You forgot your password
        </h2>
        <p>No worries! Let&lsquo;s reset them for you.</p>
        <div className="fp-input-container">
          <MdOutlineMail className="fp-icon" />
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="abcd@email.com:"
            id="email"
            className="fp-input"
          />
        </div>
        {error ? (
          <div className="fp-error">
            <p className="fp-error-message">{error}</p>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={handleSubmit}
          className={error || loading ? "fp-button-error" : "fp-signup-button"}
          disabled={error || loading ? true : false}
        >
          {loading ? "Loading..." : "SUBMIT"}
        </button>
      </div>
      {showOtp && (
        <div className="fp-otp-wrapper">
          <h3>Enter your OTP:</h3>
          <div className="fp-input-container">
            <FaKey className="fp-icon" />
            <input
              type="number"
              value={otp}
              onChange={handleOtpChange}
              className="fp-input"
              placeholder="123456"
            />
          </div>
          <button
            onClick={handleOtpSubmit}
            className={
              error || loading ? "fp-button-error" : "fp-signup-button"
            }
            disabled={error || loading ? true : false}
          >
            {loading ? "Loading..." : "VERIFY"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
