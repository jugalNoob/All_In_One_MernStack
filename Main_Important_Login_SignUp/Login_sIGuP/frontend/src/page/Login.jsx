import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style/login.css';
import Cookies from "js-cookie";
import axios from "axios";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // For server-side errors

let timeout; // Declare it outside component or useRef for safety

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  clearTimeout(timeout); // Clear any previous timeout

  timeout = setTimeout(async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/loginUser",
        { email, password: pass },
        { withCredentials: true }
      );

      const res = response.data;

      // ⚠️ Check server error
      if (response.status === 401) {
        setServerError("Unauthorized: Invalid email or password");
        return;
      }

      if (response.status === 201) {
        alert("Check your form for errors");
        return;
      }

      // ✅ Success
      console.log("User info:", res);

      if (!res.user || !res.user.token) {
        console.log("Token missing from response");
      } else {
        const existingToken = Cookies.get("usersdatatoken");

        if (!existingToken || existingToken !== res.user.token) {
          Cookies.set("usersdatatoken", res.user.token, {
            secure: true,
            sameSite: "Strict",
            expires: 1, // 1 day
          });
          console.log("Cookie added/updated successfully!");
        } else {
          console.log("Cookie already exists and is up-to-date:", existingToken);
        }
      }
    } catch (error) {
      console.error("Error during login:", error?.response?.data || error.message);
      setServerError("An unexpected error occurred. Please try again.");
    }
  }, 2000);
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <br /><br />

        <input
          type="password"
          placeholder="Enter your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <br /><br />

        <button type="submit">Login</button>
        {serverError && <p className="error">{serverError}</p>}
      </form>
    </div>
  );
}

export default Login;

//Etherworld

//Ether123@gmail.com

//ether786