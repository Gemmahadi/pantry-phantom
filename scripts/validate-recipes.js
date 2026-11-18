// validate-recipes.js — data-integrity checks for Pantry Phantom.
// Run: node scripts/validate-recipes.js   (exit 0 = all checks pass)
// Also wired as a Kiro hook: .kiro/hooks/validate-on-save.json
const { RECIPES, PANTRY_AISLES, INGREDIENT_LABELS } = require("../recipes.js");

let failures = 0;
function check(cond, msg) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
}

check(RECIPES.length >= 20, `at least 20 recipes (found ${RECIPES.length})`);
check(new Set(RECIPES.map(r => r.id)).size === RECIPES.length, "recipe ids are unique");

const pantryKeys = new Set(PANTRY_AISLES.flatMap(a => a.items));
const recipeKeys = new Set();
RECIPES.forEach(r => {
  check(r.ingredients.length > 0, `${r.id}: has ingredients`);
  check(r.steps.length > 0, `${r.id}: has steps`);
  check(r.time > 0 && r.servings > 0, `${r.id}: time and servings are positive`);
  check(r.tags.includes("spooky"), `${r.id}: tagged spooky`);
  r.ingredients.forEach(i => {
    recipeKeys.add(i.key);
    if (!INGREDIENT_LABELS[i.key]) { check(false, `${r.id}: label missing for key "${i.key}"`); }
  });
});
const uncovered = [...recipeKeys].filter(k => !pantryKeys.has(k));
check(uncovered.length === 0, `every recipe ingredient key is in quick-add (uncovered: ${uncovered.join(", ") || "none"})`);
check(Object.keys(INGREDIENT_LABELS).every(k => pantryKeys.has(k)), "every label maps to a quick-add key");

console.log(failures === 0 ? "\nAll recipe checks passed." : `\n${failures} check(s) FAILED.`);
process.exit(failures === 0 ? 0 : 1);
