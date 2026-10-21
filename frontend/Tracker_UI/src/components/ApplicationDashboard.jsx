export default function ApplicationDashboard({ applications }) {
  const interviews = applications.filter(
    (application) => application.status?.toLowerCase() === "interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status?.toLowerCase() === "offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status?.toLowerCase() === "rejected"
  ).length;

  // Fixed: Added .length so it's a number, not an array
  const applied = applications.filter(
    (application) => application.status?.toLowerCase() === "applied"
  ).length;

  const metrics = {
    total: applications.length,
    interviews: interviews,
    offers: offers,
    rejected: rejected,
    applied: applied,
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-6 relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-20 -bottom-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Overview
            </span>
            <h2 className="text-xl font-black tracking-tight mt-1">Application Metrics</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">Updated live from backend</span>
        </div>

        {/* Updated grid to support 5 items cleanly across large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Total */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-600 transition-colors">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total</div>
            <div className="text-3xl font-black text-white mt-3">{metrics.total}</div>
          </div>

          {/* Applied */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Applied</div>
            <div className="text-3xl font-black text-blue-300 mt-3">{metrics.applied}</div>
          </div>

          {/* Interviews */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Interviews</div>
            <div className="text-3xl font-black text-amber-300 mt-3">{metrics.interviews}</div>
          </div>

          {/* Offers */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Offers</div>
            <div className="text-3xl font-black text-emerald-300 mt-3">{metrics.offers}</div>
          </div>

          {/* Rejected */}
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between hover:border-rose-500/50 transition-colors col-span-2 lg:col-span-1">
            <div className="text-rose-400 text-xs font-semibold uppercase tracking-wider">Rejected</div>
            <div className="text-3xl font-black text-rose-300 mt-3">{metrics.rejected}</div>
          </div>

        </div>
      </div>
    </div>
  );
}