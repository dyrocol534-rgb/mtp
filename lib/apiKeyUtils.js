import ApiKey from "@/models/ApiKey";

/**
 * Checks if an API key needs its daily spend reset and performs it atomically.
 * @param {Object} keyDoc - The Mongoose document of the API key
 * @returns {Object} The updated/reset key document or the original if no reset was needed.
 */
export async function ensureDailyReset(keyDoc) {
    if (!keyDoc) return null;

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);

    const lastResetAtMidnight = keyDoc.lastResetDate
        ? new Date(keyDoc.lastResetDate).setHours(0, 0, 0, 0)
        : 0;

    if (todayAtMidnight.getTime() > lastResetAtMidnight) {
        // ⚡ ATOMIC RESET: If it's a new day, we MUST reset the DB counter.
        const resetDoc = await ApiKey.findOneAndUpdate(
            {
                _id: keyDoc._id,
                $or: [
                    { lastResetDate: { $lt: todayAtMidnight } },
                    { lastResetDate: { $exists: false } },
                    { lastResetDate: null }
                ]
            },
            {
                $set: {
                    usedToday: 0,
                    lastResetDate: new Date()
                }
            },
            { new: true }
        );

        if (resetDoc) {
            return resetDoc;
        } else {
            // If resetDoc is null, it means another concurrent request already reset it.
            return await ApiKey.findById(keyDoc._id);
        }
    }

    return keyDoc;
}
