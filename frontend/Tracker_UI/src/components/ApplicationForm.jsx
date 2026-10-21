export default function ApplicationForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
}) {
  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl space-y-4"
    >
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-lg font-bold text-white tracking-tight">
          {editId ? "Update Application" : "New Application"}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {editId
            ? "Edit the job details below"
            : "Track a new job opportunity"}
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Job Title
          </label>
          <input
            name="job_title"
            placeholder="e.g. Backend Engineer"
            value={formData.job_title}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Company Name
          </label>
          <input
            name="company"
            placeholder="e.g. Google"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">
              Location
            </label>
            <input
              name="location"
              placeholder="e.g. Remote / Hyderabad"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">
              Salary
            </label>
            <input
              name="salary"
              placeholder="e.g. $80,000"
              value={formData.salary}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">
              Job Type
            </label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" className="bg-slate-900 text-slate-400">Select type</option>
              <option value="full_time" className="bg-slate-900 text-slate-100">Full-time</option>
              <option value="part_time" className="bg-slate-900 text-slate-100">Part-time</option>
              <option value="internship" className="bg-slate-900 text-slate-100">Internship</option>
              <option value="contract" className="bg-slate-900 text-slate-100">Contract</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" className="bg-slate-900 text-slate-400">Select status</option>
              <option value="applied" className="bg-slate-900 text-slate-100">Applied</option>
              <option value="interview" className="bg-slate-900 text-slate-100">Interview</option>
              <option value="rejected" className="bg-slate-900 text-slate-100">Rejected</option>
              <option value="offer" className="bg-slate-900 text-slate-100">Offer</option>
              <option value="accepted" className="bg-slate-900 text-slate-100">Accepted</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.99]"
      >
        {editId ? "Update Application" : "Add Application"}
      </button>
    </form>
  );
}