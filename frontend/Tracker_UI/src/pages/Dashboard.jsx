import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationDashboard from "../components/ApplicationDashboard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const URL = "http://127.0.0.1:8000/jobTracker/"; // Backend URL
  const [applications, setApplications] = useState([]); // Main application States
  const [editId, setEditId] = useState(null); //Edit State
  const [search, setSearch] = useState(""); // Search Bar State
  const [status, setStatus] = useState(""); // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken, logout } = useAuth();
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  //Handling Search Input
  const handleSearchInput = (e) => {
    const data = e.target.value;
    setSearch(data);
  };

  // For handling Search and Status Filtering
  const fetchApplications = async (
    searchValue = search,
    statusValue = status,
  ) => {
    const params = new URLSearchParams();

    if (searchValue) params.set("search", searchValue);
    if (statusValue) params.set("status", statusValue);
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${URL}?${params.toString()}`, header);
      setApplications(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        return;
      }
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Handle Search
  const handleSearch = async () => {
    await fetchApplications(search, status);
  };

  // Handle Status Change
  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    await fetchApplications(search, selectedStatus);
  };

  // Form Data
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    job_type: "",
    salary: "",
    status: "",
  });

  // UseEffect Rendering
  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(URL, header);
        setApplications(response.data);
      } catch (err) {
        setError("Could not load applications from server.");
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, [accessToken]);

  // Handle input Change Section
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Edit Section
  const handleEdit = (application) => {
    setEditId(application.id);
    setFormData({
      job_title: application.job_title,
      company: application.company,
      location: application.location || "",
      job_type: application.job_type || "",
      salary: application.salary || "",
      status: application.status || "",
    });
  };

  //Handle Submit Section
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.job_title || !formData.company) {
      alert("Please fill in both fields");
      return;
    }
    //PUT and POST Section
    setError("");
    try {
      if (editId) {
        await axios.put(`${URL}${editId}/update/`, formData, header);
      } else {
        await axios.post(URL, formData, header);
      }
      setEditId(null);
      setFormData({
        job_title: "",
        company: "",
        location: "",
        job_type: "",
        salary: "",
        status: "",
      });

      await fetchApplications(search, status);
    } catch (err) {
      setError("Could not save application. Please try again.");
    }
  };

  //DELETE Section
  const handleDelete = async (remove_id) => {
    try {
      await axios.delete(`${URL}${remove_id}/`, header);
      await fetchApplications(search, status);
    } catch (err) {
      setError("Could not delete application. Please try again.");
    }
  };

  // Handling Logout

  const handleLogout = () => {
    logout();
    Navigate("/login", { replace: true });
  };

  // output section
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-10 relative selection:bg-blue-500 selection:text-white">
      {/* Subtle atmospheric ambient glow matching the dark dashboard */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Top Header & Dashboard Metrics */}
        <header className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  System Active
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mt-1">
                Job Application Tracker
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Manage, monitor, and accelerate your career opportunities in one
                place.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>

          {/* Full-width Dashboard Preview */}
          <ApplicationDashboard applications={applications} />
        </header>

        {/* Search & Status Filters Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto flex-1">
            <SearchBar
              search={search}
              handleSearchInput={handleSearchInput}
              handleSearch={handleSearch}
            />
          </div>
          <div className="w-full sm:w-auto flex items-center justify-end">
            <StatusFilter
              status={status}
              handleStatusChange={handleStatusChange}
            />
          </div>
        </div>

        {/* 2-Column layout: Form on left, List/Loading/Error on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-6">
            <ApplicationForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editId={editId}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {/* Styled Error Banner */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between text-rose-300 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
                <button
                  onClick={() => fetchApplications(search, status)}
                  className="px-3 py-1.5 text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 rounded-lg transition"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Styled Loading State */}
            {loading ? (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[380px] shadow-xl">
                <div className="relative flex items-center justify-center">
                  {/* Outer ambient glow */}
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 blur-xl animate-pulse absolute"></div>
                  {/* Spinning dual ring */}
                  <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-blue-500 border-r-indigo-500 animate-spin"></div>
                </div>
                <p className="mt-5 text-base font-bold text-slate-200 tracking-wide animate-pulse">
                  Syncing Applications...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Fetching your latest career records from the server
                </p>
              </div>
            ) : (
              !error && (
                <ApplicationList
                  applications={applications}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
