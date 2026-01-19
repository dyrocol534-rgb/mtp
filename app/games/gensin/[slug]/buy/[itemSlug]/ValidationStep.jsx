import HelpImagePopup from "@/components/HelpImage/HelpImagePopup";
import RecentVerifiedPlayers from "../../../../../region/RecentVerifiedPlayers";

export default function ValidationStep({
  playerId,
  setPlayerId,
  server,
  setServer,
  onValidate,
  loading,
}) {
  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Character Verification</h2>
        <HelpImagePopup />
      </div>

      {/* CHARACTER ID INPUT */}
      <input
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Enter Character ID"
        className="p-3 rounded-lg bg-black/20 border border-gray-700 w-full"
        disabled={loading}
      />

      {/* SERVER DROPDOWN */}
      <select
        value={server}
        onChange={(e) => setServer(e.target.value)}
        disabled={loading}
        className="p-3 rounded-lg bg-[#2b0f5b] border border-yellow-400 w-full text-white focus:outline-none"
      >
        <option value="">Select an option</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="tw_hk_mo">TW_HK_MO</option>
      </select>

      {/* VALIDATE BUTTON */}
      <button
        onClick={onValidate}
        disabled={loading || !playerId || !server}
        className={`py-3 rounded-lg w-full font-semibold transition
          ${
            loading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[var(--accent)] text-black hover:opacity-90"
          }`}
      >
        {loading ? "Validating…" : "Validate"}
      </button>
    </div>
  );
}
