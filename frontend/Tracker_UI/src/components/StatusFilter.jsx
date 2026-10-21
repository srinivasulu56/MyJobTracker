function StatusFilter({ status, handleStatusChange }) {
  return (
    <select
      value={status}
      onChange={handleStatusChange}
      className="rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    >
      <option value="" className="bg-slate-900 text-slate-400">All Statuses</option>
      <option value="applied" className="bg-slate-900 text-slate-100">Applied</option>
      <option value="interview" className="bg-slate-900 text-slate-100">Interview</option>
      <option value="rejected" className="bg-slate-900 text-slate-100">Rejected</option>
      <option value="offer" className="bg-slate-900 text-slate-100">Offer</option>
      <option value="accepted" className="bg-slate-900 text-slate-100">Accepted</option>
    </select>
  );
}

export default StatusFilter;