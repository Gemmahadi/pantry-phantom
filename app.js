// Pantry Phantom — app logic. No build step, no backend, no dependencies.
// Pantry lives in localStorage; recipes come from recipes.js.

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function normKey(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function labelFor(key) {
  return INGREDIENT_LABELS[key] || key.replace(/\b\w/g, c => c.toUpperCase());
}

// ---------- State ----------
let pantry = new Set(JSON.parse(localStorage.getItem("pp-pantry") || "[]"));
let favorites = new Set(JSON.parse(localStorage.getItem("pp-favs") || "[]"));
let shopping = JSON.parse(localStorage.getItem("pp-shopping") || "[]");
let filters = { diet: "", maxTime: 120, spookyOnly: false, sort: "match", query: "", favsOnly: false };
let openRecipeId = null;

function save() {
  localStorage.setItem("pp-pantry", JSON.stringify([...pantry]));
  localStorage.setItem("pp-favs", JSON.stringify([...favorites]));
  localStorage.setItem("pp-shopping", JSON.stringify(shopping));
}

// ---------- Matching ----------
function matchInfo(recipe) {
  const have = recipe.ingredients.filter(i => pantry.has(i.key));
  const missing = recipe.ingredients.filter(i => !pantry.has(i.key));
  return { have, missing, pct: Math.round((have.length / recipe.ingredients.length) * 100) };
}

function recipeMatchesFilters(recipe, info) {
  if (filters.diet && !recipe.tags.includes(filters.diet)) return false;
  if (filters.spookyOnly && !recipe.tags.includes("spooky")) return false;
  if (recipe.time > filters.maxTime) return false;
  if (filters.favsOnly && !favorites.has(recipe.id)) return false;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const hay = (recipe.name + " " + recipe.tagline + " " + recipe.ingredients.map(i => i.name).join(" ")).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

// ---------- Pantry UI ----------
function renderPantry() {
  const box = $("#pantry-chips");
  box.innerHTML = "";
  if (pantry.size === 0) {
    box.innerHTML = `<p class="hint">Your pantry is empty, mortal. Add ingredients below — the Phantom will find what you can cook.</p>`;
  }
  [...pantry].sort().forEach(key => {
    const chip = document.createElement("button");
    chip.className = "chip chip-in";
    chip.type = "button";
    chip.innerHTML = `${labelFor(key)} <span aria-hidden="true">×</span>`;
    chip.title = "Remove from pantry";
    chip.onclick = () => { pantry.delete(key); save(); renderAll(); };
    box.appendChild(chip);
  });
  $("#pantry-count").textContent = pantry.size;
  const clearBtn = $("#clear-pantry");
  clearBtn.disabled = pantry.size === 0;
}

function renderQuickAdd() {
  const box = $("#quick-add");
  box.innerHTML = "";
  PANTRY_AISLES.forEach(aisle => {
    const group = document.createElement("div");
    group.className = "aisle";
    group.innerHTML = `<h3>${aisle.name}</h3>`;
    const row = document.createElement("div");
    row.className = "chip-row";
    aisle.items.forEach(key => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (pantry.has(key) ? " chip-in" : "");
      b.textContent = (pantry.has(key) ? "✓ " : "+ ") + labelFor(key);
      b.onclick = () => {
        if (pantry.has(key)) pantry.delete(key); else pantry.add(key);
        save(); renderAll();
      };
      row.appendChild(b);
    });
    group.appendChild(row);
    box.appendChild(group);
  });
}

// ---------- Recipes UI ----------
function recipeCard(recipe) {
  const info = matchInfo(recipe);
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  const dietBadges = recipe.tags.filter(t => ["vegetarian", "vegan", "gluten-free"].includes(t))
    .map(t => `<span class="badge badge-diet">${t}</span>`).join("");
  const pctClass = info.pct === 100 ? "pct-full" : info.pct >= 60 ? "pct-good" : "pct-low";
  card.innerHTML = `
    <div class="card-top">
      <span class="match ${pctClass}">${info.pct}% match</span>
      <button class="fav ${favorites.has(recipe.id) ? "fav-on" : ""}" type="button" aria-label="Toggle favorite" title="Save to favorites">${favorites.has(recipe.id) ? "♥" : "♡"}</button>
    </div>
    <h3>${recipe.name}</h3>
    <p class="tagline">${recipe.tagline}</p>
    <p class="meta">⏱ ${recipe.time} min &nbsp;·&nbsp; ${recipe.difficulty} &nbsp;·&nbsp; Serves ${recipe.servings}</p>
    <p class="have-line">${info.have.length}/${recipe.ingredients.length} ingredients in your pantry${info.missing.length ? ` · missing: ${info.missing.slice(0, 3).map(i => i.name).join(", ")}${info.missing.length > 3 ? "…" : ""}` : " — you have everything!"}</p>
    <div class="card-foot"><span class="badge badge-spooky">🎃 spooky</span>${dietBadges}
      <button class="btn btn-small" type="button">View recipe →</button>
    </div>`;
  card.querySelector(".fav").onclick = (e) => {
    e.stopPropagation();
    if (favorites.has(recipe.id)) favorites.delete(recipe.id); else favorites.add(recipe.id);
    save(); renderAll();
  };
  card.onclick = () => openRecipe(recipe.id);
  card.onkeydown = (e) => { if (e.key === "Enter") openRecipe(recipe.id); };
  return card;
}

function renderRecipes() {
  const list = $("#recipe-list");
  const scored = RECIPES.map(r => ({ r, info: matchInfo(r) }))
    .filter(({ r, info }) => recipeMatchesFilters(r, info));
  const sorters = {
    match: (a, b) => b.info.pct - a.info.pct || a.r.time - b.r.time,
    quick: (a, b) => a.r.time - b.r.time,
    az: (a, b) => a.r.name.localeCompare(b.r.name)
  };
  scored.sort(sorters[filters.sort] || sorters.match);
  list.innerHTML = "";
  $("#result-count").textContent = `${scored.length} recipe${scored.length === 1 ? "" : "s"} found`;
  if (scored.length === 0) {
    list.innerHTML = `<div class="empty">
      <div class="ghost-big">👻</div>
      <h3>No recipes haunt this pantry… yet.</h3>
      <p>Try removing a filter, adding more ingredients, or clearing the search.</p>
      <button class="btn" type="button" id="reset-filters">Clear all filters</button>
    </div>`;
    $("#reset-filters").onclick = resetFilters;
    return;
  }
  scored.forEach(({ r }) => list.appendChild(recipeCard(r)));
  const full = RECIPES.filter(r => matchInfo(r).pct === 100).length;
  $("#cookable-count").textContent = pantry.size === 0
    ? "Add ingredients to see what you can cook right now."
    : `${full} recipe${full === 1 ? "" : "s"} fully cookable with your pantry.`;
}

// ---------- Recipe modal ----------
function openRecipe(id) {
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) return;
  openRecipeId = id;
  const info = matchInfo(recipe);
  $("#modal-title").textContent = recipe.name;
  $("#modal-tagline").textContent = recipe.tagline;
  $("#modal-meta").textContent = `⏱ ${recipe.time} min · ${recipe.difficulty} · Serves ${recipe.servings}`;
  $("#modal-match").textContent = `${info.pct}% match — you have ${info.have.length} of ${recipe.ingredients.length} ingredients`;
  $("#modal-match").className = "modal-match " + (info.pct === 100 ? "pct-full" : info.pct >= 60 ? "pct-good" : "pct-low");
  $("#modal-ingredients").innerHTML = recipe.ingredients.map(i => `
    <li class="${pantry.has(i.key) ? "have" : "missing"}">
      <span class="ing-mark">${pantry.has(i.key) ? "✓" : "○"}</span>
      <span><strong>${i.name}</strong> — ${i.qty}</span>
    </li>`).join("");
  $("#modal-steps").innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join("");
  const missing = info.missing;
  const shopBtn = $("#add-missing");
  shopBtn.disabled = missing.length === 0;
  shopBtn.textContent = missing.length === 0
    ? "You have everything — happy cooking! 🎃"
    : `Add ${missing.length} missing to shopping list`;
  const favBtn = $("#modal-fav");
  favBtn.textContent = favorites.has(recipe.id) ? "♥ Saved to favorites" : "♡ Save to favorites";
  $("#modal").classList.add("open");
  $("#modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeRecipe() {
  $("#modal").classList.remove("open");
  $("#modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openRecipeId = null;
}

// ---------- Shopping list ----------
function renderShopping() {
  const box = $("#shopping-list");
  $("#shopping-count").textContent = shopping.length;
  if (shopping.length === 0) {
    box.innerHTML = `<p class="hint">Nothing here yet. Open a recipe and add its missing ingredients.</p>`;
    $("#copy-shopping").disabled = true;
    $("#clear-shopping").disabled = true;
    return;
  }
  box.innerHTML = "";
  shopping.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox" ${item.done ? "checked" : ""}> <span>${item.label}</span></label>
      <button type="button" aria-label="Remove">×</button>`;
    li.querySelector("input").onchange = (e) => { shopping[idx].done = e.target.checked; save(); renderShopping(); };
    li.querySelector("button").onclick = () => { shopping.splice(idx, 1); save(); renderShopping(); };
    box.appendChild(li);
  });
  $("#copy-shopping").disabled = false;
  $("#clear-shopping").disabled = false;
}

// ---------- Filters / misc ----------
function resetFilters() {
  filters = { diet: "", maxTime: 120, spookyOnly: false, sort: "match", query: "", favsOnly: false };
  $("#search").value = "";
  $("#diet").value = "";
  $("#max-time").value = 120;
  $("#time-label").textContent = "Any time";
  $("#spooky-only").checked = false;
  $("#favs-only").checked = false;
  $("#sort").value = "match";
  renderAll();
}

function renderAll() {
  renderPantry();
  renderQuickAdd();
  renderRecipes();
  renderShopping();
}

function init() {
  // Add-ingredient form
  $("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#add-input");
    const key = normKey(input.value);
    if (!key) return;
    pantry.add(key);
    input.value = "";
    save(); renderAll();
    input.focus();
  });
  // Live suggestions from known ingredients
  $("#add-input").addEventListener("input", (e) => {
    const q = normKey(e.target.value);
    const sug = $("#suggestions");
    sug.innerHTML = "";
    if (q.length < 2) return;
    Object.keys(INGREDIENT_LABELS).filter(k => k.includes(q) && !pantry.has(k)).slice(0, 6)
      .forEach(k => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = labelFor(k);
        b.onclick = () => { pantry.add(k); save(); renderAll(); $("#add-input").value = ""; sug.innerHTML = ""; };
        sug.appendChild(b);
      });
  });
  $("#clear-pantry").onclick = () => { pantry.clear(); save(); renderAll(); };
  $("#demo-pantry").onclick = () => {
    ["pumpkin", "onion", "garlic", "butter", "cream", "pasta", "tomato", "egg", "flour", "milk", "cheese", "parmesan", "parsley", "sugar", "baking powder", "cinnamon"].forEach(k => pantry.add(k));
    save(); renderAll();
    $("#recipes").scrollIntoView({ behavior: "smooth" });
  };

  // Filters
  $("#search").addEventListener("input", (e) => { filters.query = e.target.value; renderRecipes(); });
  $("#diet").addEventListener("change", (e) => { filters.diet = e.target.value; renderRecipes(); });
  $("#max-time").addEventListener("input", (e) => {
    filters.maxTime = +e.target.value;
    $("#time-label").textContent = filters.maxTime >= 120 ? "Any time" : `≤ ${filters.maxTime} min`;
    renderRecipes();
  });
  $("#spooky-only").addEventListener("change", (e) => { filters.spookyOnly = e.target.checked; renderRecipes(); });
  $("#favs-only").addEventListener("change", (e) => { filters.favsOnly = e.target.checked; renderRecipes(); });
  $("#sort").addEventListener("change", (e) => { filters.sort = e.target.value; renderRecipes(); });
  $("#reset-all").onclick = resetFilters;

  // Summon button — random recipe weighted toward good matches
  $("#summon").onclick = () => {
    const scored = RECIPES.map(r => ({ r, info: matchInfo(r) }));
    const good = scored.filter(s => s.info.pct >= 60);
    const pool = good.length ? good : scored;
    const pick = pool[Math.floor(Math.random() * pool.length)].r;
    openRecipe(pick.id);
  };

  // Modal
  $("#modal-close").onclick = closeRecipe;
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeRecipe(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeRecipe(); });
  $("#add-missing").onclick = () => {
    const recipe = RECIPES.find(r => r.id === openRecipeId);
    if (!recipe) return;
    matchInfo(recipe).missing.forEach(i => {
      const label = `${i.name} — ${i.qty}`;
      if (!shopping.some(s => s.label === label)) shopping.push({ label, done: false });
    });
    save(); renderShopping(); renderRecipes();
    $("#add-missing").textContent = "Added to your shopping list ✓";
    $("#add-missing").disabled = true;
  };
  $("#modal-fav").onclick = () => {
    if (!openRecipeId) return;
    if (favorites.has(openRecipeId)) favorites.delete(openRecipeId); else favorites.add(openRecipeId);
    save(); renderAll(); openRecipe(openRecipeId);
  };

  // Shopping list actions
  $("#copy-shopping").onclick = async () => {
    const text = "Pantry Phantom shopping list\n" + shopping.map(s => `${s.done ? "[x]" : "[ ]"} ${s.label}`).join("\n");
    try { await navigator.clipboard.writeText(text); $("#copy-shopping").textContent = "Copied ✓"; setTimeout(() => $("#copy-shopping").textContent = "Copy list", 1500); }
    catch { $("#copy-shopping").textContent = "Copy blocked by browser"; }
  };
  $("#clear-shopping").onclick = () => { shopping = []; save(); renderShopping(); };

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
