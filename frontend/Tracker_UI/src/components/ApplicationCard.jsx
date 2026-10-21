export default function ApplicationCard({
  application,
  handleEdit,
  handleDelete,
}) {
  // Helper for status styling & left border accent
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "interview":
        return {
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          accent: "border-l-4 border-l-amber-500",
        };
      case "offer":
        return {
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          accent: "border-l-4 border-l-emerald-500",
        };
      case "rejected":
        return {
          badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          accent: "border-l-4 border-l-rose-500",
        };
      default:
        return {
          badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          accent: "border-l-4 border-l-blue-500",
        };
    }
  };

  const config = getStatusConfig(application.status);

  return (
    <div className={`max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all duration-200 space-y-4 flex flex-col justify-between ${config.accent}`}>
      
      {/* Top Section: Status & Title/Company */}
      <div className="space-y-1.5">
        <span className={`inline-block text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase ${config.badge}`}>
          {application.status || "Applied"}
        </span>
        <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
          {application.job_title}
        </h3>
        <p className="text-sm font-semibold text-slate-400">
          {application.company}
        </p>
      </div>

      {/* Clean Stacked Info Rows */}
      <div className="space-y-2 text-xs pt-1 border-t border-slate-800">
        <div className="flex justify-between items-center bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/60">
          <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Location</span>
          <span className="text-slate-200 font-semibold">{application.location || "N/A"}</span>
        </div>

        <div className="flex justify-between items-center bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/60">
          <span className="text-purple-400 font-bold uppercase text-[9px] tracking-wider">Job Type</span>
          <span className="text-purple-200 font-semibold">{application.job_type || "N/A"}</span>
        </div>

        <div className="flex justify-between items-center bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/60">
          <span className="text-emerald-400 font-bold uppercase text-[9px] tracking-wider">Salary</span>
          <span className="text-emerald-200 font-semibold">{application.salary || "N/A"}</span>
        </div>
      </div>

      {/* Bottom Footer: Update & Delete Buttons */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={() => handleEdit(application)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-sm transition-colors"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(application.id)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
        >
          Delete
        </button>
      </div>

    </div>
  );
}