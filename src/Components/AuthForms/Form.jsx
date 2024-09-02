import { useEffect } from "react";
import { motion } from "framer-motion";
import "./CSS/forms.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";

const Form = ({
  authName,
  userName,
  email,
  password,
  setUserName,
  setEmail,
  setPassword,
  handleAuthForm,
  message,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.form
      initial={{ opacity: 0, width: 0, height: 0 }}
      animate={{ opacity: 1, width: "400px", height: "auto" }}
    >
      <motion.h1
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ textAlign: "center" }}
      >
        {authName}
      </motion.h1>

      {authName === "რეგისტრაცია" ? (
        <motion.label
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          htmlFor="username"
        >
          სახელი:
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            type="text"
            id="username"
            name="username"
            required
          />
        </motion.label>
      ) : (
        false
      )}

      <motion.label
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        htmlFor="email"
      >
        მეილი:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
        />
      </motion.label>

      <motion.label
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        htmlFor="password"
      >
        პაროლი:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          required
        />
      </motion.label>
      {message && <p>{message}</p>}
      <motion.button
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleAuthForm}
      >
        {authName}
      </motion.button>
      {authName === "შესვლა" ? (
        <motion.p
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          არ გაქვს ექაუნთი?{" "}
          <Link style={{ color: "blue" }} to="/SignUp">
            დარეგისტრირდი
          </Link>
        </motion.p>
      ) : (
        <motion.p
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          უკვე გაქვს ექაუნთი?{" "}
          <Link to="/SignIn" style={{ color: "blue" }}>
            შესვლა
          </Link>
        </motion.p>
      )}
    </motion.form>
  );
};

export default Form;
