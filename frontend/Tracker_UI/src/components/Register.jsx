import {useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Register(){
const navigate = useNavigate();
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [email,setEmail]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [error,setError]= useState("");
const [loading,setLoading]=useState(false);
const [success,setSuccess]=useState("");

const URL = "http://127.0.0.1:8000/jobTracker/register/";

const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");

    if(password!==confirmPassword){
        setError("password do not much.");
        return;
    }

    if(password.length<8){
        setError("Password must contain  at least 8 characters.");
        return ;
    }
    setLoading(true);
    try{
        await axios.post(URL,{username,email,password});
        setSuccess("Registration Succesful!! You can now log in.");
        navigate("/dashboard");
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
    }catch(err){
        const data = err.response?.data;
        if(data?.username){
            setError("username already exists or is invalid");
        }
        else if(data?.email){
            setError("Please enter a valid  email address");
        }else if(data?.password){
            setError(data.password.join(" "));
        }
        else{
            setError("Registration failed. Please try again");
        }

    }
    finally{
        setLoading(false);
    }
}
return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-slate-400 mt-2">
            Start tracking your job applications.
          </p>
        </div>

        {error && (
          <p className="text-rose-400 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-emerald-400 text-sm">{success}</p>
        )}

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
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
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
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Confirm Password</label>
          <input
            type="password"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg p-3 font-semibold transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <p className="text-sm text-center text-slate-400">
          Already have an account?{" "}
         <Link to="/login" className="text-blue-400 hover:text-blue-300">
         Login
         </Link>
        </p>
      </form>
    </div>
);
}


export default Register;