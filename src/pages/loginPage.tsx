import React, { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { setToken } from "../../src/redux/authSlice";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px",
});

const StyledPaper = styled(Paper)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledTextField = styled(TextField)({
  margin: "10px 0",
});

const StyledButton = styled(Button)({
  marginTop: "10px",
});

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function

  const cancelTokenSource = axios.CancelToken.source();

  const handleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8070/validate",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: cancelTokenSource.token,
        }
      );

      dispatch(setToken(response.data.jwt)); // Dispatch the setToken action

      console.log("Login Successful. Token: ", response.data.jwt);
      // Redirect or navigate to the dashboard
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error during login", error);
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, []);

  return (
    <div>
      <StyledContainer>
        <StyledPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <StyledTextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton
            onClick={handleLogin}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </StyledButton>
          {error && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
        </StyledPaper>
      </StyledContainer>
    </div>
  );
};

export default LoginPage;
