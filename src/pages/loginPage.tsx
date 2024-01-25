import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../redux/authSlice";

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        "http://localhost:8070/auth/token",
        {
          username,
          password,
        }
      );
      const authToken = response.data.token;
      localStorage.setItem("token", authToken);

      // Set login success to true
      setLoginSuccess(true);

      // Dispatch the setLoggedInUser action
      dispatch(setLoggedInUser(username));

      // Redirect to the Cart page after successful login
      navigate("/Cart");
    } catch (error: any) {
      // Explicitly type the caught error
      console.error("Login failed:", error.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles["login-header"]}>Login</h2>
      {loginSuccess && <p>Login successful!</p>}
      {error && <p className={styles["login-error"]}>{error}</p>}
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            className={styles["login-input"]}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className={styles["login-input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
