import { useEffect, useState } from "react";
import "./CSS/forms.css";
import Form from "./Form";
import axios from "axios";
import { validate } from "react-email-validator";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleUserSignUp = (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setMessage("Please Fill All fields");
      setTimeout(() => {
        setMessage(false);
      }, 1300);
      return;
    }

    if (!validate(email)) {
      setMessage("Invalid email address");
      setTimeout(() => {
        setMessage(false);
      }, 1300);
      return;
    }

    axios
      .post("https://myhousetest.onrender.com/signup", {
        userName,
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;

        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        setMessage("Successful Sign Up");
        setTimeout(() => {
          setMessage("");
          navigate("/");
          window.location.reload();
        }, 1300);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("Error Registering user", err);
      });
  };

  return (
    <div className="auth-container">
      <Form
        authName={"რეგისტრაცია"}
        userName={userName}
        email={email}
        password={password}
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleAuthForm={handleUserSignUp}
        message={message}
      />
    </div>
  );
};

export default SignUp;
