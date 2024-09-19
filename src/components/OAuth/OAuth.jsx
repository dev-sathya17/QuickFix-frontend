import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import userServices from "../../services/user.service";
import { signInFailure, signInSuccess } from "../../features/user/userSlice";
import { FcGoogle } from "react-icons/fc";
import "./OAuth.css";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { status, data } = await userServices.oAuthSignIn({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      if (status === 200) {
        alert("Logged in successfully");
        dispatch(signInSuccess(data));
        navigate(`/${data.role}/dashboard`);
      } else {
        console.error(data.message);
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={handleGoogleAuth} className="oauth-button">
      <FcGoogle className="google-icon" />
      <p>Continue with Google</p>
    </button>
  );
};

export default OAuth;
