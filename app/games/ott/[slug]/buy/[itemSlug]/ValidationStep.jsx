import { FiUser } from "react-icons/fi";
import HelpImagePopup from "@/components/HelpImage/HelpImagePopup";
import RecentVerifiedPlayers from "../../../../../region/RecentVerifiedPlayers";

export default function ValidationStep({
  playerId,
  setPlayerId,
  onValidate,
  loading,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-[900] uppercase tracking-wide text-[var(--foreground)]">Account Verification</h2>
          <p className="text-xs text-[var(--muted)] font-medium mt-1">Enter your ID to proceed.</p>
        </div>
        {/* <HelpImagePopup /> */}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] ml-1">Character ID</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors">
              <FiUser className="text-xl" />
            </div>
            <input
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              placeholder="Enter Character ID"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all font-medium"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onValidate}
        disabled={loading || !playerId}
        className={`w-full py-4 rounded-xl font-[900] uppercase tracking-widest transition-all transform active:scale-[0.98]
          ${loading || !playerId
            ? "bg-[var(--muted)]/20 text-[var(--muted)] cursor-not-allowed border border-[var(--border)]"
            : "bg-[var(--accent)] text-black hover:shadow-[0_0_20px_var(--accent)] hover:-translate-y-1"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Validating...
          </span>
        ) : "Validate Account"}
      </button>

      {/* <RecentVerifiedPlayers
        limit={5}
        onSelect={(player) => {
          setPlayerId(player.playerId);
        }}
      /> */}
    </div>
  );
}
