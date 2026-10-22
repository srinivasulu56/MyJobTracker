import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const {login}=useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = "http://127.0.0.1:8000/jobTracker/token/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(URL, { username, password });
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid username or password "
          : "Login failed.Please check your Server",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-400 mt-2">
            Log in to manage your job applications.
          </p>
        </div>

        {error && <p className="text-rose-400 text-sm">{error}</p>}

        <div className="space-y-2">
          <label className="block text-sm">Username</label>
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg p-3 font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-slate-400">
          Don't have an account?{" "}
         <Link to="/register" className="text-blue-400 hover:text-blue-300">
         Register 
         </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
