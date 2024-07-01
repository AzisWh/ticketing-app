import React, { useState } from "react";
import logoimg from "../../assets/img/logo.svg";
import rightside from "../../assets/img/ck-bg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Semua kolom harus diisi.");
      return;
    }

    try {
      const response = await axios.post(
        "https://testapi.sirekampolkesyogya.com/api/auth/register",
        {
          name,
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
        onRegister(data.token, data.user);
        if (data.user.role === 2) {
          navigate("/admin", { replace: true });
        } else if (data.user.role === 1) {
          navigate("/panitia", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setError("Registration failed. Email already used.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
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
              <label htmlFor="name" className="text-white mb-1 flex flex-start">
                Username
              </label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white mb-1 flex flex-start">
                Email
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

            <button type="submit" className="bg-orange-200 text-black font-semibold rounded-md py-2 px-4 w-full">
              Continue
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
          <div className="mt-6 text-white text-center flex justify-center">
            <span>Already have an account?</span>
            <a href="/login" className="text-orange-200 ml-2">
              Sign in
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

export default Register;
