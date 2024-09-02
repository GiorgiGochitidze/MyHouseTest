import { useState, useEffect } from "react";
import "./CSS/forms.css";
import Form from "./Form";
import axios from "axios";
import { validate } from "react-email-validator";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleUserSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please Fill All fields");
      setTimeout(() => setMessage(""), 1300);
      return;
    }

    if (!validate(email)) {
      setMessage("Invalid email address");
      setTimeout(() => setMessage(""), 1300);
      return;
    }

    axios
      .post("https://myhousetest.onrender.com/signin", { email, password })
      .then((response) => {
        const { token } = response.data;

        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        setMessage("Successful Sign In");
        setTimeout(() => {
          setMessage("");
          navigate("/");
          window.location.reload();
        }, 1300);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("Error Signing in", err);
        setMessage("Error Signing in");
        setTimeout(() => setMessage(""), 1300);
      });
  };

  return (
    <div className="auth-container">
      <Form
        authName={"შესვლა"}
        userName={userName}
        email={email}
        password={password}
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleAuthForm={handleUserSignIn}
        message={message}
      />
    </div>
  );
};

export default SignIn;
