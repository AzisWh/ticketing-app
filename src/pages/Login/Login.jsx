import React, { useState } from "react";
import logoimg from "../../assets/img/logo.svg";
import rightside from "../../assets/img/ck-bg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Semua kolom harus diisi.");
      return;
    }

    try {
      const response = await axios.post(
        "https://testapi.sirekampolkesyogya.com/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (data.error) {
        setError(data.error);
      } else if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        if (data.user.role === 2) {
          navigate("/admin", { replace: true });
        } else if (data.user.role === 1) {
          navigate("/panitia", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section>
      <div className="bg-454545 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <div className="flex flex-col items-center mb-8">
            <img src={logoimg} alt="Logo" />
            <h1 className="text-2xl font-semibold">Welcome!</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white mb-1 flex flex-start">
                email
              </label>
              <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white mb-1 flex flex-start">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 py-2 text-white focus:outline-none">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-4 flex items-center flex-col sm:flex-row sm:justify-between">
              <div className="mb-2 sm:mb-0 flex items-center">
                <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                <label htmlFor="remember" className="text-orange-200 ml-2">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-orange-200 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="bg-orange-200 text-black font-semibold rounded-md py-2 px-4 w-full">
              Login
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
          <div className="mt-6 text-white text-center flex justify-center">
            <span>Don't have account?</span>
            <a href="/register" className=" text-orange-200 ml-2">
              Sign up
            </a>
          </div>
        </div>
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={rightside} alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default Login;
