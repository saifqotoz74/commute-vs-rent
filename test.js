const assert = require("assert");
const { commuteVsRent } = require("./calc");
// +$600 rent, commute 150 -> 30 min/day, 21 days: 42 hours saved, $14.29/h
let r = commuteVsRent({ currentRent: 2700, newRent: 3300, currentCommuteMin: 150, newCommuteMin: 30, workDays: 21 });
assert.strictEqual(r.extraRent, 600); assert.strictEqual(r.hoursSavedPerMonth, 42); assert.strictEqual(r.costPerHourSaved, 14.29);
// gas saved reduces the net cost
r = commuteVsRent({ currentRent: 2700, newRent: 3300, currentCommuteMin: 150, newCommuteMin: 30, workDays: 21, currentCommuteCost: 300, newCommuteCost: 60 });
assert.strictEqual(r.netExtraCost, 360); assert.strictEqual(r.costPerHourSaved, 8.57);
// own hour value decides the verdict
assert.match(commuteVsRent({ currentRent: 2700, newRent: 3300, currentCommuteMin: 150, newCommuteMin: 30, workDays: 21, hourValue: 20 }).verdict, /Worth it on these numbers/);
assert.match(commuteVsRent({ currentRent: 2700, newRent: 3300, currentCommuteMin: 150, newCommuteMin: 30, workDays: 21, hourValue: 10 }).verdict, /Not worth it/);
// edge cases
r = commuteVsRent({ currentRent: 1000, newRent: 1200, currentCommuteMin: 30, newCommuteMin: 30, workDays: 20 });
assert.strictEqual(r.costPerHourSaved, null); assert.match(r.verdict, /No time saved/);
r = commuteVsRent({ currentRent: 1000, newRent: 900, currentCommuteMin: 60, newCommuteMin: 20, workDays: 20 });
assert.match(r.verdict, /does not cost more/);
console.log("ok");
