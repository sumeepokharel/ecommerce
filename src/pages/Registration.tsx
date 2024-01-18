import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8070/auth/register",
        formData
      );
      console.log(response.data); // Handle success
    } catch (error) {
      console.error("Registration failed:", error); // Handle error
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "130px" }}>
      <Typography component="h1" variant="h5">
        SignUp
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="email "
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          SignUp
        </Button>
      </form>
    </Container>
  );
};

export default Registration;
