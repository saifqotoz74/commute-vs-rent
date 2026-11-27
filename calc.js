// Is paying more rent for a shorter commute worth it? Output: what each hour saved costs you.
// All money values are per month; commute minutes are per working day (round trip).
function commuteVsRent(o) {
  const n = (x) => Number(x) || 0;
  const extraRent = n(o.newRent) - n(o.currentRent);
  const commuteCostSaved = n(o.currentCommuteCost) - n(o.newCommuteCost); // gas, transit, parking
  const netExtraCost = extraRent - commuteCostSaved;
  const hoursSaved = ((n(o.currentCommuteMin) - n(o.newCommuteMin)) * n(o.workDays)) / 60;
  const r = { extraRent, commuteCostSaved, netExtraCost, hoursSavedPerMonth: round(hoursSaved), costPerHourSaved: null, verdict: "" };
  if (hoursSaved <= 0) {
    r.verdict = netExtraCost > 0 ? "No time saved and it costs more." : "No time saved.";
    return r;
  }
  r.costPerHourSaved = round(netExtraCost / hoursSaved);
  if (netExtraCost <= 0) r.verdict = "It saves time and does not cost more.";
  else if (o.hourValue !== undefined && o.hourValue !== "") {
    r.verdict = r.costPerHourSaved <= n(o.hourValue)
      ? "Each hour saved costs " + r.costPerHourSaved + ", below the " + n(o.hourValue) + " you value an hour at. Worth it on these numbers."
      : "Each hour saved costs " + r.costPerHourSaved + ", above the " + n(o.hourValue) + " you value an hour at. Not worth it on these numbers.";
  } else r.verdict = "Worth it if an hour of your free time is worth more than " + r.costPerHourSaved + " to you.";
  return r;
}
function round(x) { return Math.round(x * 100) / 100; }
if (typeof module !== "undefined") module.exports = { commuteVsRent };
